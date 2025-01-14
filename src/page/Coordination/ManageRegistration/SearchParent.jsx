
import {Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import API_URL from "../../../constants/api.ts"
import TableParent from "../../../components/Table/TableParent.jsx";
import ParentManagementPage from "./ParentsManagement.jsx";


const SearchParentPage = () => {
    const navigate = useNavigate(); 
    const [dataClass, setDataClass] = useState([]); // Estado para armazenar a lista de dados

    const [name,setName] = useState("");



    const searchParent = () => {
        setDataClass(dataClass.filter(x => x.name === name))
    }
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
        try {
        const response = await axios.get(`${API_URL}user/list`, { headers });
        setDataClass(response.data.filter(x => x.level == 1));
        } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        }
    };

    // Busca os dados ao montar o componente
    useEffect(() => {
        fetchData();
    }, []);

    console.log(dataClass)

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
                onFunction={() => searchParent()}
            />
            </div>

            <TableParent
                columns={["Nome","Telefone","Email","CPF","Ação"]}
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

const SearchParent = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchParentPage/>} />
                <Route path="editar_pai/" element={<ParentManagementPage/>}/>
            </Routes>
        </div>
    );
}


export default SearchParent;