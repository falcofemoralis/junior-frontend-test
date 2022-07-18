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
}

class CurrenciesModal extends React.Component<CurrenciesModalProps> {
  onCurrencySelect(currency: Currency) {
    const { changeCurrency, onClose } = this.props;

    changeCurrency(currency);
    onClose();
  }

  render() {
    const { open, currencies, currency } = this.props;

    return (
      <div className={classNames('currenciesModal', { 'currenciesModal-active': open })}>
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
