"use client";
import React, { useState } from "react";
import ConvoIcon from "@/assets/images/HeroSectionImages/ConvoSvg.svg";
import Image from "next/image";
import Link from "next/link";
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { useUserStore } from "@/store/userStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#rules", label: "Rules" },
  { href: "#timeline", label: "Timeline" },
  { href: "#judges", label: "Judges" },
  { href: "#prizes", label: "Prizes" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
];
interface EventNavbarProps {
  navTheme: string; 
}

const EventNavbar: React.FC<EventNavbarProps>  = ({navTheme}) => {
    const { isLogged} = useUserStore();
  
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const toggleNavigation = (): void => {
    setIsNavOpen((prevState) => !prevState);
  };

  return (
    <div className="top-0 fixed left-0 right-0 bg-black/10 backdrop-filter  backdrop-blur-md text-white  z-[999]">
      {/* ------for large screens -------------------- */}
      <div className="hidden py-4 maxWidthForSections w-full md:flex justify-between items-center px-4">
        {/* Logo */}
        <Link href='/'>
          <Image
            src={ConvoIcon}
            alt="convo logo"
            className="object-cover h-12 w-auto"
          />
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-x-6 text-lg">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------for mobile screens----------------------- */}
      <div className="maxWidthForSections py-[10px] w-full md:hidden flex justify-between items-center px-4 ">
        {/* Logo */}
        <Link href="/">
          <Image
            src={ConvoIcon}
            alt="convo logo"
            className="object-cover h-12 w-auto"
          />
        </Link>
        <IoMenuOutline className="size-8" onClick={toggleNavigation} />

        {/* ---------------opn n close nav------------ */}
        <div
          className={`${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300    fixed flex justify-end  top-0 right-0 w-full h-screen`}
          onClick={toggleNavigation}
        >
          <div
            className={`h-full w-2/3 sm:w-full sm:max-w-[350px] flex flex-col ${navTheme}  items-end justify-start py-6 px-4`}
            onClick={toggleNavigation}
          >
            <IoClose
              className={`close-itemMobile text-inherit  ${
                isNavOpen ? "icon-is-visible" : "icon-is-hidden"
              } hover:text-[#ec4899] size-8 `}
              onClick={toggleNavigation}
              style={{ "--i-nav": 0.5 } as React.CSSProperties}
            />

            <ul
              className={` flex flex-col items-center gap-y-6 text-lg w-full mt-6`}
            >
              {navItems.map((item, index) => (
                <li
                  onClick={toggleNavigation}
                  key={index}
                  className={`nav-itemMobile nav-item ${
                    isNavOpen ? "is-visible" : "is-hidden"
                  }`}
                  style={{ "--i-nav": index + 1 } as React.CSSProperties}
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            {/* ----------------------login / profile/ register button --------------- */}
            {isLogged && (
              <div className= {`navButtonAuth w-full mt-4 text-lg font-semibold text-center ${
                isNavOpen ? "is-visible" : "is-hidden"
              }`}>
                <Link href="/profile">
                  <p>Profile</p>
                </Link>
              </div>
            )}
            {!isLogged && (
              <>
              <div className= {`navButtonAuth w-full bg-white/10 border-[1px] border-white py-[5px] rounded-full mt-4  font-semibold text-center ${
                isNavOpen ? "is-visible" : "is-hidden"
              }`} >
                <Link href="/register">
                  Register
                </Link>
              </div>
              <div className= {`navButtonAuth w-full bg-white text-black/80 py-[5px] rounded-full mt-2  font-semibold text-center ${
                isNavOpen ? "is-visible" : "is-hidden"
              }`} >
                <Link href="/login">
                  Login
                </Link>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventNavbar;
