import {Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import TableTeacherDisciplines from "../../../components/Table/TableTeacherDisciplines2";
import axios from "axios";
import API_URL from "../../../constants/api";
import { formatCPFResponse } from "../../../services/requests/base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RegisteringNotesPage from "./RegisteringNotes";

const TakeNotes = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const [events, setEvents] = useState([]) 

    return (
        <>
            <TableTeacherDisciplines
                tittle={"Disciplinas que Leciona"}
                columns={["Disciplina","Tipo de Ensino","Carga Horaria","Turma","Ação"]}
                functions={[navigate]}
            
            />
            <br />
            <Button
                text={"Voltar"}
                color={""}
                onFunction={() => navigate("/Professor/registro_de_notas/")}
            />
        </>
    );
} 

const TakeNotesPage = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<TakeNotes/>} />
                <Route path="registrando_notas/*" element={<RegisteringNotesPage/>} />
            </Routes>
        </>
    );
}

export default TakeNotesPage;