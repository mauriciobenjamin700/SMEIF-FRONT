import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ImageButton from '../ImagemButton/index.jsx'
import './TableSubject.scss'; // Importa os estilos específicos da tabela
import IMAGES from '../../assets/index.ts'
import Button from '../Button/index.jsx';
import Modal from '../Modal/index.jsx';
import API_URL from '../../constants/api.ts';
import { useSelector } from 'react-redux';


const TableFrequency = ({ tittle, data, functions, columns = [] }) => {
    const [presences, setPresences] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [textModal, setTextModal] = useState("")
    const [presenceList,setPresenceList] = useState([])
    const events = useSelector((state) => (state.events))

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }

    const [sucess, setSucess] = useState(false)
    
    const togglePresence = (index) => {
        if(presences.length == 0){
            setPresences(data.map((data) => true))
            setPresences((prev) =>
                prev.map((presence, i) => (i === index ? !presence : presence))
              );
        }
        setPresences((prev) =>
          prev.map((presence, i) => (i === index ? !presence : presence))
        );        
      };

      const createPresenceList = () => {
        const time = new Date().getHours(); // Hora atual
        const currentDate = new Date().toISOString().split('T')[0]; // Data no formato YYYY-MM-DD
    
        const data_recurrence = events.events
            .map((event) => {
                if (Array.isArray(event.recurrences)) {
                    return event.recurrences
                        .map((recurrence) => {
                            if (recurrence.start_time && recurrence.end_time) {
                                const startHour = parseInt(recurrence.start_time.slice(0, 2));
                                const endHour = parseInt(recurrence.end_time.slice(0, 2));
    
                                if (startHour <= 11 && endHour >= 11) {
                                    return data.map((student, index) => ({
                                        class_event_id: event.id,
                                        recurrence_id: recurrence.id,
                                        child_cpf: student.cpf,
                                        type: presences[index] ? "P" : "F",
                                        date: currentDate,
                                    }));
                                }
                            }
                            return null;
                        })
                        .filter(Boolean); // Remove valores null ou undefined
                }
                return null;
            })
            .flat()
            .flat(); // "Flatten" o array para que o resultado não seja um array de arrays
    
        return data_recurrence;
    };

    const handleSave = () => {
        const list = createPresenceList(); // Gere a lista
        setPresenceList(list); // Atualize o estado (se necessário)
        registerPresence(list); // Registre imediatamente
    };
    
    const registerPresence = (list) => {
        list.forEach((presence) => {
            axios
                .post(`${API_URL}presence/add`, presence, { headers })
                .then((response) => {
                    setSucess(true);
                })
                .catch((error) => {
                    if(error.response.status == 409) {
                        setTextModal("Alguns alunos já estavam com a presença registrada")
                    }else{
                        setTextModal("Algo deu errado ao registrar a chamada")
                    }
                    console.log("Erro ao registrar presença:", error);
                    setSucess(false);
                });
        });
    
        openModal();
    };
    
  
    return (
      <div className="main-container">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <>
                {sucess && 
                <>
                    <h2>Chamada registrada com sucesso!</h2>
                    <Button 
                        onFunction={() => closeModal()}
                        text={"Fechar"}
                    />
                </>                    
                }
                {!sucess && 
                <>
                    <h2>{textModal}</h2>
                    <Button 
                        onFunction={() => closeModal()}
                        text={"Fechar"}
                    />
                </>                    
                }
            </>
        </Modal>
        <div className="title-container">
          <h2>{tittle}</h2>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                {Array.isArray(columns) &&
                  columns.map((column, index) => <th key={index}>{column}</th>)}
              </tr>
            </thead>
            <tbody>
            {Array.isArray(data) &&
                data.map((info, index) => {
                const currentImage = presences[index] ? IMAGES.presente : IMAGES.falta;
                return (
                    <tr key={index}>
                    <td>
                        <div>
                        <strong>{info.name}</strong>
                        <br />
                        <strong>Matricula: {info.matriculation}</strong>
                        </div>
                    </td>
                    <td>
                        <ImageButton
                        path={currentImage}
                        onFunction={() => togglePresence(index)}
                        />
                    </td>
                    </tr>
                );
                })}
                </tbody>
            </table>
            
            </div>
            <Button
                    text={"Salvar Chamada"}
                    color={"#14AE5C"}
                    onFunction={() => {handleSave()}}
                />
        </div>
        );
    };
  

export default TableFrequency;