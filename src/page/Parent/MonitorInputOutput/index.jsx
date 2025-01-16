import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./MonitorInputOutput.scss";

import Button from "../../../components/Button";
import ViewrInputOutput from "./ViewrInputOutput";

const MonitorInputOutputPage = () => {
  const navigate = useNavigate();

  return (
        <div className="main">
            <div className="main-menu" id="Monitorar_entrada_saida">
                <Button text={"Visualizar Notificação do Dia"} onFunction={() => navigate("visualizar_entrada")} />
                <Button text={"Histórico de Notificações"} onFunction={() => navigate("historico_notificacao")}/>
            </div>
            <div className="botoes-de-lado">
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Responsavel")}/>
            </div>
        </div>

  );
};

const MonitorInputOutput = () => {
    return (
      <div className="main">
        <Routes>
          <Route path="/" element={<MonitorInputOutputPage />} />
          <Route path="visualizar_entrada/*" element={<ViewrInputOutput/>} />
  
        </Routes>
      </div>
    );
  };

export default MonitorInputOutput;
