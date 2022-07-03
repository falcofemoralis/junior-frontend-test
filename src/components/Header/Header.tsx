import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import DownArrowIcon from '../../assets/down_arrow.svg';
import UpArrowIcon from '../../assets/up_arrow.svg';
import categoryService from '../../services/CategoryService/category.service';
import { RootState } from '../../store';
import { selectProductsCount } from '../../store/reducers/cartReducer';
import { selectCurrency } from '../../store/reducers/currencyReducer';
import Category from '../../types/category.type';
import CartModal from '../CartModal/CartModal';
import CurrenciesModal from '../CurrenciesModal/CurrenciesModal';
import CartIcon from './../../assets/cart.svg';
import LogoIcon from './../../assets/logo.svg';
import './Header.scss';

interface HeaderState {
  categories: Category[];
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

    this.state = { categories: [], cartOpen: false, currenciesOpen: false };
    this.toggleCart = this.toggleCart.bind(this);
    this.toggleCurrencies = this.toggleCurrencies.bind(this);
  }

  componentDidMount() {
    this.initCategories();
  }

  async initCategories() {
    const categories = await categoryService.getCategories();
    this.setState({ categories });

    if (!this.props.match.params.category && this.props.location.pathname == '/') {
      this.props.history.push(`./${categories[0].name}`);
    }
  }

  toggleCart() {
    this.setState(({ cartOpen }) => {
      return { cartOpen: !cartOpen };
    });
  }

  toggleCurrencies() {
    this.setState(({ currenciesOpen }) => {
      console.log('toggle to ' + !currenciesOpen);

      return { currenciesOpen: !currenciesOpen };
    });
  }

  render() {
    const { categories, cartOpen, currenciesOpen } = this.state;
    const { productsAmount, currency } = this.props;
    const currentCategory = this.props.match.params.category;

    return (
      <header className='header'>
        <div className='header__inner'>
          <nav className='header__navigation'>
            {categories.length > 0 &&
              categories.map(category => (
                <Link
                  to={`/${category.name}`}
                  className={`header__link ${currentCategory === category.name ? 'header__link-selected' : ''}`}
                  key={category.name}
                >
                  {category.name}
                </Link>
              ))}
          </nav>
          <img className='header__logo' src={LogoIcon} alt='Logo' />
          <div className='header__buttons'>
            {currency && (
              <div className='currencies'>
                <button className='currencies__button' onClick={this.toggleCurrencies} ref={this.currenciesBtnRef}>
                  <span className='currencies__symbol'>{currency.symbol}</span>
                  <img className='currencies__arrow' src={currenciesOpen ? UpArrowIcon : DownArrowIcon} />
                </button>
                <CurrenciesModal open={currenciesOpen} onClose={this.toggleCurrencies} currenciesBtnRef={this.currenciesBtnRef} />
              </div>
            )}
            <div className='cart'>
              <button className='cart__button' onClick={this.toggleCart}>
                {productsAmount > 0 && (
                  <div className='cart__count'>
                    <span className='cart__count-text'>{productsAmount}</span>
                  </div>
                )}
                <img className='cart__logo' src={CartIcon} alt='Cart Logo' />
              </button>
            </div>
            <CartModal open={cartOpen} />
          </div>
        </div>
        {cartOpen && <div className='header__mask'></div>}
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  productsAmount: selectProductsCount(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Header));
