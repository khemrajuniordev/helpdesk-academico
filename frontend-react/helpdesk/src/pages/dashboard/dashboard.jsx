// importa componente Card
import Card from "\src\components\Sidebar\Cards.jsx";


export default function Dashboard() {

  return (

    <div>

      {/* grid de cards */}
      <div className="cards-grid">

        <Card
          titulo="TOTAL"
          valor={4}
          subtitulo="Chamados registrados"
        />

        <Card
          titulo="ABERTOS"
          valor={2}
          subtitulo="Aguardando atendimento"
        />

        <Card
          titulo="EM ANDAMENTO"
          valor={1}
          subtitulo="Sendo processados"
        />

        <Card
          titulo="FECHADOS"
          valor={1}
          subtitulo="Resolvidos"
        />

      </div>

    </div>
  );
}
