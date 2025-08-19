import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../common/socialMedia/SocialMedia";

const iconMap = {
  Address: faLocationDot,
  "My Email:": faEnvelope,
  "Call Me Now": faPhone,
};

const Contact = () => {
  const [section, setSection] = useState(null);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        const contactMenu = data.find((menu) => menu.title === "Contact");
        if (contactMenu && contactMenu.sections.length > 0) {
          setSection(contactMenu.sections[0]);
        }
      })
      .catch((err) => console.error("Failed to fetch contact section:", err));
  }, []);

  if (!section) {
    return <div>Loading...</div>;
  }

  // Prepare address data from API
  const addressData =
    section.contents?.map((item) => ({
      icon: iconMap[item.project_title] || faLocationDot,
      title: item.project_title,
      description: item.project_description,
    })) || [];

  return (
    <div className="relative -bottom-15 -mt-15 z-10 px-2">
      <div
        className="content p-4 md:p-10 lg:p-22 bg-white rounded-2xl shadow-[0px_0px_90px_9px_rgba(0,_0,_0,_0.1)]"
        id="contact"
      >
        <div className="flex flex-col-reverse lg:gap-5 xl:gap-25.75 lg:flex-row justify-between">
          <div>
            <div>
              <p className="text-[35px] max-lg:hidden font-semibold text-nowrap text-[#132238]">
                {section.title}
              </p>
              <p className="text-[12px] xs:text-[14px] sm:text-lg md:text-lg max-lg:text-center pt-4 font-normal text-soft-dark">
                {section.description}
              </p>
            </div>
            <div className="my-8.75 sm:max-lg:flex justify-between items-center">
              {addressData.map((item, index) => (
                <Address item={item} key={index} />
              ))}
            </div>
            <div className="w-full max-lg:text-center max-md:mb-4">
              <SocialMedia />
            </div>
          </div>
          <div className="w-full overflow-y-scroll py-6.5">
            <p className="text-xl mb-2 xs:text-2xl sm:text-2xl md:text-[38px] font-semibold text-[#132238] lg:hidden text-center">
              {section.title}
            </p>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;