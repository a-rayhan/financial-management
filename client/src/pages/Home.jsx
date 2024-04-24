import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? (
    <div>
      Home
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/sign-in"} />
  );
}
