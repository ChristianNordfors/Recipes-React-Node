import React from 'react';
import { Link } from 'react-router-dom';

import './recipe.css';

export default function Recipe({ id, title, image, diets, summary, vegetarian, vegan, glutenFree, handleFilter }) {

    return (<>

        <div className="card fadeIn">

            <Link to={`/recipes/recipe/${id}`}>
                <div className="card-img">
                    <div className="checkedDiets">
                        {vegetarian && <span className="badge badge-success pos-absolute">Vegetarian</span>}
                        {vegan && <span className="badge badge-success pos-absolute">Vegan</span>}
                        {glutenFree && <span className="badge badge-success pos-absolute">Gluten Free</span>}
                    </div>
                    <img src={image ? image : "https://static.vecteezy.com/system/resources/previews/000/454/652/non_2x/background-template-with-food-on-the-table-vector.jpg"} alt=""></img>
                </div>

                <div className="card-header">
                    <div className="card-title">
                        <p>{title.length < 55 ? title : title.slice(0, 55) + '...'}</p>
                    </div>
                </div>
            </Link>

            <div className="card-body">
                {diets.length > 0 ? diets.map((d, i) =>
                    <option key={i} onClick={(e) => handleFilter(e)} value={d.name ? d.name : d} className="badge badge-success">{d.name ? d.name : d}</option>
                )
                    :
                    summary.length < 300 ? summary : summary.slice(0, 300) + '...'
                }
            </div>

            <div className="card-footer"></div>

        </div>

    </>);

}