import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Button from "../../../components/Button";
import TableParentNotes from "../../../components/Table/TableParentNotes";
import "./ViewNotes.scss";


const ViewNotesPage = () => {
  const navigate = useNavigate();

  return (
        <div className="main">
            <div className="main-menu" id="Monitorar_entrada_saida">
                <TableParentNotes tittle={"1º Semestre"}/>
                <br />
                <TableParentNotes tittle={"2º Semestre"}/>
                
            </div>
            <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Responsavel/monitorar_entrada")}/>
        </div>

  );
};

const ViewNotes = () => {
    return (
      <div className="main">
        <Routes>
          <Route path="/" element={<ViewNotesPage />} />
        </Routes>
      </div>
    );
  };

export default ViewNotes;
