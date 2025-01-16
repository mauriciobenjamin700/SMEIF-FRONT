
import {Route, Routes, useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import TableSubject from "../../../components/Table/TableSubject.jsx";

import "./SearchSubjectPage.scss";
import TableParentDiscipline from "../../../components/Table/TableParentDisciplines.jsx";

const SearchSubjectPage = ({userType}) => {
    const navigate = useNavigate(); 

    return(
        <div className="main">
            <Input
                text={"Filtar frequência por matéria:"}
                place={"Inserir"}
            />
            <Button 
                text={"Filtrar"} 
                onFunction={() => searchStudent()}
            />

            <TableParentDiscipline/>
            
            <div className="botoes-de-lado">
                <Button
                color={"#E8B931"}
                text={"Sair"}
                onFunction={() => navigate("/Responsavel")}
                    
                />
            </div>  
                  
        </div>
    );
}

export default SearchSubjectPage;