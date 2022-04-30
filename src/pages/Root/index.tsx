import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import DashBoard from "../Dashboard";
import RequireAuth from "./Authentication/RequireAuth";

interface RootProps {}
const Root: FC<RootProps> = (props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <DashBoard />
          </RequireAuth>
        }
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Root;
