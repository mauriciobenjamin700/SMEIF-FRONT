import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ImageButton from '../ImagemButton/index.jsx'
import './Table.scss'; // Importa os estilos específicos da tabela
import IMAGES from '../../assets/index.ts'
import Button from '../Button/index.jsx';
import API_URL from '../../constants/api.ts';
import Modal from '../Modal/index.jsx';
import { get_disciplines } from '../../services/requests/get.js';
import { useSelector } from 'react-redux';



const TableTeacherDisciplines = ({ tittle, data, functions, columns = [] }) => {
    const [activeDropDown, setActiveDropDown] = useState(null);
    const [disciplines,setDisciplines] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);    

    const events = useSelector((state) => (state.events))
    const toggleDropdown = (index) => {
      setActiveDropDown((prev) => (prev === index ? null : index));
    };
  
    return (
      <div className="main-container">
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
              {Array.isArray(events.events) &&
                events.events.map((info, index) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <strong>
                            {info.discipline.name}</strong>
                      </div>
                    </td>
                    <td>{info.discipline.education_level}</td>
                    <td>{info.discipline.duration}</td>
                    <td>{info.discipline.class_name}</td>
                    <td>
                      <ImageButton
                        path={IMAGES.tres_pontos}
                        onFunction={() => toggleDropdown(index)}
                      />
                      {activeDropDown === index && (
                        <div className="dropdown-menu">
                          <Button
                            text="Realizar Chamada"
                            onFunction={() => functions[0]("realizar_chamada/",{state: info})}
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
  

export default TableTeacherDisciplines;