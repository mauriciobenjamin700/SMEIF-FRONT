import React from 'react';
import './Table.scss';

const TableHorary = ({ tittle, horarys, data }) => {
  // Dias da semana e horários fixos
  const daysOfWeek = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const timeSlots = horarys

  // Criar uma matriz para preencher os dados
  const scheduleMatrix = timeSlots.map(() => Array(daysOfWeek.length).fill(""));

  // Preencher os horários na matriz com base nos dados de recorrência
  data.forEach((item) => {
    item.recurrences.forEach((recurrence) => {
      const dayIndex = daysOfWeek.indexOf(recurrence.day_of_week); // Índice do dia da semana
      const startIndex = timeSlots.findIndex((slot) =>
        slot.startsWith(recurrence.start_time)
      ); // Índice do horário inicial
      const endIndex = timeSlots.findIndex((slot) =>
        slot.endsWith(recurrence.end_time)
      ); // Índice do horário final

      // Preencher todas as células entre startIndex e endIndex
      if (dayIndex !== -1 && startIndex !== -1 && endIndex !== -1) {
        for (let i = startIndex; i <= endIndex; i++) {
          scheduleMatrix[i][dayIndex] = `${item.discipline.name}(${item.class_info})`;
        }
      }
    });
  });

  return (
    <div className="main-container">
      <div className="title-container">
        <h2>{tittle}</h2>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Horários</th>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((time, rowIndex) => (
              <tr key={rowIndex}>
                <td>{time}</td>
                {scheduleMatrix[rowIndex].map((cell, colIndex) => (
                  <td key={colIndex}>{cell || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHorary;
