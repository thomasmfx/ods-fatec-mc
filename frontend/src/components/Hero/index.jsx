import Background from '../Background';
import styles from './hero.module.css';
import { THEMES } from './variants.jsx';

export default function Hero({ children, variant = 'green' }) {
  const theme = THEMES[variant] || THEMES.green;

  return (
    <div className={styles.hero} style={{ backgroundColor: theme.bg }}>
      <Background shapes={theme.shapes} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
