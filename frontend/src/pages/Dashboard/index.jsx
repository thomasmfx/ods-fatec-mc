import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Loading from '../../components/Loading';
import styles from './dashboard.module.css';

// Tabela de cores para manter o mesmo padrão visual do Votacao.jsx
const THEMES = [
  { cor: '#9fe1cb', barCor: '#52b788' },
  { cor: '#64b5f6', barCor: '#42a5f5' },
  { cor: '#ffb74d', barCor: '#ff8f00' },
  { cor: '#ce93d8', barCor: '#ab47bc' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [dados, setDados] = useState(null);
  const [barWidths, setBarWidths] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = () => {
      api
        .get('/dashboard')
        .then((res) => {
          const { totalParticipantes, totalVotos, eixos } = res.data;

          const eixosFormatados = eixos.map((eixo, i) => {
            const theme = THEMES[i % THEMES.length];
            const totalEixo = eixo.propostas.reduce(
              (acc, p) => acc + p.votos,
              0
            );

            const sortedPropostas = [...eixo.propostas].sort(
              (a, b) => b.votos - a.votos
            );

            let propostasParaExibir = [];

            if (sortedPropostas.length > 3) {
              const top3 = sortedPropostas.slice(0, 3);
              const votosRestantes = sortedPropostas
                .slice(3)
                .reduce((acc, p) => acc + p.votos, 0);

              propostasParaExibir = [
                ...top3,
                {
                  titulo: 'Outras propostas',
                  votos: votosRestantes,
                  isOutros: true,
                },
              ];
            } else {
              propostasParaExibir = sortedPropostas;
            }

            return {
              ...eixo,
              cor: theme.cor,
              barCor: theme.barCor,
              propostas: propostasParaExibir.map((p) => ({
                ...p,
                pct:
                  totalEixo > 0 ? ((p.votos / totalEixo) * 100).toFixed(1) : 0,
              })),
            };
          });

          setDados({
            totalParticipantes,
            totalVotos,
            eixos: eixosFormatados,
          });

          setTimeout(() => {
            const widths = {};
            eixosFormatados.forEach((e) => {
              e.propostas.forEach((p) => {
                widths[`${e.id}-${p.titulo}`] = p.pct;
              });
            });
            setBarWidths(widths);
          }, 200);
        })
        .catch((err) => console.error('Erro ao carregar dashboard:', err))
        .finally(() => setLoading(false));
    };

    carregarDados();

    const intervalId = setInterval(carregarDados, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading || !dados) {
    return (
      <Loading
        texto="Carregando resultados ao vivo..."
        className={styles.screen}
      />
    );
  }

  return (
    <div className={`screen active ${styles.screen}`} id="screen-dashboard">
      <div className={styles.top}>
        <div
          className={styles.brand}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
          title="Voltar para a Home"
        >
          ODS <em>Mogi</em> — Resultados
        </div>
        <div className={styles.liveDot}>Ao vivo</div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.totalParticipantes}</div>
            <div className={styles.statLabel}>PARTICIPANTES</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.totalVotos}</div>
            <div className={styles.statLabel}>VOTOS REGISTRADOS</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.eixos.length}</div>
            <div className={styles.statLabel}>EIXOS TEMÁTICOS</div>
          </div>
        </div>

        <div className={styles.grid}>
          {dados.eixos.length === 0 ? (
            <div
              style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.4)',
                padding: '40px 0',
                fontStyle: 'italic',
              }}
            >
              Nenhum eixo temático configurado para o evento.
            </div>
          ) : (
            dados.eixos.map((eixo) => (
              <div key={eixo.id} className={styles.eixoContainer}>
                <div className={styles.eixoTitle} style={{ color: eixo.cor }}>
                  {eixo.nome}
                </div>

                <div className={styles.propostasList}>
                  {/* Validação de Empty State para as propostas do eixo */}
                  {eixo.propostas.length > 0 ? (
                    eixo.propostas.map((proposta) => (
                      <div key={proposta.titulo} className={styles.barItem}>
                        <div className={styles.barLabel}>
                          <span
                            className={styles.barLabelText}
                            style={{
                              color: proposta.isOutros
                                ? 'rgba(255,255,255,0.5)'
                                : 'rgba(255,255,255,0.9)',
                              fontStyle: proposta.isOutros
                                ? 'italic'
                                : 'normal',
                            }}
                          >
                            {proposta.titulo}
                          </span>
                          <span className={styles.barLabelNum}>
                            {`${proposta.votos} ${proposta.votos === 1 ? 'voto' : 'votos'}`}{' '}
                            <span className={styles.pctText}>
                              ({proposta.pct}%)
                            </span>
                          </span>
                        </div>
                        <div className={styles.barTrack}>
                          <div
                            className={styles.barFill}
                            style={{
                              width: `${barWidths[`${eixo.id}-${proposta.titulo}`] ?? 0}%`,
                              background: proposta.isOutros
                                ? 'rgba(255, 255, 255, 0.15)'
                                : eixo.barCor,
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        color: 'rgba(255, 255, 255, 0.3)',
                        fontStyle: 'italic',
                        fontSize: '15px',
                        padding: '16px 0',
                      }}
                    >
                      Nenhuma proposta registrada neste eixo.
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
