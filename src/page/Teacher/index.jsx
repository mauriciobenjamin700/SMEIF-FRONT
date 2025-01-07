
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageButton from "../../components/ImagemButton";

import "./Teacher.scss";

import IMAGES from "../../assets";
const Menu = () => {
  const navigate = useNavigate();

  return (
      <div className="box-menu">
        <ImageButton
          path={IMAGES.registro_faltas}
          text={"Registro de Presenças e Faltas"}
          onFunction={() => navigate("cadastro")}
        />
        <ImageButton
          path={IMAGES.gerenciar_cadastro}
          text={"Registro de Notas"}
          onFunction={() => navigate("gerencia")}
        />
        <ImageButton
          path={IMAGES.calendario}
          text={"Visualizar Horários"}
          onFunction={() => navigate("enviar_comunicado")}
        />
        <ImageButton
          path={IMAGES.enviar_comunicado}
          text={"Envio de Mensagem para os pais"}
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

const Teacher = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Menu />} />
      </Routes>
    </div>
  );
};

export default Teacher;
