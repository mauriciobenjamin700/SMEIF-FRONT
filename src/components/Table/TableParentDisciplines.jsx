import React, { useState } from 'react';
import './Table.scss'; // Importa os estilos específicos da tabela
import Button from '../Button';
import ImageButton from '../ImagemButton';
import IMAGES from '../../assets';
import { useNavigate } from 'react-router-dom';

const TableParentDiscipline = ({tittle,columns = []}) => {
    const navigate = useNavigate()
    const toggleDropdown = (index) => {
        setActiveDropDown((prev) => (prev === index ? null : index));
      };
      const [activeDropDown, setActiveDropDown] = useState(null);


  const data = [
    { id_disciplina: '1432', disciplina: 'Matemática', tipo: 'Fundamental', presencas: '54', faltas: '2'},
    { id_disciplina: '1433', disciplina: 'História', tipo: 'Fundamental', presencas: '52', faltas: '4'},
  ];
  columns = ["ID da Disciplina","Disciplina", "Tipo de Ensino", "Presenças", "Faltas", "Ação"]
  return (
    <div className="main-container">
      <div className="title-conteiner">
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
            {data.map((notification, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <strong>{notification.id_disciplina}</strong>
                  </div>
                </td>
                <td>{notification.disciplina}</td>
                <td>{notification.tipo}</td>
                <td>{notification.presencas}</td>
                <td>{notification.faltas}</td>
                <td>
                      <ImageButton
                        path={IMAGES.tres_pontos}
                        onFunction={() => toggleDropdown(index)}
                      />
                      {activeDropDown === index && (
                        <div className="dropdown-menu">
                          <Button
                            text="Visualizar Frequências"
                            onFunction={() => navigate()}
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

export default TableParentDiscipline;