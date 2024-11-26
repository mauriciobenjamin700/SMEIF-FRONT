import React from 'react';

const InputSelect = ({ text, options, onChange, place }) => {
    const handleSelectChange = (event) => {
        onChange(event.target.value); // Atualiza o valor selecionado
    };

    return (
        <>
            <p>{text}</p>
            <select onChange={handleSelectChange} className="input-select" defaultValue="">
                <option value="" disabled hidden>
                    {place}
                </option>

                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default InputSelect;
