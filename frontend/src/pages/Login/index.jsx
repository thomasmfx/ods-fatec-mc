import { Link } from "react-router-dom"
import { useState } from "react"
import Hero from "../../components/Hero"
import styles from "./login.module.css"

  function doCheckin() {

    }

export default function Login() {
    const [email, setEmail] = useState('')
    function checkLogin(e) {
        setEmail(e.target.value)
    }

  

    return (
        <div className={`screen active ${styles.screen}`} id="screen-login">
            <Hero>
                <div className={styles.dateChip}>28 MAR · 04 ABR 2026</div>
                <h1>1ª Conferência<br /><em>Nacional ODS</em></h1>
                <p>Fatec Mogi das Cruzes — Etapa Livre</p>
            </Hero>

            <div className={styles.loginCard}>
                <h2>Bem-vindo(a)</h2>
                <p className={styles.sub}>Já fez seu pré-cadastro? Entre com seu e-mail.</p>
                <div className="field">
                    <label htmlFor="email" className="field-label">E-mail</label>
                    <input type="email" id="login-email" placeholder="seu@email.com" onChange={checkLogin} />
                </div>
                <button className="btn btn-primary btn-full" disabled={!email} onClick={doCheckin}>Fazer check-in →</button>
                <div className={styles.divider}>ou</div>
                <Link 
                  to="/cadastro" 
                  className={`btn btn-ghost btn-full ${styles.btnCadastrar}`}
                >
                  Cadastrar agora
                </Link>
            </div>

            <div className={styles.loginFooter}>
                <button onClick={() => navigate('/Dashboard')}>
                    Ver resultados ao vivo →
                </button>
            </div>



        </div >
    )
}