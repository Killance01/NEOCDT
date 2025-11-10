import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Cliente");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombreUsuario, nombreCompleto, correo, contrasena, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error en registro");
        return;
      }

      alert("Registro exitoso");
      navigate("/"); 
    } catch (err: any) {
      setError(err.message || "Error en el servidor");
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
          Registro
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
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
            type="text"
            placeholder="Nombre completo"
            value={nombreCompleto}
            onChange={(e) => setNombreCompleto(e.target.value)}
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
          <select
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
            style={{
              marginTop: "0.75rem",
              padding: "0.75rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "1rem",
              backgroundColor: "white",
            }}
          >
            <option value="Cliente">Cliente</option>
            <option value="Agente">Agente</option>
            <option value="Admin">Administrador</option>
          </select>

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
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: "1rem", textAlign: "center", color: "#555" }}>
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => navigate("/")}
            style={{
              color: "#2575fc",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
