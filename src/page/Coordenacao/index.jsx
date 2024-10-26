import "./coordenacao.css"
import ImageButton from "../../components/ImagemButton"
import TelaCadastroPais from "./cadastro_pais";
import { useState } from "react"
import TelaCadastro from "./cadastro"

const Menu = ({onFunction}) => {
    return(
        <div className="div-main">
            <h1>Menu Principal</h1>
            <div className="box-menu">
                <ImageButton path={"src/assets/cadastrar_pessoas.png"} text={"Cadastro e Atualização de Pessoas"} onFunction={() => onFunction(1)} />
                <ImageButton path={"src/assets/gerenciar_cadastro.png"} text={"Gerenciar Cadastro"} />
                <ImageButton path={"src/assets/enviar_comunicado.png"} text={"Enviar Comunicados"} />
                <ImageButton path={"src/assets/aviso.png"} text={"Registrar Ocorrências e Advertências"} />
                <ImageButton path={"src/assets/calendario.png"} text={"Gerenciar Horários"} />
                <ImageButton path={"src/assets/reunioes.png"} text={"Agendar Reuniões"} />                
            </div>
        </div>
    );
}

const Coordenacao = () => {

    const list_frame = [Menu, TelaCadastro, TelaCadastroPais];
  const [currentFrame, setCurrentFrame] = useState(0);
  const NextFrame = (frame) => {
    setCurrentFrame(frame);
  };

  // Renderiza o frame atual, passando a função NextFrame como prop
  const CurrentFrameComponent = list_frame[currentFrame];

  return (
    <div className="main">
      <CurrentFrameComponent onFunction={NextFrame}/>
    </div>
  );
};

export default Coordenacao;