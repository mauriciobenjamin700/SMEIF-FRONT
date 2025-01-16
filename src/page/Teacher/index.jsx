
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageButton from "../../components/ImagemButton";

import "./Teacher.scss";

import IMAGES from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import RegisterPresencePage from "./RegisterPresence";
import ViewHoraryPage from "./ViewHorary";
import RegisterNotesPage from "./RegisterNotes";
const Menu = () => {
  const navigate = useNavigate();

  return (
      <div className="box-menu">
        <ImageButton
          path={IMAGES.registro_faltas}
          text={"Registro de Presenças e Faltas"}
          onFunction={() => navigate("registro_de_presencas")}
        />
        <ImageButton
          path={IMAGES.gerenciar_cadastro}
          text={"Registro de Notas"}
          onFunction={() => navigate("registro_de_notas")}
        />
        <ImageButton
          path={IMAGES.calendario}
          text={"Visualizar Horários"}
          onFunction={() => navigate("visualizar_horarios")}
        />
        <ImageButton
          path={IMAGES.enviar_comunicado}
          text={"Envio de Mensagem para os pais"}
          disabled={true}
          onFunction={() => navigate("gerenciar_turmas")}
        />
        <ImageButton
          path={IMAGES.mensagem}
          text={"Mensagens Recebidas"}
          disabled={true}
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
        <Route path="registro_de_presencas/*" element={<RegisterPresencePage/>} />
        <Route path="registro_de_notas/*" element={<RegisterNotesPage/>} />
        <Route path="visualizar_horarios" element={<ViewHoraryPage/>} />

      </Routes>
    </div>
  );
};

export default Teacher;
