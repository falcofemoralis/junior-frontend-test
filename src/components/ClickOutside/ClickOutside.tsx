import React, { ReactNode } from 'react';

interface ClickOutsideProps {
  open: boolean;
  onClick: () => void;
  btnRef: React.RefObject<HTMLButtonElement>;
  children: ReactNode;
}
export class ClickOutside extends React.Component<ClickOutsideProps> {
  wrapperRef = React.createRef<HTMLDivElement>();

  constructor(props: ClickOutsideProps) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event: MouseEvent) {
    const { open, onClick, btnRef } = this.props;

    if (!this.wrapperRef.current) {
      return;
    }

    if (!open) {
      return;
    }

    if (!this.wrapperRef.current.contains(event.target as Node) && !btnRef.current?.contains(event.target as Node)) {
      onClick();
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClickOutside);
  }

  render() {
    const { children } = this.props;
    return <div ref={this.wrapperRef}>{children}</div>;
  }
}

export default ClickOutside;
