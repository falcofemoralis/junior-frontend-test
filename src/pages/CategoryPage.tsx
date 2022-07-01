import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Category from '../components/Category/Category';
import { withLayout } from '../components/hoc/BasicLayout';
import categoryService from '../services/CategoryService/category.service';
import { Product } from '../types/product.type';

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
    return <div>{this.state.products && <Category category={this.state.currentCategory} products={this.state.products} />}</div>;
  }
}
export default withLayout(withRouter(CategoryPage));
