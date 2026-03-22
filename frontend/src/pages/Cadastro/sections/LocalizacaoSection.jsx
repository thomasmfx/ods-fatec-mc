import styles from "../cadastro.module.css"
import PropTypes from "prop-types"
import { optionCardClass} from '../cadastroUtils.js'

export default function LocalizacaoSection({ form, opcoes, handleChange }) {
    const cidadeSelecionada = opcoes.cidades.find((c) => c.id === form.cidadeId)
    const isOutro = cidadeSelecionada?.nome === 'Outro'

    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>LOCALIZAÇÃO</div>
            <div className="field">
                <label htmlFor="cidade" className="field-label">Cidade de residência *</label>
                <select
                    id="cidade"
                    value={form.cidadeId}
                    onChange={(e) => handleChange('cidadeId', Number(e.target.value))}
                >
                    <option value="">Selecione...</option>
                    {opcoes.cidades.map((o) => (
                        <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                </select>
            </div>

            {isOutro && (
                <div className="field">
                    <label htmlFor="cidadeOutro" className="field-label">Qual cidade?</label>
                    <input
                        id="cidadeOutro"
                        type="text"
                        placeholder="Nome da cidade"
                        value={form.cidadeOutro}
                        onChange={(e) => handleChange('cidadeOutro', e.target.value)}
                    />
                </div>
            )}

            <div className="field" role="radiogroup">
                <span className="field-label">Região *</span>
                {opcoes.regioes.map((o) => (
                    <div
                        key={o.id}
                        className={optionCardClass(form.regiaoId === o.id)}
                        role="radio"
                        aria-checked={form.regiaoId === o.id}
                        tabIndex={0}
                        onClick={() => handleChange('regiaoId', o.id)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleChange('regiaoId', o.id); e.preventDefault() } }}
                    >
                        <div className="mark"><div className="mark-dot" /></div>
                        <span>{o.nome}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

LocalizacaoSection.propTypes = {
    form: PropTypes.object.isRequired,
    opcoes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}