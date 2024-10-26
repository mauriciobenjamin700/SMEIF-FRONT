import Button from "../../components/Button"


const TelaCadastro = ({onFunction}) => {
    return (
        <div className="box-cadastro">
            <h1>Quem você deseja cadastrar?</h1>
            <div className="box-cadastro-menu">
                <Button text={"Cadastrar Pais/Responsáveis"} onFunction={() => onFunction(2)} />
                <Button text={"Cadastrar Alunos"} />
                <Button text={"Cadastrar Professores"} />
                <Button text={"Voltar"} onFunction={() => onFunction(0)} />
            </div>
        </div>
    );
}

export default TelaCadastro;