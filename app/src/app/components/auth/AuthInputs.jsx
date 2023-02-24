const AuthInputs = ({handleChange, confirmPassword}) => {
    return ( 
        <>
            <div className="form-group">
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
            </div>
            {confirmPassword && 
                <div className="form-group">
                    <input 
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                </div>
            }
        </>
     );
}
 
export default AuthInputs ;