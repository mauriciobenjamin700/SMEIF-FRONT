import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import image from  "../../assets/header_image.png";
import "./header.scss";

const Header = () => {
    const [ headerTitle, setHeaderTitle ] = useState("");
    const [ imageHeader, setImageHeader ] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === "/"){
            setHeaderTitle("");
            setImageHeader(false);
        }else if(location.pathname.startsWith("/Coordenacao")){
            if(location.pathname === "/Coordenacao"){
                setHeaderTitle("Menu Principal");
                setImageHeader(true);
            }
            else if(location.pathname.startsWith("/Coordenacao/cadastro")){
                switch(location.pathname){
                    case("/Coordenacao/cadastro"):
                        setHeaderTitle("Cadastro de Pessoas");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/cadastro/cadastro_pais"):
                        setHeaderTitle("Cadastro de Pais/Responsáveis");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/cadastro/StudentRegister"):
                        setHeaderTitle("Cadastro de Alunos");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/cadastro/cadastro_professor"):
                        setHeaderTitle("Cadastro de Professores");
                        setImageHeader(true);
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/gerenciar_turmas")){
                console.log("aqui")
                switch(location.pathname){
                    case("/Coordenacao/gerenciar_turmas"):
                        setHeaderTitle("Gerenciamento de Turmas");
                        setImageHeader(true);
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/gerenciar_horarios")){
                console.log("aqui")
                switch(location.pathname){
                    case("/Coordenacao/gerenciar_horarios"):
                        setHeaderTitle("Gerenciar Horários");
                        setImageHeader(true);
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/gerencia")){
                console.log("aqui")
                switch(location.pathname){
                    case("/Coordenacao/gerencia"):
                        setHeaderTitle("Gerenciar Cadastros");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/gerencia/gerencia_pais"):
                        setHeaderTitle("Gerenciar Cadastros de Pais");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/gerencia/gerencia_alunos"):
                        setHeaderTitle("Gerenciar Cadastros de Alunos");
                        setImageHeader(true);
                        break;
                    case("/Coordenacao/gerencia/gerencia_professores"):
                        setHeaderTitle("Gerenciar Cadastros de Professores");
                        setImageHeader(true);
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/enviar_comunicado")){
                switch(location.pathname){
                    case("/Coordenacao/enviar_comunicado"):
                        setHeaderTitle("Envio de Comunicado");
                        setImageHeader(true);
                        break;
                }
            
            }
            else if(location.pathname.startsWith("/Coordenacao/registrar_ocorrencias")){
                switch(location.pathname){
                    case("/Coordenacao/registrar_ocorrencias"):
                        setHeaderTitle("Registro de Ocorrências e Advertências");
                        setImageHeader(true);
                        break;
                }
            
            }
        }

        
    })

    if(imageHeader){
        return(
            <header className="header">
                <img src={image} alt="" />
                <h3>{headerTitle}</h3>
            </header>
        );
    }
    else{
        return(
            <header className="header">
                <h3>{headerTitle}</h3>
            </header>
        );
    }
}

export default Header;