import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import './styles/App.scss';

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <CategoryPage />
            </Route>
            <Route exact path='/product/:id'>
              <ProductPage />
            </Route>
            <Route exact path='/:category'>
              <CategoryPage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
