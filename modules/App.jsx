import React from 'react';
import { Link } from 'react-router';

import CollapsiblePanel from './CollapsiblePanel.jsx';
import SliderContentList from './SliderContentList.jsx';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isCollapsed: false,
      currentSlide: [],
      data: {
        content: [] 
      }
    };

    this.onCollapsibleClicked = this.onCollapsibleClicked.bind(this);
  }
	
  onCollapsibleClicked() {
    this.setState(prevState => ({
      isCollapsed: !prevState.isCollapsed
    }));
  }

  componentDidMount() {
    fetch("/data/content.json")
      .then((response) => {
        return response.json()
      })   
      .then((json) => {
        json.content.map(function(item, index) {
          item.key = index + 1;
          item.description = (item.description).replace(/\uFFFD/g, '-')
        });

        if (json.content.length > 0) {
          let slideIndex = this.props.params.slideIndex;
          let currentSlideIndex = (!isNaN(parseFloat(slideIndex)) && isFinite(slideIndex))? slideIndex - 1: 0;
          this.setState({isCollapsed: false, currentSlide: json.content[currentSlideIndex], data: json});
        }
      });
  }

	componentWillReceiveProps(newProps) {    
		let slideIndex = newProps.params.slideIndex;
		let currentSlideIndex = (!isNaN(parseFloat(slideIndex)) && isFinite(slideIndex))? slideIndex - 1: 0;

		this.setState(prevState => ({
			currentSlide: prevState.data.content[currentSlideIndex]
		}));
  }
   
  render() {
    return (
      <div className="container">
        <CollapsiblePanel
          title={this.state.data.title}
          isCollapsed={this.state.isCollapsed}
          onCollapsibleClicked={this.onCollapsibleClicked}
        />
        <SliderContentList
          datalist={this.state.data.content}
          currentSlide={this.state.currentSlide}
          isCollapsed={this.state.isCollapsed}
        />
      </div>
    );
  }
}