import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../setup/contexts/AuthContext";
import AuthService from "../../../setup/services/auth.service";
import AuthInputs from "./AuthInputs";

const SignupForm = () => {
    const { credentials, handleChange } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await AuthService.signup(credentials);
            navigate("/auth/signin")
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <AuthInputs handleChange={handleChange} confirmPassword={true} />

            <button type="submit">Sign Up</button>
        </form>
     );
}
 
export default SignupForm;