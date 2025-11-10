// AdminDashboard.tsx
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import LogoutButton from '../components/LogoutButton'; // mismo componente que en AgenteDashboard

const COLORS = ['#facc15', '#22c55e', '#ef4444', '#94a3b8'];

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
body{margin:0;color:var(--ink);background:var(--bg);font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji',sans-serif}
a{text-decoration:none;color:inherit}
.wrap{max-width:1120px;margin:0 auto;padding:0 16px}

/* Header / Navbar */
.header{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.95);backdrop-filter:saturate(180%) blur(8px);border-bottom:1px solid var(--ring)}
.nav{display:flex;align-items:center;justify-content:space-between;padding:12px 0}
.brand{display:flex;align-items:center;gap:10px}
.brand__dot{height:36px;width:36px;border-radius:999px;background:var(--brand);color:#fff;display:grid;place-items:center;font-weight:800}
.brand__text{font-size:22px;font-weight:800;letter-spacing:-.02em}
.brand__neo{color:var(--brand)}
.nav__links{display:flex;gap:28px}
.navlink{color:#374151;font-weight:600}
.navlink:hover{color:var(--brand)}
.nav__actions{display:flex;gap:10px}

/* Botones */
.btn{display:inline-flex;align-items:center;justify-content:center;height:40px;padding:0 18px;border-radius:999px;font-weight:700;border:1px solid transparent;transition:.15s;cursor:pointer}
.btn--primary{background:var(--brand);color:#fff}
.btn--primary:hover{background:var(--brand-dark)}
.btn--ghost{border-color:#111;color:#111;background:#fff}
.btn--ghost:hover{background:#f3f4f6}

/* Main / Card */
.main{padding:32px 0}
.card{background:var(--card);border:1px solid var(--ring);border-radius:16px;box-shadow:0 6px 18px rgba(0,0,0,.04)}
.card__head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px;border-bottom:1px solid var(--ring)}
.title{margin:0;font-size:28px;letter-spacing:-.02em}
.card__body{padding:20px}
.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
@media (max-width:720px){.grid{grid-template-columns:1fr}}
.cdt{border:1px solid var(--ring);border-radius:14px;padding:14px;background:#fff;transition:box-shadow .15s;text-align:center}
.cdt:hover{box-shadow:0 8px 22px rgba(0,0,0,.06)}
.big{font-weight:700;font-size:22px}
.muted{color:var(--muted);font-size:14px}
.status--ok{color:var(--ok)}
.status--bad{color:var(--bad)}
.status--neutral{color:#374151}
.empty{border:1px dashed #cfd6dd;background:#f9fafb;border-radius:14px;padding:28px;text-align:center}
.empty h3{margin:0 0 6px;font-size:20px}
.empty p{margin:0 0 16px;color:var(--muted)}
`;

interface CDT {
  _id: string;
  monto: number;
  plazo: number;
  estado: string;
  fechaCreacion: string;
  usuarioId: string;
  renovacionAutomatica: boolean;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<Record<string, number>>({
    Pendiente: 0,
    Activo: 0,
    Rechazado: 0,
    Cancelado: 0,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay sesión activa');
      setLoading(false);
      return;
    }

    fetch('http://localhost:4000/api/cdts/all', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Error al obtener los datos');
        }
        return res.json();
      })
      .then((data: CDT[]) => {
        const grouped: Record<string, number> = {
          Pendiente: 0,
          Activo: 0,
          Rechazado: 0,
          Cancelado: 0,
        };
        data.forEach((cdt) => {
          grouped[cdt.estado] = (grouped[cdt.estado] || 0) + 1;
        });
        setStats(grouped);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const chartData = Object.keys(stats).map((estado) => ({
    name: estado,
    value: stats[estado],
  }));

  return (
    <div className="app">
      <style>{css}</style>

      {/* Header / Navbar como AgenteDashboard */}
      <header className="header">
        <div className="wrap nav">
          <div className="brand">
            <div className="brand__dot">N</div>
            <div className="brand__text">
              Neo<span className="brand__neo">CDTs</span>
            </div>
          </div>
          <nav className="nav__links">
            <a className="navlink" href="#dashboard">Dashboard</a>
            <a className="navlink" href="#reportes">Reportes</a>
            <a className="navlink" href="#usuarios">Usuarios</a>
          </nav>
          <div className="nav__actions">
            <button className="btn btn--ghost">Nuevo Usuario</button>
            <button className="btn btn--primary">Nuevo CDT</button>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="wrap">
          <section className="card">
            <div className="card__head">
              <h1 className="title">Panel del Administrador — Reportes de CDTs</h1>
            </div>

            <div className="card__body">
              {error && (
                <div className="empty" role="alert">
                  <h3>Error al cargar</h3>
                  <p>{error}</p>
                </div>
              )}

              {loading && (
                <p className="muted" style={{ textAlign: 'center' }}>
                  Cargando estadísticas...
                </p>
              )}

              {!loading && !error && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 500,
                      height: 350,
                      background: '#fff',
                      borderRadius: 16,
                      border: '1px solid var(--ring)',
                      boxShadow: '0 6px 18px rgba(0,0,0,.04)',
                      padding: 20,
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          label
                        >
                          {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid" style={{ maxWidth: 700, width: '100%' }}>
                    {Object.entries(stats).map(([estado, total]) => (
                      <div key={estado} className="cdt">
                        <h2 className="muted">{estado}</h2>
                        <p
                          className={`big ${
                            estado === 'Activo'
                              ? 'status--ok'
                              : estado === 'Rechazado'
                              ? 'status--bad'
                              : 'status--neutral'
                          }`}
                        >
                          {total ?? 0}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <footer className="footer wrap" style={{ textAlign: 'center' }}>
            © {new Date().getFullYear()} NeoCDTs — Panel Administrativo.
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
