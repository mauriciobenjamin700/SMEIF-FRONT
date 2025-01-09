import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";
import API_URL from "../../../constants/api.ts";


const ManageDisciplinesPage = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const data = location.state || {}

    const [formData, setFormData] = useState({
        name: data.name,
    });

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [sucess, setSucess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isModalDeleteOpen, setisModalDeleteOpen] = useState(false);
    const openModalDelete = () => setisModalDeleteOpen(true);
    const closeModalDelete = () => setisModalDeleteOpen(false);
    
    const deleteDisciplines = () => {
        axios.delete(`${API_URL}disciplines/delete`, {
            params: {
                discipline_name: data.name,
            },
            headers
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
            `${API_URL}disciplines/update`, // URL base
            formData,                  // Corpo da requisição (data)
            {                          // Configurações adicionais
                params: {              // Query Parameters
                    name: data.name, 
                },
                headers
            }
        )
        .then((response) => {
            console.log(response);
            setSucess(true)
            openModal()
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
                        onFunction={() => {deleteDisciplines()}}
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
                    place={data.name}
                    onChange={(value) => handleInputChange('name', value)}
                />
                <InputSelect 
                    text={"Tipo de Ensino:"}
                    place={'ex: Infantil'}
                    options={[]}
                    onChange={(value) => handleInputChange('year', value)}
                />
                <Input 
                    text={"Carga Horária:"}
                    place={'Informe a carga horaria'}
                    options={[]}
                    onChange={(value) => handleInputChange('class', value)}
                />
                <InputSelect 
                    text={"Ano/Série:"}
                    place={"Informe o Turno"}
                    options={["Matutino","Vespertino","Noturno","Integral"]}
                    onChange={(value) => handleInputChange('shift', value)}
                />                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} onFunction={() => saveChanges()} />
                </div>

                <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>
                <Button 
                text={'Remover'}
                color={'#C00F0C'}
                />
                </div>
            </form>
        </div>
    );
};


export default ManageDisciplinesPage;