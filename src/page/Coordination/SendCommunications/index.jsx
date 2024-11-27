
import { Route, Routes, useNavigate } from "react-router-dom";

import "./style/SendCommunications.scss";

import Button from "../../../components/Button";
import SearchRegister from "./SearchRegister";

const SendCommunicationsPage = () => {
    const navigate = useNavigate();

    return(
            <div className="main-menu">
                <Button
                    text={"Destinatário Único"}
                    onFunction={() => navigate("buscar_pai")}
                />      
                <Button
                    text={"Turma Específica"}
                    onFunction={() => navigate("buscar_turma")}
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
    );
};


const SendCommunications = () => {

    return(
        <Routes>
            <Route path="/" element={<SendCommunicationsPage/>}/>
            <Route path="/buscar_pai/*" element={<SearchRegister userType={1} />}/>
            <Route path="/buscar_turma/*" element={<SearchRegister userType={2} />}/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default SendCommunications