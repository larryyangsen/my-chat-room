import React from 'react';
import { link } from 'fs';

export default ({ messages = [], currentUsers }) => (
    <div>
        <span className="current-users">當前人數：{currentUsers}</span>
        <ul className="messages">{messages.map((message, i) => <li key={i}>{message}</li>)}</ul>
    </div>
);
