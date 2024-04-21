import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({
    _id: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER",
  });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    console.log(profile);
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate() + 1).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h1>Profile</h1>
      <br />
      <Link to="/Kanbas/Account/Admin/Users" className="btn btn-warning w-25">
        Users
      </Link>
      <br />
      <br />
      {profile && (
        <div>
          <input
            value={profile.username}
            className="form-control w-25"
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            value={profile.password}
            className="form-control w-25"
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            value={profile.firstName}
            className="form-control w-25"
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            value={profile.lastName}
            className="form-control w-25"
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            value={formatDate(profile.dob)}
            className="form-control w-25"
            type="date"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <input
            value={profile.email}
            className="form-control w-25"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control w-25"
            value={[profile.role]}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
      <br />
      <button className="btn btn-primary w-25" onClick={save}>
        Save
      </button>
      <br />
      <br />
      <button className="btn btn-danger w-25" onClick={signout}>
        Signout
      </button>
    </div>
  );
}
