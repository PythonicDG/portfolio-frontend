import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data }) => {
  return (
    <div className="max-w-106 rounded-lg outline-[#FFFFFF] hover:shadow-2xl duration-300 transition-all shadow-gray-300 border border-gray-200">
      <img
        src={data?.project_icon ? `https://portfolio-dipak.strangled.net${data.project_icon}` : ""}
        alt={`${data?.project_title} image`}
      />
      <div className="p-4 xs:p-8">
        <p className="text-gray-400 text-xs font-medium">
          {data?.project_type_display || "Project"}
        </p>
        <p className="text-gray-900 text-md xxs:text-lg font-semibold pt-1 mb-3">
          {data?.project_title}
        </p>
        <p
          style={{ lineHeight: "20px", letterSpacing: "0%" }}
          className="text-gray-600 text-xs xxs:text-[14px] text-wrap"
        >
          {data?.project_description}
        </p>
        <div className="flex gap-2 mt-3">
          {data?.github_link && (
            <a
              href={data.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              GitHub
            </a>
          )}
          {data?.live_demo && (
            <a
              href={data.live_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
            >
              Live Demo
            </a>
          )}
        </div>
        <a
          href={data?.live_demo || "#!"}
          className="btn hover:border-picto-primary hover:text-picto-primary bg-white text-sm xs:text-[16px] font-semibold hover:gap-3 xs:hover:gap-4 transition-all duration-300 mt-5 xs:py-5.75 px-6 max-sm:w-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          Case Study
          <span className="ms-1 xs:ms-3">
            <FontAwesomeIcon icon={faArrowRight} size="l" className="" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Projects;