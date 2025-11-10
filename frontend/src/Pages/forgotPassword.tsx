import React, { useState } from "react";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error al enviar correo");

      setMensaje(data.message || "Correo de recuperación enviado correctamente.");
    } catch (err: any) {
      setError(err.message || "Error de conexión con el servidor.");
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
          Recuperar contraseña
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email"
            placeholder="Ingresa tu correo"
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
            Enviar enlace de recuperación
          </button>
        </form>

        {mensaje && (
          <p style={{ color: "green", textAlign: "center", marginTop: "1rem" }}>{mensaje}</p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "1rem" }}>{error}</p>
        )}

        <p style={{ marginTop: "1rem", textAlign: "center", color: "#555" }}>
          <a
            href="/"
            style={{
              color: "#2575fc",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Volver al inicio de sesión
          </a>
        </p>
      </div>
    </div>
  );
}
