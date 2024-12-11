import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import image from  "../../assets/header_image.png";
import "./header.scss";

const Header = () => {
    const [ headerTitle, setHeaderTitle ] = useState("");
    const [ imageHeader, setImageHeader ] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if(location.pathname !== "/"){
            setImageHeader(true);
        }
        if(location.pathname === "/"){
            setHeaderTitle("");
        }else if(location.pathname.startsWith("/Coordenacao")){
            if(location.pathname === "/Coordenacao"){
                setHeaderTitle("Menu Principal");
                
            }
            else if(location.pathname.startsWith("/Coordenacao/cadastro")){
                switch(location.pathname){
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
            else if(location.pathname.startsWith("/Coordenacao/gerenciar_turmas")){
                switch(location.pathname){
                    case("/Coordenacao/gerenciar_turmas"):
                        setHeaderTitle("Gerenciamento de Turmas");
                        
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/gerenciar_horarios")){
                switch(location.pathname){
                    case("/Coordenacao/gerenciar_horarios"):
                        setHeaderTitle("Gerenciar Horários");
                        
                        break;
                }
            }
            else if(location.pathname.startsWith("/Coordenacao/gerencia")){
                switch(location.pathname){
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
            else if(location.pathname.startsWith("/Coordenacao/enviar_comunicado")){
                switch(location.pathname){
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
            else if(location.pathname.startsWith("/Coordenacao/registrar_ocorrencias")){
                switch(location.pathname){
                    case("/Coordenacao/registrar_ocorrencias"):
                        setHeaderTitle("Registro de Ocorrências e Advertências");
                        
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