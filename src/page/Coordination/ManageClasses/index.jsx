
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

import RegisterNewClassPage from "./RegisterNewClass";
import RegisterDisciplinesPage from "./RegisterDisciplines";
import ManageClassPage from "./ManageClass";
import ManageDisciplinesPage from "./ManageDisciplines";
import SearchClass from "./SearchClass";

const ManageClassesPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu">
                <Button
                    text={"Gerenciar as Turmas"}
                    onFunction={() => navigate("gerenciar_turmas")}
                />      
                <Button
                    text={"Adicionar Nova Turma"}
                    onFunction={() => navigate("cadastrar_nova_turma")}
                />
                <Button
                    text={"Cadastro de Disciplinas"}
                    onFunction={() => navigate("registrar_disciplina")}
                />
                <Button
                    text={"Gerenciar Disciplinas"}
                    onFunction={() => navigate("gerenciar_disciplinas")}
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


const ManageClasses = () => {

    return(
        <Routes>
            <Route path="/" element={<ManageClassesPage/>}/>
            <Route path="gerenciar_turmas/*" element={<SearchClass/>}/>
            <Route path="cadastrar_nova_turma" element={<RegisterNewClassPage/>}/>
            <Route path="registrar_disciplina" element={<RegisterDisciplinesPage/>}/>
            <Route path="gerenciar_disciplinas" element={<ManageDisciplinesPage/>} />
        </Routes>
    );
};

export default ManageClasses