import React, { Component } from 'react';
import ChatContext from './context';
import io from 'socket.io-client';

class ChatProvider extends Component {
    state = {
        messages: [],
        currentMessage: '',
        currentUsers: 0
    };
    constructor() {
        super(...arguments);
        this.socket = io(`${window.location}/socket.io/`);
        this.socket.on('chat message', this.onChatMessage);
        this.socket.on('user count', this.onUserCount);
        this.inputRef = React.createRef();
    }
    onChatMessage = msg => {
        const messages = this.state.messages.concat([msg]);
        this.setState({
            messages
        });
    };
    onUserCount = count => {
        this.setState({
            currentUsers: count
        });
    };
    emitChatMessage = e => {
        e.preventDefault();
        const msg = this.state.currentMessage;
        if (!msg) return;
        this.socket.emit('chat message', msg);
        this.inputRef.current.value = '';
        this.setState({
            currentMessage: ''
        });
    };

    render() {
        return (
            <ChatContext.Provider value={{ ...this.state }}>
                <div className="row">
                    <div className="col-12 children-container">{this.props.children}</div>
                    <div className="col-12 send-message">
                        <form onSubmit={this.emitChatMessage}>
                            <div className="input-group">
                                <input type="text" className="form-control" ref={this.inputRef} />
                                <input className="btn btn-info" type="submit" value="送出" />
                            </div>
                        </form>
                    </div>
                </div>
            </ChatContext.Provider>
        );
    }

    componentDidMount() {
        this.inputRef.current.focus();
        this.inputRef.current.onchange = e => {
            this.setState({
                currentMessage: this.inputRef.current.value
            });
        };
        this.socket.emit('chat user check in', 'so one check in');
    }
}

export default ChatProvider;
