import { useState } from "react";


const Input = ({ place, text, onChange, type}) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event) => {
        setInputValue(event.target.value);
        onChange(event.target.value); // Chama a função onChange passada como prop
    };
    if(type) {
        return (
            <>
                <p>{text}</p>
                <input
                    type={type}
                    className="input"
                    placeholder={place}
                    value={inputValue}
                    onChange={handleChange} // Atualiza o valor do estado
                />
            </>
        );
    }
    else{
        return (
            <>
                <p>{text}</p>
                <input
                    className="input"
                    placeholder={place}
                    value={inputValue}
                    onChange={handleChange} // Atualiza o valor do estado
                />
            </>
        );
    }
};


export default Input;