import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"

const userRegex = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,19}$/

const Register = () => {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() =>{
        userRef.current.focus()
    }, [])

    useEffect(() =>{
        const result = userRegex.test(user)
        setValidName(result)
    }, [user])

    useEffect(() =>{
        const result = pwdRegex.test(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const signup = async (event) => {
        event.preventDefault()
        axios.post('/signup', {username : user, password : pwd}).then((response) =>{
        console.log('response from server ', response)
        if(response.data === 500){
            setErrMsg('User already exists')
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
                <h1 className="announce">Step forward, {user}.</h1>
                <p>
                    <Link to='/Login'>Enter</Link>
                </p>
            </div>
            
        ) : (
        <section className='Register'>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Claim yourself, challenger</h1>
            <form onSubmit={signup}>
                <label htmlFor='username'>
                    Username:<br />
                </label>
                <span className={validName ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 to 20 characters.<br />
                    Must begin with a letter.<br />
                </p>
                <label htmlFor="password">
                    Password:<br />
                </label>
                <span className={validPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 20 characters.<br />
                    Must include a lowercase and uppercase letter and number.<br />
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password:<br />
                </label>
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                <input
                    type='password'
                    id='confirm_pwd'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id='confrimnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match first password.
                </p>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Register
                </button>
            </form>
            <p>
                <Link to='/Login'>Sign In</Link>
            </p>
        </section>
        )}</>
        </div>
    )
}

export default Register