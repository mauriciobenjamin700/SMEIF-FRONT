import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  axios  from "axios";

import Input from "../../../components/Input/index.jsx"
import InputSelect from "../../../components/InputSelect/index.jsx";
import "../../../style/GenericRegister.scss";
import Button from "../../../components/Button/index.jsx";
import Modal from "../../../components/Modal/index.jsx";

import { dataLocals } from "../../../data/cities.json"
import API_URL from "../../../constants/api.ts"
import { get_classes, get_disciplines } from "../../../services/requests/get.js"
import { formatAPIResponse } from "../../../services/requests/base.ts";
import UserRoles from "../../../constants/users.ts";
import { useDispatch } from "react-redux";
import { setImage, setTitle } from "../../../services/redux/reduxers/headerSlice.js";


const TeacherRegisterPage = () => {
    const [disciplinesAndClasses, setDisciplinesAndClasses] = useState(1)

    const navigate = useNavigate()

    const [optionDisciplines, setOptionDisciplines] = useState([])
    const [optionClasses, setOptionClasses] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState("")
    const [success, setsuccess] = useState(false)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getDisciplines = async () => {
            const disciplines = await get_disciplines();
            setOptionDisciplines(disciplines.map(obj => obj.name)); // `map` já pode ser usado sem `await`
        }

    const getClasses = async () => {
        const classes = await get_classes();
        setOptionClasses(classes.map(obj => obj.class_info)); // `map` já pode ser usado sem `await`
    }

    const [disciplinesAndClassesData, setDisciplinesAndClassesData] = useState({
        user_cpf: "",
        disciplines_id: [],
        classes_id: []
    })

    const filterClass = async (classes_info,index) => {
        const classes = await get_classes();
        const classObj = classes.find(obj => obj.class_info == classes_info);
        if (classObj) {
            addClass(classObj.id,index)
        } else {
          console.log("Classe não encontrada!");
        }
      };

    const filterDisciplines = async (disciplines_name,index) => {
        const classes = await get_disciplines();
        const classObj = classes.find(obj => obj.name == disciplines_name);
        
        if (classObj) {
            addDisciplines(classObj.id,index)
        } else {
          console.log("Disciplina não encontrada!");
        }
      };

    const addDisciplines = (new_discipline,index) => {
            const atual = disciplinesAndClassesData.disciplines_id
            atual[index] = new_discipline
            setDisciplinesAndClassesData((prevData) => ({
                ...prevData,
                disciplines_id: atual
            }))
    }

    const addClass = (new_class,index) => {
            const atual = disciplinesAndClassesData.classes_id
            atual[index] = new_class
            setDisciplinesAndClassesData((prevData) => ({
                ...prevData,
                classes_id: atual
            }))
    }

    const [formData, setFormData] = useState({
        name: "",
        birth_date: "",
        cpf: "",
        gender: "",
        phone: "",
        email: "",
        level:UserRoles.Professores,
        password: "",
        confirmPassword: "",
        address: {
            state: "",
            city: "",
            neighborhood: "",
            street: "",
            house_number: "",
            complement: "",
        },
    });

    useEffect(() => {
        const fetchClasses = async () => {
            if (optionClasses.length == 0) {
            getClasses() // Armazena as classes no estado
            }
        };
        fetchClasses();

        const fetchDisciplines = async () => {
            if (optionDisciplines.length == 0) {
                getDisciplines()
            }
        };
        fetchDisciplines();
    }, []);

    const optionsStates = dataLocals.flatMap((local) => ([
        local.estado // Nome do estado, por exemplo, "Acre"
    ]));

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

    const increaseElements = () => {
        setDisciplinesAndClasses((prev) => prev + 1); // Adiciona um novo par
    };

    const decreaseElements = () => {
        setDisciplinesAndClasses((prev) => (prev > 1 ? prev - 1 : prev)); // Remove um par (mínimo de 1)
        setDisciplinesAndClassesData((prevData) => {
            const updatedDisciplines = [...prevData.disciplines_id]; // Cria uma cópia do array
            const updatedClasses = [...prevData.classes_id]; // Cria uma cópia do array

            if (updatedDisciplines.length > 1) {
                updatedDisciplines.pop(); // Remove o último elemento
                updatedClasses.pop(); // Remove o último elemento
            }

            return {
                ...prevData,
                disciplines_id: updatedDisciplines,
                classes_id: updatedClasses,
            };
        })
    };

    const registerTeacher = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }

        const register_disciplines = disciplinesAndClassesData.disciplines_id.reduce((dlist, item) => {
            if(!dlist.includes(item)){
                dlist.push(item)
            }
            return dlist;
        }, [])

        const register_classes = disciplinesAndClassesData.classes_id.reduce((clist, item) => {
            if(!clist.includes(item)){
                clist.push(item)
            }
            return clist;
        }, [])

        setDisciplinesAndClassesData((prevData) => ({
            ...prevData,
            disciplines_id: register_disciplines,
            classes_id: register_classes,
        }))

        if(formData.password.length > 7){
                if(formData.password == formData.confirmPassword){
                    axios.post(`${API_URL}user/add`, formData, { headers }).then(() => {
                        console.log(disciplinesAndClassesData)

                        axios.post(`${API_URL}teacher/add-disciplines`, disciplinesAndClassesData, { headers }).then(() => {
                            axios.post(`${API_URL}teacher/add-classes`, disciplinesAndClassesData, { headers }).then(response => {
                                setModalText("Cadastro realizado com sucesso!")
                                setsuccess(true)
                                openModal()
                            })
                            .catch(err => {
                                const errMsg = formatAPIResponse(err.request.response)
                                setModalText("O professor foi cadastrado, mas ocorreu um erro no registro das suas turmas.")
                                openModal()
                            } )
                        })
                        .catch(err => {
                            const errMsg = formatAPIResponse(err.request.response)
                            setModalText("O professor foi cadastrado, mas ocorreu um erro no registro das suas disciplinas.")
                            openModal()
                        });
                    })
                    .catch(error => {
                        setModalText(formatAPIResponse(error.request.response))
                        openModal()
                    })
                }
                else{
                    setModalText("As senhas devem ser iguais")
                    openModal()
                }
        }
        else{
            setModalText("A senha deve possuir no minimo 8 caracteres")
            openModal()
        }  
    }

    return(
            <div className="main">
            <form action="" method="get">
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
                <h5>Dados Pessoais:</h5>
                <hr />
                    <Input
                        text="Nome completo: "
                        place="Digite seu nome completo"
                        onChange={(value) => handleInputChange('name', value)}
                    />
                    <Input
                        type={"date"}
                        text="Data de nascimento:"
                        place="DD/MM/AAAA"
                        onChange={(value) => handleInputChange('birth_date', value)}
                
                    />
                    <Input
                        text="CPF: "
                        place="Digite seu CPF"
                        onChange={(value) => {handleInputChange('cpf', value), setDisciplinesAndClassesData((prevData) => ({
                            ...prevData,
                            user_cpf: value
                        }));}}
                    />
                    
                    <InputSelect 
                        text={"Sexo:"}
                        place={"Selecione o sexo"}
                        options={["M", "F", "Z"]}
                        onChange={(value) => handleInputChange('gender', value)}
                    />

                <h5>Dados Profissionais:</h5>
                {Array.from({ length: disciplinesAndClasses }).map((_, index) => (
                    <div key={index} style={{ marginBottom: "1rem" }}>
                        <InputSelect
                            text={"Disciplina que leciona:"}
                            options={optionDisciplines}
                            place={"Selecione a disciplina"}
                            onChange={(value) => filterDisciplines(value, index)}
                        />
                        <InputSelect
                            text={"Classe que leciona:"}
                            options={optionClasses}
                            place={"Selecione a classe"}
                            onChange={(value) => filterClass(value, index)}
                        />
                    </div>
                ))}

                    <Button onFunction={increaseElements} text={"Adicionar Par"} />
                    <Button onFunction={decreaseElements} text={"Remover Par"} />

                <h5>Informações de contato:</h5>
                <hr />
                    <Input
                        text="Telefone(fixo ou celular): "
                        place="Digite seu telefone"
                        onChange={(value) => handleInputChange('phone', value)}
                    />
                    <Input
                        text="Email: "
                        place="Digite seu email"
                        type={"email"}
                        onChange={(value) => handleInputChange('email', value)}
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

                <h5>Senha:</h5>
                <hr />
                <Input
                    text={"Senha: "}
                    place={"Crie uma senha"}
                    type={"password"}
                    onChange={(value) => handleInputChange('password',value)}
                />
                <Input
                    text={"Confirmar Senha: "}
                    place={"Insira a mesma senha"}
                    type={"password"}
                    onChange={(value) => handleInputChange('confirmPassword',value)}
                />

                <div className="botoes-de-lado">
                    <Button text={"Cancelar"} color={"#C97414"} onFunction={() => navigate("/Coordenacao/cadastro")}/>
                    <Button text={"Salvar Informações"} color={"#14AE5C"} onFunction={() => registerTeacher()}/>
                </div>
            </form>
        </div>
    );
};


export default TeacherRegisterPage;