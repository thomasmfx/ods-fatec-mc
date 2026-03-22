import styles from "../cadastro.module.css"
import PropTypes from "prop-types"
import { optionCardClass, toggleList} from '../cadastroUtils.js'

export default function FormacaoOcupacaoSection({ form, opcoes, handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>FORMAÇÃO E OCUPAÇÃO</div>
            <fieldset className="field">
                <legend className="field-label">Área de formação *</legend>
                {opcoes.areasFormacao.map((o) => (
                    <label key={o.id} className={optionCardClass(form.areasFormacaoIds.includes(o.id))}>
                        <input
                            type="checkbox"
                            checked={form.areasFormacaoIds.includes(o.id)}
                            onChange={() => handleChange('areasFormacaoIds', toggleList(form.areasFormacaoIds, o.id))}
                        />
                        <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                        <span>{o.nome}</span>
                    </label>
                ))}
            </fieldset>
            <div className="field">
                <label htmlFor="ocupacao" className="field-label">Ocupação principal *</label>
                <input
                    id="ocupacao"
                    type="text"
                    placeholder="Ex: Agricultor, Professor, Estudante..."
                    value={form.ocupacao}
                    onChange={(e) => handleChange('ocupacao', e.target.value)}
                />
            </div>
        </div>
    )
}

FormacaoOcupacaoSection.propTypes = {
    form: PropTypes.object.isRequired,
    opcoes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}