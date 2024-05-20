// Chat.d.ts

import { Component, KeyboardEvent } from 'react';

interface ChatState {
  messages: { text: string, sender: string, timestamp: string }[];
  newMessage: string;
  isTyping: boolean;
}

declare class Chat extends Component<{}, ChatState> {
  handleSendMessage: () => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  componentDidUpdate(): void;
}

export default Chat;
