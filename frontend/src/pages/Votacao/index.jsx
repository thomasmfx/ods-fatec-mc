import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import styles from './votacao.module.css';
import Hero from '../../components/Hero';
import { THEMES } from '../../components/Hero/variants';

function getDotClass(i, eixoAtual, styles) {
  if (i === eixoAtual) return `${styles.dot} ${styles.dotCur}`;
  if (i < eixoAtual) return `${styles.dot} ${styles.dotDone}`;
  return `${styles.dot} ${styles.dotIdle}`;
}

export default function Votacao() {
  const navigate = useNavigate();
  const [eixos, setEixos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eixoAtual, setEixoAtual] = useState(0);
  const [votos, setVotos] = useState({});
  const [participante, setParticipante] = useState({ nome: '', email: '' });
  const [emailEditavel, setEmailEditavel] = useState('');

  // NOVO: Estado para gerenciar o erro visual dentro do modal
  const [erroModal, setErroModal] = useState('');

  useEffect(() => {
    const partData = JSON.parse(sessionStorage.getItem('participante') || '{}');
    setParticipante(partData);
    setEmailEditavel(partData.email || '');

    api
      .get('/eixos')
      .then((res) => {
        const VARIANTS = ['green', 'blue', 'orange', 'purple'];
        const eixosMapeados = res.data.eixos.map((eixo, i) => ({
          ...eixo,
          variant: VARIANTS[i % VARIANTS.length],
        }));
        setEixos(eixosMapeados);
      })
      .catch(() => alert('Erro ao carregar eixos.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="screen">Carregando propostas...</div>;
  if (eixos.length === 0)
    return <div className="screen">Nenhum eixo encontrado.</div>;

  const eixo = eixos[eixoAtual];
  const votoAtual = votos[eixo.id];
  const cor = THEMES[eixo.variant]?.bg || '#000';

  function selecionar(propostaId) {
    setVotos((prev) => ({ ...prev, [eixo.id]: propostaId }));
  }

  function voltar() {
    if (eixoAtual === 0) navigate('/');
    else setEixoAtual((prev) => prev - 1);
  }

  function avancar() {
    if (eixoAtual === eixos.length - 1) {
      setModalOpen(true);
    } else {
      setEixoAtual((prev) => prev + 1);
    }
  }

  async function confirmarVotacao() {
    setSubmitting(true);
    setErroModal(''); // Limpa erros anteriores ao tentar novamente

    try {
      const payload = {
        email: emailEditavel,
        votos: Object.entries(votos).map(([eixoId, propostaId]) => ({
          eixoId: Number(eixoId),
          propostaId: Number(propostaId),
        })),
      };
      const res = await api.post('/votacao', payload);

      const sessionData = JSON.parse(
        sessionStorage.getItem('participante') || '{}'
      );
      sessionData.email = emailEditavel;
      sessionStorage.setItem('participante', JSON.stringify(sessionData));

      let pdfUrl = null;
      if (res.data.certificadoBase64) {
        const byteCharacters = atob(res.data.certificadoBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        pdfUrl = URL.createObjectURL(blob);
      }

      navigate('/confirmacao', { state: { pdfUrl } });
    } catch (error) {
      // Pega a mensagem do backend ou usa uma genérica
      setErroModal(
        error.response?.data?.mensagem ||
          'Erro ao registrar voto. Tente novamente.'
      );
      setSubmitting(false);
      // REMOVIDO: setModalOpen(false) - Mantém o modal aberto para o usuário ver o erro
    }
  }

  return (
    <div className={`screen active ${styles.screen}`} id="screen-votacao">
      <div className={styles.header}>
        <div className={styles.headerBrand}>
          ODS <em>Mogi</em>
        </div>
        <div className={styles.headerParticipant}>
          {participante.nome || 'Participante'}
        </div>
      </div>

      <Hero variant={eixo.variant}>
        <div className={styles.heroText}>
          <div className={styles.heroNum}>{eixo.nome}</div>
          <div className={styles.heroTitle}>{eixo.descricao}</div>
        </div>
      </Hero>

      <div className={styles.dots}>
        {eixos.map((e, i) => {
          const corDoDot = THEMES[e.variant]?.bg || '#000';

          return (
            <button
              key={e.id}
              className={getDotClass(i, eixoAtual, styles)}
              style={{
                background: i <= eixoAtual ? corDoDot : 'var(--border)',
              }}
              onClick={() => {
                if (i <= eixoAtual || votos[eixos[i - 1]?.id]) setEixoAtual(i);
              }}
            />
          );
        })}
      </div>

      <div className={styles.propostas}>
        <div className={styles.label}>SELECIONE UMA PROPOSTA</div>
        {eixo.propostas.map((proposta) => {
          const selecionado = votoAtual === proposta.id;
          return (
            <div
              key={proposta.id}
              className={`${styles.card} ${selecionado ? styles.cardSel : ''}`}
              style={
                selecionado ? { borderColor: cor, background: cor + '14' } : {}
              }
              onClick={() => selecionar(proposta.id)}
            >
              <div
                className={styles.radio}
                style={selecionado ? { borderColor: cor, background: cor } : {}}
              >
                <div className={styles.rdot} />
              </div>
              <div>
                <h3>{proposta.titulo}</h3>
                <p>{proposta.descricao}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <button
          className="btn btn-ghost"
          onClick={voltar}
          disabled={submitting}
        >
          ← Voltar
        </button>
        <span className={styles.hint}>
          {votoAtual ? '' : 'escolha para continuar'}
        </span>
        <button
          className="btn btn-primary"
          disabled={!votoAtual || submitting}
          onClick={avancar}
        >
          {eixoAtual === eixos.length - 1 ? 'Concluir →' : 'Próximo →'}
        </button>
      </div>

      {modalOpen && (
        <div
          style={{
            display: 'flex',
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              padding: '28px 24px',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.09em',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}
            >
              ANTES DE CONCLUIR
            </div>
            <h2
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '8px',
              }}
            >
              Verifique seu e-mail
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '20px',
              }}
            >
              Seu certificado será enviado para este endereço. Você pode
              corrigi-lo abaixo se necessário.
            </p>

            {/* CAIXA DE ERRO RENDERIZADA CONDICIONALMENTE */}
            {erroModal && (
              <div
                style={{
                  background: '#fee2e2',
                  color: '#b91c1c',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '20px',
                  border: '1px solid #fca5a5',
                  lineHeight: '1.4',
                }}
              >
                <strong>Ocorreu um erro: </strong> {erroModal}
              </div>
            )}

            <div className="field" style={{ marginBottom: '24px' }}>
              <input
                type="email"
                value={emailEditavel}
                onChange={(e) => {
                  setEmailEditavel(e.target.value);
                  setErroModal(''); // Limpa o erro ao começar a digitar novamente
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && emailEditavel && !submitting) {
                    confirmarVotacao();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  border: `1.5px solid ${erroModal ? '#fca5a5' : 'var(--border)'}`, // Borda vermelha se der erro
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                }}
              />
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <button
                className="btn btn-primary btn-full"
                disabled={submitting || !emailEditavel}
                onClick={confirmarVotacao}
                style={{ background: '#2d6a4f', color: '#fff' }}
              >
                {submitting ? 'Concluindo...' : 'Confirmar e concluir'}
              </button>
              <button
                className="btn btn-ghost btn-full"
                disabled={submitting}
                onClick={() => {
                  setModalOpen(false);
                  setErroModal(''); // Limpa o erro caso ele desista e volte
                }}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
