import { type MessageProps } from "./type"
import styles from './Message.module.css'

function Message({name, text, date}: MessageProps) {

    return(
        <div className={styles.container}>
            <div className={styles.name}>{name}</div>
            <p>{text}</p>
            <p className={styles.date}>{new Date().toLocaleString()}</p>
        </div>
    )
}

export default Message