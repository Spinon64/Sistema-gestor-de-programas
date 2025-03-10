import React, { useState } from "react";
import LogoEduc from "../../assets/logo_educ.png";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const NavBar = () => {
  const [active, setActive] = useState("Inicio"); // Estado inicial de la navbar con Inicio activo

  return (
    <Disclosure>
      {({ open }) => (
        // Si la NavBar esta abierta en el menu de hamburguesa toma una clase y cuando esta cerada toma otra
        <nav
          className={`bg-(--nav-color) ${
            open ? "h-auto pb-4" : "h-[67px]"
          } flex flex-col md:flex-row justify-between items-center px-8 text-white font-thin text-[20px] transition-all duration-300`}
        >
          {/* Logo */}
          <div className="flex w-full md:w-auto justify-between items-center">
            <img src={LogoEduc} alt="Logo" className="h-[46px] w-[129px]" />

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
            {["Inicio", "Ayuda", "Contacto"].map((item) => (
              <a
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer ${
                  active === item
                    ? "underline underline-offset-8 font-normal"
                    : ""
                }`}
              >
                {item}
              </a>
            ))}
            <button className="border border-white rounded-4xl px-7 py-1">
              Acceder
            </button>
          </div>

          {/* Menú Hamburguesa (Mobile) */}
          <DisclosurePanel className="w-full md:hidden flex flex-col items-center space-y-4 mt-4">
            {["Inicio", "Ayuda", "Contacto"].map((item) => (
              <a
                key={item}
                onClick={() => setActive(item)}
                className={`cursor-pointer ${
                  active === item
                    ? "underline underline-offset-8 font-normal"
                    : ""
                }`}
              >
                {item}
              </a>
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
