import { useEffect, useState } from "react";
import Projects from "./Projects";

const Portfolio = () => {
  const [portfolioSection, setPortfolioSection] = useState(null);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        // Find the "Portfolio" menu and its first section
        const portfolioMenu = data.find((menu) => menu.title === "Portfolio");
        if (portfolioMenu && portfolioMenu.sections.length > 0) {
          setPortfolioSection(portfolioMenu.sections[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch portfolio section:", err));
  }, []);

  if (!portfolioSection) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2"
      id="portfolio"
    >
      <div className="xl:mb-17.5 mb-5">
        <div className="max-sm:px-2 text-center mx-auto max-w-144.25">
          <p className="section-title ">{portfolioSection.title}</p>
          <p className="font-normal text-[18px] max-sm:text-[14px] pt-6 text-gray-400">
            {portfolioSection.description}
          </p>
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
          {portfolioSection.contents.map((data, index) => (
            <Projects data={data} key={index} />
          ))}
        </div>
      </div>
      <div className="text-center">
        <a
          href="#!"
          className="btn btn-primary py-3 px-6 mt-12.5 text-center text-[16px] font-semibold"
        >
          More Project
        </a>
      </div>
    </div>
  );
};

export default Portfolio;