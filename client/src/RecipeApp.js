import { Route, Switch } from 'react-router';
import './App.css';
import Recipes from './components/recipes/Recipes';
import NavBar from './components/shared/NavBar';
import CreateRecipe from './components/createRecipe/CreateRecipe';
import Footer from './components/shared/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDiets } from './actions/diets';
import { startGetRecipes } from './actions/recipes';
import RecipeDetail from './components/recipeDetail/RecipeDetail';
import Notification from './components/shared/Notification';


function RecipeApp() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  useEffect(() => {
    dispatch(startGetRecipes());
  }, [dispatch]);

  return (<>

    <NavBar></NavBar>

    <Notification></Notification>

    <Switch>
      <Route exact path="/recipes/recipe/:id" component={RecipeDetail}></Route>
      <Route exact path="/recipes/create-recipe" component={CreateRecipe}></Route>
      {/* <Route path="/?name=" component={Recipes}></Route> */}
      <Route path="/" component={Recipes}></Route>
    </Switch>

    <Footer></Footer>
  </>);
}

export default RecipeApp;
