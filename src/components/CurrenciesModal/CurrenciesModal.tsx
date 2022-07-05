import classNames from 'classnames';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { changeCurrency, selectCurrencies, selectCurrency } from '../../store/reducers/currencyReducer';
import { Currency } from '../../types/product.type';
import './CurrenciesModal.scss';

interface CurrenciesModalProps extends PropsFromRedux {
  open: boolean;
  onClose: () => void;
  currenciesBtnRef: React.RefObject<HTMLButtonElement>;
}

class CurrenciesModal extends React.Component<CurrenciesModalProps> {
  wrapperRef = React.createRef<HTMLDivElement>();

  constructor(props: CurrenciesModalProps) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event: MouseEvent) {
    if (!this.wrapperRef.current) {
      return;
    }

    if (!this.props.open) {
      return;
    }

    if (!this.wrapperRef.current.contains(event.target as Node) && !this.props.currenciesBtnRef.current?.contains(event.target as Node)) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  onCurrencySelect(currency: Currency) {
    this.props.changeCurrency(currency);
    this.props.onClose();
  }

  render() {
    const { open, currencies, currency } = this.props;

    return (
      <div className={classNames('currenciesModal', { 'currenciesModal-active': open })} ref={this.wrapperRef}>
        <div className='currenciesModal__container'>
          {currencies.map(c => (
            <button
              className={classNames('currenciesModal__item', { 'currenciesModal__item-selected': c.label == currency?.label })}
              key={c.label}
              onClick={() => this.onCurrencySelect(c)}
            >
              {c.symbol} {c.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  currencies: selectCurrencies(state),
  currency: selectCurrency(state)
});
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changeCurrency: (currency: Currency) => dispatch(changeCurrency(currency))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CurrenciesModal);
