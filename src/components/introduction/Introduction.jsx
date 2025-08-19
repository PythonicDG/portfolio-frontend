import { useEffect, useState } from "react";
import "./introduction.css";

const Introduction = () => {
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const homeMenu = data.find((menu) => menu.title === "Home");
        if (homeMenu && homeMenu.sections.length > 0) {
          setSection(homeMenu.sections[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch introduction section:", err));
  }, []);

  if (!section) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4"
      id="home" // <-- This must match the navbar link!
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center">
        <div className="pt-13 me-31.5 w-full lg:w-auto transition-all duration-500">
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full">
            Hello, I’m
            <span className="text-nowrap shrink-0 inline-block w-full">
              {section.title}
            </span>
          </p>
          <p className="text-xs xxs:text-lg lg:text-[18px] my-6">
            {section.sub_title && (
              <span className="bg-highlight">{section.sub_title}</span>
            )}{" "}
            {section.description}
          </p>
          <p className="text-center lg:text-start">
            <a
              className="btn-primary btn btn-xs xxs:btn-lg text-white"
              href="mailto:example@gmail.com"
            >
              Say Hello!
            </a>
          </p>
        </div>
        <div className="mx-auto lg:mx-0 relative">
          {/* Add any summary or extra content here if needed */}
        </div>
      </div>
      <div
        className={`max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        <img
          className={`shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl`}
          src={section.image ? `https://portfolio-dipak.strangled.net/${section.image}` : ""}
          alt="person"
        />
      </div>
    </div>
  );
};

export default Introduction;