import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-scroll";

const handleMenuClick = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const NavBar = () => {
  const [position, setPosition] = useState(0);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-dipak.strangled.net/frontend/portfolio")
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => console.error("Failed to fetch menu data:", err));
  }, []);

  // Separate menu items and button items
  const menuItems = menus
    .filter((item) => !item.is_button)
    .map((item) => (
      <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
        <Link
          onClick={handleMenuClick}
          to={item.title.replace(/\s+/g, "-").toLowerCase()}
          smooth={true}
          duration={1000}
          spy={true}
          offset={-140}
          activeStyle={{
            backgroundColor: "#9929fb",
            color: "white",
          }}
          className={`hover:text-picto-primary px-5 py-3 mx-1`}
        >
          {item.title}
        </Link>
      </li>
    ));

  const buttonItems = menus
    .filter((item) => item.is_button)
    .map((item) => (
      <Link
        key={item.id}
        className="btn btn-sm xs:btn-md sm:btn-lg btn-primary"
        to={item.title.replace(/\s+/g, "-").toLowerCase()}
        smooth={true}
        duration={900}
      >
        {item.title}
      </Link>
    ));

  return (
    <div
      className={`sticky top-0 ${
        position > 50
          ? "bg-soft-white border-b border-gray-300"
          : "bg-white border-white"
      } z-50 transition-all duration-1000`}
    >
      <div className="navbar flex justify-between mx-auto content">
        <div className="flex items-center justify-between">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-lg dropdown-content rounded-box z-1 mt-3 w-lvw p-2 shadow font-semibold flex-nowrap bg-white text-black`}
            >
              {menuItems}
              {buttonItems.length > 0 && (
                <li className="mt-2">{buttonItems}</li>
              )}
            </ul>
          </div>

          <Link
            to="home"
            smooth={true}
            duration={900}
            className="flex items-center border-0 lg:max-xxl:ps-5"
          >
            <img src={logo} className="h-8 sm:h-14 rounded-2xl" alt="logo" />
            <p className="text-2xl sm:text-[32px] my-auto ms-[12px] font-semibold">
              Dipak
            </p>
          </Link>
        </div>

        <div className="lg:flex items-center">
          <ul className="hidden lg:flex menu menu-horizontal text-[16px] font-medium md:shrink-0">
            {menuItems}
          </ul>
          <p className="ms-2">
            {buttonItems}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;