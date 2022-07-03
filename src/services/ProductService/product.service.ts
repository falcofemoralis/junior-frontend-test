import { GET_PRODUCT, GET_CURRENCIES } from './product.query';
import { Currency, Product } from './../../types/product.type';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { client } from '..';

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
