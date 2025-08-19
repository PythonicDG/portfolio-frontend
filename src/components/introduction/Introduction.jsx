import { useEffect, useState } from "react";
import "./introduction.css";

const InformationSummary = ({ item }) => {
  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 text-center rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
      <div className="w-auto h-auto mx-2 sm:mx-4 my-5 xxs:my-5 sm:my-6 p-4">
        <p className="text-lg xxs:text-xl sm:text-3xl font-bold text-purple-800 animate-pulse">
          {item.description}
        </p>
        <p className="text-xs xxs:text-sm sm:text-base font-normal px-4 text-wrap text-purple-600 mt-2">
          {item.title}
        </p>
      </div>
    </div>
  );
};

const Introduction = () => {
  const [section, setSection] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const homeMenu = data.find((menu) => menu.title === "Home");
        if (homeMenu && homeMenu.sections.length > 0) {
          setSection(homeMenu.sections[0]);
          // Trigger animations after data is loaded
          setTimeout(() => setIsVisible(true), 100);
        }
      })
      .catch((err) => console.error("Failed to fetch introduction section:", err));
  }, []);

  if (!section) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div
      className="flex max-lg:flex-col-reverse justify-between pt-10 lg:pt-20 lg:mb-20 max-xl:gap-8 p-4 max-xxl:px-6 bg-gradient-to-b from-white to-purple-50 min-h-screen"
      id="home"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center max-lg:items-center">
        <div className={`pt-8 lg:pt-13 lg:me-20 w-full lg:w-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-4xl xxs:text-5xl sm:max-xl:text-6xl xl:text-7xl font-bold w-full text-gray-800">
            Hello, I'm
          </p>
          <p className="text-4xl xxs:text-5xl sm:max-xl:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            {section.title}
          </p>
          
          <p className="text-base xxs:text-lg lg:text-xl my-8 text-gray-600 leading-relaxed">
            {section.sub_title && (
              <span className="bg-highlight text-purple-800 font-medium">{section.sub_title}</span>
            )}{" "}
            {section.description}
          </p>
          
          <div className={`text-center lg:text-start transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a
              className="btn-primary inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl animate-bounce-slow"
              href="mailto:example@gmail.com"
            >
              Say Hello!
            </a>
          </div>
        </div>
        
        <div className="mx-auto lg:mx-0 relative mt-10">
          <InformationSummary item={{description: "5+", title: "Years of Experience"}} />
        </div>
      </div>
      
      <div className={`max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
        <img
          className="shadow-2xl shadow-purple-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl z-10 transform transition-all duration-500 hover:scale-105"
          src={section.image ? `https://portfolio-dipak.strangled.net${section.image}` : ""}
          alt="person"
        />
      </div>
    </div>
  );
};

export default Introduction;