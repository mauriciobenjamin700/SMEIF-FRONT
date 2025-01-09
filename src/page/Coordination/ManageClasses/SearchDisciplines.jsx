
import {Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import ManageDisciplinesPage from "./ManageDisciplines.jsx";
import API_URL from "../../../constants/api.ts"
import TableDisciplines from "../../../components/Table/TableDisciplines.jsx";


const SearchDisciplinesPage = () => {
    const navigate = useNavigate(); 
    const [dataClass, setDataClass] = useState([]); // Estado para armazenar a lista de dados
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
        try {
        const response = await axios.get(`${API_URL}disciplines/list`, { headers });
        setDataClass(response.data); // Atualiza o estado com os dados recebidos
        console.log(response.data);
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

            <TableDisciplines
                columns={["Id","Nome","Ação"]}
                data={dataClass}
                functions={[navigate]}
            />
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}
                
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

const SearchDisciplines = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchDisciplinesPage/>} />
                <Route path="gerenciar_disciplina/" element={<ManageDisciplinesPage/>} />
            </Routes>
        </div>
    );
}


export default SearchDisciplines;