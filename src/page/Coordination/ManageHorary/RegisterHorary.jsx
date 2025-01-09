import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import InputCheck from "../../../components/InputCheck/index.jsx";
import "../../../style/GenericRegister.scss";
import "./style/ManageHorary.scss";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

import { get_classes, get_disciplines, get_teachers } from "../../../services/requests/get.js";
import axios from "axios";
import API_URL from "../../../constants/api.ts";
import { formatAPIResponse, formatCPFResponse } from "../../../services/requests/base.ts";

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
            <div className="checklist">
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
            </div>
        </div>
    );
};



const RegisterHoraryPage = () => {
    const navigate = useNavigate()

    const [optionDisciplines, setOptionDisciplines] = useState([])
    const [optionClasses, setOptionClasses] = useState([])
    const [optionTeachers, setOptionTeachers] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [success, setsuccess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getTeachers = async () => {
        const teachers = await get_teachers();
        setOptionTeachers(teachers.map(obj => obj.user.name +" "+ obj.user.cpf))
    }

    const getDisciplines = async () => {
        const disciplines = await get_disciplines();
        setOptionDisciplines(disciplines.map(obj => obj.name)); // `map` já pode ser usado sem `await`
    }

    const getClasses = async () => {
        const classes = await get_classes();
        setOptionClasses(classes.map(obj => obj.class_info)); // `map` já pode ser usado sem `await`
    }

    const [formData, setFormData] = useState({
        class_id: "",
        disciplines_id: "",
        teacher_id: "",
        start_date: "",
        end_date: "",
        recurrences: []
    });

    const filterTeacher = async (teacher_id) => {
        teacher_id = teacher_id.match(/\b\d{3}\.\d{3}\.\d{3}-\d{2}\b/);
        console.log(teacher_id);
        const teachers = await get_teachers();
        const teacherObj = teachers.find(obj => obj.user.cpf == teacher_id);
        console.log(teacherObj)
        if(teacherObj){
            addTeacher(formatCPFResponse(teacherObj.user.cpf))
        }
        else{
            console.log("Professor não encontrado")
        }
    }
    
    const filterClass = async (classes_info) => {
        const classes = await get_classes();
        const classObj = classes.find(obj => obj.class_info == classes_info);
        if (classObj) {
            addClass(classObj.id)
        } else {
          console.log("Classe não encontrada!");
        }
      };

    const filterDisciplines = async (disciplines_name) => {
        const disciplines = await get_disciplines();
        const disciplineObj = disciplines.find(obj => obj.name == disciplines_name);
        
        if (disciplineObj) {
            addDisciplines(disciplineObj.id)
        } else {
          console.log("Disciplina não encontrada!");
        }
      };

    const addTeacher = (teacher_id) => {
        setFormData((prevData) => ({
            ...prevData,
            teacher_id: teacher_id
        }))
    }
    
    const addDisciplines = (new_discipline) => {
            setFormData((prevData) => ({
                ...prevData,
                disciplines_id: new_discipline
            }))
    }

    const addClass = (new_class) => {
            setFormData((prevData) => ({
                ...prevData,
                class_id: new_class
            }))
    }

    useEffect(() => {
        const fetchTeachers = () => {
            if (optionTeachers.length == 0){
                getTeachers()
            }
        };
        fetchTeachers();
        const fetchClasses = async () => {
            if (optionClasses.length == 0) {
            getClasses() // Armazena as classes no estado
            }
        };
        fetchClasses();

        const fetchDisciplines = async () => {
            if (optionDisciplines.length == 0) {
                getDisciplines()
            }
        };
        fetchDisciplines();
    }, []);

    const [recurrence, setRecurrence] = useState([
        { day_of_week: "Segunda", start_time: "", end_time: "", checked: false },
        { day_of_week: "Terça", start_time: "", end_time: "", checked: false },
        { day_of_week: "Quarta", start_time: "", end_time: "", checked: false },
        { day_of_week: "Quinta", start_time: "", end_time: "", checked: false },
        { day_of_week: "Sexta", start_time: "", end_time: "", checked: false },
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

    const register_horary = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        console.log(formData)

        axios.post(`${API_URL}classes/add-event`,formData, { headers })
        .then((response) => {
            setModalText(formatAPIResponse(response.request?.response))
            setsuccess(true)
            openModal()
        })
        .catch((error) => {
            setModalText(formatAPIResponse(error.request?.response))
            openModal()
        })
    }

    return(
            <div className="main">
            <form action="" method="get">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {(success && <>
                    <h2>Cadastro realizado com sucesso!</h2>
                    <p>{modalText}</p>
                    <Button 
                        onFunction={() => navigate("/Coordenacao/cadastro")}
                        text={"Fechar"}
                    />
                
                </>)}
                {(!success && <>
                    <h2>Erro ao realizar cadastro </h2>
                    <p>{modalText}</p>
                    <Button 
                        onFunction={() => closeModal()}
                        text={"Fechar"}
                    />
                </>)
                }
            </Modal>
                <h5>Configuração de Recorrência:</h5>
                <hr />                
                <InputSelect 
                    text={"Turma:"}
                    place={"ex: 1º A"}
                    options={optionClasses}
                    onChange={(value) => filterClass(value)}
                />
                <InputSelect 
                    text={"Disciplina: *"}
                    place={'ex: Matematica'}
                    options={optionDisciplines}
                    onChange={(value) => filterDisciplines(value)}
                />
                <InputSelect 
                    text={"Professor:"}
                    place={'ex: "Fulano"'}
                    options={optionTeachers}
                    onChange={(value) => filterTeacher(value)}
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
                    <Button 
                        text={"Cancelar"} 
                        color={"#C97414"} 
                        onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"} 
                        onFunction={() => {register_horary()}}/>
                </div>
            </form>
        </div>
    );
};


export default RegisterHoraryPage;