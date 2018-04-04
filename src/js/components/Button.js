import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Button extends React.Component {
  handleToggle(){
    console.log(optimizely.activeExperiments)
  }
  render() {
    return (
      <button onClick={this.handleToggle}>
        Click my button
      </button>
    )
  }
}

Button.propTypes = {
};

export default Button;