
import {Route, Routes, useNavigate } from "react-router-dom";

import "./style/SearchRegister.scss";
import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";
import ParentManagementPage from "./ParentsManagement.jsx";
import StudentManagementPage from "./StudentManagement.jsx";
import TeacherManagementPage from "./TeacherManagement.jsx";
import SearchParent from "./SearchParent.jsx";
import SearchStudent from "./SearchStudent.jsx";
import SearchTeacher from "./SearchTeacher.jsx";

const SearchRegisterPage = ({userType}) => {
    const navigate = useNavigate(); 
    console.log(userType);

    
    const navigateToSearch = () => {
        if (userType === 1){
            navigate("buscar_pai")
        } else if (userType === 2){
            navigate("buscar_aluno")
        }else{
            navigate("buscar_professor")
        }
    }

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
                onFunction={() => navigateToSearch()} 
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
                <Route path="buscar_pai/*" element={<SearchParent/>} />
                <Route path="buscar_aluno/*" element={<SearchStudent/>} />
                <Route path="buscar_professor/*" element={<SearchTeacher/>} />
            </Routes>
        </div>
    );
}


export default SearchRegister;