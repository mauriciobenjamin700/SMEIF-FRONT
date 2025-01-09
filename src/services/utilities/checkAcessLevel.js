// checkAccessLevel.jsx
const checkAccessLevel = (navigate, location) => {
    const levelMap = {
        3: '/Coordenacao',
        2: '/Professor',
        1: '/Responsavel',
    };

    const userLevel = localStorage.getItem('level');
    const currentPath = location.pathname;
    if (userLevel == 4){
        return;
    }
    if (userLevel && currentPath.startsWith(levelMap[userLevel])) {
        return; // Acesso permitido
    }
    else if(userLevel == null){
        navigate("/")
    }
    else{
        console.log(levelMap[userLevel])
        navigate(levelMap[userLevel]);
    }
    // Redirecionar para a página de erro
    
};

export default checkAccessLevel;
