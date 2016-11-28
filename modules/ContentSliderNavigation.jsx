import React from 'react';
import { Link } from 'react-router';

export default class ContentSliderNavigation extends React.Component {
  render() {
    let currentSlideKey = this.props.currentSlide.key;
    let numberOfSlides = this.props.datalist.length;

    let nextLink =
      <span className="next">
        <Link to={"/slide/" + (currentSlideKey + 1)}>{this.props.currentSlide.title}</Link>
        <i className="fa fa-caret-right"></i>
      </span>;
    
    let backLink =
      <span className="back">
        <i className="fa fa-caret-left"></i>
        <Link to={"/slide/" + (currentSlideKey - 1)}>Prev</Link>
      </span>;

    if (this.props.currentSlide.key === undefined || numberOfSlides <= 0)
      return (<div></div>);

    let showNextLink = ( currentSlideKey=== 1) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides);
    let showBackLink = (currentSlideKey === numberOfSlides) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides);

    return (
      <div className="sliderNavigation">
        { showBackLink ? backLink : null }
        { showNextLink ? nextLink : null }    
      </div>
    );
  }
}
