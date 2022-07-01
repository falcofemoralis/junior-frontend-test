import React from 'react';
import Header from '../Header/Header';

export const withLayout = (Component: React.ComponentType) => {
  return class ComponentWithLayout extends React.Component {
    render() {
      return (
        <div>
          <Header />
          <Component />
        </div>
      );
    }
  };
};
