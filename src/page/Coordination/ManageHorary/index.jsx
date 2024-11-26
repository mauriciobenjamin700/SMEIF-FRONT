
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const ManageHoraryPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu">
            <Button
                text={"Registrar Horários"}
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
            <Route/>
            <Route/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default ManageHorary