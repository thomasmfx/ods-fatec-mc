import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Background from "../../components/background"
import styles from "./cadastro.module.css"

export default function Cadastro() {
    const navigate = useNavigate()
    const [select, setSelect] = useState({})

    function toggleOpt(element, type, group) {
        setSelect(prev => {
            const newOption = { ...prev }
            if (type === 'radio') {
                newOption[group] = element
            } else {
                const key = `${group}_${element}`
                newOption[key] = !prev[key]
            }
            return newOption
        })
    }

    return (
        <div className={`screen active ${styles.screen}`} id="screen-cadastro">
            <div className={`blob-bg ${styles.cadastroHero}`}>
                <Background />
                <div className={styles.btnBack}>
                    <button onClick={() => navigate('/')}>← Voltar</button>
                </div>
                <h1>Cadastro</h1>
                <p>Preencha seus dados para participar</p>
            </div>

            <div className="scroll">
                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>DADOS PESSOAIS</div>
                    <div className="field">
                        <label className="field-label">Nome completo *</label>
                        <input type="text" placeholder="Seu nome completo" />
                    </div>
                    <div className="field">
                        <label className="field-label">E-mail *</label>
                        <input type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="field">
                        <label className="field-label">Telefone (WhatsApp) *</label>
                        <input type="tel" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="field">
                        <label className="field-label">Data da conferência *</label>
                        <div className={`option-card ${select['data-conf'] === '28mar' ? 'sel' : ''}`} onClick={() => toggleOpt('28mar', 'radio', 'data-conf')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>28 de março de 2026 (Sábado)</span>
                        </div>
                        <div className={`option-card ${select['data-conf'] === '04abr' ? 'sel' : ''}`} onClick={() => toggleOpt('04abr', 'radio', 'data-conf')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>04 de abril de 2026 (Sábado)</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>IDENTIDADE</div>
                    <div className="field">
                        <label className="field-label">Identidade de gênero *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Mulher - cis</option>
                            <option>Mulher - trans</option>
                            <option>Homem - cis</option>
                            <option>Homem - trans</option>
                            <option>Travesti</option>
                            <option>Não-binário</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="field-label">Orientação sexual *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Bissexual</option>
                            <option>Gay</option>
                            <option>Heterossexual</option>
                            <option>Lésbica</option>
                            <option>Pansexual</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="field-label">Raça/cor *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Indígena</option>
                            <option>Negra (Pretos)</option>
                            <option>Negra (Pardos)</option>
                            <option>Branca</option>
                            <option>Amarela</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>ACESSIBILIDADE</div>
                    <div className="field">
                        <label className="field-label">Possui alguma deficiência? *</label>
                        <div className={`option-card ${select['def'] === 'sim' ? 'sel' : ''}`} onClick={() => toggleOpt('sim', 'radio', 'def')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Sim</span>
                        </div>
                        <div className={`option-card ${select['def'] === 'nao' ? 'sel' : ''}`} onClick={() => toggleOpt('nao', 'radio', 'def')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Não</span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field-label">Se sim, qual(is)?</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Pessoa cega</option>
                            <option>Pessoa com baixa visão</option>
                            <option>Pessoa surda usuária de Libras</option>
                            <option>Pessoa surda oralizada</option>
                            <option>Pessoa surda cega</option>
                            <option>Deficiência física/motora</option>
                            <option>Deficiência intelectual/mental</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="field-label">Recurso de acessibilidade específico</label>
                        <textarea placeholder="Descreva se necessitar de algum recurso especial..."></textarea>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>LOCALIZAÇÃO</div>
                    <div className="field">
                        <label className="field-label">Cidade de residência *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Arujá</option>
                            <option>Biritiba-Mirim</option>
                            <option>Ferraz de Vasconcelos</option>
                            <option>Guararema</option>
                            <option>Guarulhos</option>
                            <option>Igaratá</option>
                            <option>Itaquaquecetuba</option>
                            <option>Mairiporã</option>
                            <option>Mogi das Cruzes</option>
                            <option>Poá</option>
                            <option>Salesópolis</option>
                            <option>Santa Isabel</option>
                            <option>Santa Branca</option>
                            <option>Suzano</option>
                            <option>Outro</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="field-label">Região *</label>
                        <div className={`option-card ${select['regiao'] === 'rural' ? 'sel' : ''}`} onClick={() => toggleOpt('rural', 'radio', 'regiao')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Rural</span>
                        </div>
                        <div className={`option-card ${select['regiao'] === 'urbana' ? 'sel' : ''}`} onClick={() => toggleOpt('urbana', 'radio', 'regiao')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Urbana</span>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>VÍNCULOS</div>
                    <div className="field">
                        <label className="field-label">Pertence a alguma cadeia produtiva local?</label>
                        <div className={`option-card ${select['cadeia'] === 'sim' ? 'sel' : ''}`} onClick={() => toggleOpt('sim', 'radio', 'cadeia')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Sim</span>
                        </div>
                        <div className={`option-card ${select['cadeia'] === 'nao' ? 'sel' : ''}`} onClick={() => toggleOpt('nao', 'radio', 'cadeia')}>
                            <div className="mark"><div className="mark-dot"></div></div>
                            <span>Não</span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field-label">Se sim, qual cadeia?</label>
                        <div className={`option-card ${select['tipo-cadeia_cultivo'] ? 'sel' : ''}`} onClick={() => toggleOpt('cultivo', 'check', 'tipo-cadeia')}>
                            <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                            <span>Cultivo</span>
                        </div>
                        <div className={`option-card ${select['tipo-cadeia_criacao'] ? 'sel' : ''}`} onClick={() => toggleOpt('criacao', 'check', 'tipo-cadeia')}>
                            <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                            <span>Criação</span>
                        </div>
                        <div className={`option-card ${select['tipo-cadeia_agroindustria'] ? 'sel' : ''}`} onClick={() => toggleOpt('agroindustria', 'check', 'tipo-cadeia')}>
                            <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                            <span>Agroindústria</span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field-label">Vinculado(a) a qual instituição? *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Instituição Pública</option>
                            <option>Instituição Privada</option>
                            <option>Sociedade civil</option>
                            <option>Comunidade</option>
                            <option>Outro</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>FORMAÇÃO E OCUPAÇÃO</div>
                    <div className="field">
                        <label className="field-label">Área de formação *</label>
                        {['Estudante', 'Professor(a)', 'Ensino Fundamental do 1º ao 4º Ano', 'Ensino Fundamental do 5º ao 9º Ano', 'Ensino Médio Cursando', 'Ensino Técnico Cursando', 'Ensino Técnico Completo', 'Ensino Superior Cursando', 'Ensino Superior Completo'].map((item) => (
                            <div className={`option-card ${select[`formacao_${item}`] ? 'sel' : ''}`} key={item} onClick={() => toggleOpt(item, 'check', 'formacao')}>
                                <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="field">
                        <label className="field-label">Ocupação principal *</label>
                        <input type="text" placeholder="Ex: Agricultor, Professor, Estudante..." />
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>FATEC (OPCIONAL)</div>
                    <div className="field">
                        <label className="field-label">Público da Fatec</label>
                        {['Estudante', 'Docente', 'Gestor', 'Parceiro'].map((item) => (
                            <div className={`option-card ${select[`publico_${item}`] ? 'sel' : ''}`} key={item} onClick={() => toggleOpt(item, 'check', 'publico')}>
                                <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="field">
                        <label className="field-label">Tipo de participante *</label>
                        <select>
                            <option value="">Selecione...</option>
                            <option>Participante Externo</option>
                            <option>Aluno Fatec</option>
                            <option>Coordenador/Professor</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>EIXOS DE INTERESSE</div>
                    <div className="field">
                        {[
                            'Eixo 1 — Democracia e instituições fortes',
                            'Eixo 2 — Sustentabilidade ambiental',
                            'Eixo 4 — Inovação tecnológica sustentável',
                            'Eixo 5 — Governança participativa'
                        ].map((item) => (
                            <div className={`option-card ${select[`eixo_${item}`] ? 'sel' : ''}`} key={item} onClick={() => toggleOpt(item, 'check', 'eixo')}>
                                <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.formSection}>
                    <div className={styles.formSectionTitle}>AUTORIZAÇÃO</div>
                    <div className={`option-card ${select['autorizacao_imagem'] ? 'sel' : ''}`} onClick={() => toggleOpt('imagem', 'check', 'autorizacao')}>
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span className={styles.textSpan}>Autorizo o uso de imagem e som de voz em fotos, vídeos e demais registros para divulgação da 1ª Conferência Nacional ODS. *</span>
                    </div>
                </div>
            </div>

            <div className={styles.cadastroFooter}>
                <button className="btn btn-primary btn-full" onClick={() => navigate('/Votacao')}>Continuar para votação →</button>
            </div>


        </div>
    )
}