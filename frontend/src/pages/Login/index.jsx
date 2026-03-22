import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Background from "../../components/background"
import styles from "./login.module.css"

  function doCheckin() {

    }

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    function checkLogin(e) {
        setEmail(e.target.value)
    }

  

    return (
        <div className={`screen active ${styles.screen}`} id="screen-login">
            <div className={`blob-bg ${styles.hero}`}>
                <Background />
                <div className={styles.dateChip}>28 MAR · 04 ABR 2026</div>
                <h1>1ª Conferência<br /><em>Nacional ODS</em></h1>
                <p>Fatec Mogi das Cruzes — Etapa Livre<br />das 9h às 12h · Participação gratuita</p>
            </div>

            <div className={styles.loginCard}>
                <h2>Bem-vindo(a)</h2>
                <p className={styles.sub}>Já fez seu pré-cadastro? Entre com seu e-mail.</p>
                <div className="field">
                    <label htmlFor="email" className="field-label">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onChange={checkLogin} />
                </div>
                <button className="btn btn-primary btn-full" disabled={!email} onClick={doCheckin}>Fazer check-in →</button>
                <div className={styles.divider}>ou</div>
                <button className={`btn btn-ghost btn-full ${styles.btnCadastrar}`} onClick={() => navigate('/Cadastro')}>Cadastrar agora</button>
            </div>

            <div className={styles.loginFooter}>
                <button onClick={() => navigate('/Dashboard')}>
                    Ver resultados ao vivo →
                </button>
            </div>



        </div >
    )
}