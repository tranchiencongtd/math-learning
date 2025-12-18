namespace MathLearning.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string folder = "");
    Task<bool> DeleteFileAsync(string fileUrl);
    Task<string> GetFileUrlAsync(string fileName, string folder = "");
    Task<Stream?> DownloadFileAsync(string fileUrl);
}
