import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Hero from '../../components/Hero';
import styles from './login.module.css';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [jaVotou, setJaVotou] = useState(false); // NOVO ESTADO
  const navigate = useNavigate();

  async function doCheckin() {
    setErro('');
    setLoading(true);

    try {
      const { data } = await api.post('/sessao/checkin', { email });

      // Cobre o cenário 1: A API retorna 200, mas avisa que já votou via flag no payload
      if (data.jaVotou || data.participante?.jaVotou) {
        setJaVotou(true);
        return;
      }

      sessionStorage.setItem('sessaoToken', data.sessaoToken);
      sessionStorage.setItem('participante', JSON.stringify(data.participante));
      navigate('/votacao');
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.mensagem || '';

      if (status === 404) {
        setErro('E-mail não encontrado. Faça seu cadastro.');
      } 
      // Cobre o cenário 2: A API retorna 409 ou uma mensagem de bloqueio
      else if (status === 409 || msg.toLowerCase().includes('já registrou') || msg.toLowerCase().includes('já votou')) {
        setJaVotou(true);
      } 
      else {
        setErro('Erro inesperado. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  }

  function reiniciar() {
    setJaVotou(false);
    setEmail('');
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

      {/* RENDERIZAÇÃO CONDICIONAL: TELA DE BLOQUEIO VS FORMULÁRIO */}
      {jaVotou ? (
        <div className={styles.loginCard} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ marginBottom: '8px' }}>Voto já registrado!</h2>
          <p className={styles.sub} style={{ marginBottom: '24px' }}>
            Identificamos que você já participou e registrou seus votos nesta conferência. Agradecemos sua contribuição!
          </p>
          <button
            className="btn btn-primary btn-full"
            onClick={() => navigate('/dashboard')}
            style={{ marginBottom: '12px' }}
          >
            Acompanhar Resultados ao vivo →
          </button>
          <button
            className="btn btn-ghost btn-full"
            onClick={reiniciar}
          >
            ← Voltar
          </button>
        </div>
      ) : (
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
      )}

      {/* Rodapé esconde os links auxiliares se estiver na tela de "Já votou" */}
      {!jaVotou && (
        <>
          <div className={styles.loginFooter}>
            <button onClick={() => navigate('/dashboard')}>
              Ver resultados ao vivo →
            </button>
          </div>

          <button onClick={() => navigate('/admin')} className={styles.adminLink}>
            Painel de gestão
          </button>
        </>
      )}
    </div>
  );
}