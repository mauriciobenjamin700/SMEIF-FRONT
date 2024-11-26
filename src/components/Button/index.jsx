const Button = ({text,color,onFunction}) => {
    if (color == null){
        return (
            <button className="button" onClick={onFunction}>
                {text}
            </button>
        );
    }
    else{
        return (
            <button style={{backgroundColor:color}} type="button" className="button" onClick={onFunction}>
                {text}
            </button>
        );    
    }
    
}

export default Button;