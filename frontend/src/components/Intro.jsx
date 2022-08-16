import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png"
import axios from "../api/axios"

const Intro = () => {
   
    return (
        <div className="App">
            <h1 className='header'>The Domain of Strength</h1>
            <br />
            <section>
                <p>
                    This is a place where a person can test their own strenth. As a member, 
                    you'll be able to track your workout history, find exercises based
                    on muscle groups and examples of how to perform them. Here, your opponent
                    is you. Who will win? Time to walk the path.<br /><br />
                    <Link to='/Login'>Sign In</Link>
                    <br /><br />
                    <Link to='/Register'>Sign Up</Link>
                </p>
            </section>
            <img className="image" src={logo2} width="15%" height="15%"/>
        </div>
    )
}

export default Intro