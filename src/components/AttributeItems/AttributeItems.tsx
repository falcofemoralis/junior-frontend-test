import React from 'react';
import { Attribute, AttributeItem, AttributeType } from '../../types/product.type';
import './AttributeItems.scss';

interface AttributeItemsProps {
  attribute: Attribute;
  onAttributeItemSelect: (attributeId: string, itemId: string) => void;
}

interface AttributeItemsState {
  selectedAttribute: AttributeItem | null;
}
export default class AttributeItems extends React.Component<AttributeItemsProps, AttributeItemsState> {
  constructor(props: AttributeItemsProps) {
    super(props);

    this.state = {
      selectedAttribute: null
    };
  }

  onSelect(item: AttributeItem) {
    if (item.id !== this.state.selectedAttribute?.id) {
      this.props.onAttributeItemSelect(this.props.attribute.id, item.id);
      this.setState({ selectedAttribute: item });
    }
  }

  render() {
    const { attribute } = this.props;
    const { selectedAttribute } = this.state;

    // TODO duplicate code
    if (attribute.type === AttributeType.text) {
      return (
        <div className='attributes'>
          {attribute.items.map(item => (
            <div
              className={`attributes__item text ${item.id === selectedAttribute?.id ? 'text-selected' : ''}`}
              key={item.id}
              onClick={() => this.onSelect(item)}
            >
              {item.value}
            </div>
          ))}
        </div>
      );
    } else if (attribute.type === AttributeType.swatch) {
      return (
        <div className='attributes'>
          {attribute.items.map(item => (
            <div
              className={`attributes__item swatch ${item.id === selectedAttribute?.id ? 'swatch-selected' : ''}`}
              key={item.id}
              onClick={() => this.onSelect(item)}
            >
              <div className='swatch__item' style={{ background: item.value }}></div>
            </div>
          ))}
        </div>
      );
    } else {
      return null;
    }
  }
}
