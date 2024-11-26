import {Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button"
import SearchRegister from "./SearchRegister";


const RegisterMenu = () => {
    const navigate = useNavigate()

    return (
        <div className="main">
            <div className="main-menu">
                <Button text={"Pais/Responsáveis"} onFunction={() => navigate("gerencia_pais")} />
                <Button text={"Alunos"} onFunction={() => navigate("gerencia_alunos")}/>
                <Button text={"Professores"} onFunction={() => navigate("gerencia_professores")} />
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Coordenacao")}/>
            </div>
        </div>
    );
} 

const ManagePage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RegisterMenu/>} />
                <Route path="gerencia_pais/*" element={<SearchRegister userType={1}/>} />
                <Route path="gerencia_alunos/*" element={<SearchRegister userType={2}/>} />
                <Route path="gerencia_professores/*" element={<SearchRegister userType={3}/>} />
            </Routes>
        </div>
    );
}

export default ManagePage;