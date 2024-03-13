import { useState } from "react";
import logo from "../../assets/logo.png";
import { IoMdMenu } from "react-icons/io";
import Sidebar from "../sidebar/Sidebar";
import { AiOutlineLogout } from "react-icons/ai";
import SidebarMenuData from "../../data/SideBarMenu";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export default function HeaderComponent() {
  const name = JSON.parse(localStorage.getItem("user"))?.Username;
  const menu = SidebarMenuData;

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <header className="auth__header w-full z-50 top-0 left-0 px-7 py-4 border-b border-gray-200 ">
        <div className="auth__header__inner lg:flex hidden  justify-end items-center  ">
          <div className="auth__header__actions flex justify-center items-center">
            <div className="notifications flex justify-center w-20">
              <svg
                className="w-6 h-6 text-gray-800  transition-transform transform hover:rotate-12 hover:text-green-800 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 5.4V3m0 2.4a5.3 5.3 0 0 1 5.1 5.3v1.8c0 2.4 1.9 3 1.9 4.2 0 .6 0 1.3-.5 1.3h-13c-.5 0-.5-.7-.5-1.3 0-1.2 1.9-1.8 1.9-4.2v-1.8A5.3 5.3 0 0 1 12 5.4ZM8.7 18c.1.9.3 1.5 1 2.1a3.5 3.5 0 0 0 4.6 0c.7-.6 1.3-1.2 1.4-2.1h-7Z"
                />
              </svg>
            </div>

            <div className="profile flex items-center justify-center  ">
              <div
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className=" py-2 text-green-900 focus:ring-green-500 bg-transparent font-medium rounded text-sm px-5 text-center inline-flex items-center "
                type="button"
              >
                <span className="mr-3">
                  <svg
                    className="w-6 h-6 text-gray-800"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a9 9 0 0 0 5-1.5 4 4 0 0 0-4-3.5h-2a4 4 0 0 0-4 3.5 9 9 0 0 0 5 1.5Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
                <span className="profile__user">{name} </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div  className="flex  justify-between ">
          <div className=" bg-white lg:hidden flex ">
            <img src={logo} alt="plaintiffaid logo" className="w-full h-10 " />
          </div>

          <div className="lg:hidden flex">
            {" "}
            {!open ? (
              <IoMdMenu size={20} onClick={handleToggle} />
            ) : (
              <RxCross2 onClick={handleToggle}  />
            )}
          </div>
        </div>
      </header>
      {open && (
        <div className="w-full h-screen  top-10 z-30 bottom-0 fixed ">
          <div className=" sidebar__menu__container rounded-tr-[40px] mt-7 h-full pt-4  bg-blue-900">
            <div className="container">
              <ul className="mb-6 flex flex-col justify-center  w-full ">
                {menu.map((menuItem) => (
                  <li
                    key={menuItem.id}
                    className="text-white "
                    style={{
                      color:
                        location.pathname === menuItem.path
                          ? "#55dbcb"
                          : "#ffffff",
                    }}
                  >
                    <NavLink
                      to={menuItem.path}
                      className="group relative cursor-pointer flex items-center  gap-3 rounded-sm py-2 px-3 text-[15px]  w-full  capitalize whitespace-nowrap h-10  duration-300 ease-in-out hover:bg-[white] hover:text-blue-900"
                    >
                      {menuItem.icon}
                      {menuItem.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="cursor-pointer flex items-center  gap-4 rounded-sm py-2 px-7 text-[15px]  w-full  capitalize ">
                <AiOutlineLogout
                  style={{ fontSize: "20px" }}
                  className="text-white"
                />
                <p className="text-white">Log Out</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
