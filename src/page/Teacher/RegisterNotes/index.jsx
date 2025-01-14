import {Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import TakeNotesPage from "./TakeNotes";


const RegisterNotesMenu = () => {
    const navigate = useNavigate()

    return (
        <div className="main">
            <div className="main-menu" id="register-people">
                <Button text={"Registrar Notas"} onFunction={() => navigate("lista_de_turmas")} />
                <Button text={"Histórico de Notas"} onFunction={() => navigate("historico_de_chamadas")}/>
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Professor")}/>
            </div>
        </div>
    );
} 

const RegisterNotesPage = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<RegisterNotesMenu/>} />
                <Route path="lista_de_turmas/*" element={<TakeNotesPage/>} />
                <Route path="historico_de_chamadas" element={<></>} />
            </Routes>
        </>
    );
}

export default RegisterNotesPage;