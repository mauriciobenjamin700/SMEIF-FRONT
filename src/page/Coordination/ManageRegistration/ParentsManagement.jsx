import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../../../style/GenericRegister.scss";
import "./style/GenericManagement.scss";
import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import Button from "../../../components/Button/index.jsx";

import { put } from "../../../services/requests/index.js";
import { updateParent } from "../../../services/parent/index.js";


const   ParentManagementPage = () => {
    const navigate = useNavigate()

    const location = useLocation()

    const data = location.state || []

    const formatDateToInput = (date) => {
        if (!date) return ""; // Retorna vazio caso a data seja nula
        const [day, month, year] = date.split("/"); // Divide o formato BR
        return `${year}-${month}-${day}`; // Reorganiza para o formato yyyy-MM-dd
    };

    const [formData, setFormData] = useState({
        name: data.name,
        birth_date: data.birth_date,
        cpf: data.cpf,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        state: data.state,
        city: data.city,
        neighborhood: data.neighborhood,
        street: data.street,
        house_number: data.house_number,
        complement: data.complement,
    });

    const handleInputChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        console.log("ola mundo");
        const response = await updateParent(formData);
        console.log(response);
        if (response.statusCode >= 200 && response.statusCode < 300) {
            alert(response.responseBody.detail);
            //navigate("/Coordenacao/gerencia");
        }
    };

    return(
            <div className="main">
            <form action="" method="get">
                <h5>Dados Pessoais:</h5>
                <hr />
                <Input
                    text="Nome completo: *"
                    place={data.name}
                    value={data.name}
                    onChange={(value) => handleInputChange('name', value)}
                />
                <Input
                    type={"date"}
                    text="Data de nascimento:"
                    value={formatDateToInput(data.birth_date)}
                    onChange={(value) => handleInputChange('birth_date', value)}
            
                />
                <Input
                    text="CPF: *"
                    place={data.cpf}
                    value={data.cpf}
                    onChange={(value) => handleInputChange('cpf', value)}
                />
                
                <InputSelect 
                    text={"Sexo:"}
                    place={data.gender}
                    value={data.gender}
                    options={["Masculino", "Feminino"]}
                    onChange={(value) => handleInputChange('gender', value)}
                />

                <h5>Informações de contato:</h5>
                <hr />
                <Input
                    text="Telefone(fixo ou celular): *"
                    place={data.phone}
                    value={data.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                />
                <Input
                    text="Email: *"
                    place={data.email}
                    value={data.email}
                    type={"email"}
                    onChange={(value) => handleInputChange('email', value)}
                />

                <h5>Endereço:</h5>
                <hr />
                <Input
                    text="Estado:"
                    place={data.state}
                    value={data.state}
                    onChange={(value) => handleInputChange('state', value)}
                />
                <Input
                    text="Cidade:"
                    place={data.city}
                    value={data.city}
                    onChange={(value) => handleInputChange('city', value)}
                />
                <Input
                    text="Bairro:"
                    place={data.neighborhood}
                    value={data.neighborhood}
                    onChange={(value) => handleInputChange('neighborhood', value)}
                />
                <Input
                    text="Rua:"
                    place={data.street}
                    value={data.street}
                    onChange={(value) => handleInputChange('street', value)}
                />
                <Input
                    text="Número:"
                    place={data.house_number}
                    value={data.house_number}
                    onChange={(value) => handleInputChange('house_number', value)}
                />
                <Input
                    text="Complemento:"
                    place={data.complement}
                    value={data.complement}
                    onChange={(value) => handleInputChange('complement', value)}
                />
                <div className="botoes-de-lado">
                    <Button 
                        text={"Cancelar"} 
                        color={"#C97414"} 
                        onFunction={() => navigate("/Coordenacao/gerencia")}
                    />
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"} 
                        onFunction={handleSubmit}
                    />
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


export default ParentManagementPage;