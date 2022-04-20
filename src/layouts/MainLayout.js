import { React,Fragment } from 'react';



const MainLayout = ({ children }) => {

    // const dispatcher = useDispatch();

    // const logout=()=>{
    //     localStorage.removeItem('datta-account');
    //     dispatcher({ type:  LOGOUT});       
    // }

    let mainContainer = (
        <Fragment>
           
            {children}
        </Fragment>
    )
    return (
        <>
            {mainContainer}
        </>
    );
}

export default MainLayout;