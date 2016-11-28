import React from 'react';

export default class Slider extends React.Component {
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
