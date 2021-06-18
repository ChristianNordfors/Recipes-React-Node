import { Redirect, Route, Switch } from 'react-router';
import './App.css';
import Landing from './components/landing/Landing';

import RecipeApp from './RecipeApp';

function App() {
  return (<>

    <Switch>
      <Route path="/recipes" component={RecipeApp}></Route>
      <Route exact path="/" component={Landing}></Route>
      <Redirect to="/recipes"></Redirect>
    </Switch>
  </>);
}

export default App;
