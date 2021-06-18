import React from 'react';
import { NavLink } from 'react-router-dom';

import './navBar.css';

export default function NavBar() {


    return (
        <nav>

            <div className="navMenuContainer">

                <NavLink to="/">
                    <div className="logoTitle">
                        <img src="logo-tureceta.jpg"
                            alt=""></img>
                        <h4>MyRecipe</h4>
                    </div>
                </NavLink>

                <NavLink activeClassName="selected" exact to="/recipes">
                    Recipes
                </NavLink>

                <NavLink activeClassName="selected" to="/recipes/create-recipe">
                    Create recipe
                </NavLink>
            </div>

            {/* <div className="busquedaContainer">
                <input type="text" placeholder="Buscar..."></input>
                <button>Buscar</button></div> */}


        </nav>
    );
}