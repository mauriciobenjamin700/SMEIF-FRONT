import React from 'react';
import './Table.scss'; // Importa os estilos específicos da tabela

const TablePage = ({tittle,columns = []}) => {
  const data = [
    { name: 'Nome do Aluno', registration: '*******', grades: ['Nota', 'Nota', 'Nota', 'Nota'], average: 'Nota', status: 'Aprovado' },
  ];

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
            {data.map((student, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <strong>{student.name}</strong>
                    <p>Matrícula: {student.registration}</p>
                  </div>
                </td>
                {student.grades.map((grade, idx) => (
                  <td key={idx}>{grade}</td>
                ))}
                <td>{student.average}</td>
                <td className={student.status === 'Aprovado' ? 'approved' : 'failed'}>{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default TablePage;