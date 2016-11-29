import React from 'react';

import ContentSliderNavigation from './ContentSliderNavigation.jsx';
import Slider from './Slider.jsx';

export default class SliderContentList extends React.Component {
  render() {
    let current = this.props.currentSlide;

    return (
      <div>
        <div className={"accordion-content " + (this.props.isCollapsed ? 'slide-up' : '')}>  
          <ul className="sliders">
            {
              this.props.datalist.map(function(item, index) {
                let active = current.key === item.key;
                return (
                  <li key={item.key} className={(active ? 'current' : '')}>
                    <Slider data={item}  />
                  </li>
                );
              })
            }
          </ul>

          <ContentSliderNavigation 
            nextButtonClick={this.props.nextButtonClick} backButtonClick={this.props.backButtonClick} 
            currentSlide={this.props.currentSlide} 
            datalist={this.props.datalist}
          />

        </div>
      </div>
    );
  }
}
