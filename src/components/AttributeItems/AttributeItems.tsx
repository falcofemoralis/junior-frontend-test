import React from 'react';
import { Attribute, AttributeItem, AttributeType } from '../../types/product.type';
import './AttributeItems.scss';

interface AttributeItemsProps {
  attribute: Attribute;
  onAttributeItemSelect?: (attributeId: string, itemId: string) => void;
  selectedItem?: string;
  small?: boolean;
  selectable?: boolean;
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

    this.isItemSelected = this.isItemSelected.bind(this);
  }

  onSelect(item: AttributeItem) {
    if (item.id !== this.state.selectedAttribute?.id && this.props.selectable) {
      if (this.props.onAttributeItemSelect) {
        this.props.onAttributeItemSelect(this.props.attribute.id, item.id);
      }
      this.setState({ selectedAttribute: item });
    }
  }

  isItemSelected(item: AttributeItem) {
    return item.id === this.state.selectedAttribute?.id || item.id === this.props.selectedItem;
  }

  render() {
    const { attribute, selectable, small } = this.props;
    const type = attribute.type;

    return (
      <div className='attributes'>
        {attribute.items.map(item => (
          <div
            className={`attributes__item ${type} ${this.isItemSelected(item) && `${type}-selected`} ${small && `${type}-small`}`}
            key={item.id}
            style={{ cursor: selectable ? 'pointer' : 'unset' }}
            onClick={() => this.onSelect(item)}
          >
            {type === AttributeType.text ? (
              item.value
            ) : (
              <div className={`swatch__item ${small && `swatch__item-small`}`} style={{ background: item.value }}></div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
