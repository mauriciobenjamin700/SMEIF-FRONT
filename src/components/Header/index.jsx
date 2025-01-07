import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from  "../../assets/header_image.png";
import "./header.scss";

import IMAGES from "../../assets";
import ImageButton from "../ImagemButton";
import Button from "../Button";
import useCheckAccessLevel from "../../services/utilities/checkAcessLevel.js"

const Header = () => {
    const [ headerTitle, setHeaderTitle ] = useState("");
    const [ imageHeader, setImageHeader ] = useState(false);
    const react_location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const deleteLevel = () => {
        localStorage.removeItem('level')
        setIsDropdownOpen(false)
        navigate('/')
        location.reload()
        
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        useCheckAccessLevel(navigate, react_location);

        if(react_location.pathname !== "/"){
            setImageHeader(true);
        }
        if(react_location.pathname === "/"){
            setHeaderTitle("");
        }else if(react_location.pathname.startsWith("/Coordenacao")){
            if(react_location.pathname === "/Coordenacao"){
                setHeaderTitle("Menu Principal");
                
            }
            else if(react_location.pathname.startsWith("/Coordenacao/cadastro")){
                switch(react_location.pathname){
                    case("/Coordenacao/cadastro"):
                        setHeaderTitle("Cadastro de Pessoas");
                        
                        break;
                    case("/Coordenacao/cadastro/cadastro_pais"):
                        setHeaderTitle("Cadastro de Pais/Responsáveis");
                        
                        break;
                    case("/Coordenacao/cadastro/cadastro_aluno"):
                        setHeaderTitle("Cadastro de Alunos");
                        
                        break;
                    case("/Coordenacao/cadastro/cadastro_professor"):
                        setHeaderTitle("Cadastro de Professores");
                        
                        break;
                }
            }
            else if(react_location.pathname.startsWith("/Coordenacao/gerenciar_turmas")){
                switch(react_location.pathname){
                    case("/Coordenacao/gerenciar_turmas"):
                        setHeaderTitle("Gerenciamento de Turmas");
                        
                        break;
                }
            }
            else if(react_location.pathname.startsWith("/Coordenacao/gerenciar_horarios")){
                switch(react_location.pathname){
                    case("/Coordenacao/gerenciar_horarios"):
                        setHeaderTitle("Gerenciar Horários");
                        
                        break;
                }
            }
            else if(react_location.pathname.startsWith("/Coordenacao/gerencia")){
                switch(react_location.pathname){
                    case("/Coordenacao/gerencia"):
                        setHeaderTitle("Gerenciar Cadastros");
                        
                        break;
                    case("/Coordenacao/gerencia/gerencia_pais"):
                        setHeaderTitle("Gerenciar Cadastros de Pais");
                        
                        break;
                    case("/Coordenacao/gerencia/gerencia_alunos"):
                        setHeaderTitle("Gerenciar Cadastros de Alunos");
                        
                        break;
                    case("/Coordenacao/gerencia/gerencia_professores"):
                        setHeaderTitle("Gerenciar Cadastros de Professores");
                        
                        break;
                }
            }
            else if(react_location.pathname.startsWith("/Coordenacao/enviar_comunicado")){
                switch(react_location.pathname){
                    case("/Coordenacao/enviar_comunicado"):
                        setHeaderTitle("Envio de Comunicado");
                        break;
                    case("/Coordenacao/enviar_comunicado/buscar_pai"):
                        setHeaderTitle("Buscar Pai/Responsável");
                        break;
                    case("/Coordenacao/enviar_comunicado/buscar_turma"):
                        setHeaderTitle("Buscar Turma");
                        break;
                    case("/Coordenacao/enviar_comunicado/buscar_pai/enviar_comunicado_para_pai"):
                        setHeaderTitle("Envio de Comunicado");
                        break;
                    case("/Coordenacao/enviar_comunicado/buscar_turma/enviar_comunicado_para_turma"):
                        setHeaderTitle("Envio de Comunicado");
                        break;
                }
            
            }
            else if(react_location.pathname.startsWith("/Coordenacao/registrar_ocorrencias")){
                switch(react_location.pathname){
                    case("/Coordenacao/registrar_ocorrencias"):
                        setHeaderTitle("Registro de Ocorrências e Advertências");
                        
                        break;
                }
            
            }
        }else if(react_location.pathname.startsWith("/Professor")){
            if(react_location.pathname === "/Professor"){
                setHeaderTitle("Menu Principal");
                
            }
        }else if(react_location.pathname.startsWith("/Responsavel")){
            if(react_location.pathname === "/Responsavel"){
                setHeaderTitle("Menu Principal");
                
            }
        }else if(react_location.pathname.startsWith("/error")){
            setHeaderTitle("Menu Principal")
        }

        
    },[navigate, react_location, headerTitle])

    if(imageHeader){
        return(
            <header className="header">
                <img src={image} alt="" />
                <h3>{headerTitle}</h3>
                <ImageButton
                    onFunction={() => toggleDropdown()}
                    path={IMAGES.menu}
                />
                {isDropdownOpen && (
                <div className="dropdown">
                    <Button
                        text={"Perfil"}
                        
                    />
                    <Button
                        text={"Alterar Senha"}
                        
                    />
                    <Button
                        text={"Sair"}
                        onFunction={() => deleteLevel()}
                    
                    />
                </div>
            )}
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