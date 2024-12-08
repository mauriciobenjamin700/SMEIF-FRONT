import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import InputCheck from "../../../components/InputCheck/index.jsx";
import "../../../style/GenericRegister.scss";
import "./style/ManageHorary.scss";
import Button from "../../../components/Button/index.jsx";


const RegisterHoraryPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        teaching: '',
        year: '',
        class: '',
        shift: '',
        capacity: '',
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
                <h5>Configuração de Recorrência:</h5>
                <hr />                
                <InputSelect 
                    text={"Turma:"}
                    place={"ex: 1º A"}
                    options={[]}
                    onChange={(value) => handleInputChange('teaching', value)}
                />
                <InputSelect 
                    text={"Disciplina: *"}
                    place={'ex: Matematica'}
                    options={[]}
                    onChange={(value) => handleInputChange('year', value)}
                />
                <InputSelect 
                    text={"Professor:"}
                    place={'ex: "Fulano"'}
                    options={[]}
                    onChange={(value) => handleInputChange('class', value)}
                />
                <h5>Período de Recorrência</h5>
                <hr />
                <Input
                    text={"Início:"}
                    place={"Insira"}
                    onChange={(value) => handleInputChange('capacity', value)}
                />
                <Input
                    text={"Fim:"}
                    place={"Insira"}
                    onChange={(value) => handleInputChange('capacity', value)}
                />
                <h5>Dias e Horarios de Recorrência</h5>
                <form className="checklist">
                    <div className="checklist-row">
                        <InputCheck id={"Segunda-feira"} text={"Segunda-feira"} />
                        <Input  />
                    </div>
                    <div className="checklist-row">
                        <InputCheck id={"Terça-feira"} text={"Terça-feira"} />
                        <Input  />
                    </div>
                    <div className="checklist-row">
                        <InputCheck id={"Quarta-feira"} text={"Quarta-feira"} />
                        <Input  />
                    </div>
                    <div className="checklist-row">
                        <InputCheck id={"Quinta-feira"} text={"Quinta-feira"} />
                        <Input  />
                    </div>
                    <div className="checklist-row">
                        <InputCheck id={"Sexta-feira"} text={"Sexta-feira"} />
                        <Input  />
                    </div>
                </form>


                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} />
                </div>
            </form>
        </div>
    );
};


export default RegisterHoraryPage;