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
    api
      .get('/dashboard')
      .then((res) => {
        const { totalParticipantes, totalVotos, eixos } = res.data;

        // Prepara os dados adicionando as cores e calculando a porcentagem (%)
        const eixosFormatados = eixos.map((eixo, i) => {
          const theme = THEMES[i % THEMES.length];
          // Descobre quantos votos o eixo teve no total para fazer a regra de 3
          const totalEixo = eixo.propostas.reduce((acc, p) => acc + p.votos, 0);

          return {
            ...eixo,
            cor: theme.cor,
            barCor: theme.barCor,
            propostas: eixo.propostas.map((p) => ({
              ...p,
              pct: totalEixo > 0 ? ((p.votos / totalEixo) * 100).toFixed(1) : 0,
            })),
          };
        });

        setDados({
          totalParticipantes,
          totalVotos,
          eixos: eixosFormatados,
        });

        // Dispara a animação das barras após os dados carregarem
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
  }, []);

  if (loading || !dados) {
    return <Loading texto="Carregando resultados ao vivo..." className={styles.screen} />;
  }

  return (
    <div className={`screen active ${styles.screen}`} id="screen-dashboard">
      <div className={styles.top}>
        <div className={styles.brand}>
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
          {dados.eixos.map((eixo) => (
            <div key={eixo.id}>
              <div className={styles.eixoLabel}>{eixo.num}</div>
              <div className={styles.eixoTitle} style={{ color: eixo.cor }}>
                {eixo.nome}
              </div>
              {eixo.propostas.map((proposta) => (
                <div key={proposta.titulo} className={styles.barItem}>
                  <div className={styles.barLabel}>
                    <span className={styles.barLabelText}>
                      {proposta.titulo}
                    </span>
                    <span className={styles.barLabelNum}>
                      {`${proposta.votos} ${proposta.votos === 1 ? 'voto' : 'votos'}`}{' '}
                      ({proposta.pct}%)
                    </span>
                  </div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{
                        width: `${barWidths[`${eixo.id}-${proposta.titulo}`] ?? 0}%`,
                        background: eixo.barCor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.backLink}>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
