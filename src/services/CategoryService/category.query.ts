import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_CATEGORY = gql`
  query ($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        brand
        name
        gallery
        inStock
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;
