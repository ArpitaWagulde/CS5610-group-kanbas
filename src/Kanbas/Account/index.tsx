import React, { useState, useEffect } from "react";
import Signin from "../../Users/Signin";
import Profile from "../../Users/Profile";
import UserTable from "../../Users/Table";
import { Routes, Route, Navigate } from "react-router-dom";
import * as client from "../../Users/client";
export default function Account() {
  const [isAccountExist, setIsAccountExist] = useState<boolean>(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const account = await client.profile();
        setIsAccountExist(!!account);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="container-fluid">
      <Routes>
        {isAccountExist ? (
          <Route path="/" element={<Navigate to="/Kanbas/Account/Profile" />} />
        ) : (
          <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
        )}
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Admin/Users" element={<UserTable />} />
      </Routes>
    </div>
  );
}
