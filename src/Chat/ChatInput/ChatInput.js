import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  handleSubmit = () => {
    this.props.send(this.state.message);
    this.setState({
      message: '',
    });
  };

  handleSubmitKeyBoard = (event) => {
    const enterKeyCode = 13;
    if (event.keyCode === enterKeyCode) {
      this.props.send(this.state.message);
      this.setState({
        message: '',
      });
    }
  };

  render() {
    return (
      <footer className="ChatInput">
        <input
          type="text"
          value={this.state.message}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmitKeyBoard}
        />
        <button type="button" onClick={this.handleSubmit}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
