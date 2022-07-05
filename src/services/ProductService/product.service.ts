import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { client } from '..';
import { Currency, Product } from './../../types/product.type';
import { GET_CURRENCIES, GET_PRODUCT } from './product.query';

class ProductService {
  apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor(client: ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = client;
  }

  async getProduct(id: string) {
    const product = (await this.apolloClient.query<{ product: Product }>({ query: GET_PRODUCT, variables: { id }, fetchPolicy: 'network-only' })).data.product;
    return product;
  }

  async getCurrencies() {
    const currencies = (await this.apolloClient.query<{ currencies: Currency[] }>({ query: GET_CURRENCIES })).data.currencies;
    return currencies;
  }
}

export default new ProductService(client);
