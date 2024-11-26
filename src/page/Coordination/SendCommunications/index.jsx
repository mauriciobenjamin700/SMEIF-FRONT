
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const SendCommunicationsPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu">
                <Button
                    text={"Destinatário Único"}
                />      
                <Button
                    text={"Turma Específica"}
                />
                <Button
                    text={"Todos os Responsáveis"}
                />
                <Button
                    text={"Histórico de Comunicados Enviados"}
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


const SendCommunications = () => {

    return(
        <Routes>
            <Route path="/" element={<SendCommunicationsPage/>}/>
            <Route/>
            <Route/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default SendCommunications