import Sidebar from "../../components/Sidebar/Sidebar";

function Dashboard() {
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
