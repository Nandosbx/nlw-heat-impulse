import styles from './styles.module.less'

import logoImg from '../../assets/logo.svg'

export function MessageList() {
    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile2021" />

            <ul className={styles.messageList}>
                <li className={styles.messa}>
                    <p className={styles.messageContent}>
                        Não vejo a hora de começar esse evento.
                    </p>

                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/Nandosbx.png" alt="" />
                        </div>
                        <span>Fernando</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}
