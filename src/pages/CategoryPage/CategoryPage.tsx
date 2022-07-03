import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';
import ProductCard from '../../components/ProductCard/ProductCard';
import categoryService from '../../services/CategoryService/category.service';
import { Product } from '../../types/product.type';
import './CategoryPage.scss';

interface RouteParams {
  category: string;
}
type CategoryPageProps = RouteComponentProps<RouteParams>;
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
  }

  async getCategoryProducts() {
    const category = this.props.match.params.category;

    if (!category) {
      return;
    }

    const products = await categoryService.getCategoryProducts(category);
    this.setState({ products, currentCategory: category });
  }

  render() {
    const { products, currentCategory } = this.state;

    return (
      <BasicLayout>
        {products ? (
          <div className='category'>
            <h2 className='category__title'>{currentCategory}</h2>
            <ul className='category__products'>
              {products.map(product => (
                <li key={product.id} className='category__products__item'>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <span>Loading...</span>
        )}
      </BasicLayout>
    );
  }
}
export default withRouter(CategoryPage);
