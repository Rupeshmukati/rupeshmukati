import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Project() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { project } = portfolioData;
  return (
    <div className="project_section">
      <SectionTitle title="My Projects" />
      <div className="flex flex-col md:flex-row sm:pb-10 gap-6 md:gap-10">
        {/* Left Side – Period List */}
        <div className="flex md:flex-col gap-4 md:gap-8 w-full md:w-1/4 sm:border-l sm:border-[#135e4c82] flex-wrap">
          {project.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-lg sm:text-xl px-4 py-2 sm:py-3 transition mb-0
                  ${
                    selectedItemIndex === index
                      ? "text-tertiary border-l-4 border-tertiary bg-[#1a7f5a5f] sm:-ml-[2px] -ml-[0px]"
                      : "text-white sm:border-0 border-l-4 border-white sm:bg-[transparent] bg-[#000]"
                  }`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        {/* Right Side – Details */}
        <div className="flex flex-col md:flex-row sm:pb-10 sm:pt-0 pt-0 pb-10 gap-6 sm:gap-10 sm:items-center justify-center">
          {project[selectedItemIndex].link ? (
            <a
              href={project[selectedItemIndex].link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={project[selectedItemIndex].image}
                alt={project[selectedItemIndex].title}
                className="max-w-[300px] rounded"
              />
            </a>
          ) : (
            <img
              src={project[selectedItemIndex].image}
              alt={project[selectedItemIndex].title}
              className="max-w-[300px] rounded"
            />
          )}

          <div className="flex flex-col gap-1 md:gap-2 w-full mt-4 md:mt-0 md:w-2/2">
            <h1 className="text-xl sm:text-2xl text-secondary font-semibold mb-0">
              {project[selectedItemIndex].title}
            </h1>
            <p className="max-w-[600px] text-white text-sm sm:text-base leading-relaxed mt-2 mb-0">
              {project[selectedItemIndex].description}
            </p>

            {project[selectedItemIndex].technologies?.length > 0 && (
              <p className="max-w-[600px] text-white text-sm sm:text-base leading-relaxed mt-2 mb-0">
                <span className="font-medium">Technologies:</span>{" "}
                {project[selectedItemIndex].technologies.join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
