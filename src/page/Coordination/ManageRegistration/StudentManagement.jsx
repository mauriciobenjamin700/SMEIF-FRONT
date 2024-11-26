import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../Coordination/RegisterPeople/style/StudentRegister.scss";
import "../../../style/GenericRegister.scss";
import "./style/GenericManagement.scss";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";

import Button from "../../../components/Button/index.jsx";


const StudentManagementPage = () => {
    const navigate = useNavigate()    

    const [firstResponsible, setFirstResponsible] = useState({
        relationship: "",
        responsibleCpf: "",
    });

    const [secondResponsible, setSecondResponsible] = useState(null); // Começa como nulo para adicionar dinamicamente

    const addSecondResponsible = () => {
        setSecondResponsible({
            relationship: "",
            responsibleCpf: "",
        });
    };

    const removeSecondResponsible = () => {
        setSecondResponsible(null); // Remove o segundo responsável
    };


    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        cpf: '',
        gender: '',
        year: '',
        class: '',
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

                <h5>Dados Acadêmicos:</h5>
                <hr />
                <InputSelect 
                    text={"Ano/Série: *"}
                    place={"Selecione o ano/série do aluno"}
                    options={[]}
                    onChange={(value) => handleInputChange('year', value)}
                />

                <InputSelect
                    text={"Turma/Classe:"}
                    place={"Selecione a turma/classe do aluno"}
                    options={[]}
                    onChange={(value) => handleInputChange('class',value)}
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

                <h5>Relação com Pais/Responsáveis:</h5>
                <hr />

                <div className="responsible-field">
                <Input
                    text="Tipo de Relação (1):"
                    place="Selecione o tipo de relação"
                    onChange={(value) =>
                        setFirstResponsible((prev) => ({
                            ...prev,
                            relationship: value,
                        }))
                    }
                    value={firstResponsible.relationship}
                />
                <Input
                    text="CPF do Pai/Responsável (1):"
                    place="Informe o CPF"
                    onChange={(value) =>
                        setFirstResponsible((prev) => ({
                            ...prev,
                            responsibleCpf: value,
                        }))
                    }
                    value={firstResponsible.responsibleCpf}
                />
            </div>

            {/* Segundo Responsável */}
            {secondResponsible && (
                <div className="responsible-field">
                    <Input
                        text="Tipo de Relação (2):"
                        place="Selecione o tipo de relação"
                        onChange={(value) =>
                            setSecondResponsible((prev) => ({
                                ...prev,
                                relationship: value,
                            }))
                        }
                        value={secondResponsible.relationship}
                    />
                    <Input
                        text="CPF do Pai/Responsável (2):"
                        place="Informe o CPF"
                        onChange={(value) =>
                            setSecondResponsible((prev) => ({
                                ...prev,
                                responsibleCpf: value,
                            }))
                        }
                        value={secondResponsible.responsibleCpf}
                    />
                    <Button
                        className="responsible-button"
                        text="Remover Responsável"
                        onFunction={removeSecondResponsible}
                    />
                </div>
            )}

            {!secondResponsible && (
                <Button className="responsible-button" text="Adicionar Outro Responsável" onFunction={addSecondResponsible} />
            )}

                <div className="botoes-de-lado">
                    <Button 
                        text={"Cancelar"} 
                        color={"#C97414"} 
                        onFunction={() => navigate("/Coordenacao/cadastro")}
                    />
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"} 
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


export default StudentManagementPage;