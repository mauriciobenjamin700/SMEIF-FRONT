import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import InputCheck from "../../../components/InputCheck/index.jsx";
import "../../../style/GenericRegister.scss";
import "./style/ManageHorary.scss";
import Button from "../../../components/Button/index.jsx";

const RecurrenceForm = ({recurrence, onRecurrenceChange}) => {



    const handleInputChange = (index, field, value) => {
        const updatedRecurrence = recurrence.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        onRecurrenceChange(updatedRecurrence);
    };

    const handleCheckboxChange = (index) => {
        const updatedRecurrence = recurrence.map((item, i) =>
            i === index ? { ...item, checked: !item.checked } : item
        );
        onRecurrenceChange(updatedRecurrence);
    };

    const options = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00"]
    return (
        <div>
            <h5>Dias e Horários de Recorrência</h5>
            <form className="checklist">
                {recurrence.map((item, index) => (
                    <div className="checklist-row" key={index}>
                        <input
                            type="checkbox"
                            id={item.day_of_week}
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label htmlFor={item.day_of_week}>{item.day_of_week}</label>
                        <select className="input-select" defaultValue=""
                            onChange={(e) =>
                                handleInputChange(index, "start_time", e.target.value)
                            }
                        >
                            <option value="" disabled hidden>
                                Hora inicial
                            </option>

                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <select 
                            className="input-select" 
                            defaultValue=""
                            onChange={(e) =>
                                handleInputChange(index, "end_time", e.target.value)
                            }
                        >
                            <option value="" disabled hidden>
                                Hora final
                            </option>

                            {options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>

                    </div>
                ))}
            </form>
        </div>
    );
};



const RegisterHoraryPage = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        class_id: "",
        disciplines_id: null,
        teacher_id: "",
        start_date: "",
        end_date: "",
        recurrences: []
    });

    const [recurrence, setRecurrence] = useState([
        { day_of_week: "Segunda-feira", start_time: "", end_time: "", checked: false },
        { day_of_week: "Terça-feira", start_time: "", end_time: "", checked: false },
        { day_of_week: "Quarta-feira", start_time: "", end_time: "", checked: false },
        { day_of_week: "Quinta-feira", start_time: "", end_time: "", checked: false },
        { day_of_week: "Sexta-feira", start_time: "", end_time: "", checked: false },
    ]);

    const handleRecurrenceChange = (updatedRecurrence) => {
        setRecurrence(updatedRecurrence);

        // Gerar o recurrenceData a partir do recurrence atualizado
        const recurrenceData = updatedRecurrence
            .filter((item) => item.checked) // Apenas dias marcados
            .map(({ day_of_week, start_time, end_time }) => ({
                day_of_week,
                start_time,
                end_time,
            }));

        // Atualiza os recurrences no formData
        setFormData((prevData) => ({
            ...prevData,
            recurrences: recurrenceData,
        }));
    };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return(
            <div className="main">
            <form action="" method="get">
                <h5>Configuração de Recorrência:</h5>
                <hr />                
                <InputSelect 
                    text={"Turma:"}
                    place={"ex: 1º A"}
                    options={[]}
                    onChange={(value) => handleInputChange('teaching', value)}
                />
                <InputSelect 
                    text={"Disciplina: *"}
                    place={'ex: Matematica'}
                    options={[]}
                    onChange={(value) => handleInputChange('year', value)}
                />
                <InputSelect 
                    text={"Professor:"}
                    place={'ex: "Fulano"'}
                    options={[]}
                    onChange={(value) => handleInputChange('class', value)}
                />
                <h5>Período de Recorrência</h5>
                <hr />
                <Input
                    type={"date"}
                    text={"Início:"}
                    onChange={(value) => handleInputChange('start_date', value)}
                />
                <Input
                    text={"Fim:"}
                    type={"date"}
                    onChange={(value) => handleInputChange('end_date', value)}
                />
                <RecurrenceForm 
                    recurrence={recurrence}
                    onRecurrenceChange={handleRecurrenceChange}
                />


                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} onFunction={() => console.log(formData.recurrences)}/>
                </div>
            </form>
        </div>
    );
};


export default RegisterHoraryPage;