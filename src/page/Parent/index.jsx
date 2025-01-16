
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageButton from "../../components/ImagemButton";
import SelectChildPage from "./SelectChildPage";

import "./Parent.scss";

import IMAGES from "../../assets";
import MonitorInputOutput from "./MonitorInputOutput";
import ViewrInputOutput from "./MonitorInputOutput/ViewrInputOutput"
import SearchSubject from "./SearchSubject/SearchSubject";
const Menu = () => {
  const navigate = useNavigate();

  return (
      <div className="box-menu">
        <ImageButton
          path={IMAGES.monitorar_entrada}
          text={"Monitorar entrada e saída"}
          onFunction={() => navigate("monitorar_entrada")}
        />
        <ImageButton
          path={IMAGES.gerenciar_cadastro}
          text={"Visualizar presenças e faltas"}
          onFunction={() => navigate("visualizar_presencas")}
        />
        <ImageButton
          path={IMAGES.visualizar_notas}
          text={"Visualizar notas e médias"}
          onFunction={() => navigate("enviar_comunicado")}
        />
        <ImageButton
          path={IMAGES.enviar_comunicado}
          text={"Envio de Mensagem para a escola"}
          onFunction={() => navigate("gerenciar_turmas")}
        />
        <ImageButton
          path={IMAGES.mensagem}
          text={"Mensagens Recebidas"}
          onFunction={() => navigate("registrar_ocorrencias")}
        />
        <ImageButton
          path={IMAGES.calendario}
          text={"Gerenciar Horários"}
          onFunction={() => navigate("gerenciar_horarios")}
        />
      </div>
  );
};

const Parent = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="selecionar_filho/*" element={<SelectChildPage />} />
        <Route path="monitorar_entrada/*" element={<MonitorInputOutput/>} />
        <Route path="visualizar_presencas/*" element={<SearchSubject/>} />

      </Routes>
    </div>
  );
};

export default Parent;
