import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./MonitorInputOutput.scss";

import Button from "../../../components/Button";

const MonitorInputOutputPage = () => {
  const navigate = useNavigate();

  return (
        <div className="main">
            <div className="main-menu" id="Monitorar_entrada_saida">
                <Button text={"Visualizar Notificação do Dia"} onFunction={() => navigate("visualizar_notificacao")} />
                <Button text={"Histórico de Notificações"} onFunction={() => navigate("historico_notificacao")}/>
            </div>
            <div className="botoes-de-lado">
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Parent")}/>
                <Button color={"#14AE5C"} text={"Confirmar"} />
            </div>
        </div>

  );
};

export default MonitorInputOutputPage;
