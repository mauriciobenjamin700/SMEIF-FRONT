
import {Route, Routes, useNavigate } from "react-router-dom";

import "./style/SearchRegister.scss";
import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import ParentManagementPage from "./ParentsManagement.jsx";
import StudentRegisterPage from "../../Coordination/RegisterPeople/StudentRegister.jsx";
import TeacherRegisterPage from "../../Coordination/RegisterPeople/TeacherRegister.jsx";
import StudentManagementPage from "./StudentManagement.jsx";
import TeacherManagementPage from "./TeacherManagement.jsx";

const SearchRegisterPage = ({userType}) => {
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
                    onFunction={() => navigate("/Coordenacao/gerencia")}
                
                />
                <Button
                    text={"Buscar"}
                    onFunction={() => {
                        switch (userType) {
                            case 1:
                                navigate("modificar_pai")
                                break;
                            case 2:
                                navigate("modificar_aluno")
                                break;
                            case 3:
                                navigate("modificar_professor")
                                break;
                        }
                    }}
                />
            </div>
            <Button
                text={"Visualizar Todos"}

            />
        
        </div>
    );
}

const SearchRegister = ({userType}) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchRegisterPage userType={userType}/>} />
                <Route path="modificar_pai/" element={<ParentManagementPage/>} />
                <Route path="modificar_aluno/" element={<StudentManagementPage/>} />
                <Route path="modificar_professor/" element={<TeacherManagementPage/>} />
            </Routes>
        </div>
    );
}


export default SearchRegister;