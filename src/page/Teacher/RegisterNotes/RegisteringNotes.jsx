import {Route, Routes, useLocation, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import TableTeacherDisciplines from "../../../components/Table/TableTeacherDisciplines";
import axios from "axios";
import API_URL from "../../../constants/api";
import { formatCPFResponse } from "../../../services/requests/base";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TableFrequency from "../../../components/Table/TableFrequency";
import TableNotes from "../../../components/Table/TableNotes";

const RegisteringNotes = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const location = useLocation()
    const event = location.state[0] || []
    const [students, setStudents] = useState([])

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`}

    const get_student = () => {
        axios.get(`${API_URL}student/list`, { headers }).then((response) => {
            setStudents(response.data)
        })
    }

    useEffect(() => {
        get_student()
    },[])   

    return (
        <>
            <div className="discipline_header">
                <h3>Matéria: {event.discipline.name}</h3>
                <h5>Data: {new Date().toLocaleDateString()}</h5>
                <h5>Horário: {new Date().getHours()}:{new Date().getMinutes().toString().padStart(2, '0')}</h5>
                <h5>Turma: {event.class_name}</h5>
                <h5>Tipo de Ensino: {event.discipline.education_level}</h5>
            </div>
            <TableNotes
                tittle={"Notas"}
                data={[students,event]}
                semester={location.state[1]}
                columns={["Alunos", "1º AV", "2º AV", "3º AV" ,"4º AV", "Média", "Situação"]}
            />
            <br />
            <Button
                text={"Voltar"}
                color={""}
                onFunction={() => navigate("/Professor/registro_de_notas/lista_de_turmas")}
            />
        </>
    );
} 

const RegisteringNotesPage = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<RegisteringNotes/>} />
                <Route path="realizar_chamada/*" element={<></>} />
            </Routes>
        </>
    );
}

export default RegisteringNotesPage;