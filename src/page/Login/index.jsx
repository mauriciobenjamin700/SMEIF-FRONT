import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useRef, useState } from "react";
import { jwtDecode } from 'jwt-decode';

import "./login.scss";
import image_login_1 from "../../assets/login_image_1.png";
import image_login_2 from "../../assets/login_image_2.png";
import olho_aberto from "../../assets/olho_aberto.png";
import olho_fechado from "../../assets/olho_fechado.png";
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
        <Button text={"Coordenação"} onFunction={() => onFunction(1, UserRoles.Coordination)} />
      </div>
    </div>
  );
};

const Frame2 = ({ onFunction, level }) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [messageError, setMessageError] = useState("")
  const navigate = useNavigate();
  const errorRef = useRef(null);
  

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
      setMessageError("Login ou senha inválidos! ");
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    });
  }

  const handleKeyPress = (event) =>{
    if (event.key === 'Enter'){
      login();
    } 
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="generic_frame">
      <img src={image_login_2} alt="Imagem de Login 2" />
      <div id="conteudo_frame2" onKeyDown={handleKeyPress}>
        <Input 
          onChange={setUser} 
          place={"CPF"}
          />
        
        <div id='input_password'>
          <Input 
            type={showPassword ? "text" : "password"}
            onChange={setPassword} 
            place={"Senha"}
          />
          
          <button
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <img src={olho_fechado} className='eyes'/> : <img src={olho_aberto} className='eyes'/> }
          </button>
        </div>
        


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
        {messageError && <p ref={errorRef} className="error-message">{messageError} </p>}
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
