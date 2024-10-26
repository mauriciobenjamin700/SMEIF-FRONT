const ImageButton = ({path, alt, text, onFunction}) => {
    return(
        <div className="buttonImage">
        <button onClick={onFunction}><img src={path} alt={alt} /></button>
        <p>{text}</p>
        </div>
    )
}

export default ImageButton;