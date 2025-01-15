import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from 'jwt-decode';

import "./Login.scss";
import image_login_1 from "../../assets/login_image_1.png";
import image_login_2 from "../../assets/login_image_2.png";
import olho_aberto from "../../assets/olho_aberto.png";
import olho_fechado from "../../assets/olho_fechado.png";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";
import API_URL from "../../constants/api.ts"
import LoadingOverlay from "../../components/LoadingOverlay/index.jsx";
import { formatCPFResponse } from '../../services/requests/base.ts';

import UserRoles from "../../constants/users.ts";
import { useDispatch } from 'react-redux';
import { setUser } from '../../services/redux/reduxers/userSlice.js';
import { setImage, setTitle } from '../../services/redux/reduxers/headerSlice.js';
import { get_events } from '../../services/requests/get.js';
import { setEvents } from '../../services/redux/reduxers/eventsSlice.js';

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
  const [userLogin, setUserLogin] = useState("")
  const [password, setPassword] = useState("")
  const [messageError, setMessageError] = useState("")
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const dispatch = useDispatch();


  const login = () =>{
    console.log(API_URL+"user/login")
    const api_url = `${API_URL}user/login`
    axios.post(api_url,{
      cpf:userLogin,
      password:password,
    })
    .then(response => {
      const decodedData = jwtDecode(response.data.token);
      setMessageError("");
      console.log(decodedData.level, level.acessLevel)
      if (decodedData.level == level.acessLevel && level.acessLevel == 3){
        localStorage.setItem("jwt", response.data.token)
        localStorage.setItem("level", decodedData.level)
        
        dispatch(setUser(decodedData))
        dispatch(setImage({headerImage: true}))
        dispatch(setTitle({headerTitle: "Menu Principal"}))
        navigate('/Coordenacao')
      }
      else if(decodedData.level == level.acessLevel && level.acessLevel == 2){
        localStorage.setItem("jwt", response.data.token)
        localStorage.setItem("level", decodedData.level)
        const eventsData = get_events()
        dispatch(setUser(decodedData))

        eventsData.then((response) => {
          console.log(response.filter(event => event.teacher_cpf == formatCPFResponse(decodedData.cpf)))
          dispatch(setEvents({events: response.filter(event => event.teacher_cpf == formatCPFResponse(decodedData.cpf))}))
          })
          
        dispatch(setImage({headerImage: true}))
        dispatch(setTitle({headerTitle: "Menu Principal"}))
        navigate('/Professor')
      }
      else if(decodedData.level == level.acessLevel && level.acessLevel == 1){
        localStorage.setItem("jwt", response.data.token)
        localStorage.setItem("level", decodedData.level)

        dispatch(setUser(decodedData))
        dispatch(setImage({headerImage: true}))
        dispatch(setTitle({headerTitle: "Menu Principal"}))

        navigate('/Responsavel')
      }
      else if(decodedData.level == 4){
        localStorage.setItem("jwt", response.data.token)
        localStorage.setItem("level", level.acessLevel)

        dispatch(setUser(decodedData))
        dispatch(setImage({headerImage: true}))
        dispatch(setTitle({headerTitle: "Menu Principal"}))
        if(level.acessLevel == 1){
          navigate('/Responsavel')
        }
        else if(level.acessLevel == 2){
          navigate('/Professor')
        }
        else if(level.acessLevel == 3){
          navigate('/Coordenacao')
        }
        
      }
      else{
        setMessageError("Usuario não autorizado!")
        setTimeout(() => {
          errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    })
    .catch(err => {
      setMessageError("Login ou senha inválidos! ");
      console.log(err)
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
          onChange={setUserLogin} 
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
  const [isLoading, setIsLoading] = useState(true);
  const list_frame = [Frame1, Frame2];
  const [currentFrame, setCurrentFrame] = useState(0);
  const [acessLevel, setAcessLevel] = useState(0);
  const dispatch = useDispatch()
  dispatch(setImage(false))
  dispatch(setTitle(""))

  const NextFrame = (frame,level) => {
    setCurrentFrame(frame);
    setAcessLevel(level);
  };

  // Renderiza o frame atual, passando a função NextFrame como prop
  const CurrentFrameComponent = list_frame[currentFrame];

  useEffect(() => {
    // Simula um carregamento
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 600); // Tempo de 3 segundos

    return () => clearTimeout(timeout);
  }, []);


  return (
    <>
    <LoadingOverlay isLoading={isLoading} />
    {!isLoading &&
    <div className="main">
      <CurrentFrameComponent onFunction={NextFrame} level={{acessLevel}}/>    
    </div>
    }
    </>
  );
};

export default Login;
