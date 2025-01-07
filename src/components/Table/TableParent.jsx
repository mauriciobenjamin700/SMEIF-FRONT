import React, { useState } from 'react';
import axios from 'axios';

import ImageButton from '../ImagemButton/index.jsx'
import './Table.scss'; // Importa os estilos específicos da tabela
import IMAGES from '../../assets/index.ts'
import Button from '../Button/index.jsx';
import API_URL from '../../constants/api.ts';
import Modal from '../Modal/index.jsx';


const TableParent = ({ tittle, data, functions, columns = [] }) => {
    const [activeDropDown, setActiveDropDown] = useState(null);
    
    const [deleteModal,setDeleteModal] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    const deleteClass = () => {
        axios.delete(`${API_URL}user/delete`, {
            params: {
                user_id: String(deleteModal)
            }
        })
        .then((response) => {
            location.reload();
        })
        .catch((error) => {
            console.error(error.response);
        });
    };
    

    const toggleDropdown = (index) => {
      setActiveDropDown((prev) => (prev === index ? null : index));
    };
  
    return (
      <div className="main-container">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <>
                <h2>Tem certeza que deseja remover esse responsavel?</h2>
                <Button 
                    onFunction={() => closeModal()}
                    text={"Não"}
                />
                <Button 
                    onFunction={() => {deleteClass()}}
                    color={"red"}
                    text={"Sim"}
                    
                />
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
                data.map((info, index) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <strong>{info.name}</strong>
                      </div>
                    </td>
                    <td>{info.phone}</td>
                    <td>{info.email}</td>
                    <td>{info.cpf}</td>
                    <td>
                      <ImageButton
                        path={IMAGES.tres_pontos}
                        onFunction={() => toggleDropdown(index)}
                      />
                      {activeDropDown === index && (
                        <div className="dropdown-menu">
                          <Button
                            text="Editar"
                            onFunction={() => functions[0]("editar_pai/",{state: info})}
                          />
                          <Button
                            text="Excluir"
                            onFunction={() => {setDeleteModal(info.id), openModal()}}
                          />

                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default TableParent;