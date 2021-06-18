import React from 'react';
import { Link } from 'react-router-dom';

import './landing.css';

export default function Landing() {

    return (
        <div className="landingContainer">
            <span className="background-img"></span>


            <div className="txtContainer">
                <p className="title">Welcome to MyRecipe</p>
                <p className="subTitle">Come and see all the recipes we have for you or share your own one!</p>
                <Link to="/recipes" className="btn">
                    Start cooking
                </Link>
            </div>

        </div>
    )
}