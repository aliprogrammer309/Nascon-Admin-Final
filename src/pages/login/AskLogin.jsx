import "./login.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

const AskLogin = () => {
  const navigate = useNavigate();
  const handleSuperAdmin = () => {
    navigate("/login");
  };

  const handleEventsAdmin = () => {
    navigate("/eventAdminLogin");
  };

  const handleFinanceAdmin = () => {
    navigate("/financeAdminLogin");
  };

  const handleBlogAdmin = () => {
    navigate("/blogAdminLogin");
  };

  return (
    <div className="ask-login-main">
      <div className="ask-login-container">
        <button onClick={handleSuperAdmin}>Super Admin</button>
        <button onClick={handleEventsAdmin}>Events Admin</button>
        <button onClick={handleFinanceAdmin}>Finance Admin</button>
        <button onClick={handleBlogAdmin}>Blogs Admin</button>
      </div>
    </div>
  );
};

export default AskLogin;
