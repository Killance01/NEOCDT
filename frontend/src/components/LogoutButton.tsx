import React from "react";

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Has cerrado sesión.");
    window.location.href = "/"; 
  };

  return (
    <button className="btn btn--ghost" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
