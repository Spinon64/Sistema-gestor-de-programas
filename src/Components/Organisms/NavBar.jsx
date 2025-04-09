import React, { useState, useEffect } from "react";
import LogoEduc from "../../assets/logo_educ.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para añadir una sombra cuando bajamos
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enlaces de navegación
  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Ayuda", path: "/ayuda" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <Disclosure
      as="nav"
      className={`bg-[var(--nav-color)] ${
        scrolled ? "shadow-md" : ""
      } transition-all duration-300`}
    >
      {({ open }) => (
        <>
          <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo y botón de menú */}
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0">
                  <img
                    src={LogoEduc}
                    alt="Logo"
                    className="h-[46px] w-[129px]"
                  />
                </Link>
              </div>

              {/* Enlaces versión desktop */}
              <div className="hidden md:flex items-center space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-white font-thin text-[20px] hover:text-gray-200 px-2 py-1 transition-all ${
                      location.pathname === link.path
                        ? "underline underline-offset-8 font-normal"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button className="border border-white rounded-full px-7 py-1 text-white font-thin text-[20px] hover:bg-white hover:text-[var(--nav-color)] transition-all">
                  Acceder
                </button>
              </div>

              {/* Botón menú móvil */}
              <div className="flex items-center md:hidden">
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none transition-all">
                  <span className="sr-only">Abrir menú principal</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Menú móvil */}
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-150 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <DisclosurePanel className="md:hidden border-t border-white/20">
              <div className="px-4 pt-2 pb-4 space-y-2 flex flex-col items-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block text-center w-full py-3 text-white font-thin text-[20px] ${
                      location.pathname === link.path
                        ? "underline underline-offset-8 font-normal"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button className="my-2 border border-white rounded-full px-7 py-1 w-32 text-white font-thin text-[20px] hover:bg-white hover:text-[var(--nav-color)] transition-all">
                  Acceder
                </button>
              </div>
            </DisclosurePanel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
