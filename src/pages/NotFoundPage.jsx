import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <>
        <h2 >Oops! Page not found!</h2>
        <p>come back to <Link to="/">Homepage</Link></p>
        </>
    )    
}

export default NotFound;