import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Hero from '../../components/Hero';
import styles from './login.module.css';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function doCheckin() {
    setErro('');
    setLoading(true);

    try {
      const { data } = await api.post('/sessao/checkin', { email });
      sessionStorage.setItem('sessaoToken', data.sessaoToken);
      sessionStorage.setItem('participante', JSON.stringify(data.participante));
      navigate('/votacao');
    } catch (err) {
      if (err.response?.status === 404) {
        setErro('E-mail não encontrado. Faça seu cadastro.');
      } else {
        setErro('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`screen active ${styles.screen}`} id="screen-login">
      <Hero>
        <div className={styles.dateChip}>28 MAR · 04 ABR 2026</div>
        <h1>
          1ª Conferência
          <br />
          <em>Nacional ODS</em>
        </h1>
        <p>Fatec Mogi das Cruzes — Etapa Livre</p>
      </Hero>

      <div className={styles.loginCard}>
        <h2>Bem-vindo(a)</h2>
        <p className={styles.sub}>
          Já fez seu pré-cadastro? Entre com seu e-mail.
        </p>
        <div className="field">
          <label htmlFor="login-email" className="field-label">
            E-mail
          </label>
          <input
            type="email"
            id="login-email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && email && doCheckin()}
          />
        </div>

        {erro && <p className={styles.erro}>{erro}</p>}

        <button
          className="btn btn-primary btn-full"
          disabled={!email || loading}
          onClick={doCheckin}
        >
          {loading ? 'Verificando...' : 'Fazer check-in →'}
        </button>
        <div className={styles.divider}>ou</div>
        <Link
          to="/cadastro"
          className={`btn btn-ghost btn-full ${styles.btnCadastrar}`}
        >
          Cadastrar agora
        </Link>
      </div>

      <div className={styles.loginFooter}>
        <button onClick={() => navigate('/dashboard')}>
          Ver resultados ao vivo →
        </button>
      </div>
    </div>
  );
}
