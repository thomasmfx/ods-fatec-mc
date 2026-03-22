import styles from "../cadastro.module.css"
import PropTypes from "prop-types"
import { optionCardClass, toggleList} from '../cadastroUtils.js'

export default function AcessibilidadeSection({ form, opcoes, handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>ACESSIBILIDADE</div>
            <div className="field" role="radiogroup">
                <span className="field-label">Possui alguma deficiência? *</span>
                {[
                    { value: true, label: 'Sim' },
                    { value: false, label: 'Não' },
                ].map(({ value, label }) => (
                    <div
                        key={label}
                        className={optionCardClass(form.possuiDeficiencia === value)}
                        role="radio"
                        aria-checked={form.possuiDeficiencia === value}
                        tabIndex={0}
                        onClick={() => handleChange('possuiDeficiencia', value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { handleChange('possuiDeficiencia', value); e.preventDefault() } }}
                    >
                        <div className="mark"><div className="mark-dot" /></div>
                        <span>{label}</span>
                    </div>
                ))}
            </div>

            {form.possuiDeficiencia === true && (
                <fieldset className="field">
                    <legend className="field-label">Quais?</legend>
                    {opcoes.deficiencias.map((o) => (
                        <label key={o.id} className={optionCardClass(form.deficienciasIds.includes(o.id))}>
                            <input
                                type="checkbox"
                                checked={form.deficienciasIds.includes(o.id)}
                                onChange={() => handleChange('deficienciasIds', toggleList(form.deficienciasIds, o.id))}
                            />
                            <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                            <span>{o.nome}</span>
                        </label>
                    ))}
                </fieldset>
            )}

            <div className="field">
                <label htmlFor="acessibilidade" className="field-label">Recurso de acessibilidade específico</label>
                <textarea
                    id="acessibilidade"
                    className={styles.textarea}
                    value={form.recursoAcessibilidade}
                    placeholder="Descreva se necessitar de algum recurso especial..."
                    onChange={(e) => handleChange('recursoAcessibilidade', e.target.value)}
                />
            </div>
        </div>
    )
}

AcessibilidadeSection.propTypes = {
    form: PropTypes.object.isRequired,
    opcoes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}