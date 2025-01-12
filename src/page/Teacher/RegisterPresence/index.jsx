import {Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import TakeAttendancePage from "./TakeAttendance";


const RegisterPresenceMenu = () => {
    const navigate = useNavigate()

    return (
        <div className="main">
            <div className="main-menu" id="register-people">
                <Button text={"Realizar Chamadas"} onFunction={() => navigate("lista_de_turmas")} />
                <Button text={"Histórico de Chamadas Realizadas"} onFunction={() => navigate("historico_de_chamadas")}/>
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Professor")}/>
            </div>
        </div>
    );
} 

const RegisterPresencePage = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<RegisterPresenceMenu/>} />
                <Route path="lista_de_turmas/*" element={<TakeAttendancePage/>} />
                <Route path="historico_de_chamadas" element={<></>} />
            </Routes>
        </>
    );
}

export default RegisterPresencePage;