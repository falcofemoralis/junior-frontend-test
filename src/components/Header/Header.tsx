import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import categoryService from '../../services/CategoryService/category.service';
import Category from '../../types/category.type';
import BrandIcon from './../../assets/brandIcon.svg';
import Cart from './../../assets/cart.svg';
import Currency from './../../assets/currency.svg';
import './Header.scss';

interface HeaderState {
  categories: Category[];
}
interface RouteParams {
  category: string;
}
type HeaderProps = RouteComponentProps<RouteParams>;

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = { categories: [] };
  }

  componentDidMount() {
    this.initCategories();
  }

  componentDidUpdate() {
    console.log('update');
  }

  async initCategories() {
    const categories = await categoryService.getCategories();
    this.setState({ categories });

    if (!this.props.match.params.category && this.props.match.path == '/') {
      this.props.history.push(`./${categories[0].name}`);
    }
  }

  render() {
    const { categories } = this.state;
    const currentCategory = this.props.match.params.category;

    return (
      <header className='header'>
        <nav>
          {categories.length > 0 &&
            categories.map(category => (
              <Link to={`/${category.name}`} className={`header__link ${currentCategory === category.name ? 'header__link-selected' : ''}`} key={category.name}>
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

export default withRouter(Header);
