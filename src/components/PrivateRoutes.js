import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    // let auth = false
    return(
        window.auth ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes