import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ApolloContext } from '../ApolloContext';
import Category from '../components/Category/Category';
import { GET_CATEGORY } from '../query/category.query';
import { RootState } from '../store';
import { Product } from '../types/product.type';

interface RouteParams {
  category: string;
}
interface CategoryPageProps extends RouteComponentProps<RouteParams>, PropsFromRedux {}
interface CategoryPageState {
  products: Product[] | null;
  currentCategory: string;
}

class CategoryPage extends React.Component<CategoryPageProps, CategoryPageState> {
  static contextType = ApolloContext;
  context!: React.ContextType<typeof ApolloContext>;

  constructor(props: CategoryPageProps) {
    super(props);
    this.state = {
      products: null,
      currentCategory: props.match.params.category
    };
  }

  componentDidMount() {
    // if uri param is exist - get products
    if (this.state.currentCategory) {
      this.getCategoryProducts(this.state.currentCategory);
    }
  }

  componentDidUpdate(prevProps: CategoryPageProps) {
    // if uri param isn't exist - wait for categories and then get the first one
    if (!this.state.currentCategory && this.props.categories.length > 0) {
      this.getCategoryProducts(this.props.categories[0].name);
      return;
    }

    // if uri param has changed - refetch products
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.getCategoryProducts(this.props.match.params.category);
      return;
    }
  }

  async getCategoryProducts(category: string) {
    const { client } = this.context!;

    const res = await client.query<{ category: { products: Product[] } }>({
      query: GET_CATEGORY,
      variables: { input: { title: category } }
    });

    if (res) {
      this.setState({ products: res.data.category.products, currentCategory: category });
    }
  }

  render() {
    return <div>{this.state.products && <Category products={this.state.products} />}</div>;
  }
}

const mapStateToProps = (state: RootState) => ({
  categories: state.category.categories
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connector(CategoryPage));
