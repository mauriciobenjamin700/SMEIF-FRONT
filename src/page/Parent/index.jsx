
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageButton from "../../components/ImagemButton";

import "./Parent.scss";

import IMAGES from "../../assets";
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
          text={"Visualizar presença"}
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
      </div>
  );
};

const Parent = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </div>
  );
};

export default Parent;
