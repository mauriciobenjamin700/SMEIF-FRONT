import "./login.css";
import image_login_1 from "../../assets/login_image_1.png";
import image_login_2 from "../../assets/login_image_2.png";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";
import { useState } from "react";

import UserRoles from "../../constants/users.ts"


const Frame1 = ({ onFunction }) => {
  return (
    <div className="generic_frame">
      <img src={image_login_1} alt="Imagem de Login 1" />
      <div id="lista_botoes">
        <Button text={"Pais ou Responsavel"} onFunction={() => onFunction(1, UserRoles.Pais)} />
        <Button text={"Professores"} onFunction={() => onFunction(1, UserRoles.Professores)} />
        <Button text={"Coordenação"} onFunction={() => onFunction(1, UserRoles.Coordenacao)} />
      </div>
    </div>
  );
};

const Frame2 = ({ onFunction, acess_level }) => {
  return (
    <div className="generic_frame">
      <img src={image_login_2} alt="Imagem de Login 2" />
      <div id="conteudo_frame2">
        <Input text={"Usuário"} />
        <Input text={"Senha"} />
        <div className="botoes_de_lado">
          <Button className="botao_voltar" text={"Voltar"} color="rgba(167, 242, 165, 0.17)" onFunction={() => onFunction(0)} />
          <Button text={"Entrar"} />
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const list_frame = [Frame1, Frame2];
  const [currentFrame, setCurrentFrame] = useState(0);
  const [acessLevel, setAcessLevel] = useState(0);
  const NextFrame = (frame,acess_level) => {
    setCurrentFrame(frame);
    setAcessLevel(acess_level);
  };

  // Renderiza o frame atual, passando a função NextFrame como prop
  const CurrentFrameComponent = list_frame[currentFrame];

  return (
    <div>
      <CurrentFrameComponent onFunction={NextFrame} acess_level={{acessLevel}}/>
    </div>
  );
};

export default Login;
