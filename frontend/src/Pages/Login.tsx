import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      const data: any = await res.json();
      console.log("login response:", data); // DEBUG: inspeccionar payload devuelto por el backend

      // Guardar token y rol
      localStorage.setItem("token", data.token);
      if (data.rol) localStorage.setItem("rol", data.rol);
      if (data.nombreUsuario) localStorage.setItem("nombreUsuario", data.nombreUsuario);

      // Redirigir según rol
      const rol = (data.rol || "").toString().toLowerCase();
      if (rol === "agente") {
          navigate("/agente/dashboard");
      } else if (rol === "admin" || rol === "administrador") {
          navigate("/admin/dashboard");
      } else {
          navigate("/cdts");
      }
    } catch (err: any) {
      setError(err.message || "Error de conexión");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          width: "350px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#2575fc" }}>
          NEOCDT
        </h1>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
          Iniciar sesión
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
            }}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
            }}
          />
          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button
            type="submit"
            style={{
              padding: "0.75rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#2575fc",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1a5ed6")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2575fc")}
          >
            Iniciar sesión
          </button>
        </form>

        {/* 🔹 Botón de recuperación de contraseña */}
        <p style={{ marginTop: "1rem", textAlign: "center", color: "#555" }}>
          <button
            onClick={() => navigate("/forgot-password")}
            style={{
              color: "#2575fc",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </p>

        <p style={{ marginTop: "0.5rem", textAlign: "center", color: "#555" }}>
          ¿No tienes cuenta?{" "}
          <button
            onClick={() => navigate("/registro")}
            style={{
              color: "#2575fc",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
