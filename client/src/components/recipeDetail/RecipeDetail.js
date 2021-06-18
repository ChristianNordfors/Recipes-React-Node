
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { showNotification } from '../../actions/notification';
import { getRecipe } from '../../functions/recipes';
import Loading from '../shared/Loading';


import './recipeDetail.css';


export default function RecipeDetail() {

    const { id } = useParams();

    const [recipe, setRecipe] = useState();
    const [dietDetail, setDietDetail] = useState('');

    const history = useHistory()

    const dispatch = useDispatch();
    const diets = useSelector(state => state.diets.dietsLoaded);

    let parser = new DOMParser();
    let { body } = parser.parseFromString(recipe?.summary, 'text/html');

    useEffect(() => {
        getRecipe(id)
            .then(({ data }) => {
                setRecipe(data.recipe);
            }).catch(error => {
                history.replace('/recipes');
                dispatch(showNotification('Recipe not found', 'danger'));
            });

    }, [id, dispatch, history]);


    const showDietInfo = (name) => {
        console.log(name);
        let diet = diets.find(d => d.name === name);
        // setTimeout(() => {
        setDietDetail(diet?.description);
        // }, 500)
    };


    return <div className="container">

        {
            recipe ?
            <>
                <button role="button" type="button" className="btnBack" onClick={() => history.goBack()}> &lt; Go back</button>

                <div className="recipeDetailHeader">

                    <div className="summaryContainer">

                        <div className="checkedDietsDetail">
                            {recipe?.vegetarian && <span className="badge badge-success">Vegetarian</span>}
                            {recipe?.vegan && <span className="badge badge-success">Vegan</span>}
                            {recipe?.glutenFree && <span className="badge badge-success">Gluten Free</span>}
                        </div>

                        <h1>{recipe?.title}</h1>

                        {body.textContent}


                    </div>
                    <img src={recipe?.image ? recipe.image : 'https://static.vecteezy.com/system/resources/previews/000/454/652/non_2x/background-template-with-food-on-the-table-vector.jpg'} alt=""></img>
                </div>


                <div className="detailScoreContainer">
                    <p>Health Score: {recipe?.healthScore}</p>
                    <p>Spoonacular Score: <span>{recipe?.spoonacularScore}%</span></p>
                    {dietDetail && <div className="dietDetail">{dietDetail}</div>}
                </div>


                <div className="dietsContainer" onMouseLeave={(() => setDietDetail(''))}>
                    {recipe?.diets.length > 0 && recipe.diets.map(diet =>
                        <span key={diet.id ? diet.id : diet} onMouseOver={() => showDietInfo(diet.name ? diet.name : diet)}>
                            <p className="badge badge-success">{diet.name ? diet.name : diet}</p>
                        </span>
                    )}
                </div>


                {recipe?.analyzedInstructions[0]?.steps?.length > 0 &&
                    <div className="analyzedInstructionsContainer">

                        <h2>Instructions</h2>

                        {recipe.analyzedInstructions[0].steps.map((s, i) =>
                            <div key={s.number}>
                                <h3>Step {i + 1}</h3>
                                <p>{s.step}</p>

                            </div>
                        )}
                    </div>}
            </>
            :
            <Loading></Loading>
        }
    </div>


}