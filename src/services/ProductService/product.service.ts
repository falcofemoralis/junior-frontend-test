import { GET_PRODUCT } from './product.query';
import { Product } from './../../types/product.type';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { client } from '..';

class ProductService {
  apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = client;
  }

  async getProduct(id: string) {
    const product = (await this.apolloClient.query<{ product: Product }>({ query: GET_PRODUCT, variables: { id } })).data.product;
    return product;
  }
}

export default new ProductService(client);
