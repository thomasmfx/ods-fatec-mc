import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./votacao.module.css"
import Hero from "../../components/Hero"
import { THEMES } from "../../components/Hero/variants"

const eixos = [
    { id: 1, num: 'EIXO 1', titulo: 'Democracia e instituições fortes', variant: 'green', propostas: [{ id: 1, titulo: 'proposta A', descricao: 'dfhgv' }, { id: 2, titulo: 'proposta b', descricao: 'gvbcvb' }] },
    { id: 2, num: 'EIXO 2', titulo: 'Sustentabilidade ambiental', variant: 'blue', propostas: [] },
    { id: 3, num: 'EIXO 4', titulo: 'Inovação tecnológica sustentável', variant: 'orange', propostas: [] },
    { id: 4, num: 'EIXO 5', titulo: 'Governança participativa', variant: 'purple', propostas: [] },
]

function getDotClass(i, eixoAtual, styles) {
    if (i === eixoAtual) return `${styles.dot} ${styles.dotCur}`
    if (i < eixoAtual) return `${styles.dot} ${styles.dotDonbe}`
    return `${styles.dot} ${styles.dotIdle}`
}

export default function Votacao() {
    const navigate = useNavigate()
    const [eixoAtual, setEixoAtual] = useState(0)
    const [votos, setVotos] = useState({})

    const eixo = eixos[eixoAtual]
    const votoAtual = votos[eixo.id]
    const cor = THEMES[eixo.variant].bg

    function selecionar(propostaId) {
        setVotos(prev => ({ ...prev, [eixo.id]: propostaId }))
    }

    function voltar() {
        if (eixoAtual === 0) navigate('/')
        else setEixoAtual(prev => prev - 1)
    }

    function avancar() {
        if (eixoAtual === eixos.length - 1) navigate('/Confirmacao')
        else setEixoAtual(prev => prev + 1)
    }

    return (
        <div className={`screen active ${styles.screen}`} id="screen-votacao">
            <div className={styles.header}>
                <div className={styles.headerBrand}>
                    ODS <em>Mogi</em>
                </div>
                <div className={styles.headerParticipant}>
                    Maria Silva
                </div>
            </div>

            <Hero variant={eixo.variant}>
                <div className={styles.heroText}>
                    <div className={styles.heroNum}>{eixo.num}</div>
                    <div className={styles.heroTitle}>{eixo.titulo}</div>
                </div>
            </Hero>

            <div className={styles.dots}>
                {eixos.map((e, i) => (
                    <button
                        key={e.id}
                        className={getDotClass(i, eixoAtual, styles)}
                        style={{ background: i <= eixoAtual ? THEMES[eixos[i].variant].bg : 'var(--border)' }}
                        onClick={() => setEixoAtual(i)}
                    />
                ))}
            </div>

            <div className={styles.propostas}>
                <div className={styles.label}>SELECIONE UMA PROPOSTA</div>
                {eixo.propostas.map(proposta => {
                    const selecionado = votoAtual === proposta.id
                    return (
                        <div
                            key={proposta.id}
                            className={`${styles.card} ${selecionado ? styles.cardSel : ''}`}
                            style={selecionado ? {
                                borderColor: cor,
                                background: cor + '14'
                            } : {}}
                            onClick={() => selecionar(proposta.id)}
                            role="radio"
                            aria-checked={selecionado}
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    selecionar(proposta.id)
                                    e.preventDefault()
                                }
                            }}
                        >
                            <div
                                className={styles.radio}
                                style={selecionado ? {
                                    borderColor: cor,
                                    background: cor
                                } : {}}
                            >
                                <div className={styles.rdot} />
                            </div>
                            <div>
                                <h3>{proposta.titulo}</h3>
                                <p>{proposta.descricao}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className={styles.footer}>
                <button className="btn btn-ghost" onClick={voltar}>← Voltar</button>
                <span className={styles.hint}>
                    {votoAtual ? '' : 'escolha para continuar'}
                </span>
                <button
                    className="btn btn-primary"
                    disabled={!votoAtual}
                    onClick={avancar}
                >
                    {eixoAtual === eixos.length - 1 ? 'Concluir →' : 'Próximo →'}
                </button>
            </div>
        </div>
    )
}