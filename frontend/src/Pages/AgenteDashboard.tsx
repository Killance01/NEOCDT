// AgenteDashboard.tsx
import React, { useEffect, useState } from 'react';
import LogoutButton from '../components/LogoutButton';

const css = `
:root{
  --brand:#e11d2e;
  --brand-dark:#c01222;
  --ink:#111827;
  --muted:#6b7280;
  --bg:#f7f8fa;
  --card:#ffffff;
  --ring:#eef0f3;
  --ok:#059669;
  --ok-dark:#047857;
  --bad:#dc2626;
}
*{box-sizing:border-box}
html,body,#root,.app{height:100%}
body{margin:0;color:var(--ink);background:var(--bg);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif}
a{text-decoration:none;color:inherit}
.wrap{max-width:1120px;margin:0 auto;padding:0 16px}
.topbar{background:#000;color:#fff}
.topbar__content{display:flex;gap:24px;justify-content:flex-end;align-items:center;padding:8px 0}
.nav{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
.brand{display:flex;align-items:center;gap:10px}
.brand__dot{height:36px;width:36px;border-radius:999px;background:var(--brand);color:#fff;display:grid;place-items:center;font-weight:800}
.brand__text{font-size:22px;font-weight:800;letter-spacing:-.02em}
.navlink{color:#374151;font-weight:600}
.navlink:hover{color:var(--brand)}
.nav__actions{display:flex;gap:10px}
.btn{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 18px;border-radius:999px;font-weight:700;border:1px solid transparent;transition:.15s;cursor:pointer}
.btn--primary{background:var(--brand);color:#fff}
.btn--primary:hover{background:var(--brand-dark)}
.btn--ghost{border-color:#111;color:#111;background:#fff}
.btn--ghost:hover{background:#f3f4f6}
.btn--success{background:var(--ok);color:#fff;border-color:var(--ok)}
.btn--success:hover{background:var(--ok-dark)}
.btn--danger{background:var(--bad);color:#fff;border-color:var(--bad)}
.btn--danger:hover{background:#b91c1c}
.wfull{width:100%}
.main{padding:32px 0}
.card{background:var(--card);border:1px solid var(--ring);border-radius:16px;box-shadow:0 6px 18px rgba(0,0,0,.04)}
.card__head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border-bottom:1px solid var(--ring)}
.title{margin:0;font-size:28px;letter-spacing:-.02em}
.card__body{padding:20px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
@media (max-width:720px){.grid{grid-template-columns:1fr}}
.cdt{border:1px solid var(--ring);border-radius:14px;padding:14px;background:#fff;transition:box-shadow .15s}
.cdt:hover{box-shadow:0 8px 22px rgba(0,0,0,.06)}
.big{font-weight:700;font-size:18px}
.muted{color:var(--muted);font-size:13px}
.status{font-weight:800}
.status--ok{color:var(--ok)}
.status--bad{color:var(--bad)}
.status--neutral{color:#374151}
.empty{border:1px dashed #cfd6dd;background:#f9fafb;border-radius:14px;padding:28px;text-align:center}
.empty h3{margin:0 0 6px;font-size:20px}
.empty p{margin:0 0 16px;color:var(--muted)}
.modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);display:flex;justify-content:center;align-items:center;z-index:50}
.modal__content{background:#fff;padding:24px;border-radius:12px;max-width:500px;width:100%;position:relative}
.modal__close{position:absolute;top:12px;right:12px;border:none;background:none;font-size:20px;cursor:pointer}
`;

interface CDT {
  _id: string;
  monto: number;
  plazo: number;
  estado: 'Pendiente' | 'Aprobado' | 'Activo' | 'Rechazado';
  fechaCreacion: string;
  usuarioId: string;
  renovacionAutomatica: boolean;
}

