import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import categoryService from '../../services/CategoryService/category.service';
import Category from '../../types/category.type';
import LogoIcon from './../../assets/logo.svg';
import CartIcon from './../../assets/cart.svg';
import CurrencyIcon from './../../assets/currency.svg';
import { selectProductsCount } from '../../store/reducers/cartReducer';
import './Header.scss';
import { RootState } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import CartModal from '../CartModal/CartModal';

interface HeaderState {
  categories: Category[];
  cartOpen: boolean;
}
interface RouteParams {
  category: string;
}
type HeaderProps = RouteComponentProps<RouteParams> & PropsFromRedux;

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = { categories: [], cartOpen: false };
    this.toggleCart = this.toggleCart.bind(this);
  }

  componentDidMount() {
    this.initCategories();
  }

  async initCategories() {
    const categories = await categoryService.getCategories();
    this.setState({ categories });

    if (!this.props.match.params.category && this.props.match.path == '/') {
      this.props.history.push(`./${categories[0].name}`);
    }
  }

  toggleCart() {
    this.setState(({ cartOpen }) => {
      return { cartOpen: !cartOpen };
    });
  }

  render() {
    const { categories, cartOpen } = this.state;
    const { productsAmount } = this.props;
    const currentCategory = this.props.match.params.category;

    return (
      <>
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
              <img src={CurrencyIcon} alt='Currency Logo' />
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
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  productsAmount: selectProductsCount(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(Header));
