import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCDT, getCDTs, updateCDT } from "../api";

export default function CDTForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [monto, setMonto] = useState("");
  const [plazo, setPlazo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No hay token de sesión. Inicia sesión nuevamente.");
        return;
      }

      // Cargar datos del CDT
      getCDTs(token).then(cdts => {
        const cdt = cdts.find((c: any) => c._id === id);
        if (cdt) {
          setMonto(cdt.monto.toString());
          setPlazo(cdt.plazo.toString());
        }
      }).catch(err => {
        setError("Error al cargar el CDT");
      });
    }
  }, [id]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  const token = localStorage.getItem("token");
  if (!token) {
    setError("No hay token de sesión. Inicia sesión nuevamente.");
    return;
  }

  try {
    if (isEditing) {
      await updateCDT(token, id!, { monto: Number(monto), plazo: Number(plazo) });
    } else {
      await createCDT(token, { monto: Number(monto), plazo: Number(plazo) });
    }
    navigate("/cdts");
  } catch (err: any) {
    setError(err.message || "Error al guardar CDT");
  }
};

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h1>{isEditing ? "Editar CDT" : "Nuevo CDT"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="number"
          placeholder="Plazo (días)"
          value={plazo}
          onChange={(e) => setPlazo(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ width: "100%", padding: "0.5rem" }}>
          {isEditing ? "Guardar Cambios" : "Abrir CDT"}
        </button>
      </form>
    </div>
  );
}




