import classNames from 'classnames';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import DownArrowIcon from '../../assets/down_arrow.svg';
import UpArrowIcon from '../../assets/up_arrow.svg';
import { RootState } from '../../store';
import { selectProductsCount } from '../../store/reducers/cartReducer';
import { selectCategories } from '../../store/reducers/categoryReducer';
import { selectCurrencies, selectCurrency } from '../../store/reducers/currencyReducer';
import CartModal from '../CartModal/CartModal';
import ClickOutside from '../ClickOutside/ClickOutside';
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

  renderNavigation() {
    const currentCategory = this.props.match.params.category;
    const { categories } = this.props;

    if (!categories) {
      return <LoadingLayout cover />;
    }

    return (
      categories.length > 0 && (
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
      )
    );
  }

  renderCurrencies() {
    const { currenciesOpen } = this.state;
    const { currency, currencies } = this.props;
    const currenciesBtnRef = React.createRef<HTMLButtonElement>();

    if (!currencies) return;
    if (!currency) return;

    return (
      <div className='currencies'>
        <button className='currencies__button' onClick={this.toggleCurrencies} ref={currenciesBtnRef}>
          <span className='currencies__symbol'>{currency.symbol}</span>
          <img className='currencies__arrow' src={currenciesOpen ? UpArrowIcon : DownArrowIcon} />
        </button>
        <ClickOutside open={currenciesOpen} onClick={this.toggleCurrencies} btnRef={currenciesBtnRef}>
          <CurrenciesModal open={currenciesOpen} onClose={this.toggleCurrencies} />
        </ClickOutside>
      </div>
    );
  }

  renderCart() {
    const { cartOpen } = this.state;
    const { productsAmount } = this.props;
    const cartBtnRef = React.createRef<HTMLButtonElement>();

    return (
      <div className='cart'>
        <button className='cart__button' onClick={this.toggleCart} ref={cartBtnRef}>
          {productsAmount > 0 && (
            <div className='cart__count'>
              <span className='cart__count-text'>{productsAmount}</span>
            </div>
          )}
          <img src={CartIcon} alt='Cart Icon' />
        </button>
        <ClickOutside open={cartOpen} onClick={this.toggleCart} btnRef={cartBtnRef}>
          <CartModal open={cartOpen} />
        </ClickOutside>
        <div className={classNames('cart__mask', { 'cart__mask-visible': cartOpen })}></div>
      </div>
    );
  }

  render() {
    return (
      <header className='header'>
        <div className='header__inner'>
          {this.renderNavigation()}
          <img className='header__logo' src={LogoIcon} alt='Logo' />
          <div className='header__buttons'>
            {this.renderCurrencies()}
            {this.renderCart()}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state),
  productsAmount: selectProductsCount(state),
  currency: selectCurrency(state),
  currencies: selectCurrencies(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Header));
