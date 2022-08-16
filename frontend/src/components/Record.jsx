import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import StrNav from "./StrNav";

const numbers = /^ *\d[\d ]*$/

const Record = () => {
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

    const [exercise, setExercise] = useState('')
    const [validExercise, setValidExercise] = useState(false)

    const [run, setRun] = useState('')
    const [validRun, setValidRun] = useState(false)

    const [rep, setRep] = useState('')
    const [validRep, setValidRep] = useState(false)

    const [pound, setPound] = useState(0)
    const [validPound, setValidPound] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() =>{
        const result = exercise
        setValidExercise(result)
    }, [exercise])

    useEffect(() =>{
        const result = numbers.test(run)
        setValidRun(result)
    }, [run])

    useEffect(() =>{
        const result = numbers.test(rep)
        setValidRep(result)
    }, [rep])

    useEffect(() =>{
        const result = numbers.test(pound)
        setValidPound(result)
    }, [pound])

    useEffect(() => {
        setErrMsg('')
    }, [run, rep, pound])

    const logged = async (event) => {
        event.preventDefault()
        axios.post('/record', {exercise : exercise, sets : run, reps: rep, pounds: pound}).then((response) =>{
        console.log('response from server ', response)
        if(response.data === 500){
            setErrMsg('Error')
        } else {
        setSuccess(true)
        }
        })
    }

    return (
        <div>
            <StrNav />
                <div className="App">
                <>
                {success ? (
                    <div className="App">
                        <h1 className="announce">Record recorded.</h1>
                        <p>
                            <Link to='/History'>Return</Link>
                        </p>
                    </div>
                    
                ) : (
                <section className='Record'>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>New Entry</h1>
                    <form onSubmit={logged}>
                        <label htmlFor='exercise'>
                            Exercise:<br />
                        </label>
                        <input
                            type='text'
                            id='exercise'
                            autoComplete='off'
                            onChange={(e) => setExercise(e.target.value)}
                            required
                            aria-invalid={validExercise ? 'false' : 'true'}
                            aria-describedby='exenote'
                        />
                        <label htmlFor="run">
                            Sets:<br />
                        </label>
                        <input
                            type='text'
                            id='run'
                            autoComplete='off'
                            onChange={(e) => setRun(e.target.value)}
                            required
                            aria-invalid={validRun ? 'false' : 'true'}
                            aria-describedby='runnote'
                        />
                        <p id="runnote" className={!validRun ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Only use numbers<br />
                        </p>            
                        <label htmlFor="rep">
                            Reps:<br />
                        </label>
                        <input
                            type='text'
                            id='rep'
                            autoComplete='off'
                            onChange={(e) => setRep(e.target.value)}
                            required
                            aria-invalid={validRep ? 'false' : 'true'}
                            aria-describedby='repnote'
                        />
                        <p id="repnote" className={!validRep ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Only use numbers<br />
                        </p>
                        <label htmlFor="pound">
                            Pounds:<br />
                        </label>
                        <input
                            type='text'
                            id='pound'
                            autoComplete='off'
                            onChange={(e) => setPound(e.target.value)}
                            aria-invalid={validPound ? 'false' : 'true'}
                            aria-describedby='pndnote'
                        />
                        <p id="pndnote" className={!validPound ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Only use numbers<br />
                        </p>
                        <button disabled={!validExercise || !validRun || !validRep || !validPound ? true : false}>
                            Save
                        </button>
                    </form>
                    <p>
                        <Link to='/History'>Cancel</Link>
                    </p>
                </section>
                )}</>
                </div>
        </div>
    )
}

export default Record