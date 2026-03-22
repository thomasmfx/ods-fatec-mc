import styles from '../cadastro.module.css';
import PropTypes from 'prop-types';
import { optionCardClass, toggleList } from '../cadastroUtils.js';

export default function EixosInteresseSection({ form, opcoes, handleChange }) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>EIXOS DE INTERESSE</div>
      <fieldset className="field">
        {opcoes.eixos.map((o) => (
          <label
            key={o.id}
            className={optionCardClass(form.eixosInteresseIds.includes(o.id))}
          >
            <input
              type="checkbox"
              checked={form.eixosInteresseIds.includes(o.id)}
              onChange={() =>
                handleChange(
                  'eixosInteresseIds',
                  toggleList(form.eixosInteresseIds, o.id)
                )
              }
            />
            <div className="mark mark-sq">
              <div className="mark-check">✓</div>
            </div>
            <span>
              {o.nome} — {o.descricao}
            </span>
          </label>
        ))}
      </fieldset>
    </div>
  );
}

EixosInteresseSection.propTypes = {
  form: PropTypes.object.isRequired,
  opcoes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
