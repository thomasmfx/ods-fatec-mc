import { useState } from "react"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import Hero from "../../components/Hero"


import styles from "./cadastro.module.css"

function hasSelectedFormacao(select) {
    return Object.keys(select).some((k) => k.startsWith("formacao_") && select[k])
}


function isFormularioValido(form, select) {
    const camposPreenchidos =
        form.nome &&
        form.email &&
        form.telefone &&
        form.genero &&
        form.orientacao &&
        form.raca &&
        form.cidade &&
        form.instituicao &&
        form.ocupacao &&
        form.tipoParticipante

    const opcoesObrigatorias =
        select["data-conf"] &&
        select.def &&
        select.regiao &&
        select.cadeia &&
        select.autorizacao_imagem

    return camposPreenchidos && opcoesObrigatorias && hasSelectedFormacao(select)
}

function optionCardClass(isSelected) {
    return `option-card ${isSelected ? "sel" : ""}`
}

function DadosPessoaisSection({ form, select, handleChange, toggleOpt }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>DADOS PESSOAIS</div>
            <div className="field">
                <label htmlFor="nome" className="field-label">Nome completo *</label>
                <input id="nome" type="text" placeholder="Seu nome completo" onChange={(e) => handleChange('nome', e.target.value)} />
            </div>
            <div className="field">
                <label htmlFor="email" className="field-label">E-mail *</label>
                <input id="email" type="email" placeholder="seu@email.com" onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="field">
                <label htmlFor="telefone" className="field-label">Telefone (WhatsApp) *</label>
                <input id="telefone" type="tel" placeholder="(11) 99999-9999" value={form.telefone} onChange={(e) => handleChange('telefone', maskPhone(e.target.value))} />
            </div>
            <div className="field" role="radiogroup" id="data-conf-group">
                <label htmlFor="data-conf-group" className="field-label">Data da conferência *</label>
                <div className={optionCardClass(select['data-conf'] === '28mar')} onClick={() => toggleOpt('28mar', 'radio', 'data-conf')} role="radio" aria-checked={select['data-conf'] === '28mar'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('28mar', 'radio', 'data-conf'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>28 de março de 2026 (Sábado)</span>
                </div>
                <div className={optionCardClass(select['data-conf'] === '04abr')} onClick={() => toggleOpt('04abr', 'radio', 'data-conf')} role="radio" aria-checked={select['data-conf'] === '04abr'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('04abr', 'radio', 'data-conf'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>04 de abril de 2026 (Sábado)</span>
                </div>
            </div>
        </div>
    )
}

DadosPessoaisSection.propTypes = {
    form: PropTypes.object.isRequired,
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function maskPhone(value) {
    return value
        .replaceAll(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '($1) $2') 
        .replace(/(\d{5})(\d{1,4})/, '$1-$2')
        .slice(0, 15)
}

function IdentidadeSection({ handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>IDENTIDADE</div>
            <div className="field">
                <label htmlFor="genero" className="field-label">Identidade de gênero *</label>
                <select id="genero" onChange={(e) => handleChange('genero', e.target.value)}>
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
                <label htmlFor="orientacao" className="field-label">Orientação sexual *</label>
                <select id="orientacao" onChange={(e) => handleChange('orientacao', e.target.value)}>
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
                <label htmlFor="raca" className="field-label">Raça/cor *</label>
                <select id="raca" onChange={(e) => handleChange('raca', e.target.value)}>
                    <option value="">Selecione...</option>
                    <option>Indígena</option>
                    <option>Negra (Pretos)</option>
                    <option>Negra (Pardos)</option>
                    <option>Branca</option>
                    <option>Amarela</option>
                </select>
            </div>
        </div>
    )
}

IdentidadeSection.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

function AcessibilidadeSection({ select, toggleOpt }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>ACESSIBILIDADE</div>
            <div className="field" role="radiogroup">
                <label htmlFor="def-group" className="field-label">Possui alguma deficiência? *</label>
                <div className={optionCardClass(select.def === 'sim')} onClick={() => toggleOpt('sim', 'radio', 'def')} role="radio" aria-checked={select.def === 'sim'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('sim', 'radio', 'def'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Sim</span>
                </div>
                <div className={optionCardClass(select.def === 'nao')} onClick={() => toggleOpt('nao', 'radio', 'def')} role="radio" aria-checked={select.def === 'nao'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('nao', 'radio', 'def'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Não</span>
                </div>
            </div>

            {select.def === 'sim' && (
                <div className="field">
                    <label htmlFor="def-select" className="field-label">Se sim, qual(is)?</label>
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
            )}

            <div className="field">
                <label htmlFor="acessibilidade" className="field-label">Recurso de acessibilidade específico</label>
                <textarea placeholder="Descreva se necessitar de algum recurso especial..."></textarea>
            </div>
        </div>
    )
}

AcessibilidadeSection.propTypes = {
    select: PropTypes.object.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function LocalizacaoSection({ select, handleChange, toggleOpt }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>LOCALIZAÇÃO</div>
            <div className="field">
                <label htmlFor="cidade" className="field-label">Cidade de residência *</label>
                <select onChange={(e) => handleChange('cidade', e.target.value)}>
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
            <div className="field" role="radiogroup">
                <label htmlFor="regiao" className="field-label">Região *</label>
                <div className={optionCardClass(select.regiao === 'rural')} onClick={() => toggleOpt('rural', 'radio', 'regiao')} role="radio" aria-checked={select.regiao === 'rural'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('rural', 'radio', 'regiao'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Rural</span>
                </div>
                <div className={optionCardClass(select.regiao === 'urbana')} onClick={() => toggleOpt('urbana', 'radio', 'regiao')} role="radio" aria-checked={select.regiao === 'urbana'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('urbana', 'radio', 'regiao'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Urbana</span>
                </div>
            </div>
        </div>
    )
}

LocalizacaoSection.propTypes = {
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function VinculosSection({ select, handleChange, toggleOpt }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>VÍNCULOS</div>
            <div className="field" role="radiogroup">
                <label htmlFor="cadeia" className="field-label">Pertence a alguma cadeia produtiva local?</label>
                <div className={optionCardClass(select.cadeia === 'sim')} onClick={() => toggleOpt('sim', 'radio', 'cadeia')} role="radio" aria-checked={select.cadeia === 'sim'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('sim', 'radio', 'cadeia'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Sim</span>
                </div>
                <div className={optionCardClass(select.cadeia === 'nao')} onClick={() => toggleOpt('nao', 'radio', 'cadeia')} role="radio" aria-checked={select.cadeia === 'nao'} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { toggleOpt('nao', 'radio', 'cadeia'); e.preventDefault(); } }}>
                    <div className="mark"><div className="mark-dot"></div></div>
                    <span>Não</span>
                </div>
            </div>

            {select.cadeia === 'sim' && (
                <fieldset className="field">
                    <legend className="field-label">Se sim, qual cadeia?</legend>
                    <label className={optionCardClass(select['tipo-cadeia_cultivo'])}>
                        <input type="checkbox" checked={!!select['tipo-cadeia_cultivo']} onChange={() => toggleOpt('cultivo', 'check', 'tipo-cadeia')} />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>Cultivo</span>
                    </label>
                    <label className={optionCardClass(select['tipo-cadeia_criacao'])}>
                        <input type="checkbox" checked={!!select['tipo-cadeia_criacao']} onChange={() => toggleOpt('criacao', 'check', 'tipo-cadeia')} />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>Criação</span>
                    </label>
                    <label className={optionCardClass(select['tipo-cadeia_agroindustria'])}>
                        <input type="checkbox" checked={!!select['tipo-cadeia_agroindustria']} onChange={() => toggleOpt('agroindustria', 'check', 'tipo-cadeia')} />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>Agroindústria</span>
                    </label>
                </fieldset>
            )}

            <div className="field">
                <label htmlFor="instituicao" className="field-label">Vinculado(a) a qual instituição? *</label>
                <select onChange={(e) => handleChange('instituicao', e.target.value)}>
                    <option value="">Selecione...</option>
                    <option>Instituição Pública</option>
                    <option>Instituição Privada</option>
                    <option>Sociedade civil</option>
                    <option>Comunidade</option>
                    <option>Outro</option>
                </select>
            </div>
        </div>
    )
}

VinculosSection.propTypes = {
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function FormacaoOcupacaoSection({ select, handleChange, toggleOpt }) {
    const formacaoOptions = [
        'Estudante',
        'Professor(a)',
        'Ensino Fundamental do 1º ao 4º Ano',
        'Ensino Fundamental do 5º ao 9º Ano',
        'Ensino Médio Cursando',
        'Ensino Técnico Cursando',
        'Ensino Técnico Completo',
        'Ensino Superior Cursando',
        'Ensino Superior Completo'
    ]

    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>FORMAÇÃO E OCUPAÇÃO</div>
            <fieldset className="field">
                <legend className="field-label">Área de formação *</legend>
                {formacaoOptions.map((item) => (
                    <label className={optionCardClass(select['formacao_' + item])} key={item}>
                        <input type="checkbox" checked={!!select['formacao_' + item]} onChange={() => toggleOpt(item, 'check', 'formacao')} />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>{item}</span>
                    </label>
                ))}
            </fieldset>
            <div className="field">
                <label htmlFor="ocupacao" className="field-label">Ocupação principal *</label>
                <input type="text" placeholder="Ex: Agricultor, Professor, Estudante..." onChange={(e) => handleChange('ocupacao', e.target.value)} />
            </div>
        </div>
    )
}

FormacaoOcupacaoSection.propTypes = {
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function FatecSection({ select, handleChange, toggleOpt }) {
    const publicoOptions = ['Estudante', 'Docente', 'Gestor', 'Parceiro']

    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>FATEC (OPCIONAL)</div>
            <fieldset className="field">
                <legend className="field-label">Público da Fatec</legend>
                {publicoOptions.map((item) => (
                    <label className={optionCardClass(select['publico_' + item])} key={item}>
                        <input type="checkbox" checked={!!select['publico_' + item]} onChange={() => toggleOpt(item, 'check', 'publico')} />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>{item}</span>
                    </label>
                ))}
            </fieldset>
            <div className="field">
                <label htmlFor="tipoParticipante" className="field-label">Tipo de participante *</label>
                <select onChange={(e) => handleChange('tipoParticipante', e.target.value)}>
                    <option value="">Selecione...</option>
                    <option>Participante Externo</option>
                    <option>Aluno Fatec</option>
                    <option>Coordenador/Professor</option>
                </select>
            </div>
        </div>
    )
}

FatecSection.propTypes = {
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function EixosInteresseSection({ select, toggleOpt }) {
    const eixos = [
        'Eixo 1 — Democracia e instituições fortes',
        'Eixo 2 — Sustentabilidade ambiental',
        'Eixo 4 — Inovação tecnológica sustentável',
        'Eixo 5 — Governança participativa'
    ]

    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>EIXOS DE INTERESSE</div>
            <fieldset className="field">
                {eixos.map((item) => (
                    <label className={optionCardClass(select['eixo_' + item])} key={item}>
                        <input
                            type="checkbox"
                            checked={!!select['eixo_' + item]}
                            onChange={() => toggleOpt(item, 'check', 'eixo')}
                        />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>{item}</span>
                    </label>
                ))}
            </fieldset>
        </div>
    )
}

EixosInteresseSection.propTypes = {
    select: PropTypes.object.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function AutorizacaoSection({ select, toggleOpt }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>AUTORIZAÇÃO</div>
            <label className={optionCardClass(select.autorizacao_imagem)}>
                <input type="checkbox" checked={!!select.autorizacao_imagem} onChange={() => toggleOpt('imagem', 'check', 'autorizacao')} />
                <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                <span className={styles.textSpan}>Autorizo o uso de imagem e som de voz em fotos, vídeos e demais registros para divulgação da 1ª Conferência Nacional ODS. *</span>
            </label>
        </div>
    )
}

AutorizacaoSection.propTypes = {
    select: PropTypes.object.isRequired,
    toggleOpt: PropTypes.func.isRequired,
}

function CadastroPage({ form, select, handleChange, toggleOpt, navigate }) {
    return (
        <div className={`screen active ${styles.screen}`} id="screen-cadastro">
          <Hero>
              <div className={styles.btnBack}>
                  <button onClick={() => navigate('/')}>← Voltar</button>
              </div>
              <h1>Cadastro</h1>
              <p>Preencha seus dados para participar</p>
          </Hero>

            <div className="scroll">
                <DadosPessoaisSection form={form} select={select} handleChange={handleChange} toggleOpt={toggleOpt} />
                <IdentidadeSection select={select} handleChange={handleChange} />
                <AcessibilidadeSection select={select} toggleOpt={toggleOpt} />
                <LocalizacaoSection select={select} handleChange={handleChange} toggleOpt={toggleOpt} />
                <VinculosSection select={select} handleChange={handleChange} toggleOpt={toggleOpt} />
                <FormacaoOcupacaoSection select={select} handleChange={handleChange} toggleOpt={toggleOpt} />
                <FatecSection select={select} handleChange={handleChange} toggleOpt={toggleOpt} />
                <EixosInteresseSection select={select} toggleOpt={toggleOpt} />
                <AutorizacaoSection select={select} toggleOpt={toggleOpt} />
            </div>

            <div className={styles.cadastroFooter}>
                <button className="btn btn-primary btn-full" disabled={!isFormularioValido(form, select)} onClick={() => navigate('/Votacao')}>
                    Continuar para votação →
                </button>
            </div>
        </div>
    )
}

CadastroPage.propTypes = {
    form: PropTypes.object.isRequired,
    select: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    toggleOpt: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
}

export default function Cadastro() {
    const navigate = useNavigate()
    const [select, setSelect] = useState({})
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: '',
        genero: '',
        orientacao: '',
        raca: '',
        cidade: '',
        instituicao: '',
        ocupacao: '',
        tipoParticipante: '',
    })

    function handleChange(field, value) {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    function toggleOpt(element, type, group) {
        setSelect((prev) => {
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
        <CadastroPage
            form={form}
            select={select}
            handleChange={handleChange}
            toggleOpt={toggleOpt}
            navigate={navigate}
        />
    )
}