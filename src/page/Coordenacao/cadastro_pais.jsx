import Input from "../../components/Input/index.jsx"

const TelaCadastroPais = () => {

    return(<div className="cadastro-pais-frame">
            <h1>Cadastro de Pais/Responsáveis</h1>
            <form action="" method="get">
                <h5>Dados Pessoais:</h5>
                <br />
                <Input text={"Nome completo:*"} ></Input>
                <Input text={"Data de nascimento:"}></Input>
                <Input text={"CPF:*"}></Input>
                <Input text={"Nacionalidade:"}></Input>
                <h5>Informações de contato</h5>
                <Input text={"Telefone(fixo ou celular):*"}></Input>
                <Input text={"Email:"}></Input>
                <h5>Endereço:</h5>
                <Input text={"CEP:"}></Input>
                <Input text={"Cidade:"}></Input>
                <Input text={"Estado:"}></Input>
                <Input text={"Rua:"}></Input>
                <Input text={"Bairro:"}></Input>
                <Input text={"Número"}></Input>
                <h5>Relação com o Aluno(s):</h5>
                <label for="relacao">Tipo de relação:</label>
                <select id="relacao">
                    <option value="" disabled selected>(pai, mãe, responsável legal, etc.)</option>
                    <option value="pai">Pai</option>
                    <option value="mae">Mãe</option>
                    <option value="responsavel">Responsável Legal</option>
                </select>
            </form>
        </div>);
};


export default TelaCadastroPais;