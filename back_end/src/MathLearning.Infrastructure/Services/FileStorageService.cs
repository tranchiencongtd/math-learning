using MathLearning.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MathLearning.Infrastructure.Services;

public class FileStorageService : IFileStorageService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<FileStorageService> _logger;
    private readonly string _uploadPath;

    public FileStorageService(IConfiguration configuration, ILogger<FileStorageService> logger)
    {
        _configuration = configuration;
        _logger = logger;
        _uploadPath = _configuration["Storage:UploadPath"] ?? "uploads";
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string folder = "")
    {
        try
        {
            var folderPath = Path.Combine(_uploadPath, folder);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{fileName}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            using var fileStreamOutput = new FileStream(filePath, FileMode.Create);
            await fileStream.CopyToAsync(fileStreamOutput);

            var relativePath = Path.Combine(folder, uniqueFileName).Replace("\\", "/");
            return $"/uploads/{relativePath}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading file {FileName}", fileName);
            throw;
        }
    }

    public async Task<bool> DeleteFileAsync(string fileUrl)
    {
        try
        {
            var relativePath = fileUrl.Replace("/uploads/", "");
            var filePath = Path.Combine(_uploadPath, relativePath);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }

            await Task.CompletedTask;
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting file {FileUrl}", fileUrl);
            return false;
        }
    }

    public Task<string> GetFileUrlAsync(string fileName, string folder = "")
    {
        var relativePath = string.IsNullOrEmpty(folder) ? fileName : $"{folder}/{fileName}";
        return Task.FromResult($"/uploads/{relativePath}");
    }

    public async Task<Stream?> DownloadFileAsync(string fileUrl)
    {
        try
        {
            var relativePath = fileUrl.Replace("/uploads/", "");
            var filePath = Path.Combine(_uploadPath, relativePath);

            if (File.Exists(filePath))
            {
                return await Task.FromResult<Stream?>(new FileStream(filePath, FileMode.Open, FileAccess.Read));
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error downloading file {FileUrl}", fileUrl);
            return null;
        }
    }
}
