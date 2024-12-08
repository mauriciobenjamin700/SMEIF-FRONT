
import {Route, Routes, useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import RegisterOccurrencesPage from "./RegisterOccurrences.jsx";

const SearchStudentPage = ({userType}) => {
    const navigate = useNavigate(); 

    return(
        <div className="main">
            <Input
                text={"Buscar"}
                place={"Informe o CPF"}
            />
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/registrar_ocorrencias")}
                
                />
                <Button
                    text={"Buscar"}
                    color={"#14AE5C"}
                    onFunction={() => navigate("gerar_ocorrencias")}
                />
            </div>        
        </div>
    );
}

const SearchStudent = ({userType}) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchStudentPage userType={userType}/>} />
                <Route path="gerar_ocorrencias" element={<RegisterOccurrencesPage/>} />
            </Routes>
        </div>
    );
}


export default SearchStudent;