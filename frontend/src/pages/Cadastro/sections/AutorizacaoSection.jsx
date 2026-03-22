import styles from "../cadastro.module.css"
import PropTypes from "prop-types"
import { optionCardClass } from '../cadastroUtils.js'

export default function AutorizacaoSection({ form, handleChange }) {
    return (
        <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>AUTORIZAÇÃO</div>
            <label className={optionCardClass(form.autorizacaoImagem)}>
                <input
                    type="checkbox"
                    checked={form.autorizacaoImagem}
                    onChange={() => handleChange('autorizacaoImagem', !form.autorizacaoImagem)}
                />
                <div className="mark mark-sq"><div className="mark-check">✓</div></div>
                <span className={styles.textSpan}>
                    Autorizo o uso de imagem e som de voz em fotos, vídeos e demais registros
                    para divulgação da 1ª Conferência Nacional ODS. *
                </span>
            </label>
        </div>
    )
}

AutorizacaoSection.propTypes = {
    form: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
}