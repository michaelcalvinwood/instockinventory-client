import React from 'react';
import './Heading.scss';
import searchIcon from '../../assets/images/icons/search-24px.svg';
import backButtonIcon from '../../assets/images/icons/arrow-back.svg';
import { Link } from 'react-router-dom';

class Heading extends React.Component {

  componentDidMount() {
    document.title = this.props.title;

  }

  searchHandler = e => {

    if (this.props.search === true || this.props.search === false) {
      return;
    }

    this.props.search(e.target.value);
  }

  render() {
    const { backButton, title, search, buttonIcon, buttonText, buttonTo } = this.props;

    let backButtonClassName = "heading__backButton";
    if (backButton) {
      backButtonClassName += " heading__backButton--included";
    } else {
      backButtonClassName += " heading__backButton--excluded";
    }

    let headingClassName = 'heading';
    if (!search) {
      headingClassName += ' heading--search-excluded';
    }

    let titleClassName = "heading__title";
    if (!search) {
      titleClassName += ' heading__title--search-excluded';
    }

    let buttonClassName = 'heading__button';

    if (!buttonText && !buttonIcon) {
      buttonClassName += ' heading__button--disabled';
    } else {
      if (search) {
        buttonClassName += ' heading__button--search-included';
      } else {
        buttonClassName += ' heading__button--search-excluded';
      }
      if (!buttonText) {
        buttonClassName += ' heading__button--icon-only';
      }
    }

    let buttonTextClassName = 'heading__button-text';
    if (!buttonText) {
      buttonTextClassName += ' heading__button-text--disabled';
    } else if (buttonIcon) {
      buttonTextClassName += ' heading__button-text--has-icon';
    }

    let searchButtonContainerClassName = "heading__search-button-container";
    if (!search) {
      searchButtonContainerClassName += " heading__search-button-container--search-excluded";
    }

    let buttonIconClassName = 'heading__button-icon';
    if (!buttonIcon) {
      buttonIconClassName += ' heading__button-icon--disabled'
    } else if (!buttonText) {
      buttonIconClassName += ' heading__button-icon--only'
    }

    return (
      <div className={headingClassName}>
        <p className={titleClassName}>
          <span onClick={backButton} className={backButtonClassName}>
              <img src={backButtonIcon} />
          </span>
          {title}
        </p>
        <div className="heading__search-button-container">
          <div className={search ?
            'heading__search-container' :
            'heading__search-container heading__search-container--disabled'}>
            <input
              className={search !== null ? 'heading__search' : 'heading__search heading__search--disabled'}
              placeholder="Search..."
              onChange={this.searchHandler} />
            <img className='heading__search-icon' src={searchIcon} />
          </div>
          <Link className='heading__button-to' to={buttonTo}>
            <button
              className={buttonClassName}>
              <div className="heading__button-container">
                <img
                  className={buttonIconClassName}
                  src={buttonIcon} />
                <p className={buttonTextClassName}>{buttonText}</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Heading
