
import { Route, Routes, useNavigate } from "react-router-dom";

import "./style/RegisterOccurrences.scss";

import Button from "../../../components/Button";
import SearchStudent from "./SearchStudent";

const RegisterOccurrencesPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu" id="register-occurrences">
                <Button
                    text={"Registrar"}
                    onFunction={() => navigate("buscar_aluno")}
                />      
                <Button
                    text={"Visualizar"}
                    onFunction={() => navigate("visualizar_ocorrencias")}
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
            <Route path="buscar_aluno/*" element={<SearchStudent/>}/>
            <Route path="visualizar_ocorrencias/*" element={<></>}/>
        </Routes>
    );
};

export default RegisterOccurrences