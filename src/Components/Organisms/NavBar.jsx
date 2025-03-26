import React from "react";
import LogoEduc from "../../assets/logo_educ.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation(); // Obtiene la ruta actual

  // Definir los enlaces de la navbar con sus rutas asociadas
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Ayuda", path: "/ayuda" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <Disclosure>
      {({ open }) => (
        <nav
          className={`bg-(--nav-color) ${
            open ? "h-auto pb-4" : "h-[67px]"
          } flex flex-col md:flex-row justify-between items-center px-8 text-white font-thin text-[20px] transition-all duration-300`}
        >
          {/* Logo */}
          <div className="flex w-full md:w-auto justify-between items-center">
            <Link to="/">
              <img src={LogoEduc} alt="Logo" className="h-[46px] w-[129px]" />
            </Link>

            {/* Botón de menú hamburguesa (visible solo en mobile) */}
            <DisclosureButton className="md:hidden focus:outline-none">
              {open ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </DisclosureButton>
          </div>

          {/* Navbar en Desktop */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`cursor-pointer ${
                  location.pathname === link.path
                    ? "underline underline-offset-8 font-normal"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="border border-white rounded-4xl px-7 py-1">
              Acceder
            </button>
          </div>

          {/* Menú Hamburguesa (Mobile) */}
          <DisclosurePanel className="w-full md:hidden flex flex-col items-center space-y-4 mt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`cursor-pointer ${
                  location.pathname === link.path
                    ? "underline underline-offset-8 font-normal"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button className="border border-white rounded-4xl px-7 py-1">
              Acceder
            </button>
          </DisclosurePanel>
        </nav>
      )}
    </Disclosure>
  );
};

export default NavBar;
