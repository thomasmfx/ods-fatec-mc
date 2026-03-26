import styles from '../cadastro.module.css';
import PropTypes from 'prop-types';
import { maskPhone, optionCardClass } from '../cadastroUtils.js';

export default function DadosPessoaisSection({ form, handleChange }) {
  return (
    <div className={styles.formSection}>
      <div className={styles.formSectionTitle}>DADOS PESSOAIS</div>
      <div className="field">
        <label htmlFor="nome" className="field-label">
          Nome completo *
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome completo"
          value={form.nome}
          onChange={(e) => handleChange('nome', e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="email" className="field-label">
          E-mail *
        </label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="telefone" className="field-label">
          Telefone (WhatsApp) *
        </label>
        <input
          id="telefone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={form.telefone}
          onChange={(e) => handleChange('telefone', maskPhone(e.target.value))}
        />
      </div>
      <div className="field" role="radiogroup">
        <span className="field-label">Data da conferência *</span>
        {[
          { value: '2026-03-28', label: '28 de março de 2026 (Sábado)' },
          { value: '2026-04-04', label: '04 de abril de 2026 (Sábado)' },
        ].map(({ value, label }) => (
          <div
            key={value}
            className={optionCardClass(form.dataConferencia === value)}
            role="radio"
            aria-checked={form.dataConferencia === value}
            tabIndex={0}
            onClick={() => handleChange('dataConferencia', value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleChange('dataConferencia', value);
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
    </div>
  );
}

DadosPessoaisSection.propTypes = {
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};
