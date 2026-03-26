import styles from '../cadastro.module.css';
import PropTypes from 'prop-types';
import { optionCardClass, toggleList } from '../cadastroUtils.js';

export default function VinculosSection({ form, opcoes, handleChange }) {
  const instituicaoSelecionada = opcoes.instituicoes.find(
    (i) => i.id === form.instituicaoId
  );
  const isOutro = instituicaoSelecionada?.nome === 'Outro';

  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>VÍNCULOS</div>
      <div className="field" role="radiogroup">
        <span className="field-label">
          Pertence a alguma cadeia produtiva local?
        </span>
        {[
          { value: true, label: 'Sim' },
          { value: false, label: 'Não' },
        ].map(({ value, label }) => (
          <div
            key={label}
            className={optionCardClass(form.pertenceCadeiaProdutiva === value)}
            role="radio"
            aria-checked={form.pertenceCadeiaProdutiva === value}
            tabIndex={0}
            onClick={() => handleChange('pertenceCadeiaProdutiva', value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleChange('pertenceCadeiaProdutiva', value);
                e.preventDefault();
              }
            }}
          >
            <div className="mark">
              <div className="mark-dot" />
            </div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {form.pertenceCadeiaProdutiva === true && (
        <fieldset className="field">
          <legend className="field-label">Se sim, qual cadeia?</legend>
          {opcoes.cadeiasProdutivas.map((o) => (
            <label
              key={o.id}
              className={optionCardClass(
                form.cadeiasProdutivosIds.includes(o.id)
              )}
            >
              <input
                type="checkbox"
                checked={form.cadeiasProdutivosIds.includes(o.id)}
                onChange={() =>
                  handleChange(
                    'cadeiasProdutivosIds',
                    toggleList(form.cadeiasProdutivosIds, o.id)
                  )
                }
              />
              <div className="mark mark-sq">
                <div className="mark-check">✓</div>
              </div>
              <span>{o.nome}</span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="field">
        <label htmlFor="instituicao" className="field-label">
          Vinculado(a) a qual instituição? *
        </label>
        <select
          id="instituicao"
          value={form.instituicaoId}
          onChange={(e) =>
            handleChange('instituicaoId', Number(e.target.value))
          }
        >
          <option value="">Selecione...</option>
          {opcoes.instituicoes.map((o) => (
            <option key={o.id} value={o.id}>
              {o.nome}
            </option>
          ))}
        </select>
      </div>

      {isOutro && (
        <div className="field">
          <label htmlFor="instituicaoOutro" className="field-label">
            Qual instituição?
          </label>
          <input
            id="instituicaoOutro"
            type="text"
            placeholder="Nome da instituição"
            value={form.instituicaoOutro}
            onChange={(e) => handleChange('instituicaoOutro', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

VinculosSection.propTypes = {
  form: PropTypes.object.isRequired,
  opcoes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
