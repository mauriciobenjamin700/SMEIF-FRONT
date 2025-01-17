
import { Routes, Route, useNavigate } from "react-router-dom";

import "./Coordination.scss";
import IMAGES from "../../assets";
import ImageButton from "../../components/ImagemButton";
import RegisterPage from "./RegisterPeople/Register.jsx";
import ManagePage from "./ManageRegistration/Management.jsx";
import SendCommunications from "./SendCommunications/index.jsx";
import ManageClasses from "./ManageClasses/index.jsx";
import RegisterOccurrences from "./RegisterOccurrences/index.jsx";
import ManageHorary from "./ManageHorary";
import { useSelector, useDispatch } from "react-redux";
import { setImage, setTitle } from "../../services/redux/reduxers/headerSlice.js";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  dispatch(setImage({headerImage: true}))
  dispatch(setTitle({headerTitle: "Menu Principal"}))
  
  return (
      <div className="box-menu">
        <ImageButton
          path={IMAGES.cadastrar_pessoas}
          text={"Cadastro de Pessoas"}
          onFunction={() => navigate("cadastro")}
        />
        <ImageButton
          path={IMAGES.gerenciar_cadastro}
          text={"Gerenciar Cadastros"}
          onFunction={() => navigate("gerencia")}
        />
        <ImageButton
          path={IMAGES.enviar_comunicado}
          text={"Enviar Comunicados"}
          disabled={true}
          onFunction={() => navigate("enviar_comunicado")}
        />
        <ImageButton
          path={IMAGES.cadastrar_turmas}
          text={"Gerenciar Turmas e Disciplinas"}
          onFunction={() => navigate("gerenciar_turmas")}
        />
        <ImageButton
          path={IMAGES.aviso}
          text={"Registrar Ocorrências e Advertências"}
          disabled={true}
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

const Coordination = () => {
  const user = useSelector((state) => state.user)

  

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
