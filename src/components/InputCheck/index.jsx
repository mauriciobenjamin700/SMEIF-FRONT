import { useState } from "react";


const InputCheck = ({ place, text, onChange, id}) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value); // Chama a função onChange passada como prop
    };
        return (
            <>
                <input
                    type="checkbox"
                    id={id}
                    className="input"
                    placeholder={place}
                    value={inputValue}
                    onChange={handleChange} // Atualiza o valor do estado
                />
                <label htmlFor={id} >{text}</label>
            </>
        );
};


export default InputCheck;