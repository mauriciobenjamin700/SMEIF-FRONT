
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const RegisterOccurrencesPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu">
                <Button
                    text={"Registrar"}
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


const RegisterOccurrences = () => {

    return(
        <Routes>
            <Route path="/" element={<RegisterOccurrencesPage/>}/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default RegisterOccurrences