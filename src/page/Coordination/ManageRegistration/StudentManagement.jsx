import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../../Coordination/RegisterPeople/style/StudentRegister.scss";
import "../../../style/GenericRegister.scss";
import "./style/GenericManagement.scss";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";

import Button from "../../../components/Button/index.jsx";


const StudentManagementPage = () => {
    const location = useLocation()

    const data = location.state || []


    const navigate = useNavigate()    

    const [firstResponsible, setFirstResponsible] = useState({
        kinship: "",
        responsibleCpf: "",
    });

    const [secondResponsible, setSecondResponsible] = useState(null); // Começa como nulo para adicionar dinamicamente

    const addSecondResponsible = () => {
        setSecondResponsible({
            kinship: "",
            responsibleCpf: "",
        });
    };

    const removeSecondResponsible = () => {
        setSecondResponsible(null); // Remove o segundo responsável
    };

    console.log(data)

    const [formData, setFormData] = useState({
        name: data.name,
        birth_date: data.birth_date,
        cpf: data.cpf,
        gender: data.gender,
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
                <h5>Relação com Pais/Responsáveis:</h5>
                <hr />

                <div className="responsible-field">
                <Input
                    text="Tipo de Relação (1):"
                    place="Selecione o tipo de relação"
                    onChange={(value) =>
                        setFirstResponsible((prev) => ({
                            ...prev,
                            kinship: value,
                        }))
                    }
                    value={firstResponsible.kinship}
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
                                kinship: value,
                            }))
                        }
                        value={secondResponsible.kinship}
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
                        onFunction={() => navigate("/Coordenacao/gerencia")}
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