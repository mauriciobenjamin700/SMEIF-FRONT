import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";


const ParentRegisterPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        cpf: '',
        gender: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complement: '',
    });

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
                    place="Digite seu nome completo"
                    onChange={(value) => handleInputChange('name', value)}
                />
                <Input
                    type={"date"}
                    text="Data de nascimento:"
                    place="DD/MM/AAAA"
                    onChange={(value) => handleInputChange('birthDate', value)}
            
                />
                <Input
                    text="CPF: *"
                    place="Digite seu CPF"
                    onChange={(value) => handleInputChange('cpf', value)}
                />
                
                <InputSelect 
                    text={"Sexo:"}
                    place={"Selecione o sexo"}
                    options={["Masculino", "Feminino"]}
                    onChange={(value) => handleInputChange('gender', value)}
                />

                <h5>Informações de contato:</h5>
                <hr />
                <Input
                    text="Telefone(fixo ou celular): *"
                    place="Digite seu telefone"
                    onChange={(value) => handleInputChange('phone', value)}
                />
                <Input
                    text="Email: *"
                    place="Digite seu email"
                    type={"email"}
                    onChange={(value) => handleInputChange('email', value)}
                />

                <h5>Endereço:</h5>
                <hr />
                <Input
                    text="Estado:"
                    place="Digite seu estado"
                    onChange={(value) => handleInputChange('state', value)}
                />
                <Input
                    text="Cidade:"
                    place="Digite sua cidade"
                    onChange={(value) => handleInputChange('city', value)}
                />
                <Input
                    text="Bairro:"
                    place="Digite seu bairro"
                    onChange={(value) => handleInputChange('neighborhood', value)}
                />
                <Input
                    text="Rua:"
                    place="Digite sua rua"
                    onChange={(value) => handleInputChange('street', value)}
                />
                <Input
                    text="Número:"
                    place="Digite o número"
                    onChange={(value) => handleInputChange('number', value)}
                />
                <Input
                    text="Complemento:"
                    place="Digite o complemento (opcional)"
                    onChange={(value) => handleInputChange('complement', value)}
                />
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/cadastro")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} />
                </div>
            </form>
        </div>
    );
};


export default ParentRegisterPage;