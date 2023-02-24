const AuthInputs = () => {
    return ( 
        <>
            <div className="form-group">
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
            </div>
        </>
     );
}
 
export default AuthInputs ;