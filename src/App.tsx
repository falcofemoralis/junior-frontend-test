import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { AppDispatch } from './store';
import { initCart, getLocalCart } from './store/reducers/cartReducer';
import './styles/App.scss';
import { CartItem as CartItemType } from './types/cartItem.type';
import productService from './services/ProductService/product.service';
import { Currency } from './types/product.type';
import { initCurrencies } from './store/reducers/currencyReducer';
import CartPage from './pages/CartPage/CartPage';

class App extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.initProducts();
    this.initCurrencies();
  }

  async initProducts() {
    const localCartItems = getLocalCart();
    if (localCartItems) {
      const items: CartItemType[] = [];

      for (const item of localCartItems) {
        const product = await productService.getProduct(item.productId);
        items.push({ product, quantity: item.quantity, selectedAttributes: item.selectedAttributes });
      }

      this.props.initCart(items);
    }
  }

  async initCurrencies() {
    this.props.initCurrencies(await productService.getCurrencies());
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
  initCurrencies: (currencies: Currency[]) => dispatch(initCurrencies(currencies)),
  initCart: (items: CartItemType[]) => dispatch(initCart(items))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(App);
