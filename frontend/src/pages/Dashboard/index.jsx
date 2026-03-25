import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./dashboard.module.css"

const eixos = [
    {
        id: 1,
        num: 'EIXO 01',
        nome: 'Democracia e instituições fortes',
        cor: '#9fe1cb',
        barCor: '#52b788',
        propostas: [
            { titulo: 'Conselhos municipais digitais', votos: 98, pct: 79 },
            { titulo: 'Educação política nas escolas', votos: 82, pct: 66 },
        ]
    },
    {
        id: 2,
        num: 'EIXO 02',
        nome: 'Sustentabilidade ambiental',
        cor: '#64b5f6',
        barCor: '#42a5f5',
        propostas: [
            { titulo: 'Recuperação de matas ciliares', votos: 112, pct: 90 },
            { titulo: 'Energia solar em equipamentos públicos', votos: 79, pct: 64 },
        ]
    },
    {
        id: 4,
        num: 'EIXO 04',
        nome: 'Inovação tecnológica sustentável',
        cor: '#ffb74d',
        barCor: '#ff8f00',
        propostas: [
            { titulo: 'Inclusão digital nas comunidades', votos: 103, pct: 83 },
            { titulo: 'Parque tecnológico regional', votos: 88, pct: 71 },
        ]
    },
    {
        id: 5,
        num: 'EIXO 05',
        nome: 'Governança participativa',
        cor: '#ce93d8',
        barCor: '#ab47bc',
        propostas: [
            { titulo: 'Transparência nos contratos públicos', votos: 95, pct: 77 },
            { titulo: 'Conferências municipais temáticas', votos: 76, pct: 61 },
        ]
    },
]

const totalParticipantes = 247
const totalVotos = 988

export default function Dashboard() {
    const navigate = useNavigate()
    const [barWidths, setBarWidths] = useState({})

    useEffect(() => {
        const timer = setTimeout(() => {
            const widths = {}
            eixos.forEach(e => {
                e.propostas.forEach(p => {
                    widths[`${e.id}-${p.titulo}`] = p.pct
                })
            })
            setBarWidths(widths)
        }, 200)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`screen active ${styles.screen}`} id="screen-dashboard">
            <div className={styles.top}>
                <div className={styles.brand}>
                    ODS <em>Mogi</em> — Resultados ao vivo
                </div>
                <div className={styles.liveDot}>transmissão ao vivo</div>
            </div>

            <div className={styles.scroll}>
                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statNum}>{totalParticipantes}</div>
                        <div className={styles.statLabel}>PARTICIPANTES</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNum}>{totalVotos}</div>
                        <div className={styles.statLabel}>VOTOS REGISTRADOS</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statNum}>4</div>
                        <div className={styles.statLabel}>EIXOS TEMÁTICOS</div>
                    </div>
                </div>

                <div className={styles.grid}>
                    {eixos.map(eixo => (
                        <div key={eixo.id}>
                            <div className={styles.eixoLabel}>{eixo.num}</div>
                            <div className={styles.eixoTitle} style={{ color: eixo.cor }}>
                                {eixo.nome}
                            </div>
                            {eixo.propostas.map(proposta => (
                                <div key={proposta.titulo} className={styles.barItem}>
                                    <div className={styles.barLabel}>
                                        <span className={styles.barLabelText}>{proposta.titulo}</span>
                                        <span className={styles.barLabelNum}>{proposta.votos}</span>
                                    </div>
                                    <div className={styles.barTrack}>
                                        <div
                                            className={styles.barFill}
                                            style={{
                                                width: `${barWidths[`${eixo.id}-${proposta.titulo}`] ?? 0}%`,
                                                background: eixo.barCor
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={styles.backLink}>
                    <button onClick={() => navigate('/')}>← Voltar ao início</button>
                </div>
            </div>
        </div>
    )
}