import { VscGithubInverted } from 'react-icons/vsc'
import styles from './styles.module.less'

export function LoginBox() {
    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href="#" className={styles.signInWithGithub}>
                <VscGithubInverted size="24" />
                Acessar com Github
            </a>
        </div>
    )
}
