
import {Route, Routes, useNavigate } from "react-router-dom";

import Input from "../../../components/Input/index.jsx";
import InputSelect from "../../../components/InputSelect/index.jsx"
import Button from "../../../components/Button/index.jsx";

const SearchRegisterPage = ({userType}) => {
    const navigate = useNavigate(); 

    return(
        <div className="main">
            {userType === 1 && 
            <Input
                text={"Buscar"}
                place={"Informe o CPF"}
            />}
            {userType === 2 &&
            <InputSelect
                text={"Buscar"}
                options={[]}
                place={"Selecione a Turma"}
            />
            }
            
            <div className="botoes-de-lado">
                <Button
                    color={"#E8B931"}
                    text={"Cancelar"}
                    onFunction={() => navigate("/Coordenacao/enviar_comunicado")}
                
                />
                <Button
                    text={"Buscar"}
                    onFunction={() => {
                        switch (userType) {
                            case 1:
                                navigate("enviar_comunicado_para_pai")
                                break;
                            case 2:
                                navigate("enviar_comunicado_para_turma")
                                break;
                        }
                    }}
                />
            </div>        
        </div>
    );
}

const SearchRegister = ({userType}) => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SearchRegisterPage userType={userType}/>} />
                <Route path="enviar_comunicado_para_pai/" element={<SearchRegisterPage/>} />
                <Route path="enviar_comunicado_para_turma/" element={<SearchRegisterPage/>} />
            </Routes>
        </div>
    );
}


export default SearchRegister;