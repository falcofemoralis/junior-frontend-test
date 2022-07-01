import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { client } from '..';
import Category from '../../types/category.type';
import { GET_CATEGORIES, GET_CATEGORY } from './category.query';
import { Product } from '../../types/product.type';

class CategoryService {
  apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = client;
  }

  async getCategories() {
    const res = await this.apolloClient.query<{ categories: Category[] }>({ query: GET_CATEGORIES });
    return res.data.categories;
  }

  async getCategoryProducts(title: string) {
    const res = await client.query<{ category: { products: Product[] } }>({
      query: GET_CATEGORY,
      variables: { input: { title } }
    });

    console.log(res.data.category.products);

    return res.data.category.products;
  }
}

export default new CategoryService(client);
