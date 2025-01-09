import {Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";


const RegisterPresenceMenu = () => {
    const navigate = useNavigate()

    return (
        <div className="main">
            <div className="main-menu" id="register-people">
                <Button text={"Realizar Chamadas"} onFunction={() => navigate("realizar_chamada")} />
                <Button text={"Histórico de Chamadas Realizadas"} onFunction={() => navigate("historico_de_chamadas")}/>
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Professor")}/>
            </div>
        </div>
    );
} 

const RegisterPresencePage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RegisterPresenceMenu/>} />
                <Route path="realizar_chamada/*" element={<></>} />
                <Route path="historico_de_chamadas" element={<></>} />
            </Routes>
        </div>
    );
}

export default RegisterPresencePage;