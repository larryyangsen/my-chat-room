import React from 'react';

const initState = {
    messages: [],
    currentMessage: '',
    currentUsers: 0
};

export default React.createContext({ ...initState });
