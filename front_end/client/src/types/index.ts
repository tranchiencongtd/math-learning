export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  price: number;
  discountPrice?: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'AllLevels';
  status: 'Draft' | 'PendingReview' | 'Published' | 'Archived';
  language?: string;
  durationInMinutes: number;
  requirements?: string;
  whatYouWillLearn?: string;
  targetAudience?: string;
  isFeatured: boolean;
  averageRating: number;
  totalStudents: number;
  totalReviews: number;
  instructorId: string;
  instructorName: string;
  instructorAvatar?: string;
  categoryId: string;
  categoryName: string;
  createdAt: string;
  updatedAt?: string;
  sections?: Section[];
  tags?: string[];
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  displayOrder: number;
  durationInMinutes: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  type: 'Video' | 'Article' | 'Quiz' | 'Assignment' | 'Resource';
  durationInMinutes: number;
  displayOrder: number;
  isFreePreview: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  displayOrder: number;
  isActive: boolean;
  parentCategoryId?: string;
  subCategories?: Category[];
  coursesCount?: number;
}

export interface Enrollment {
  id: string;
  enrolledAt: string;
  completedAt?: string;
  status: 'Active' | 'Completed' | 'Expired' | 'Cancelled';
  progressPercentage: number;
  course: Course;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userName: string;
  userAvatar?: string;
  helpfulCount: number;
  createdAt: string;
}

export interface PaginatedList<T> {
  items: T[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
