
import { Route, Routes, useNavigate } from "react-router-dom";

import "./style/ManageHorary.scss";

import Button from "../../../components/Button";
import RegisterHoraryPage from "./RegisterHorary";

const ManageHoraryPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu" id="manage-horary">
            <Button
                text={"Registrar Horários"}
                onFunction={() => navigate("registrar_horarios")}
            />      
            <Button
                text={"Visualizar"}
            />
            <Button
                text={"Voltar"}
                color={"#E8B931"}
                onFunction={() => navigate("/Coordenacao")}
            />
            </div>
        </div>
    );
};


const ManageHorary = () => {

    return(
        <Routes>
            <Route path="/" element={<ManageHoraryPage/>}/>
            <Route path="registrar_horarios" element={<RegisterHoraryPage/>} />
            <Route/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default ManageHorary