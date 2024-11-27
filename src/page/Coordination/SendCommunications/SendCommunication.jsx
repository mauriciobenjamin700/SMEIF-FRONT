
import {useNavigate } from "react-router-dom";

import "./style/SendCommunications.scss"
import Input from "../../../components/Input/index.jsx";
import Button from "../../../components/Button/index.jsx";

const SendCommunicationPage = ({userType}) => {
    const navigate = useNavigate(); 

    return(
        <div className="main">
            <Input
                text={"Assunto: *"}
                place={"Insira o assunto"}
            />

            <div className="mensagem">
                <label htmlFor="mensagem" >Mensagem: *</label>
                <textarea
                    name="mensagem"
                    className="input"
                    rows={5}
                    cols={40}
                    style={{minHeight:"100px"}}
                    placeholder="Insira a Mensagem"
                />
            </div>
            <Input
                text={"Arquivo:"}
                place={"Nenhuma Arquivo"}
                type={"file"}
            />
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}   
                    onFunction={() => navigate("/Coordenacao/enviar_comunicado")}             
                />
                <Button
                    color={"#14AE5C"}
                    text={"Enviar"}
                />
            </div>        
        </div>
    );
}

export default SendCommunicationPage;