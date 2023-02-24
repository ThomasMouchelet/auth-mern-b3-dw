import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../setup/contexts/UserContext";

const Navbar = () => {
    const { user } = useContext(UserContext);

    return ( 
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {user.email && 
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                }
                {!user.email && 
                    <>
                        <li>
                            <Link to="/auth/signin">Signin</Link>
                        </li>
                        <li>
                            <Link to="/auth/signup">Signup</Link>
                        </li>
                    </>
                }
            </ul>
        </nav>
     );
}
 
export default Navbar;