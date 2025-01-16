const ImageButton = ({path, alt, text, disabled, onFunction}) => {
    return(
        <div className="buttonImage">
        <button onClick={onFunction} disabled={disabled}><img src={path} alt={alt}/></button>
        <p>{text}</p>
        </div>
    )
}

export default ImageButton;