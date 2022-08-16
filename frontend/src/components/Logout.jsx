import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios"


const Logout = () => {
    
    return (
        <div className="App">
            <div className="App">
                <h1 className="announce">We await your return, Warrior.</h1>
                <p>
                    <Link to='/'>Exit</Link>
                </p>
            </div>
        </div>
    )
}

export default Logout