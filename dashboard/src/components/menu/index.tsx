import {useLogout, useMenu} from "@refinedev/core";
import {NavLink} from "react-router";
import {CircleX, LogOut} from "lucide-react";
import React, {useEffect, useRef} from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const Menu: React.FC<Props> = ({isOpen, onClose}) => {
  const { menuItems } = useMenu();
  const {mutate: logout} = useLogout()
  const nav = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const outSideClickHandler = (e: MouseEvent) => {
            if( window.innerWidth < 767 && isOpen && nav.current && !nav.current.contains(e.target as Node)) {
                onClose()
            }
        }

        window.addEventListener("mousedown", outSideClickHandler)

        return () => window.removeEventListener("mousedown", outSideClickHandler)
    }, [onClose, isOpen]);

  return (
      <div ref={nav} className={`absolute ${!isOpen ? "-left-[251px]" : "left-0"} z-50 transition-all duration-300 shadow-xl md:relative border-r-[1px]`}>
          <nav className="menu flex flex-col gap-4 bg-[#002454] text-white h-screen w-[250px]">
              <div>
                  <div className={"flex items-center gap-3"}>
                      <img className={"size-[54px]"} src={"/img.png"} alt="logo"/>
                      <h1>PassRate</h1>
                      <CircleX className={"block md:hidden size-[32px] cursor-pointer"} onClick={onClose}/>
                  </div>
              </div>
              <div className={" flex flex-col justify-between remove-scroll h-full"}>
                  <ul className={"flex flex-col gap-1 list-none w-full !pl-0 remove-scroll"}>
                      {menuItems.map((item) => {const isActive = location.pathname === item.route;
                          return <li key={item.key} className={`border transition-all group duration-100 border-transparent hover:border-[#24A584] ${isActive ? "border-[#24A584]" : "border-transparent"} px-5`}>
                              <NavLink to={item.route ?? "/"} className={`no-underline group-hover:!text-[#24A584] ${!isActive ? "!text-white ": "!text-[#24A584]"} size-4 font-[400] p-5`}>
                                  <div className={"flex gap-4"}>
                                      <div className={"size-[16px]"}>
                                          {item.icon}
                                      </div>
                                      <div className={"line-clamp-1"}>
                                          {item.label}
                                      </div>
                                  </div>
                              </NavLink>
                          </li>
                      })}
                  </ul>
                  <div className={" relative bottom-0 transition-all duration-100 border-[#24A584] p-5"}>
                      <a  className={`no-underline !text-white size-4 font-[400] cursor-pointer`}>
                          <div className={"flex gap-4"} onClick={() => logout()}>
                              <div className={"size-[16px]"}>
                                  <LogOut />
                              </div>
                              <div className={"line-clamp-1"}>
                                  Logout
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </nav>
      </div>
  );
};
