const Button = ({text,color,onFunction}) => {
    console.log(color);
    if (color == null){
        return (
            <button className="button" onClick={onFunction}>
                {text}
            </button>
        );
    }
    else{
        return (
            <button style={{backgroundColor:color}}  className="button" onClick={onFunction}>
                {text}
            </button>
        );    
    }
    
}

export default Button;