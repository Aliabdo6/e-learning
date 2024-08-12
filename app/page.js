import Link from "next/link";
import FeaturedCourses from "./components/FeaturedCourses";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Simple E-learning Platform
        </h1>
        <p className="text-xl mb-8">
          Discover and learn from a wide range of
          courses
        </p>
        <div className="space-x-4">
          <Link
            href="/courses"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Browse Courses
          </Link>
          <Link
            href="/dashboard"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            My Dashboard
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Courses
          </h2>
          <FeaturedCourses />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Expert Instructors
              </h3>
              <p>
                Learn from industry professionals
                and experienced educators.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Flexible Learning
              </h3>
              <p>
                Study at your own pace, anytime
                and anywhere.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Diverse Course Catalog
              </h3>
              <p>
                Explore a wide range of subjects
                and skill levels.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
