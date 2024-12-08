import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";


const RegisterNewClassPage = () => {
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
                <h5>Dados Acadêmicos:</h5>
                <hr />                
                <InputSelect 
                    text={"Tipo de Ensino:"}
                    place={"ex: Ensino Infantil"}
                    options={[]}
                    onChange={(value) => handleInputChange('teaching', value)}
                />
                <InputSelect 
                    text={"Ano/Série: *"}
                    place={'ex: "5º Ano"'}
                    options={[]}
                    onChange={(value) => handleInputChange('year', value)}
                />
                <InputSelect 
                    text={"Turma/Classe:"}
                    place={'ex: "A"'}
                    options={[]}
                    onChange={(value) => handleInputChange('class', value)}
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
                    onChange={(value) => handleInputChange('capacity', value)}
                />
                
                
                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/gerenciar_turmas")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} />
                </div>
            </form>
        </div>
    );
};


export default RegisterNewClassPage;