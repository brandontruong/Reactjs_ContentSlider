import React from 'react';

class App extends React.Component {
  
    constructor(){
        super();
        this.state = {
			isCollapsed: false,
			currentSlide: [],
            data: {
            	content: [] 
            }
        };
		
		this.handleBackClick = this.handleBackClick.bind(this);
		this.handleNextClick = this.handleNextClick.bind(this);
		this.onCollapsibleClicked = this.onCollapsibleClicked.bind(this);
    };

	handleBackClick() {
		this.setState(prevState => ({
		  currentSlide: prevState.data.content[prevState.currentSlide.key -2]
		}));
	}
  
  	handleNextClick() {
		this.setState(prevState => ({
		  currentSlide: prevState.data.content[prevState.currentSlide.key]
		}));
	}
	
	onCollapsibleClicked() {
		this.setState(prevState => ({
		  isCollapsed: !prevState.isCollapsed
		}));
	}
    componentDidMount() {

        fetch("/data/content.json")
            .then( (response) => {
                return response.json() })   
                    .then( (json) => {
						json.content.map(function(item, index) {
							item.key = index + 1;
							item.description = (item.description).replace(/\uFFFD/g, '-')
						});
						
						if (json.content.length > 0)
						{
							this.setState({isCollapsed: false, currentSlide: json.content[0], data: json});
						}
                   });
    };

   render() {
      return (
         <div className="container">
		 
            <CollapsiblePanel title={this.state.data.title} isCollapsed={this.state.isCollapsed} onCollapsibleClicked={this.onCollapsibleClicked} />
            <SilderContentList datalist={this.state.data.content} currentSlide={this.state.currentSlide} 
				nextButtonClick={this.handleNextClick} backButtonClick={this.handleBackClick} 
				isCollapsed={this.state.isCollapsed}
			/>
           
         </div>

      );
   }
}

class CollapsiblePanel extends React.Component {
   render() {
      return (
         <div className="collapsiblePanel">
            <h1><span><i className="fa fa-file fa-lg"></i></span>{this.props.title}</h1>
			<a className="collapsibleButton" href="javascript:;" onClick={this.props.onCollapsibleClicked}><i  className={"fa fa-lg " + (this.props.isCollapsed ? 'fa-caret-down' : 'fa-caret-up')}></i></a>
		</div>
      );
   }
}

class SilderContentList extends React.Component {
	
   render() {
	 let current = this.props.currentSlide;
	 
      return (
<div>
				<div className="accordion-content" style={{'maxHeight': this.props.isCollapsed ? '0px' : '1000px' }} >	
                <ul className="sliders">
				{
					
					this.props.datalist.map(function(item, index) {
						let active = current.key === item.key;
						return (
						<li key={item.key} className={(active ? 'current' : '')}>
							<Slider data={item}  />
						</li>);
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

class Slider extends React.Component {
	render() {
		let image = null;
	    if (this.props.data.thumbnail) {
	      image = <div className="img"><img src={"images/" + this.props.data.thumbnail} alt={this.props.data.title} /></div>;
	    }; 

		return (
			<div className="slider">
				{image}
			   	<div className="description" dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
			</div>
		);
	}
}
class ContentSliderNavigation extends React.Component {
   render() {
		let currentSlideKey = this.props.currentSlide.key;
		let numberOfSlides = this.props.datalist.length;
		let nextLink = <span className="next" >
							<a href="javascript:;" onClick={this.props.nextButtonClick}>{this.props.currentSlide.title}</a>
							<i className="fa fa-caret-right"></i>
						</span>;
		let backLink = <span className="back">
						<i className="fa fa-caret-left"></i>
						<a href="javascript:;" onClick={this.props.backButtonClick}>Prev</a>
					</span>;			
		if (this.props.currentSlide.key === undefined || numberOfSlides <= 0) return (<div></div>);
		
		let showNextLink = ( currentSlideKey=== 1) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides) ;
		let showBackLink = (currentSlideKey === numberOfSlides) || (currentSlideKey > 1 && currentSlideKey < numberOfSlides);
		
      return (
        <div className="sliderNavigation">
			{ showBackLink ? backLink : null }
			{ showNextLink ? nextLink : null }		
         </div>
      );
   }
}
export default App;