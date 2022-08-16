import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() =>{
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const login = async (event) => {
        event.preventDefault()
        axios.post('/login', {username: user, password: pwd}).then((response) => {
        if(response.data === 100){
            setErrMsg('The username or password is wrong.')
        } else {
        setSuccess(true)
        }
        })
    }

    return (
        <div className="App">
        <>
        {success ? (
            <div className="App">
                <h1 className="announce">Continue the path, {user}.</h1>
                <br />
                <p>
                    <Link to='/Home'>Enter</Link>
                </p>
            </div>
            
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={login}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <Link to='/Register'>Sign Up</Link>
            </p>
        </section>
        )}</>
        </div>
    )
}

export default Login