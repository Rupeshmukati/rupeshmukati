import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const BASE_URL = "/uploads/projects/";

function Project() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { project = [] } = portfolioData || {};

  if (!project.length) return null;

  const selectedProject = project[selectedItemIndex];

  const imageSrc = selectedProject.image
    ? BASE_URL + selectedProject.image
    : "https://placehold.co/600x400?text=No+Image";

  const ProjectImage = (
    <img
      src={imageSrc}
      alt={selectedProject.title}
      className="max-w-[300px] w-full object-cover rounded"
    />
  );

  return (
    <section
      className="project_section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <SectionTitle title="My Projects" id="projects-title" />

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 sm:pb-10">
        {/* Left – Project List */}
        <nav
          className="flex md:flex-col gap-4 md:gap-8 w-full md:w-1/4 sm:border-l sm:border-[#135e4c82] flex-wrap"
          aria-label="Project list"
        >
          {project.map((proj, index) => (
            <button
              key={proj._id || index}
              onClick={() => setSelectedItemIndex(index)}
              className={`text-lg sm:text-xl px-4 py-2 sm:py-3 transition text-left
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-l-4 border-tertiary bg-[#1a7f5a5f]"
                    : "text-white border-l-4 border-white sm:border-0 bg-black sm:bg-transparent"
                }`}
              aria-current={selectedItemIndex === index}
            >
              {proj.title}
            </button>
          ))}
        </nav>

        {/* Right – Project Details */}
        <div className="flex flex-col md:flex-row sm:pb-10 sm:pt-0 pt-0 pb-10 gap-3 md:gap-10 md:items-center justify-center w-full md:w-3/4">
          {/* Image */}
          {selectedProject.link ? (
            <a
              className="contents"
              href={selectedProject.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit project: ${selectedProject.title}`}
            >
              {ProjectImage}
            </a>
          ) : (
            ProjectImage
          )}

          {/* Text */}
          <div className="flex flex-col gap-1 md:gap-2 w-full mt-2 md:mt-0 sm:w-2/2 px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl text-secondary font-semibold mb-0">
              {selectedProject.title}
            </h2>

            {selectedProject.description && (
              <p className="max-w-[600px] text-white text-sm sm:text-base leading-relaxed mb-0">
                {selectedProject.description}
              </p>
            )}

            {selectedProject.technologies?.length > 0 && (
              <p className="max-w-[600px] text-white text-sm sm:text-base mb-0">
                <span className="font-medium">Technologies:</span>{" "}
                {selectedProject.technologies.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
