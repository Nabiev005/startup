import { Route, Routes } from "react-router-dom";
import { Landing } from "../pages/Landing/Landing";
import Login from "../pages/Landing/Login";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
