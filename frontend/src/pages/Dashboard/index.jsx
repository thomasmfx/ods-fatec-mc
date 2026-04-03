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
  const [filtroData, setFiltroData] = useState(null);

  // UNIFICAMOS AQUI: Apenas um useEffect que observa o filtroData
  useEffect(() => {
    const carregarDados = () => {
      // Monta a URL dependendo se há filtro ou não
      const url = filtroData ? `/dashboard?data=${filtroData}` : '/dashboard';

      api
        .get(url)
        .then((res) => {
          // Usamos as variáveis novas do backend atualizado
          const { totalInscritos, totalVotantes, totalVotos, eixos } = res.data;

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

            if (sortedPropostas.length > 4) {
              const top4 = sortedPropostas.slice(0, 4);
              const votosRestantes = sortedPropostas
                .slice(4)
                .reduce((acc, p) => acc + p.votos, 0);

              propostasParaExibir = [
                ...top4,
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
            totalInscritos,
            totalVotantes,
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
          }, 100);
        })
        .catch((err) => console.error('Erro ao carregar dashboard:', err))
        .finally(() => setLoading(false));
    };

    // Executa ao carregar e sempre que o filtroData mudar
    carregarDados();

    // Define o timer de atualização em tempo real
    const intervalId = setInterval(carregarDados, 60000);

    // Limpa o timer anterior se o usuário mudar de aba antes dos 60 segundos
    return () => clearInterval(intervalId);
  }, [filtroData]); // <-- A MÁGICA ESTÁ AQUI: o array de dependências agora observa o filtroData

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
          ODS <em>Mogi</em>{' '}
          <span className={styles.resultados}>— Resultados</span>
        </div>
        <div className={styles.filtros}>
          <button
            className={`${styles.filterBtn} ${filtroData === '2026-03-28' ? styles.filterBtnActive : ''}`}
            onClick={() => setFiltroData('2026-03-28')}
          >
            28/03
          </button>

          <button
            className={`${styles.filterBtn} ${filtroData === '2026-04-04' ? styles.filterBtnActive : ''}`}
            onClick={() => setFiltroData('2026-04-04')}
          >
            04/04
          </button>

          <button
            className={`${styles.filterBtn} ${!filtroData ? styles.filterBtnActive : ''}`}
            onClick={() => setFiltroData('')}
          >
            Visão Geral
          </button>
        </div>
        <div className={styles.liveDot}>Ao vivo</div>
      </div>

      <div className={styles.scroll}>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.totalInscritos || 0}</div>
            <div className={styles.statLabel}>INSCRITOS</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.totalVotantes || 0}</div>
            <div className={styles.statLabel}>VOTANTES</div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statNum}>{dados.totalVotos || 0}</div>
            <div className={styles.statLabel}>VOTOS REGISTRADOS</div>
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
                      Nenhuma proposta ativa registrada neste eixo.
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
