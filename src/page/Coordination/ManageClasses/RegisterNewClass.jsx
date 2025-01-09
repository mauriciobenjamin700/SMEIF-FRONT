import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../constants/api.ts"

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";
import { formatAPIResponse } from "../../../services/requests/base.ts";



const RegisterNewClassPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        education_level: "",
        name: "",
        section: "",
        shift: "",
        max_students: "",
    });

    const registerClass = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        axios.post(`${API_URL}classes/add`,formData, { headers })
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
                <InputSelect 
                    text={"Tipo de Ensino:"}
                    place={"ex:Fundamental"}
                    options={["Fundamental"]}
                    onChange={(value) => handleInputChange('education_level', value)}
                />
                <InputSelect 
                    text={"Ano/Série: *"}
                    place={'ex: "5º Ano"'}
                    options={["5º Ano"]}
                    onChange={(value) => handleInputChange('name', value)}
                />
                <InputSelect 
                    text={"Turma/Classe:"}
                    place={'ex: "A"'}
                    options={["A"]}
                    onChange={(value) => handleInputChange('section', value)}
                />
                <InputSelect 
                    text={"Turno:"}
                    place={"Informe o Turno"}
                    options={["Matutino","Vespertino","Noturno","Integral"]}
                    onChange={(value) => handleInputChange('shift', value)}
                />
                <Input
                    text={"Capacidade Máxima:"}
                    place={"Informe a capacidade máxima da turma"}
                    onChange={(value) => handleInputChange('max_students', parseInt(value))}
                />
                
                
                <div className="botoes-de-lado">
                    <Button 
                        text={"Cancelar"} 
                        color={"#C97414"} 
                        onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}
                    />
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"} 
                        onFunction={() => registerClass()}
                    />
                </div>
            </form>
        </div>
    );
};


export default RegisterNewClassPage;