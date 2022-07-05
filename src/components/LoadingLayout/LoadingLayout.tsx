import React from 'react';
import './LoadingLayout.scss';
import LoadingAnimation from '../../assets/loading.gif';
import classNames from 'classnames';

interface LoadingLayoutProps {
  cover?: boolean;
}
export default class LoadingLayout extends React.Component<LoadingLayoutProps> {
  render() {
    return (
      <div className={classNames('loadingLayout', this.props.cover ? 'loadingLayout__cover' : 'loadingLayout__contain')}>
        <img src={LoadingAnimation} />
      </div>
    );
  }
}
