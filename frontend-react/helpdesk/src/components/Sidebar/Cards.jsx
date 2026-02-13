// Importa css
import Card from "\src\components\Sidebar\Cards.jsx";


// Componente recebe props (dados externos)
export default function Card({ titulo, valor, subtitulo }) {

  return (

    // card container
    <div className="card">

      {/* título pequeno */}
      <span className="card-title">
        {titulo}
      </span>

      {/* número grande */}
      <strong className="card-value">
        {valor}
      </strong>

      {/* texto menor */}
      <span className="card-sub">
        {subtitulo}
      </span>

    </div>
  );
}