const AgenteDashboard: React.FC = () => {
  const [cdts, setCdts] = useState<CDT[]>([]);
  const [error, setError] = useState('');
  const [modalCDT, setModalCDT] = useState<CDT | null>(null);

  const token = localStorage.getItem('token');

  const fetchCDTs = async () => {
    if (!token) return;
    try {
      const res = await fetch('http://localhost:4000/api/cdts/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error al cargar CDTs');
      const data = await res.json();
      setCdts(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCDTs();
  }, []);

  const handleStatusChange = async (cdtId: string, newStatus: CDT['estado']) => {
    if (!token) return;
    try {
      const res = await fetch(`http://localhost:4000/api/cdts/${cdtId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ estado: newStatus }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error al actualizar el estado del CDT');
      fetchCDTs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (cdtId: string) => {
    if (!token) return;
    if (!window.confirm('¿Estás seguro de eliminar este CDT?')) return;
    try {
      const res = await fetch(`http://localhost:4000/api/cdts/${cdtId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Error al eliminar CDT');
      fetchCDTs();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const statusClass = (estado: CDT['estado']) => {
    if (estado === 'Activo' || estado === 'Aprobado') return 'status status--ok';
    if (estado === 'Rechazado') return 'status status--bad';
    return 'status status--neutral';
  };

  return (
    <div className="app">
      <style>{css}</style>

      <div className="topbar">
        <div className="wrap topbar__content">
          <a className="toplink" href="#ayuda">Ayuda</a>
          <a className="toplink" href="#soporte">Soporte</a>
        </div>
      </div>

      <header className="nav wrap">
        <div className="brand">
          <div className="brand__dot">N</div>
          <div className="brand__text">NeoCDTs</div>
        </div>
        <div className="nav__actions">
          <LogoutButton />
        </div>
      </header>

      <main className="main wrap">
        {error && <div className="empty">{error}</div>}

        {cdts.length === 0 && !error && (
          <div className="empty">
            <h3>Sin CDTs por ahora</h3>
            <p>Cuando crees o apruebes un CDT aparecerá aquí.</p>
          </div>
        )}

        {cdts.length > 0 && (
          <div className="grid">
            {cdts.map((cdt) => (
              <div key={cdt._id} className="cdt">
                <div className="big">CDT #{cdt._id.slice(-6)}</div>
                <div className="muted">Usuario: {cdt.usuarioId}</div>
                <div className={statusClass(cdt.estado)}>{cdt.estado}</div>

                <div style={{ marginTop: 10 }}>
                  <label className="muted">Estado:</label>
                  <select
                    value={cdt.estado}
                    onChange={(e) => handleStatusChange(cdt._id, e.target.value as CDT['estado'])}
                    style={{ padding: '6px', borderRadius: 6, marginLeft: 8 }}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Activo">Activo</option>
                    <option value="Rechazado">Rechazado</option>
                  </select>
                </div>

                <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                  <button className="btn btn--ghost" onClick={() => setModalCDT(cdt)}>Ver detalle</button>
                  {cdt.estado === 'Pendiente' && (
                    <button className="btn btn--danger" onClick={() => handleDelete(cdt._id)}>Eliminar</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {modalCDT && (
          <div className="modal" onClick={() => setModalCDT(null)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
              <button className="modal__close" onClick={() => setModalCDT(null)}>×</button>
              <h2>CDT #{modalCDT._id.slice(-6)}</h2>
              <p><strong>Usuario:</strong> {modalCDT.usuarioId}</p>
              <p><strong>Monto:</strong> ${modalCDT.monto}</p>
              <p><strong>Plazo:</strong> {modalCDT.plazo} días</p>
              <p><strong>Estado:</strong> {modalCDT.estado}</p>
              <p><strong>Creación:</strong> {new Date(modalCDT.fechaCreacion).toLocaleDateString()}</p>
              <p><strong>Renovación automática:</strong> {modalCDT.renovacionAutomatica ? 'Sí' : 'No'}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AgenteDashboard;
