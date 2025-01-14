
import { Routes, Route, useNavigate } from "react-router-dom";

import "../Teacher.scss";
import "./ViewHorary.scss";

import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import TableHorary from "../../../components/Table/TableHorary";
import axios from "axios";
import API_URL from "../../../constants/api";
import HORARY from "../../../constants/horary"
import { useEffect, useState } from "react";
import { formatCPFResponse } from "../../../services/requests/base";

const ViewHoraryPage = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([])
    const user = useSelector((state) => state.user)

    const filterEvents = () => { 
        const filtered_events = events.filter(event => event.teacher_cpf == formatCPFResponse(user.cpf))
        return filtered_events
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
    const requestEvents = () =>
    {
        axios.request(`${API_URL}classes/list-events`,{headers}).then((response) => {
        setEvents(response.data)
    })
    .catch((error) => {
        console.log(error)
    })}

    useEffect(() => {
        requestEvents()
    },[])   

    return (
        <div className="box-menu">
            <TableHorary
                columns={[
                    "Horários",
                    "Segunda-Feira",
                    "Terça-Feira",
                    "Quarta-Feira",
                    "Quinta-Feira",
                    "Sexta-Feira",
                    "Sábado"]}
                tittle={"Horário das Aulas"}
                data={filterEvents()}
                horarys={HORARY}

            />
            <Button
                text={"Voltar"}
                onFunction={() => navigate("/Professor")}
                color={"#E8B931"}
            />
        </div>
    );
};

export default ViewHoraryPage;
