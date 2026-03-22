import styles from "../cadastro.module.css"
import PropTypes from "prop-types"
import { optionCardClass, toggleList} from '../cadastroUtils.js'

export default function FatecSection({ form, opcoes, handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>FATEC (OPCIONAL)</div>
            <fieldset className="field">
                <legend className="field-label">Público da Fatec</legend>
                {opcoes.publicosFatec.map((o) => (
                    <label key={o.id} className={optionCardClass(form.publicosFatecIds.includes(o.id))}>
                        <input
                            type="checkbox"
                            checked={form.publicosFatecIds.includes(o.id)}
                            onChange={() => handleChange('publicosFatecIds', toggleList(form.publicosFatecIds, o.id))}
                        />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>{o.nome}</span>
                    </label>
                ))}
            </fieldset>
            <div className="field">
                <label htmlFor="tipoParticipante" className="field-label">Tipo de participante *</label>
                <select
                    id="tipoParticipante"
                    value={form.tipoParticipanteId}
                    onChange={(e) => handleChange('tipoParticipanteId', Number(e.target.value))}
                >
                    <option value="">Selecione...</option>
                    {opcoes.tiposParticipante.map((o) => (
                        <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

FatecSection.propTypes = {
    form: PropTypes.object.isRequired,
    opcoes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}