import React from "react";
import "./ViewrInputOutput.scss";
import Button from "../../../components/Button/index"
import { useNavigate } from "react-router-dom";

const ViewrInputOutput = () => {
  const statusData = {
    entrada: "13/11/2024: Pedro entrou na escola às 08:00.",
    saida: "13/11/2024: Pedro saiu da escola às 12:00.",
  };

  const navigate = useNavigate()

  return (
    <div className="monitor-container">

      <main className="monitor-content">
        <section className="status-section">
          <h2>Status do Dia:</h2>
          <div className="status-item">
            <h3>Entrada:</h3>
            <p>{statusData.entrada}</p>
          </div>
          <div className="status-item">
            <h3>Saída:</h3>
            <p>{statusData.saida}</p>
          </div>
        </section>

        <Button
          text={"Voltar"}
          color={"#E8B931"}
          onFunction={() => navigate("/Responsavel/monitorar_entrada")}
        />
      </main>
    </div>
  );
};

export default ViewrInputOutput;
