import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";

const copyrightYear = new Date().getFullYear();

const Footer = () => {
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => {
        // Use menu titles for navigation
        setNavItems(data.map((menu) => ({
          id: menu.id,
          name: menu.title,
          url: menu.title.replace(/\s+/g, "-").toLowerCase()
        })));
      })
      .catch((err) => console.error("Failed to fetch footer nav items:", err));
  }, []);

  return (
    <div className="pt-25 md:pt-40 content max-2xl:px-3">
      <div className="flex max-md:flex-col justify-between mx-0 items-center h-full w-full text-neutral-200">
        <a href="#" className="flex items-center border-0">
          <img src={logo} className="h-8 sm:h-14 rounded-2xl" alt="logo" />
          <p className="text-3xl sm:text-[32px] my-auto ms-[12px] font-semibold">
            Dipak
          </p>
        </a>
        <div className="mx-7 max-md:my-7 text-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              className="mx-2 group inline-block relative w-fit text-[12px] sm:text-[16px]"
              href={`#${item.url}`}
            >
              {item.name}
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white scale-x-0 duration-300 group-hover:scale-x-100"></span>
            </a>
          ))}
        </div>
        <p className="text-[12px] sm:text-[16px]">
          Copyright &copy; {copyrightYear}.
        </p>
      </div>
      <p className="text-white text-center max-xs:text-[12px] max-md:text-[14px] w-full py-10">
        Developed with ❤️ by{" "}
        <a
          href="https://github.com/PythonicDG"
          className="underline font-bold"
          target="_blank"
        >
          DipakGaikwad
        </a>
      </p>
    </div>
  );
};

export default Footer;