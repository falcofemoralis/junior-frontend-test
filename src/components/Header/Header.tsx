import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApolloContext } from '../../ApolloContext';
import { GET_CATEGORIES } from '../../query/category.query';
import { RootState } from '../../store';
import { AppDispatch } from '../../store/index';
import { initCategories } from '../../store/reducers/categoryReducer';
import Category from '../../types/category.type';
import BrandIcon from './../../assets/brandIcon.svg';
import Cart from './../../assets/cart.svg';
import Currency from './../../assets/currency.svg';
import './Header.scss';

class Header extends React.Component<PropsFromRedux, unknown> {
  static contextType = ApolloContext;
  context!: React.ContextType<typeof ApolloContext>;

  componentDidMount() {
    this.initCategories();
  }

  async initCategories() {
    const { client } = this.context!;
    const res = await client.query<{ categories: Category[] }>({ query: GET_CATEGORIES });

    if (res) {
      this.props.initCategories(res.data.categories);
    }
  }

  render() {
    return (
      <header className='header'>
        <nav>
          {this.props.categories.length > 0 &&
            this.props.categories.map(category => (
              <Link to={`/${category.name}`} className='header__link' key={category.name}>
                {category.name}
              </Link>
            ))}
        </nav>
        <img className='header__logo' src={BrandIcon} alt='Logo' />
        <div>
          <img src={Currency} alt='Currency Logo' />
          <img src={Cart} alt='Cart Logo' />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.category.categories
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  initCategories: (categories: Category[]) => dispatch(initCategories(categories))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
