import styles from './Loading.module.css';

export default function Loading({ texto = 'Carregando...', className = '' }) {
  return (
    <div className={`screen active ${styles.container} ${className}`}>
      <div className={styles.spinner} />
      <p className={styles.text}>{texto}</p>
    </div>
  );
}
