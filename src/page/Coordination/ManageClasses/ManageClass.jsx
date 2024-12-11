import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";
import API_URL from "../../../constants/api.ts";
import Modal from "../../../components/Modal/index.jsx";

const ManageClassPage = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const data = location.state || {}

    const [formData, setFormData] = useState({
        education_level: data.education_level,
        name: data.name,
        section: data.section,
        shift: data.shift,
        max_students: data.max_students,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [sucess, setSucess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalDeleteOpen, setisModalDeleteOpen] = useState(false);
    const openModalDelete = () => setisModalDeleteOpen(true);
    const closeModalDelete = () => setisModalDeleteOpen(false);
    
    const deleteClass = () => {
        axios.delete(`${API_URL}classes/delete`, {
            params: {
                class_id: data.id,
            }
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error.response);
        });
    };

    const saveChanges = () => {
        
        axios.put(
            `${API_URL}classes/update`, // URL base
            formData,                  // Corpo da requisição (data)
            {                          // Configurações adicionais
                params: {              // Query Parameters
                    class_id: data.id, 
                },
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error.response);
            console.log("deu ruim");
        });
    };
    

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return(
            <div className="main">
            <Modal isOpen={isModalDeleteOpen} onClose={closeModalDelete}>
                <>
                    <h2>Tem certeza que deseja remover essa turma?</h2>
                    <Button 
                        onFunction={() => closeModalDelete()}
                        text={"Não"}
                    />
                    <Button 
                        onFunction={() => {deleteClass()}}
                        color={"red"}
                        text={"Sim"}
                        
                    />
                </>
            </Modal>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {(sucess && <>
                    <h2>Cadastro realizado com sucesso!</h2>
                    <p>{modalText}</p>
                    <Button 
                        onFunction={() => navigate("/Coordenacao/cadastro")}
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
                    place={data.education_level}
                    options={["Infantil","Fundamental"]}
                    onChange={(value) => handleInputChange('education_level', value)}
                />
                <InputSelect 
                    text={"Ano/Série: *"}
                    place={data.name}
                    options={["5º Ano","6º Ano"]}
                    
                    onChange={(value) => handleInputChange('name', value)}
                />
                <InputSelect 
                    text={"Turma/Classe:"}
                    place={data.section}
                    options={["A","B"]}
                    onChange={(value) => handleInputChange('section', value)}
                />
                <InputSelect 
                    text={"Turno:"}
                    place={data.shift}
                    options={["Matutino","Vespertino","Noturno"]}
                    onChange={(value) => handleInputChange('shift', value)}
                />
                <Input
                    text={"Capacidade Máxima:"}
                    place={data.max_students}
                    onChange={(value) => handleInputChange('max_students', value)}
                />
                
                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"}
                        onFunction={() => saveChanges()}
                    />
                </div>
                <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
                <Button 
                text={'Remover'}
                color={'#C00F0C'}
                onFunction={() => openModalDelete()}
                />
                </div>
            </form>
        </div>
    );
};


export default ManageClassPage;