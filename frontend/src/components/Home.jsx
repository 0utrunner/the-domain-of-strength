import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"
import StrNav from "./StrNav";


const Home = () => {
    const [arm, setArm] = useState([])
    const [chest, setChest] = useState([])
    const [back, setBack] = useState([])
    const [core, setCore] = useState([])
    const [leg, setLeg] = useState([])

    const [getarm, setGetArm] = useState(false)
    const [getchest, setGetChest] = useState(false)
    const [getback, setGetBack] = useState(false)
    const [getcore, setGetCore] = useState(false)
    const [getleg, setGetLeg] = useState(false)

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
     
    const arm_exercise = () => {
        axios.get('/arms').then((response) => {
            console.log(response.data)
            setArm(response.data)
            setGetArm(true)
            setGetChest(false)
            setGetBack(false)
            setGetCore(false)
            setGetLeg(false)
        })
    }
    const chest_exercise = () => {
        axios.get('/chest').then((response) => {
            console.log(response.data)
            setChest(response.data)
            setGetChest(true)
            setGetArm(false)
            setGetBack(false)
            setGetCore(false)
            setGetLeg(false)
        })
    }
    const back_exercise = () => {
        axios.get('/back').then((response) => {
            console.log(response.data)
            setBack(response.data)
            setGetBack(true)
            setGetChest(false)
            setGetArm(false)
            setGetCore(false)
            setGetLeg(false)
        })
    }
    const core_exercise = () => {
        axios.get('/core').then((response) => {
            console.log(response.data)
            setCore(response.data)
            setGetCore(true)
            setGetChest(false)
            setGetArm(false)
            setGetBack(false)
            setGetLeg(false)
        })
    }
    const leg_exercise = () => {
        axios.get('/legs').then((response) => {
            console.log(response.data)
            setLeg(response.data)
            setGetLeg(true)
            setGetChest(false)
            setGetArm(false)
            setGetBack(false)
            setGetCore(false)
        })
    }

    return (
        <div>
            <StrNav />
            <div>
                <h1 className='header'>Select a group to strengthen</h1>
                <br />
                <div className="content">
                    <ul className="muscle">
                        <li>
                            <a type="button" onClick={arm_exercise}>Arms</a>
                        </li>
                        <li>
                            <a type="button" onClick={chest_exercise}>Chest</a>
                        </li>
                        <li>
                            <a type="button" onClick={core_exercise}>Core</a>
                        </li>
                        <li>
                            <a type="button" onClick={back_exercise}>Back</a>
                        </li>
                        <li>
                            <a type="button" onClick={leg_exercise}>Legs</a>
                        </li>
                    </ul>
                </div>
                <div className="content">
                    <p>
                        <>
                            { getarm ? (
                            <ul>
                                {
                                    arm.map(item => ( <li key={item.id}>{item.name}<br />{item.instructions}</li> ))
                                }
                            </ul>
                            ) : getchest ? (
                            <ul>
                                {
                                    chest.map(item => ( <li key={item.id}>{item.name}<br />{item.instructions}</li> ))
                                }
                            </ul>
                            ) : getcore ? (
                            <ul>
                                {
                                    core.map(item => ( <li key={item.id}>{item.name}<br />{item.instructions}</li> ))
                                }
                            </ul>
                            ) : getback ? (
                            <ul>
                                {
                                    back.map(item => ( <li key={item.id}>{item.name}<br />{item.instructions}</li> ))
                                }
                            </ul>
                            ) : getleg ? (
                            <ul>
                                {
                                    leg.map(item => ( <li key={item.id}>{item.name}<br />{item.instructions}</li> ))
                                }
                            </ul>
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

export default Home