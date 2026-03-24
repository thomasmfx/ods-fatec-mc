import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api" 
import styles from "./votacao.module.css"
import Hero from "../../components/Hero"
import { THEMES } from "../../components/Hero/variants"

function getDotClass(i, eixoAtual, styles) {
    if (i === eixoAtual) return `${styles.dot} ${styles.dotCur}`
    if (i < eixoAtual) return `${styles.dot} ${styles.dotDone}` // assumindo que era dotDone
    return `${styles.dot} ${styles.dotIdle}`
}

export default function Votacao() {
    const navigate = useNavigate()
    const [eixos, setEixos] = useState([])
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    
    const [eixoAtual, setEixoAtual] = useState(0)
    const [votos, setVotos] = useState({})
    const [participanteNome, setParticipanteNome] = useState("")

    // 1. Busca os dados ao carregar a tela
    useEffect(() => {
        const partData = JSON.parse(sessionStorage.getItem('participante') || '{}')
        setParticipanteNome(partData.nome || "Participante")

        api.get('http://localhost:8080/eixos')
            .then(res => {
                const VARIANTS = ['green', 'blue', 'orange', 'purple']
                const eixosMapeados = res.data.eixos.map((eixo, i) => ({
                    ...eixo,
                    variant: VARIANTS[i % VARIANTS.length]
                }))
                setEixos(eixosMapeados)
            })
            .catch(err => {
                console.error("Erro ao buscar eixos:", err)
                alert("Não foi possível carregar os eixos. Verifique sua conexão.")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) return <div className="screen">Carregando propostas...</div>
    if (eixos.length === 0) return <div className="screen">Nenhum eixo encontrado.</div>

    const eixo = eixos[eixoAtual]
    const votoAtual = votos[eixo.id]
    const cor = THEMES[eixo.variant]?.bg || '#000'

    function selecionar(propostaId) {
        setVotos(prev => ({ ...prev, [eixo.id]: propostaId }))
    }

    function voltar() {
        if (eixoAtual === 0) navigate('/')
        else setEixoAtual(prev => prev - 1)
    }

    // 2. Dispara a API no último eixo
    async function avancar() {
        if (eixoAtual === eixos.length - 1) {
            setSubmitting(true)
            try {
                const payload = {
                    votos: Object.entries(votos).map(([eixoId, propostaId]) => ({
                        eixoId: Number(eixoId),
                        propostaId: Number(propostaId)
                    }))
                }
                
                await api.post('http://localhost:8080/votacao', payload)
                navigate('/confirmacao')
            } catch (error) {
                console.error("Erro ao votar", error)
                const msg = error.response?.data?.mensagem || "Ocorreu um erro ao registrar seu voto."
                alert(msg)
                setSubmitting(false)
            }
        } else {
            setEixoAtual(prev => prev + 1)
        }
    }

    return (
        <div className={`screen active ${styles.screen}`} id="screen-votacao">
            <div className={styles.header}>
                <div className={styles.headerBrand}>
                    ODS <em>Mogi</em>
                </div>
                <div className={styles.headerParticipant}>
                    {participanteNome}
                </div>
            </div>

            <Hero variant={eixo.variant}>
                <div className={styles.heroText}>
                    <div className={styles.heroNum}>{eixo.nome}</div> {/* Usa eixo.nome que vem da API */}
                    <div className={styles.heroTitle}>{eixo.descricao}</div>
                </div>
            </Hero>

            <div className={styles.dots}>
                {eixos.map((e, i) => (
                    <button
                        key={e.id}
                        className={getDotClass(i, eixoAtual, styles)}
                        style={{ background: i <= eixoAtual ? (THEMES[eixos[i].variant]?.bg || '#000') : 'var(--border)' }}
                        onClick={() => {
                            // Opcional: só permite pular para eixos anteriores ou para o próximo já liberado
                            if (i <= eixoAtual || votos[eixos[i-1]?.id]) setEixoAtual(i)
                        }}
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
                            style={selecionado ? { borderColor: cor, background: cor + '14' } : {}}
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
                                style={selecionado ? { borderColor: cor, background: cor } : {}}
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
                <button className="btn btn-ghost" onClick={voltar} disabled={submitting}>
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
                    {submitting 
                        ? 'Enviando...' 
                        : (eixoAtual === eixos.length - 1 ? 'Concluir →' : 'Próximo →')}
                </button>
            </div>
        </div>
    )
}