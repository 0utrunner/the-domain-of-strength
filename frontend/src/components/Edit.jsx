import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import StrNav from "./StrNav";

const numbers = /^ *\d[\d ]*$/

const Edit = () => {

    const [workout, setWorkout] = useState('')

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
    let {workoutID} = useParams()

    useEffect(() => {
        axios.get(`/workout/${workoutID}`).then((response) => {
            setWorkout(response.data)
            setExercise(response.data.exercise)
            setRun(response.data.sets)
            setRep(response.data.reps)
            setPound(response.data.pounds)
        })
    }, [])

    useEffect(() =>{
        const result = exercise
        console.log('exercise', result)
        console.log(exercise)
        setValidExercise(result)
    }, [exercise])

    useEffect(() =>{
        const result = numbers.test(run)
        console.log('run', result)
        console.log(run)
        setValidRun(result)
    }, [run])

    useEffect(() =>{
        const result = numbers.test(rep)
        console.log('rep', result)
        console.log(rep)
        setValidRep(result)
    }, [rep])

    useEffect(() =>{
        const result = numbers.test(pound)
        console.log('pound', result)
        console.log(pound)
        setValidPound(result)
    }, [pound])

    useEffect(() => {
        setErrMsg('')
    }, [run, rep, pound])

    const edited = async (event) => {
        event.preventDefault()
        axios.put(`/workout/${workoutID}`, {exercise : exercise, sets : run, reps: rep, pounds: pound}).then((response) =>{
        console.log('response from server ', response)
        if(response.data === 500){
            setErrMsg('Error')
        } else {
        setSuccess(true)
        }
        })
    }

    const deleted = (event) => {
        event.preventDefault()
        axios.delete(`/workout/${workoutID}`).then((response) => {
            setSuccess(true)
        })
    }

    
    return (
        <div>
            <StrNav />
                <div className="App">
                <>
                {success ? (
                    <div className="App">
                        <h1 className="announce">Record updated.</h1>
                        <p>
                            <Link to='/History'>Return</Link>
                        </p>
                    </div>
                    
                ) : (
                <section className='edit-exercise'>
                    <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Edit Entry</h1>
                    <form onSubmit={edited}>
                        <label htmlFor='exercise'>
                            Exercise:<br />
                        </label>
                        <input
                            type='text'
                            id='exercise'
                            autoComplete='off'
                            value={exercise}
                            disabled={true}
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
                            value={run}
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
                            value={rep}
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
                            value={pound}
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
                    <button onClick={deleted}>DELETE</button>
                    <p>
                        <Link to='/History'>Cancel</Link>
                    </p>
                </section>
                )}</>
                </div>
        </div>
    )
}

export default Edit