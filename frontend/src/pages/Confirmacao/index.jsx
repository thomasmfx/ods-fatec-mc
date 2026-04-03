import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './confirmacao.module.css';
import Hero from '../../components/Hero';

const DATA_EXTENSA =
  import.meta.env.VITE_DATA_EVENTO_FORMATADA_2 || '04 de abril de 2026';

export default function Confirmacao() {
  const navigate = useNavigate();
  const location = useLocation();
  const [participante, setParticipante] = useState({ nome: '', email: '' });
  const pdfUrl = location.state?.pdfUrl;

  useEffect(() => {
    const partData = JSON.parse(sessionStorage.getItem('participante') || '{}');
    if (!partData.email) navigate('/');
    else setParticipante(partData);
  }, [navigate]);

  function novaSessao() {
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <div className={`screen active ${styles.screenConfirmacao}`}>
      <Hero variant="green">
        <div style={{ textAlign: 'center' }}>
          <div className={styles.confBlob}>🌿</div>
          <h1>Votação concluída!</h1>
          <p>
            Obrigado pela sua participação.
            <br />
            Seu certificado foi gerado e será enviado por e-mail em breve.
          </p>
        </div>
      </Hero>

      <div className="scroll" style={{ background: 'var(--green-pale)' }}>
        <div className={styles.confCard}>
          <div className={styles.confRow}>
            <div className={styles.confIcon}>✉️</div>
            <div className={styles.confRowBody}>
              <strong>O certificado será enviado para</strong>
              <span className={styles.emailHighlight}>
                {participante.email}
              </span>
            </div>
          </div>
          <div className={styles.confRow}>
            <div className={styles.confIcon}>📅</div>
            <div className={styles.confRowBody}>
              <strong>Data de participação</strong>
              <span>{DATA_EXTENSA}</span>
            </div>
          </div>
        </div>

        {pdfUrl ? (
          <div style={{ margin: '0 20px 24px' }}>
            <div
              className={styles.certLabel}
              style={{ textAlign: 'center', marginBottom: '8px' }}
            >
              PRÉVIA DO CERTIFICADO
            </div>
            <iframe
              src={pdfUrl}
              width="100%"
              style={{
                border: '1.5px dashed var(--green-mid)',
                borderRadius: '16px',
                background: '#fff',
                aspectRatio: '1.845 / 1',
                minHeight: '300px',
              }}
              title="Prévia do Certificado"
            />
          </div>
        ) : (
          <div className={styles.certPreview}>
            <div className={styles.certLabel}>PRÉVIA DO CERTIFICADO</div>
            <div className={styles.certName}>{participante.nome}</div>
            <div className={styles.certDesc}>
              participou da Etapa Livre da 1ª Conferência Nacional ODS
              <br />
              realizada na Fatec Mogi das Cruzes — {DATA_EXTENSA}
            </div>
          </div>
        )}

        <div
          style={{
            background: 'rgba(45, 106, 79, 0.08)',
            borderRadius: '14px',
            padding: '14px 16px',
            marginBottom: '16px',
            fontSize: '13px',
            color: 'var(--green)',
            borderLeft: '3px solid var(--green-mid)',
            margin: '0 20px',
          }}
        >
          Verifique sua caixa de entrada e a pasta de spam.
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            paddingBottom: '24px',
          }}
        >
          <button
            onClick={novaSessao}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--green)',
              fontSize: '12px',
              cursor: 'pointer',
              letterSpacing: '0.05em',
            }}
          >
            Nova sessão
          </button>
        </div>
      </div>
    </div>
  );
}
