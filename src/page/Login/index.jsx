import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from 'jwt-decode';

import "./login.css";
import image_login_1 from "../../assets/login_image_1.png";
import image_login_2 from "../../assets/login_image_2.png";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";


import UserRoles from "../../constants/users.ts";


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

const Frame2 = ({ onFunction, level }) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [messageError, setMessageError] = useState("")
  const navigate = useNavigate();

  const login = () =>{
    const api_url = `${import.meta.env.VITE_BASE_URL_API}user/login`
    axios.post(api_url,{
      cpf:user,
      password:password
    })
    .then(response => {
      const decodedData = jwtDecode(response.data);
      setMessageError("");

      if (decodedData.level == level.acessLevel && level.acessLevel == 3){
        navigate('/Coordenacao')
      }
    })
    .catch(err => {
      setMessageError("Login ou senha inválidos!");
    });
  }


  return (
    <div className="generic_frame">
      <img src={image_login_2} alt="Imagem de Login 2" />
      <div id="conteudo_frame2">
        <Input 
          text={"Usuário"} 
          onChange={setUser} 
          place={"CPF"}
          />
        
        <Input 
          text={"Senha"} 
          onChange={setPassword} 
          place={"Senha"}
          />
        <div className="botoes_de_lado">
          <Button 
            className="botao_voltar" 
            text={"Voltar"} 
            color="rgba(167, 242, 165, 0.17)" 
            onFunction={() => onFunction(0)} 
            />
          <Button 
            text={"Entrar"} 
            onFunction={() => login()} 
            />
        </div>
        {messageError && <p className="error-message">{messageError} </p>}
      </div>
    </div>
  );
};

const Login = () => {
  const list_frame = [Frame1, Frame2];
  const [currentFrame, setCurrentFrame] = useState(0);
  const [acessLevel, setAcessLevel] = useState(0);
  const NextFrame = (frame,level) => {
    setCurrentFrame(frame);
    setAcessLevel(level);
  };

  // Renderiza o frame atual, passando a função NextFrame como prop
  const CurrentFrameComponent = list_frame[currentFrame];

  return (
    <div className="main">
      <CurrentFrameComponent onFunction={NextFrame} level={{acessLevel}}/>
    </div>
  );
};

export default Login;
