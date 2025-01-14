import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import image from  "../../assets/header_image.png";
import "./header.scss";

import IMAGES from "../../assets";
import ImageButton from "../ImagemButton";
import Button from "../Button";
import useCheckAccessLevel from "../../services/utilities/checkAcessLevel.js"

import { setImage, setTitle } from "../../services/redux/reduxers/headerSlice.js";
import { clearUser } from "../../services/redux/reduxers/userSlice.js";
import { clearEvents } from "../../services/redux/reduxers/eventsSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const header = useSelector((state) => state.header)
    //const imageHeader = useSelector((state) => state.header)
    const { headerImage, headerTitle } = header;
    const dispatch = useDispatch()
    
    const react_location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const deleteLevel = () => {
        localStorage.removeItem('level')
        localStorage.removeItem('jwt')
        dispatch(clearUser())
        dispatch(clearEvents())

        setIsDropdownOpen(false)
        navigate('/')
        location.reload()
        
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        useCheckAccessLevel(navigate, react_location);        
    },[])

    if(headerImage){
        return(
            <header className="header">
                <img src={image} alt="" />
                <h3>{headerTitle}</h3>
                <ImageButton
                    onFunction={() => toggleDropdown()}
                    path={IMAGES.menu}
                />
                {isDropdownOpen && (
                <div className="dropdown">
                    <Button
                        text={"Perfil"}
                        
                    />
                    <Button
                        text={"Alterar Senha"}
                        
                    />
                    <Button
                        text={"Sair"}
                        onFunction={() => {
                            dispatch(setImage({headerImage:false}))
                            ,dispatch(setTitle({headerTitle:""}))
                            ,deleteLevel()}}
                    
                    />
                </div>
            )}
            </header>
        );
    }
    else{
        return(
            <header className="header">
                <h3>{headerTitle}</h3>
            </header>
        );
    }
}

export default Header;