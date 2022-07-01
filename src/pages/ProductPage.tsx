import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { withLayout } from '../components/hoc/BasicLayout';
import productService from '../services/ProductService/product.service';
import { AttributeItem, Product } from '../types/product.type';
import '../styles/ProductPage.scss';
import DOMPurify from 'dompurify';
import AttributeItems from '../components/AttributeItems/AttributeItems';

interface RouteParams {
  id: string;
}
type ProductPageProps = RouteComponentProps<RouteParams>;
interface ProductPageState {
  product: Product | null;
  currentImageIndex: number;
}
class ProductPage extends React.Component<ProductPageProps, ProductPageState> {
  constructor(props: ProductPageProps) {
    super(props);
    this.state = { product: null, currentImageIndex: 0 };
  }

  componentDidMount() {
    this.initProduct();
  }

  async initProduct() {
    const id = this.props.match.params.id;
    const product = await productService.getProduct(id);
    this.setState({ product: product });
  }

  onImageSelect(index: number) {
    this.setState({ currentImageIndex: index });
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <div>Loading</div>;
    }
    console.log(product);

    return (
      <div className='product'>
        <div className='gallery'>
          <ul className='gallery__list'>
            {product.gallery.map((img, index) => (
              <li className='gallery__item' key={img}>
                <img className='gallery__image' src={img} alt={img} onClick={() => this.onImageSelect(index)} />
              </li>
            ))}
          </ul>
          <img className='gallery__image-selected' src={product.gallery[this.state.currentImageIndex]} />
        </div>
        <div className='product__info'>
          <span className='product__title'>{product.name}</span>
          <span className='product__brand'>{product.brand}</span>
          <div className='attribute '>
            {product.attributes.map(attr => (
              <div className='attribute__item' key={attr.id}>
                <span className='attribute__title'>{attr.name}:</span>
                <AttributeItems attr={attr} />
              </div>
            ))}
          </div>
          <span className='attribute__title'>Price:</span>
          <span className='product__price'>
            {product.prices[0].currency.symbol}
            {product.prices[0].amount}
          </span>
          <button className='product__add'>ADD TO CART</button>
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}></span>
        </div>
      </div>
    );
  }
}

export default withLayout(withRouter(ProductPage));
