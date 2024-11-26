
import { Routes, Route, useNavigate } from "react-router-dom";

import "./coordination.scss";
import ImageButton from "../../components/ImagemButton";
import RegisterPage from "./RegisterPeople/register";
import ManagePage from "./ManageRegistration/management";
import SendCommunications from "./SendCommunications";
import ManageClasses from "./ManageClasses";
import RegisterOccurrences from "./RegisterOccurrences";
import ManageHorary from "./ManageHorary";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="div-main">
      <div className="box-menu">
        <ImageButton
          path={"src/assets/cadastrar_pessoas.png"}
          text={"Cadastro de Pessoas"}
          onFunction={() => navigate("cadastro")}
        />
        <ImageButton
          path={"src/assets/gerenciar_cadastro.png"}
          text={"Gerenciar Cadastros"}
          onFunction={() => navigate("gerencia")}
        />
        <ImageButton
          path={"src/assets/enviar_comunicado.png"}
          text={"Enviar Comunicados"}
          onFunction={() => navigate("enviar_comunicado")}
        />
        <ImageButton
          path={"src/assets/cadastrar_turmas.png"}
          text={"Gerenciar Turmas e Disciplinas"}
          onFunction={() => navigate("gerenciar_turmas")}
        />
        <ImageButton
          path={"src/assets/aviso.png"}
          text={"Registrar Ocorrências e Advertências"}
          onFunction={() => navigate("registrar_ocorrencias")}
        />
        <ImageButton
          path={"src/assets/calendario.png"}
          text={"Gerenciar Horários"}
          onFunction={() => navigate("gerenciar_horarios")}
        />
      </div>
    </div>
  );
};

const Coordination = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="cadastro/*" element={<RegisterPage />} />
        <Route path="gerencia/*" element={<ManagePage/>}/>
        <Route path="enviar_comunicado/*" element={<SendCommunications/>} />
        <Route path="gerenciar_turmas/*" element={<ManageClasses/>} />
        <Route path="registrar_ocorrencias/*" element={<RegisterOccurrences/>} />
        <Route path="gerenciar_horarios/*" element={<ManageHorary/>} />
      </Routes>
    </div>
  );
};

export default Coordination;
