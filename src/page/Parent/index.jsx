
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageButton from "../../components/ImagemButton";
import SelectChildPage from "./SelectChildPage";

import "./Parent.scss";

import IMAGES from "../../assets";
import MonitorInputOutput from "./MonitorInputOutput";
import SearchSubject from "./SearchSubject/SearchSubject";
const Menu = () => {
  const navigate = useNavigate();

  return (
      <div className="box-menu">
        <ImageButton
          path={IMAGES.monitorar_entrada}
          text={"Monitorar entrada e saída"}
          onFunction={() => navigate("cadastro")}
        />
        <ImageButton
          path={IMAGES.gerenciar_cadastro}
          text={"Visualizar presenças e faltas"}
          onFunction={() => navigate("gerencia")}
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
          path={"src/assets/calendario.png"}
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
        <Route path="cadastro/*" element={<MonitorInputOutput/>} />
        <Route path="gerencia/*" element={<SearchSubject/>} />
      </Routes>
    </div>
  );
};

export default Parent;
