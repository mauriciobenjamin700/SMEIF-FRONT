import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

import "./style/StudentRegister.scss";
import "../../../style/GenericRegister.scss";

import { dataLocals } from "../../../data/cities.json"
import API_URL from "../../../constants/api.ts"
import { get_classes } from "../../../services/requests/get.js"
import { formatAPIResponse } from "../../../services/requests/base.ts";

const StudentRegisterPage = () => {
    const navigate = useNavigate()    
    const [optionClasses, setOptionClasses] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [success, setsuccess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getClasses = async () => {
        const classes = await get_classes();
        setOptionClasses(classes.map(obj => obj.class_info)); // `map` já pode ser usado sem `await`
    }

    useEffect(() => {
    const fetchClasses = async () => {
        if (optionClasses.length == 0) {
        getClasses() // Armazena as classes no estado
        }
    };
    fetchClasses();
    }, [optionClasses]);   

    const optionsStates = dataLocals.flatMap((local) => ([
        local.estado // Nome do estado, por exemplo, "Acre"
    ]));

    const [formData, setFormData] = useState({
        cpf: "",
        name: "",
        birth_date: "",
        gender: "",
        class_id: "",
        classInfo: "",
        address: {
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            house_number: "",
            complement: "",
        },
        kinship: "",
        parent_cpf: "",
        dependecies: ""
    });

    const filterClass = async () => {
        const classes = await get_classes();
        const classObj = classes.find(obj => obj.class_info == formData.classInfo);
        if (classObj) {
            setFormData((prevFormData) => ({
                ...prevFormData, // Copia o estado anterior
                class_id: classObj.id, // Atualiza apenas a propriedade desejada
            }));
            // Atualiza com o valor de `class_id`
          console.log(formData.classInfo)
          console.log(formData.class_id)
          return true
        } else {
          console.log("Classe não encontrada!");
          return false
        }
      };

    const handleInputChange = (field, value) => {
        setFormData((prevData) => {
            // Verifica se o campo é aninhado
            if (field.includes('.')) {
                const [parentField, childField] = field.split('.');
                return {
                    ...prevData,
                    [parentField]: {
                        ...prevData[parentField], // Mantém o restante das propriedades
                        [childField]: value, // Atualiza apenas o campo específico
                    },
                };
            }
            // Campo não aninhado
            return {
                ...prevData,
                [field]: value,
            };
        });
    };

    const registerStudent = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        if(filterClass()) {
            console.log(formData.class_id)
            if (secondResponsible != null && secondResponsible.cpf !== ""){
                axios.get(`${API_URL}user/get`, secondResponsible.cpf, { headers }).then(
                    axios.post(`${API_URL}student/add`, formData, { headers })
                    .then((response) => {
                        setModalText(formatAPIResponse(response.request.response))
                        axios.post(`${API_URL}parent/add`, secondResponsible, { headers }).then(response =>{
                            openModal()
                            setsuccess(true)
                        })
                        .catch(err => {
                            const errMsg = formatAPIResponse(err.request.response)
                            setModalText("Aluno cadastrado com sucesso, mas ocorreu um erro"+ 
                                " no cadastro do segundo responsavel.")
                            openModal()
                        })
                        
                    })
                    .catch((err) => {
                        const errMsg = formatAPIResponse(err.request.response)
                        console.log(errMsg)
                        setModalText(errMsg)
                        openModal()
                    })   
                )
            }else{
                axios.post(`${API_URL}student/add`, formData, { headers })
                .then((response) => {
                    setModalText(formatAPIResponse(response.request.response))
                    openModal()
                        setsuccess(true)
                    
                })
                .catch((err) => {
                    const errMsg = formatAPIResponse(err.request.response)
                    setModalText(errMsg)
                    openModal()
                })   

            }
        }else{
            setModalText("Classe não encontrada")
            openModal()
        }
    }


    const [secondResponsible, setSecondResponsible] = useState(null); // Começa como nulo para adicionar dinamicamente

    const addSecondResponsible = () => {
        setSecondResponsible({
            kinship: "",
            parent_cpf: "",
            studen_cpf: formData.cpf,
        });
    };

    const removeSecondResponsible = () => {
        setSecondResponsible(null); // Remove o segundo responsável
    };

    useEffect(() => {
        if(formData.classInfo){
            filterClass()
        }
    },[formData.classInfo])

    return(
            <div className="main">
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {(success && <>
                    <h2>Cadastro realizado com sucesso!</h2>
                    <p>{modalText}</p>
                    <Button 
                        onFunction={() => navigate("/Coordenacao/cadastro")}
                        text={"Fechar"}
                    />
                
                </>)}
                {(!success && <>
                    <h2>Erro ao realizar cadastro </h2>
                    <p>{modalText}</p>
                    <Button 
                        onFunction={() => closeModal()}
                        text={"Fechar"}
                    />
                </>)
                }
            </Modal>
            <form action="" method="get">
                <h5>Dados Pessoais:</h5>
                <hr />
                <Input
                    text="Nome completo: *"
                    place="Digite o nome completo"
                    onChange={(value) => handleInputChange('name', value)}
                />
                <Input
                    type={"date"}
                    text="Data de nascimento:"
                    place="DD/MM/AAAA"
                    onChange={(value) => handleInputChange('birth_date', value)}
            
                />
                <Input
                    text="CPF: *"
                    place="Digite o CPF"
                    onChange={(value) => handleInputChange('cpf', value)}
                />
                
                <InputSelect 
                    text={"Sexo:"}
                    place={"Selecione o sexo"}
                    options={["M", "F", "Z"]}
                    onChange={(value) => handleInputChange('gender', value)}
                />

                <h5>Dados Acadêmicos:</h5>
                <hr />
                <InputSelect
                    text={"Turma/Classe:"}
                    place={"Selecione a turma/classe do aluno"}
                    options={optionClasses}
                    onChange={(value) => handleInputChange('classInfo',value)}
                />

                <h5>Endereço:</h5>
                <hr />
                <InputSelect
                    text="Estado:"
                    place="Selecione o estado"
                    options={optionsStates}
                    onChange={(value) => handleInputChange('address.state', value)}
                />
                <InputSelect
                    text="Cidade:"
                    place="Selecione a cidade"
                    options={dataLocals.find((local) => local.estado === formData.address?.state)?.cidades || []}
                    onChange={(value) => handleInputChange('address.city', value)}
                />
                <Input
                    text="Bairro:"
                    place="Digite seu bairro"
                    onChange={(value) => handleInputChange('address.neighborhood', value)}
                />
                <Input
                    text="Rua:"
                    place="Digite sua rua"
                    onChange={(value) => handleInputChange('address.street', value)}
                />
                <Input
                    text="Número:"
                    place="Digite o número"
                    onChange={(value) => handleInputChange('address.house_number', value)}
                />
                <Input
                    text="Complemento:"
                    place="Digite o complemento (opcional)"
                    onChange={(value) => handleInputChange('address.complement', value)}
                />

                <h5>Relação com Pais/Responsáveis:</h5>
                <hr />

                <div className="responsible-field">
                <InputSelect
                    text="Tipo de Relação (1):"
                    place="Selecione o tipo de relação"
                    options={['Pai', 'Mãe', 'Avô', 'Avó', 'Tio', 'Tia', 
                            'Irmão', 'Irmã', 'Primo(a)', 'Responsável Legal', 
                            'Tutor(a)', 'Padrasto', 'Madrasta', 'Outros']}
                    onChange={(value) =>
                        setFormData((prev) => ({
                            ...prev,
                            kinship: value,
                        }))
                    }
                    value={formData.kinship}
                />
                <Input
                    text="CPF do Pai/Responsável (1):"
                    place="Informe o CPF"
                    onChange={(value) =>
                        setFormData((prev) => ({
                            ...prev,
                            parent_cpf: value,
                        }))
                    }
                    value={formData.parent_cpf}
                />
            </div>

            {/* Segundo Responsável */}
            {secondResponsible && (
                <div className="responsible-field">
                    <InputSelect
                        text="Tipo de Relação (2):"
                        place="Selecione o tipo de relação"
                        options={['Pai', 'Mãe', 'Avô', 'Avó', 'Tio', 'Tia', 
                            'Irmão', 'Irmã', 'Primo(a)', 'Responsável Legal', 
                            'Tutor(a)', 'Padrasto', 'Madrasta', 'Outros']}
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
                                parent_cpf: value,
                            }))
                        }
                        value={secondResponsible.parent_cpf}
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
                        onFunction={() => navigate("/Coordenacao/cadastro")}
                    />
                    <Button 
                        text={"Salvar Informações"} 
                        color={"#14AE5C"} 
                        onFunction={() => registerStudent()}
                    />
                </div>
            </form>
        </div>
    );
};


export default StudentRegisterPage;