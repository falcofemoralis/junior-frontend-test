import React from 'react';
import { Attribute, AttributeItem, AttributeType } from '../../types/product.type';
import './AttributeItems.scss';

interface AttributeItemsProps {
  attr: Attribute;
}
export default class AttributeItems extends React.Component<AttributeItemsProps> {
  renderAttributeItems(items: AttributeItem[]) {
    return (
      <div>
        {items.map(item => (
          <div key={item.id}>{item.value}</div>
        ))}
      </div>
    );
  }

  render() {
    const { attr } = this.props;

    if (attr.type === AttributeType.text) {
      return (
        <div className='attributes'>
          {attr.items.map(item => (
            <div className='attributes__item text' key={item.id}>
              {item.value}
            </div>
          ))}
        </div>
      );
    } else if (attr.type === AttributeType.swatch) {
      return (
        <div className='attributes'>
          {attr.items.map(item => (
            <div className='attributes__item swatch' key={item.id} style={{ background: item.value }}></div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
