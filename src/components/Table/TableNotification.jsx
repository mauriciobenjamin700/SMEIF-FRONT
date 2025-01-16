import React from 'react';
import './Table.scss'; // Importa os estilos específicos da tabela
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const TableNotification = ({tittle,columns = []}) => {
    const navigate = useNavigate()


  const data = [
    { date: '13/11/2024', horary: '08:00', assunto: 'Entrada'},
    { date: '13/11/2024', horary: '12:00', assunto: 'Saida'},
    { date: '12/11/2024', horary: '08:00', assunto: 'Entrada'},
    { date: '12/11/2024', horary: '12:00', assunto: 'Saida'},
    { date: '11/11/2024', horary: '08:00', assunto: 'Entrada'},
    { date: '11/11/2024', horary: '12:00', assunto: 'Saida'},
    { date: '10/11/2024', horary: '08:00', assunto: 'Entrada'},
  ];
  columns = ["Data","Horário", "Assunto"]
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
                    <strong>{notification.date}</strong>
                  </div>
                </td>
                <td>{notification.horary}</td>
                <td>{notification.assunto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Responsavel/monitorar_entrada")}/>
    </div>

  );
};

export default TableNotification;