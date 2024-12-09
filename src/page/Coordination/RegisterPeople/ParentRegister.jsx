import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

import API_URL from "../../../constants/api.ts"
import { dataLocals } from "../../../data/cities.json"
import { formatAPIResponse} from "../../../services/requests/base.ts"
import UserRoles from "../../../constants/users.ts";

const ParentRegisterPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        cpf: "",
        name: "",
        birth_date: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
        level:UserRoles.Pais,
        confirmPassword: "",
        address: {
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            house_number: "",
            complement: "",
        }
        
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [sucess, setSucess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const registerUser = () => {
        if(formData.password.length > 7){
            if(formData.password == formData.confirmPassword){
                axios.post(`${API_URL}user/add`, formData)
                .then((response) => {
                    setModalText(formatAPIResponse(response.request.response))
                    openModal()
                    setSucess(true)
                })
                .catch((err) => {
                    const errMsg = formatAPIResponse(err.request.response)
                    setModalText(errMsg)
                    openModal()
                })
            }
            else{
                setModalText("As senhas devem ser iguais")
                openModal()
            }
        }
        else{
            setModalText("A senha deve possuir no minimo 8 caracteres")
            openModal()
        }

    }

    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            // Verifica se o campo é aninhado
            if (field.includes('.')) {
                const [parentField, childField] = field.split('.');
                return {
                    ...prevData,
                    [parentField]: {
                        ...prevData[parentField], // Mantém o restante das propriedades
                        [childField]: value, // Atualiza apenas o campo específico
                    },
                };
            }
            // Campo não aninhado
            return {
                ...prevData,
                [field]: value,
            };
        });
    };
    

    const optionsStates = dataLocals.flatMap((local) => ([
        local.estado // Nome do estado, por exemplo, "Acre"
    ]));


    
    return(
            <div className="main">
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
                <h5>Dados Pessoais:</h5>
                <hr />
                <Input
                    text="Nome completo: "
                    place="Digite seu nome completo"
                    onChange={(value) => handleInputChange('name', value)}
                />
                <Input
                    type={"date"}
                    text="Data de nascimento:"
                    place="DD/MM/AAAA"
                    onChange={(value) => handleInputChange('birth_date', value)}
            
                />
                <Input
                    text="CPF:"
                    place="Digite seu CPF"
                    onChange={(value) => handleInputChange('cpf', value)}
                />
                
                <InputSelect 
                    text={"Sexo:"}
                    place={"Selecione o sexo"}
                    options={["M", "F"]}
                    onChange={(value) => handleInputChange('gender', value)}
                />

                <h5>Informações de contato:</h5>
                <hr />
                <Input
                    text="Telefone(fixo ou celular): "
                    place="Digite seu telefone"
                    onChange={(value) => handleInputChange('phone', value)}
                />
                <Input
                    text="Email: "
                    place="Digite seu email"
                    type={"email"}
                    onChange={(value) => handleInputChange('email', value)}
                />

                <h5>Endereço:</h5>
                <hr />
                <InputSelect
                    text="Estado:"
                    place="Digite seu estado"
                    options={optionsStates}
                    onChange={(value) => handleInputChange('address.state', value)}
                />
                <InputSelect
                    text="Cidade:"
                    place="Digite sua cidade"
                    options={dataLocals.find((local) => local.estado === formData.address.state)?.cidades || []}
                    onChange={(value) => handleInputChange('address.city', value)}
                />
                <Input
                    text="Bairro:"
                    place="Digite seu bairro"
                    onChange={(value) => handleInputChange('address.neighborhood', value)}
                />
                <Input
                    text="Rua:"
                    place="Digite sua rua"
                    onChange={(value) => handleInputChange('address.street', value)}
                />
                <Input
                    text="Número:"
                    place="Digite o número"
                    onChange={(value) => handleInputChange('address.house_number', value)}
                />
                <Input
                    text="Complemento:"
                    place="Digite o complemento (opcional)"
                    onChange={(value) => handleInputChange('address.complement', value)}
                />

                <h5>Senha:</h5>
                <hr />
                <Input
                    text={"Senha: "}
                    place={"Crie uma senha"}
                    type={"password"}
                    onChange={(value) => handleInputChange('password',value)}
                />
                <Input
                    text={"Confirmar Senha: "}
                    place={"Insira a mesma senha"}
                    type={"password"}
                    onChange={(value) => handleInputChange('confirmPassword',value)}
                />
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/cadastro")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} onFunction={() => registerUser()} />
                </div>
            </form>
        </div>
    );
};


export default ParentRegisterPage;