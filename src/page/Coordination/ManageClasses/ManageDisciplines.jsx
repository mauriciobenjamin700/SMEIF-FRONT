import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";


const ManageDisciplinesPage = () => {
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
                <Input 
                    text={"Nome da Disciplina:"}
                    place={"Insira o nome da disciplina"}
                    onChange={(value) => handleInputChange('teaching', value)}
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
                    <Button text={"Salvar Informações"} color={"#14AE5C"} />
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