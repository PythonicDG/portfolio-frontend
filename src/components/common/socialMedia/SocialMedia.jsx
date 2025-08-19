import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const iconMap = {
  Instagram: faInstagram,
  Linkdin: faLinkedin,
  Github: faGithub,
};

const SocialMedia = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const homeMenu = data.find((menu) => menu.title === "Home");
        if (homeMenu && homeMenu.sections.length > 0) {
          const contents = homeMenu.sections[0].contents || [];
          // Only use Github, Linkdin, Instagram
          const filtered = contents.filter(item =>
            ["Github", "Linkdin", "Instagram"].includes(item.project_title)
          );
          setSocialLinks(filtered);
        }
      })
      .catch((err) => console.error("Failed to fetch social media links:", err));
  }, []);

  return socialLinks.map((item) => (
    <a
      href={item.project_description}
      className="text-picto-primary hover:bg-picto-primary p-2 pt-3 xs:p-2.5 xs:pt-3.75 sm:pt-4 md:pt-5 sm:p-3 md:p-3.75 hover:text-white rounded-md"
      key={item.id}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={iconMap[item.project_title]}
        className="text-xl w-4.5 aspect-square"
      />
    </a>
  ));
};

export default SocialMedia;