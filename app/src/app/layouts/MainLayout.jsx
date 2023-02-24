import { Link } from "react-router-dom";

const MainLayout = ({children}) => {
    return ( 
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                    <li>
                        <Link to="/auth/signin">Signin</Link>
                    </li>
                    <li>
                        <Link to="/auth/signup">Signup</Link>
                    </li>
                </ul>
            </nav>

            <div>
                {children}
            </div>
        </div>
     );
}
 
export default MainLayout;