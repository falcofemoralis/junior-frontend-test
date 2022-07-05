import classNames from 'classnames';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import DownArrowIcon from '../../assets/down_arrow.svg';
import UpArrowIcon from '../../assets/up_arrow.svg';
import { RootState } from '../../store';
import { selectProductsCount } from '../../store/reducers/cartReducer';
import { selectCategories } from '../../store/reducers/categoryReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import CartModal from '../CartModal/CartModal';
import CurrenciesModal from '../CurrenciesModal/CurrenciesModal';
import LoadingLayout from '../LoadingLayout/LoadingLayout';
import CartIcon from './../../assets/cart.svg';
import LogoIcon from './../../assets/logo.svg';
import './Header.scss';

interface HeaderState {
  cartOpen: boolean;
  currenciesOpen: boolean;
}
interface RouteParams {
  category: string;
}
type HeaderProps = RouteComponentProps<RouteParams> & PropsFromRedux;

class Header extends React.Component<HeaderProps, HeaderState> {
  currenciesBtnRef = React.createRef<HTMLButtonElement>();

  constructor(props: HeaderProps) {
    super(props);

    this.state = { cartOpen: false, currenciesOpen: false };
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleCurrencies = this.toggleCurrencies.bind(this);
  }

  toggleCart() {
    this.setState(({ cartOpen }) => {
      return { cartOpen: !cartOpen };
    });
  }

  toggleCurrencies() {
    this.setState(({ currenciesOpen }) => {
      return { currenciesOpen: !currenciesOpen };
    });
  }

  render() {
    const { cartOpen, currenciesOpen } = this.state;
    const { categories, productsAmount, currency } = this.props;
    const currentCategory = this.props.match.params.category;

    if (!categories) {
      return <LoadingLayout cover />;
    }

    return (
      <header className='header'>
        <div className='header__inner'>
          {categories.length > 0 && (
            <nav className='header__navigation'>
              {categories.map(category => (
                <Link
                  key={category.name}
                  to={`/${category.name}`}
                  className={classNames('header__link', { 'header__link-selected': currentCategory === category.name })}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          )}
          <img className='header__logo' src={LogoIcon} alt='Logo' />
          <div className='header__buttons'>
            {currency && (
              <div className='currencies'>
                <button className='currencies__button' onClick={this.toggleCurrencies} ref={this.currenciesBtnRef} disabled={cartOpen}>
                  <span className='currencies__symbol'>{currency.symbol}</span>
                  <img className='currencies__arrow' src={currenciesOpen ? UpArrowIcon : DownArrowIcon} />
                </button>
                <CurrenciesModal open={currenciesOpen} onClose={this.toggleCurrencies} currenciesBtnRef={this.currenciesBtnRef} />
              </div>
            )}
            <button className='cart__button' onClick={this.toggleCart}>
              {productsAmount > 0 && (
                <div className='cart__count'>
                  <span className='cart__count-text'>{productsAmount}</span>
                </div>
              )}
              <img src={CartIcon} alt='Cart Icon' />
            </button>
            <CartModal open={cartOpen} />
          </div>
        </div>
        {cartOpen && <div className='header__mask'></div>}
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state),
  productsAmount: selectProductsCount(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Header));
