import "./herder.css";

export default function Header() {
    return (
        <header className="Header">
            <div>
        <div className="div_logo">
            <img src="" alt="" />
        </div>
        <nav>
          <ul className="lista">
            <li>
              <a href="Listar_totens" className="primeiro">Início</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Sobre</a>
            </li>
            <li>
              {/* <a href="#" className="hover:underline">Contato</a> */}
            </li>
          </ul>
        </nav>
        </div>
        </header>
    );
}