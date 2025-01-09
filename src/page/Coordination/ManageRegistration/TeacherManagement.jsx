import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios  from "axios";

import "../../Coordination/RegisterPeople/style/StudentRegister.scss";
import "../../../style/GenericRegister.scss";
import "./style/GenericManagement.scss";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import Button from "../../../components/Button/index.jsx";

import { dataLocals } from "../../../data/cities.json"


const TeacherManagementPage = () => {
    const navigate = useNavigate()

    const location = useLocation()
    
    const data = location.state || []

    const formatDateToInput = (date) => {
        if (!date) return ""; // Retorna vazio caso a data seja nula
        const [day, month, year] = date.split("/"); // Divide o formato BR
        return `${year}-${month}-${day}`; // Reorganiza para o formato yyyy-MM-dd
    };

    const saveChanges = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        axios.put(
            `${API_URL}teacher/update`, // URL base
            formData,                  // Corpo da requisição (data)
            {                          // Configurações adicionais
                params: {              // Query Parameters
                    name: data.name, 
                },
            }, { headers }
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

    const [formData, setFormData] = useState({
        cpf: data.user.cpf,
        name: data.user.name,
        birth_date: data.user.birth_date,
        gender: data.user.gender,
        phone: data.user.phone,
        email: data.user.email,
        password: "",
        confirmPassword: "",
        address: {
            state: data.user.state,
            city: data.user.city,
            neighborhood: data.user.neighborhood,
            street: data.user.street,
            house_number: data.user.house_number,
            complement: data.user.complement,
        }
        
    });

    const optionsStates = dataLocals.flatMap((local) => ([
        local.estado // Nome do estado, por exemplo, "Acre"
    ]));

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    return(
            <div className="main">
            <form action="" method="get">
                <h5>Dados Pessoais:</h5>
                <hr />
                    <Input
                        text="Nome completo: *"
                        place={data.user.name}
                        value={data.user.name}
                        onChange={(value) => handleInputChange('name', value)}
                    />
                    <Input
                        type={"date"}
                        text="Data de nascimento:"
                        value={formatDateToInput(data.user.birth_date)}
                        onChange={(value) => handleInputChange('birth_date', value)}
                
                    />
                    <Input
                        text="CPF: *"
                        place="Digite seu CPF"
                        value={data.user.cpf}
                        onChange={(value) => handleInputChange('cpf', value)}
                    />
                    
                    <InputSelect 
                        text={"Sexo:"}
                        place={"Selecione o sexo"}
                        options={["Masculino", "Feminino"]}
                        value={data.user.gender}
                        onChange={(value) => handleInputChange('gender', value)}
                    />

                <h5>Dados Profissionais:</h5>
                    <Input
                        text={"Disciplina que leciona:"}
                        place={"Informe a disciplina"}
                    />
                    <Input
                        text={"Ano/Serie que leciona:"}
                    />
                    {/* Tenho que fazer o botão daqui Depois
                    
                    NÃO ESQUECER

                    INCOMPLETO
                    */}

                <h5>Informações de contato:</h5>
                <hr />
                    <Input
                        text="Telefone(fixo ou celular): *"
                        place="Digite seu telefone"
                        value={data.user.phone}
                        onChange={(value) => handleInputChange('phone', value)}
                    />
                    <Input
                        text="Email: *"
                        place="Digite seu email"
                        type={"email"}
                        value={data.user.email}
                        onChange={(value) => handleInputChange('email', value)}
                    />

                <h5>Endereço:</h5>
                <hr />
                <InputSelect
                    text="Estado:"
                    place={data.user.state}
                    options={optionsStates}
                    onChange={(value) => handleInputChange('address.state', value)}
                />
                {console.log(data.user.state)}
                <InputSelect
                    text="Cidade:"
                    place={data.user.city}
                    options={dataLocals.find((local) => local.estado === formData.address.state)?.cidades || []}
                    onChange={(value) => handleInputChange('address.city', value)}
                />
                <Input
                    text="Bairro:"
                    place="Digite seu bairro"
                    value={data.user.neighborhood}
                    onChange={(value) => handleInputChange('neighborhood', value)}
                />
                <Input
                    text="Rua:"
                    place="Digite sua rua"
                    value={data.user.street}
                    onChange={(value) => handleInputChange('street', value)}
                />
                <Input
                    text="Número:"
                    place="Digite o número"
                    value={data.user.house_number}
                    onChange={(value) => handleInputChange('number', value)}
                />
                <Input
                    text="Complemento:"
                    place="Digite o complemento (opcional)"
                    value={data.user.complement}
                    onChange={(value) => handleInputChange('complement', value)}
                />

                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerencia")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} />
                </div>
                <div className="remove-button">
                    <Button 
                        text={"Remover"}
                        color={"#C00F0C"}
                    />
                </div>
            </form>
        </div>
    );
};


export default TeacherManagementPage;