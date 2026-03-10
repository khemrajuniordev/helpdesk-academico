import { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard() {

  useEffect(() => {

    // FAZER LOGIN NA API
    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "wesley",
        password: "wes1234567"
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("TOKEN RECEBIDO:", data);

      const accessToken = data.access;

      // USAR O TOKEN PARA ACESSAR /chamados
      return fetch("http://localhost:8000/api/chamados/", {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });

    })
    .then(res => res.json())
    .then(chamados => {
      console.log("CHAMADOS DA API:", chamados);
    })
    .catch(err => {
      console.error("Erro:", err);
    });

  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <main style={{ padding: "20px" }}>
        <h2>Dashboard</h2>
        <p>Página principal do HelpDesk</p>
      </main>
    </div>
  );
}

export default Dashboard;