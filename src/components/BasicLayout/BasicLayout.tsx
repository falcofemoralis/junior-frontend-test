import React from 'react';
import Header from '../Header/Header';

interface BasicLayoutProps {
  children: React.ReactChild;
}
export class BasicLayout extends React.Component<BasicLayoutProps> {
  render() {
    return (
      <>
        <Header />
        <main>{this.props.children}</main>
      </>
    );
  }
}
