import { Suspense } from "react";
import { CoursesContent } from "@/components/courses/CoursesContent";

export const metadata = {
  title: "Khóa học | MathLearning",
  description: "Khám phá các khóa học chất lượng cao từ các chuyên gia hàng đầu",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-hero-pattern py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Khám phá khóa học
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Hơn 500 khóa học chất lượng cao từ các chuyên gia hàng đầu trong ngành
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <Suspense fallback={<CoursesLoading />}>
          <CoursesContent />
        </Suspense>
      </div>
    </div>
  );
}

function CoursesLoading() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
          <div className="aspect-video bg-gray-200" />
          <div className="p-5 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
