import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import CartPage from './pages/CartPage/CartPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProductPage from './pages/ProductPage/ProductPage';
import categoryService from './services/CategoryService/category.service';
import productService from './services/ProductService/product.service';
import { AppDispatch } from './store';
import { initCart } from './store/reducers/cartReducer';
import { initCategories } from './store/reducers/categoryReducer';
import { initCurrencies } from './store/reducers/currencyReducer';
import './styles/App.scss';
import Category from './types/category.type';
import { Currency } from './types/product.type';

interface RouteParams {
  category: string;
}
class App extends React.Component<PropsFromRedux & RouteComponentProps<RouteParams>> {
  componentDidMount() {
    this.initCategories();
    this.initCurrencies();
    this.initCart();
  }

  async initCategories() {
    const categories = await categoryService.getCategories();

    this.props.initCategories(categories);

    if (!this.props.match.params.category && this.props.location.pathname == '/') {
      this.props.history.push(`./${categories[0].name}`);
    }
  }

  async initCurrencies() {
    this.props.initCurrencies(await productService.getCurrencies());
  }

  async initCart() {
    this.props.initCart();
  }

  render() {
    return (
      <div>
        <div className='container'>
          <Switch>
            <Route path='/product/:id'>
              <ProductPage />
            </Route>
            <Route path='/cart'>
              <CartPage />
            </Route>
            <Route path='/404'>
              <NotFoundPage />
            </Route>
            <Route path='/:category?'>
              <CategoryPage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initCategories: (categories: Category[]) => dispatch(initCategories(categories)),
  initCurrencies: (currencies: Currency[]) => dispatch(initCurrencies(currencies)),
  initCart: () => dispatch(initCart())
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(App));
