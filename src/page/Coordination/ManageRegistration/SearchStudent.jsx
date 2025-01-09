
import {Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import API_URL from "../../../constants/api.ts"
import TableStudent from "../../../components/Table/TableStudent.jsx";
import StudentManagementPage from "./StudentManagement.jsx";


const SearchStudentPage = () => {
    const navigate = useNavigate(); 
    const [dataClass, setDataClass] = useState([]); // Estado para armazenar a lista de dados

    const [name,setName] = useState("");



    const searchStudent = () => {
        setDataClass(dataClass.filter(x => x.name === name))
    }
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        try {
        const response = await axios.get(`${API_URL}student/list`, { headers });
        setDataClass(response.data); 
        console.log(dataClass)
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
                place={"Informe o nome"}
                onChange={(value) => setName(value) }
            />
            <Button 
                text={"Filtrar"} 
                onFunction={() => searchStudent()}
            />
            </div>

            <TableStudent
                columns={["Nome","Matricula","Turma","Turno","Ação"]}
                data={dataClass}
                functions={[navigate]}
            />
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/gerencia")}
                
                />
            </div>        
        </div>
    );
}

const SearchStudent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchStudentPage/>} />
                <Route path="editar_pai/" element={<StudentManagementPage/>}/>
            </Routes>
        </div>
    );
}


export default SearchStudent;