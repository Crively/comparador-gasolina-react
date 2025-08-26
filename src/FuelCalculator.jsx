import { useState } from "react";
import "./FuelCalculator.css";

export default function FuelCalculator() {
  const [alcool, setAlcool] = useState("");
  const [gasolina, setGasolina] = useState("");
  const [ratio, setRatio] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const moeda = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });

  function calcular() {
    const a = parseFloat(String(alcool).replace(",", "."));
    const g = parseFloat(String(gasolina).replace(",", "."));

    if (Number.isNaN(a) || Number.isNaN(g) || g <= 0 || a < 0) {
      setMensagem("Por favor, informe valores válidos.");
      setRatio(null);
      return;
    }

    const r = a / g;
    setRatio(r);

    if (r < 0.7) {
      setMensagem("Melhor abastecer com Álcool.");
    } else {
      setMensagem("Melhor abastecer com Gasolina.");
    }
  }

  function limpar() {
    setAlcool("");
    setGasolina("");
    setMensagem("");
    setRatio(null);
  }

  return (
    <div className="page">
      <div className="card">
        <header className="card__header">
          <div className="emoji" aria-hidden>⛽</div>
          <h1>Comparador de Combustível</h1>
          <p className="subtitle">Qual é a melhor opção hoje?</p>
        </header>

        <div className="form-group">
          <label htmlFor="alcool">Álcool (R$/L)</label>
          <input
            id="alcool"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="Preço do litro do álcool"
            value={alcool}
            onChange={(e) => setAlcool(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gasolina">Gasolina (R$/L)</label>
          <input
            id="gasolina"
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="Preço do litro da gasolina"
            value={gasolina}
            onChange={(e) => setGasolina(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="btn btn-primary" onClick={calcular}>Calcular</button>
          <button className="btn" onClick={limpar}>Limpar</button>
        </div>

        {mensagem && (
          <div className={`resultado ${ratio !== null && (ratio < 0.7 ? "ok" : "warn")}`}>
            <strong>{mensagem}</strong>
            {ratio !== null && (
              <p className="detalhe">
                {`${moeda.format(parseFloat(alcool || 0))} ÷ ${moeda.format(parseFloat(gasolina || 0))} = ${ratio.toFixed(2)} `}
                {ratio < 0.7 ? "(< 0,70)" : "(≥ 0,70)"}
              </p>
            )}
          </div>
        )}

        <details className="hint">
          <summary>Como o cálculo é feito?</summary>
          <ul>
            <li>Dividimos o preço do litro do álcool pelo preço do litro da gasolina.</li>
            <li>Se o resultado for <strong>menor que 0,70</strong>, compensa abastecer com <strong>álcool</strong>.</li>
            <li>Caso contrário, é melhor <strong>gasolina</strong>.</li>
          </ul>
        </details>
      </div>
    </div>
  );
}
