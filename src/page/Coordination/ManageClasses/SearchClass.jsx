
import {Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import ManageClassPage from "./ManageClass.jsx";
import TableClass from "../../../components/Table/TableClass.jsx";
import API_URL from "../../../constants/api.ts"


const SearchClassPage = ({userType}) => {
    const navigate = useNavigate(); 
    const [dataClass, setDataClass] = useState([]); // Estado para armazenar a lista de dados

    // Função assíncrona para buscar os dados
    const fetchData = async () => {
        try {
        const response = await axios.get(`${API_URL}classes/list`);
        setDataClass(response.data); // Atualiza o estado com os dados recebidos
        } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        }
    };

    // Busca os dados ao montar o componente
    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div className="main">
            <div style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
            <Input
                text={"Buscar"}
                place={"Informe a Turma"}
            />
            <Button 
                text={"Filtrar"} 
            />
            </div>

            <TableClass 
                columns={["Turma", "Turno", "Ação"]}
                data={dataClass}
                functions={[navigate]}
            />
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/enviar_comunicado")}
                
                />
                <Button
                    text={"Buscar"}
                    onFunction={() => {
                        
                        }
                    }
                />
            </div>        
        </div>
    );
}

const SearchClass = ({userType}) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchClassPage userType={userType}/>} />
                <Route path="gerenciar_turma/" element={<ManageClassPage/>} />
            </Routes>
        </div>
    );
}


export default SearchClass;