import styles from "../cadastro.module.css"
import PropTypes from "prop-types"

export default function IdentidadeSection({ form, opcoes, handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>IDENTIDADE</div>
            <div className="field">
                <label htmlFor="genero" className="field-label">Identidade de gênero *</label>
                <select
                    id="genero"
                    value={form.identidadeGeneroId}
                    onChange={(e) => handleChange('identidadeGeneroId', Number(e.target.value))}
                >
                    <option value="">Selecione...</option>
                    {opcoes.identidadesGenero.map((o) => (
                        <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="orientacao" className="field-label">Orientação sexual *</label>
                <select
                    id="orientacao"
                    value={form.orientacaoSexualId}
                    onChange={(e) => handleChange('orientacaoSexualId', Number(e.target.value))}
                >
                    <option value="">Selecione...</option>
                    {opcoes.orientacoesSexuais.map((o) => (
                        <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                </select>
            </div>
            <div className="field">
                <label htmlFor="raca" className="field-label">Raça/cor *</label>
                <select
                    id="raca"
                    value={form.racaCorId}
                    onChange={(e) => handleChange('racaCorId', Number(e.target.value))}
                >
                    <option value="">Selecione...</option>
                    {opcoes.racasCores.map((o) => (
                        <option key={o.id} value={o.id}>{o.nome}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

IdentidadeSection.propTypes = {
    form: PropTypes.object.isRequired,
    opcoes: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}