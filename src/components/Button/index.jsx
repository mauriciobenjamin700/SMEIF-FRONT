const Button = ({text,color, disabled,onFunction}) => {
    if (color == null){
        return (
            <button className="button" type="button" onClick={onFunction} disabled={disabled}>
                {text}
            </button>
        );
    }
    else{
        return (
            <button style={{backgroundColor:color}} type="button" className="button" disabled={disabled} onClick={onFunction}>
                {text}
            </button>
        );    
    }
    
}

export default Button;