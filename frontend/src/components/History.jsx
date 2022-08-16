import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"
import StrNav from "./StrNav";
import trophy2 from "../assets/trophy2.gif"

function History() {

    const [workouts, setWorkouts] = useState([])
    const [show, setShow] = useState(false)
    const [pr, setPR] = useState(false)
    const [max, setMax] = useState([])

    useEffect(() => {
        axios.get('/workout').then((response) => {
            const workouts = response.data.reverse()
            setWorkouts(workouts.map((workout) => workout))
        })
        axios.get('/greatest').then((response) => {
            const maxout = response.data[0]
            setMax(maxout.fields)
        })
    }, [])

    const reveal = (event) => {
        event.preventDefault()
        setShow(true)
        setPR(false)
    }

    const best = (event) => {
        event.preventDefault()
        setPR(true)
        setShow(false)
    }
    
    return (
        <div>
            <StrNav />
            <div>
                <h1 className='header'>All records are made to be broken</h1>
                <br />
                <div className='editing'>
                    <ul className="editing-links">
                            <li>
                                <a type='button' onClick={reveal}>History</a>
                            </li>
                            <li>
                                <Link to='/Record'>New Entry</Link>
                            </li>
                            <li>
                                <a type='button' onClick={best}>Personal Best</a>
                            </li>
                    </ul>
                </div>
                <div className="records">
                    <p>
                        <>
                            {show ? (
                                <ul className='records'>
                                    {
                                        workouts.map((workout) => <li>{workout.fields.exercise} - {workout.fields.sets} sets / {workout.fields.reps} reps / {workout.fields.pounds} lbs - <a type='button' href={`#/Edit/${workout.pk}`}>Edit</a></li>)
                                    }
                                </ul>
                              ) : pr ? (
                                    <div>
                                        <h2 className='maxout'>That's what we like to call big damage</h2>
                                        <h3 className='maxout'>{max.exercise} - {max.sets} sets / {max.reps} reps / {max.pounds} lbs</h3>
                                        <img className="trophy" src={trophy2} width="14%" height="14%"/>
                                    </div>
                              ) : (
                                    <p>
                                        
                                    </p>
                            )}
                        </>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default History