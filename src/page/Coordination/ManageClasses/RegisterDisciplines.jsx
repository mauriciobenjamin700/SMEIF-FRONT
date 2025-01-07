import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

import "../../../style/GenericRegister.scss";

import API_URL from "../../../constants/api.ts";
import { formatAPIResponse } from "../../../services/requests/base.ts";
import { get_classes } from "../../../services/requests/get.js";

const RegisterDisciplinesPage = () => {
    const haveClasses = useState(false)
    const navigate = useNavigate()
    const [optionClasses, setOptionClasses] = useState([])

    const getClasses = async () => {
        const classes = await get_classes();
        setOptionClasses(classes.map(obj => obj.class_info)); // `map` já pode ser usado sem `await`
    }

    const [formData, setFormData] = useState({
        name: '',
        education_level: "",
        duration: null,
        class_name: ""
    });

    const registerDiscipline = () => {
        setFormData((prevData) => ({
            ...prevData,
            duration: parseFloat(prevData.duration)
        }));
        axios.post(`${API_URL}disciplines/add`,formData)
        .then((response) => {
            setModalText(formatAPIResponse(response.request.response))
            setSucess(true)
            openModal()
        })
        .catch((err) => {
            console.log(err.request)
            setModalText(formatAPIResponse(err.request.response))
            openModal()
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [sucess, setSucess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    useEffect(() => {

        const fetchClasses = async () => {
            if (optionClasses.length == 0) {
            getClasses() // Armazena as classes no estado
            }
        };
        fetchClasses();
    }, []);

    return(
            <div className="main">
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {(sucess && <>
                        <h2>Cadastro realizado com sucesso!</h2>
                        <p>{modalText}</p>
                        <Button 
                            onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}
                            text={"Fechar"}
                        />
                    
                    </>)}
                    {(!sucess && <>
                        <h2>Erro ao realizar cadastro </h2>
                        <p>{modalText}</p>
                        <Button 
                            onFunction={() => closeModal()}
                            text={"Fechar"}
                        />
                    </>)
                    }
                </Modal>
            <form action="" method="get">
                <h5>Dados Acadêmicos:</h5>
                <hr />                
                <Input 
                    text={"Nome da Disciplina:"}
                    place={"Insira o nome da disciplina"}
                    onChange={(value) => handleInputChange('name', value)}
                />
                <InputSelect 
                    text={"Tipo de Ensino:"}
                    place={'ex: Infantil'}
                    options={["Infantil", "Fundamental", "Médio"]}
                    onChange={(value) => handleInputChange('education_level', value)}
                />
                <Input 
                    text={"Carga Horária:"}
                    place={'Informe a carga horaria'}
                    onChange={(value) => handleInputChange('duration', value)}
                />
                <InputSelect 
                    text={"Turma:"}
                    place={"Selecione a Turma"}
                    options={[optionClasses]}
                    onChange={(value) => handleInputChange('class_name', value)}
                />
                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} onFunction={() => registerDiscipline()} />
                </div>
            </form>
        </div>
    );
};


export default RegisterDisciplinesPage;