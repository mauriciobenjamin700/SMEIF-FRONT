import {Route, Routes, useNavigate } from "react-router-dom";

import "./style/RegisterPeople.scss"

import Button from "../../../components/Button";
import ParentRegisterPage from "./ParentRegister";
import StudentRegisterPage from "./StudentRegister";
import TeacherRegisterPage from "./TeacherRegister";

import { useDispatch } from "react-redux";
import { setImage, setTitle } from "../../../services/redux/reduxers/headerSlice.js";


const RegisterMenu = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    dispatch(setImage({headerImage: true}))
    dispatch(setTitle({headerTitle: "Realizar Cadastro"}))

    return (
        <div className="main">
            <div className="main-menu" id="register-people">
                <Button text={"Cadastrar Pais/Responsáveis"} onFunction={() => navigate("cadastro_pais")} />
                <Button text={"Cadastrar Alunos"} onFunction={() => navigate("cadastro_aluno")}/>
                <Button text={"Cadastrar Professores"} onFunction={() => navigate("cadastro_professor")} />
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Coordenacao")}/>
            </div>
        </div>
    );
} 

const RegisterPage = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RegisterMenu/>} />
                <Route path="cadastro_pais" element={<ParentRegisterPage/>} />
                <Route path="cadastro_aluno" element={<StudentRegisterPage/>} />
                <Route path="cadastro_professor" element={<TeacherRegisterPage/>} />
            </Routes>
        </div>
    );
}

export default RegisterPage;