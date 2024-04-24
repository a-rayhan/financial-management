import React from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signedOutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignedOut = async () => {
    try {
      const res = await fetch("https://api-taupe-delta.vercel.app/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signedOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="">
      <Navbar className="max-w-6xl mx-auto">
        {currentUser && (
          <Link to="/" className="flex items-center gap-x-3 h-20">
            <h1 className="font-inter text-2xl font-bold hidden md:inline">
              Digitalexpense
            </h1>
          </Link>
        )}

        <div className="flex items-center gap-x-2 md:gap-x-5">
          {currentUser && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="user" img={currentUser.profilePicture} rounded />
              }
            >
              <Link to={"/dashboard?tab=profile"}>
                <Dropdown.Item className="text-base font-medium font-inter">
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Divider />

              <Dropdown.Item
                onClick={handleSignedOut}
                className="text-base font-medium font-inter"
              >
                Sign out
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Header>
                <span className="block font-inter">{currentUser.username}</span>
                <span className="block font-inter truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
            </Dropdown>
          )}

          <Navbar.Toggle className="bg-gray-100" />
        </div>
      </Navbar>
    </div>
  );
}
