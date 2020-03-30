import React from "react";
import classnames from 'classnames';
import "./header.css";

export default class Header extends React.Component {
  render() {
    const {leftMenuShown, onMenuToggle} = this.props;

    return(
      <header className="header">
        <button
          className={classnames('header__btn-left', {'header__btn-left--shown': !leftMenuShown})}
          onClick={onMenuToggle}
        ></button>
        <h1 className="header__text">English with Friends</h1>
        <button
          className={classnames('header__btn-right', {'header__btn-right--shown': leftMenuShown})}
          onClick={onMenuToggle}
        ></button>
      </header>
    )
  }
}
