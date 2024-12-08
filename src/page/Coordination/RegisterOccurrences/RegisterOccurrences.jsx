
import {useNavigate } from "react-router-dom";

import "./style/RegisterOccurrences.scss"
import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";

const RegisterOccurrencesPage = ({userType}) => {
    const navigate = useNavigate(); 

    return(
        <div className="main" style={{backgroundColor:'#CDCDCD', padding:'15px'}}>
            <Input
                text={"Tipo de Ocorrências:"}
                place={"Informe a ocorrência"}
            />

            <div className="mensagem">
                <label htmlFor="mensagem" >Descrição da Ocorrência: *</label>
                <textarea
                    name="mensagem"
                    className="input"
                    rows={5}
                    cols={40}
                    style={{minHeight:"100px"}}
                    placeholder="Descreva a ocorrência em detalhes."
                />
            </div>
            <Input
                text={"Medida Aplicada(Advertência):"}
                place={""}
            />
            <Input
                text={"Tipo de Advertência:"}
                place={""}
            />
            <Input
                text={"Responsável pelo Registro:"}
                place={""}
            />
            <Input
                text={"Observações Adicionais:"}
                place={""}
            />
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/registrar_ocorrencias")}             
                />
                <Button
                    color={"#14AE5C"}
                    text={"Enviar"}
                />
            </div>        
        </div>
    );
}

export default RegisterOccurrencesPage;