import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const BASE_URL = "/uploads/courses/";

function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { course = [] } = portfolioData || {};

  if (!course.length) return null;

  const selectedCourse = course[selectedItemIndex];

  const imageSrc = selectedCourse.image
    ? BASE_URL + selectedCourse.image
    : "https://placehold.co/600x400?text=No+Image";

  const CourseImage = (
    <img
      src={imageSrc}
      alt={selectedCourse.title}
      className="max-w-[300px] w-full object-cover rounded"
    />
  );

  return (
    <section
      className="course_section"
      id="courses"
      aria-labelledby="courses-title"
    >
      <SectionTitle title="My Courses" id="courses-title" />

      <div className="flex flex-col md:flex-row sm:pb-10 gap-6 md:gap-10">
        {/* Left Side – Course List */}
        <nav
          className="flex md:flex-col gap-4 md:gap-8 w-full md:w-1/4 sm:border-l sm:border-[#135e4c82] flex-wrap"
          aria-label="Course list"
        >
          {course.map((crs, index) => (
            <button
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className={`text-lg sm:text-xl px-4 py-2 mb-0 sm:py-3 transition
                  ${
                    selectedItemIndex === index
                      ? "text-tertiary border-l-4 border-tertiary bg-[#1a7f5a5f] sm:-ml-[2px] -ml-[0px] text-left"
                      : "text-white sm:border-0 border-l-4 border-white sm:bg-[transparent] bg-[#000] text-left"
                  }`}
              aria-current={selectedItemIndex === index ? "true" : "false"}
            >
              {crs.title}
            </button>
          ))}
        </nav>

        {/* Right Side – Course Details */}
        <div className="flex flex-col md:flex-row sm:pb-10 sm:pt-0 pt-0 pb-10 gap-3 md:gap-10 md:items-center justify-center w-full md:w-3/4">
          {/* Course Image */}
          {selectedCourse.link ? (
            <a
              className="contents"
              href={selectedCourse.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit course: ${selectedCourse.title}`}
            >
              {CourseImage}
            </a>
          ) : (
            CourseImage
          )}

          {/* Course Text Content */}
          <div className="flex flex-col gap-1 md:gap-2 w-full mt-2 md:mt-0 sm:w-2/2 px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl text-secondary font-semibold mb-0">
              {selectedCourse.title}
            </h2>

            {selectedCourse.description && (
              <p className="max-w-[600px] text-white text-sm sm:text-base leading-relaxed mb-0">
                {selectedCourse.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Courses;
