import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "../../../style/GenericRegister.scss";
import "./SelectChild.scss";

const SelectChildPage = () => {
  const navigate = useNavigate();

  const handleSelectChild = (childId) => {
    // Lógica de seleção do filho, caso necessário
    navigate(`/Parent/child_dashboard/${childId}`);
  };

  const children = [
    { id: 1, name: "João Pedro" },
    { id: 2, name: "Ana Clara" },
    { id: 3, name: "Lucas Gabriel" },
  ];

  return (
    <div className= "container">
      <div className="child-selection">
        {children.map((child) => (
          <Button
            key={child.id}
            text={child.name}
            onFunction={() => handleSelectChild(child.id)}
          />
        ))}
      </div>
      
      <div className="main">
            <div className="botoes-de-lado">
                <Button text={"Voltar"} color={"#E8B931"} onFunction={() => navigate("/Responsavel")}/>
                <Button color={"#14AE5C"} text={"Confirmar"} />
            </div>
      </div>
    </div>
  );
};

export default SelectChildPage;
