
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";

const ManageClassesPage = () => {
    const navigate = useNavigate();

    return(
        <div className="main">
            <div className="main-menu">
                <Button
                    text={"Gerenciar as Turmas"}
                />      
                <Button
                    text={"Adicionar Nova Turma"}
                />
                <Button
                    text={"Cadastro de Disciplinas"}
                />
                <Button
                    text={"Gerenciar Disciplinas"}
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
            <Route/>
            <Route/>
            <Route/>
            <Route/>
        </Routes>
    );
};

export default ManageClasses