import { gql } from '@apollo/client';

export const GET_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      brand
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
`;

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
