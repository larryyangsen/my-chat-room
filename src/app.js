import React, { Component } from 'react';
import Messages from './messages';
import ChatProvider from './provider';
import ChatContext from './context';
import './app.scss';

class app extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid">
                <ChatProvider>
                    <ChatContext.Consumer>{context => <Messages {...context} />}</ChatContext.Consumer>
                </ChatProvider>
            </div>
        );
    }
}

export default app;
