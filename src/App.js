import { useState } from "react";
import "./App.css";
import unfaelle from "./unfaelle.json";

export default function App() {
  // State für die zwei Interaktionen im Header
  const [darkMode, setDarkMode] = useState(false); // Button: hell / dunkel
  const [suche, setSuche] = useState(""); // Suchfeld: eingegebener Text

  // Unfälle nach dem Suchbegriff filtern (Gross-/Kleinschreibung egal)
  const gefilterteUnfaelle = unfaelle.filter((unfall) =>
    `${unfall.typ} ${unfall.strasseart} ${unfall.jahr} ${unfall.schwere}`
      .toLowerCase()
      .includes(suche.toLowerCase())
  );

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <header className="header">
        <div className="header-links">
          <img
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREgoU5Q3jwXL5Lt0FZOYxBvEQi-nIYjQTuVhfb2nSXeQ&s=10"
            alt="Logo Unfall-Viewer"
          />
          <h1 className="titel">Unfall-Viewer Basel</h1>
        </div>

        <div className="header-rechts">
          {/* Interaktion 1: Suchfeld filtert die Liste */}
          <input
            className="suchfeld"
            type="text"
            placeholder="Suchen: Typ, Jahr, Strasse…"
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
          />

          {/* Interaktion 2: Button schaltet Dark Mode um */}
          <button className="button" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <main className="inhalt">
        <p className="anzahl">
          {gefilterteUnfaelle.length} von {unfaelle.length} Unfällen
        </p>

        <ul className="liste">
          {gefilterteUnfaelle.map((unfall) => (
            <li key={unfall.id_unfall} className="karte">
              <strong>{unfall.typ}</strong>
              <span>
                {unfall.jahr} · {unfall.strasseart} · {unfall.schwere}
              </span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
