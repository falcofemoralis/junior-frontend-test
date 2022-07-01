import React from 'react';
import { withLayout } from '../components/hoc/BasicLayout';

class ProductPage extends React.Component {
  render() {
    return (
      <div>
        <span>ProductPage</span>
      </div>
    );
  }
}

export default withLayout(ProductPage);
