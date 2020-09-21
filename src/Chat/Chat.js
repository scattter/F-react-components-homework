import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  handleMessage = (text) => {
    const message = {
      role: 'CUSTOMER',
      tags: [text],
      text,
    };

    setTimeout(() => {
      const msg = this.state.messages.concat(message);
      const messages = msg;
      this.setState({
        messages,
      });
    }, 500);

    const keyWordReply = [];
    answersData.forEach((answer) => {
      answer.tags.forEach((tag) => {
        const patt = new RegExp(tag);
        if (patt.exec(text)) {
          if (keyWordReply.indexOf(answer) === -1) {
            keyWordReply.push(answer);
          }
        }
      });
    });

    setTimeout(() => {
      keyWordReply.forEach((item) => {
        const msg = this.state.messages.concat(item);
        const messages = msg;
        this.setState({
          messages,
        });
      });
    }, 1000);
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput send={this.handleMessage} />
      </main>
    );
  }
}

export default Chat;
