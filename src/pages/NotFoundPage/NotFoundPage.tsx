import React from 'react';
import { BasicLayout } from '../../components/BasicLayout/BasicLayout';

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <BasicLayout>
        <span>{`Page not found`}</span>
      </BasicLayout>
    );
  }
}
