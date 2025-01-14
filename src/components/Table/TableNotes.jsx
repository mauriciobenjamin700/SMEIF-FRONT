import React, { useState, useEffect } from 'react';
import './Table.scss';
import axios from 'axios';

import Button from '../Button';
import API_URL from '../../constants/api';
import Modal from '../Modal';

const TableNotes = ({ tittle, data, columns = [], semester }) => {
    const [studentsDataSem1, setStudentsDataSem1] = useState([]);
    const [studentsDataSem2, setStudentsDataSem2] = useState([]);
    const [notasParaAtualizar, setNotasParaAtualizar] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [textModal, setTextModal] = useState("")
    const [sucess, setSucess] = useState(false);
    const [render, setRender] = useState(true);


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  // Inicializa os dados dos alunos
    useEffect(() => {
        if (data.length > 0 && data[1]?.class_info) {
        const filteredStudents = data[0]
            .filter(student => student.class_info === data[1].class_info)
            .map(student => ({
            ...student,
            grades: Array(4).fill(''), // Inicializa com 4 avaliações vazias
            average: '',
            }));
    
        setStudentsDataSem1(filteredStudents); // Inicializa dados do primeiro semestre
        setStudentsDataSem2(filteredStudents.map(student => ({ ...student }))); // Clona para o segundo semestre
        }
    }, [data]);
  

  // Busca as notas do endpoint e atualiza os estados
  useEffect(() => {
    if (data.length > 0 && studentsDataSem1.length > 0 && render) {
      fetchNotes(data[1].class_id, data[1].discipline_id);
      setRender(false)
    }
  }, [data, studentsDataSem1]);  // Garante que a busca de notas só ocorra após os alunos serem inicializados
  
  
  // Função para buscar as notas e preencher os estados
  const fetchNotes = async (classId, disciplineId) => {
    try {
      const response = await axios.get(`${API_URL}note/list`, {
        params: {
          class_id: classId,
          discipline_id: disciplineId,
        },
        headers,
      });
  
      const notes = response.data;
  
      // Atualiza os estados dos semestres com base nas notas retornadas
      const updatedSem1 = studentsDataSem1.map(student => {
        const studentNotes = notes.filter(
          note => note.child_cpf === student.cpf && note.semester === 1
        );
  
        // Atualizar o array de grades mantendo os dados existentes
        const newGrades = [...student.grades]; // Clone dos grades atuais
        studentNotes.forEach(note => {
          // Atualiza o índice correspondente ao note.aval_number (índice da avaliação)
          newGrades[note.aval_number - 1] = note.points;
        });
  
        return {
          ...student,
          grades: newGrades, // Atualiza as grades preservando os dados existentes
          average: calculateAverage(newGrades.filter(grade => grade !== '')), // Calcula a média apenas para índices preenchidos
        };
      });
  
      const updatedSem2 = studentsDataSem2.map(student => {
        const studentNotes = notes.filter(
          note => note.child_cpf === student.cpf && note.semester === 2
        );
  
        const newGrades = [...student.grades];
        studentNotes.forEach(note => {
          newGrades[note.aval_number - 1] = note.points;
        });
  
        return {
          ...student,
          grades: newGrades,
          average: calculateAverage(newGrades.filter(grade => grade !== '')),
        };
      });
  
      setStudentsDataSem1(updatedSem1);
      setStudentsDataSem2(updatedSem2);
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
    }
  };
  
  
  // Calcula a média das notas
  const calculateAverage = grades => {
    const validGrades = grades.filter(grade => grade !== '' && grade !== null);
    return validGrades.length > 0
      ? (validGrades.reduce((acc, grade) => acc + grade, 0) / validGrades.length).toFixed(2)
      : '';
  };

  // Atualiza as notas no estado correto
  const handleGradeChange = (semester, studentIndex, gradeIndex, value) => {
    const updatedStudents =
      semester === 1 ? [...studentsDataSem1] : [...studentsDataSem2];

    updatedStudents[studentIndex].grades[gradeIndex] = parseFloat(value) || '';
    updatedStudents[studentIndex].average = calculateAverage(
      updatedStudents[studentIndex].grades
    );

    if (semester === 1) {
      setStudentsDataSem1(updatedStudents);
    } else {
      setStudentsDataSem2(updatedStudents);
    }
  };

  const updateNotes = async () => {
    try {

  
      // Envia apenas as notas alteradas
      if (changedNotes.length > 0) {
        axios.put(`${API_URL}note/update`, changedNotes, { headers });
        console.log('Notas salvas com sucesso!');
      } else {
        console.log('Nenhuma alteração detectada.');
      }
    } catch (error) {
      console.error('Erro ao salvar notas:', error);
    }
  };
  

  // Envia as notas para o backend
  const submitNotes = (semester, studentIndex) => {
    const studentsData = semester === 1 ? studentsDataSem1 : studentsDataSem2;
    const student = studentsData[studentIndex];

    const notesPayloads = student.grades
      .map((grade, index) => ({
        semester: semester,
        aval_number: index + 1,
        points: grade,
        discipline_id: data[1].discipline.id,
        class_id: data[1].class_id,
        child_cpf: student.cpf,
      }))
      .filter(note => note.points !== ''); // Remove objetos com pontos vazios
    
    console.log(notesPayloads)

    notesPayloads.forEach(notes => {
        axios.post(`${API_URL}note/add`, notes, { headers })
        .then(response => {
            console.log('Notas registradas com sucesso:', response.data);
            setSucess(true)
        })
        .catch(error => {
            if (error.response && error.response.status === 409) {
            console.error('Conflito ao registrar nota:', error.response.data);
            setSucess(true)
            // Atualiza a lista de notas pendentes para atualização
            setNotasParaAtualizar(prevState => [
                ...prevState,
                ...notesPayloads // Adiciona as notas que geraram o erro
            ]);
            } else {
            setTextModal('Erro ao registrar notas:', error);
            setSucess(false)
            openModal()
            }
        });
    });

    openModal()

  };

  // Renderiza a tabela com os dados do semestre atual
  const renderTable = studentsData => (
    <table className="custom-table">
      <thead>
        <tr>
          {Array.isArray(columns) &&
            columns.map((column, index) => <th key={index}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {studentsData.map((student, studentIndex) => (
          <tr key={studentIndex}>
            <td>
              <div>
                <strong>{student.name}</strong>
                <p>Matrícula: {student.registration}</p>
              </div>
            </td>
            {student.grades.map((grade, gradeIndex) => (
              <td key={gradeIndex}>
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={grade}
                  onChange={e =>
                    handleGradeChange(
                      semester,
                      studentIndex,
                      gradeIndex,
                      e.target.value
                    )
                  }
                />
              </td>
            ))}
            <td>{student.average}</td>
            <td
              className={
                student.average >= 6
                  ? 'approved'
                  : student.average
                  ? 'failed'
                  : ''
              }
            >
              {student.average >= 6
                ? 'Aprovado'
                : student.average
                ? 'Reprovado'
                : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // Determina os dados do semestre atual
  const currentStudentsData =
    semester === 1 ? studentsDataSem1 : studentsDataSem2;

  return (
    <div className="main-container">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <>  
                {sucess && 
                <>
                    <h2>Notas foram registradas com sucesso!</h2>
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
      <div className="title-conteiner">
        <h2>{tittle}</h2>
      </div>
      <div className="table-container">
        {renderTable(currentStudentsData)}
        <Button
          text={"Registrar Notas"}
          onFunction={() => {
            for (let i = 0; i < currentStudentsData.length; i++) {
              submitNotes(semester, i);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TableNotes;
