import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import LoadingLayout from '../../components/LoadingLayout/LoadingLayout';
import ProductCard from '../../components/ProductCard/ProductCard';
import categoryService from '../../services/CategoryService/category.service';
import { RootState } from '../../store';
import { selectCategories } from '../../store/reducers/categoryReducer';
import { Product } from '../../types/product.type';
import './CategoryPage.scss';

interface RouteParams {
  category: string;
}
type CategoryPageProps = RouteComponentProps<RouteParams> & PropsFromRedux;
interface CategoryPageState {
  products: Product[] | null;
  currentCategory: string;
}

class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {
  constructor(props: CategoryPageProps) {
    super(props);
    this.state = {
      products: null,
      currentCategory: props.match.params.category
    };
  }

  componentDidMount() {
    this.getCategoryProducts();
  }

  componentDidUpdate(prevProps: CategoryPageProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.getCategoryProducts();
    }

    if (this.props.location.pathname != '/' && this.props.categories) {
      this.checkCategoryExist();
    }
  }

  checkCategoryExist() {
    if (!this.props.categories?.find(c => c.name == this.props.match.params.category)) {
      this.props.history.push('./404');
    }
  }

  async getCategoryProducts() {
    const category = this.props.match.params.category;

    if (!category) {
      return;
    }

    this.setState({ products: null });

    const products = await categoryService.getCategoryProducts(category);
    this.setState({ products, currentCategory: category });
  }

  render() {
    const { products, currentCategory } = this.state;

    if (!products) {
      return (
        <BasicLayout>
          <LoadingLayout />
        </BasicLayout>
      );
    }

    return (
      <BasicLayout>
        <div className='category'>
          <h2 className='category__title'>{currentCategory}</h2>
          <ul className='category__products'>
            {products.map(product => (
              <li key={product.id} className='category__product'>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </BasicLayout>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: selectCategories(state)
});
const mapDispatchToProps = () => ({});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(CategoryPage));
