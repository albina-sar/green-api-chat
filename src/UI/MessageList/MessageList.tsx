import Message from "../Message/Message";
import styles from "./MessageList.module.css";
import type { MessageListProps } from "./type";

function MessageList({ messages }: MessageListProps) {
  return (
    <div className={styles.container}>
      {messages.length === 0 ? (
        <p className={styles.empty}>Сообщений нет</p>
      ) : (
        messages.map((message) => (
          <Message
            key={message.date}
            name={message.name}
            text={message.text}
            date={message.date}
          />
        ))
      )}
    </div>
  );
}

export default MessageList;
