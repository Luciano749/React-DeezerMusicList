import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import View1 from "./components/view1/View1";
import View2 from "./components/view2/View2";

import SearchProvider from "./context/SearchContext";
import FavoriteProvider from "./context/FavoriteContext";

function App() {
  return (
    <div className="App">
      <SearchProvider>
        <FavoriteProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={View1} />
              <Route path="/favorites" component={View2} />
            </Switch>
          </Router>
        </FavoriteProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
