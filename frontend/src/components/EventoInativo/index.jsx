import { useNavigate } from 'react-router-dom';

export default function EventoInativo() {
  const navigate = useNavigate();

  return (
    <div 
      className="screen active" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center', 
        padding: '24px',
        minHeight: '100vh',
        background: 'var(--background)'
      }}
    >
      <div 
        style={{ 
          background: 'var(--surface)', 
          padding: '40px 32px', 
          borderRadius: '24px', 
          maxWidth: '420px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '24px' }}>⏳</div>
        
        <h1 
          style={{ 
            fontFamily: '"Fraunces", serif', 
            fontSize: '28px', 
            fontWeight: 600, 
            color: 'var(--text)', 
            marginBottom: '16px',
            lineHeight: 1.2
          }}
        >
          Votação Inativa
        </h1>
        
        <p 
          style={{ 
            fontSize: '16px', 
            color: 'var(--text-muted)', 
            lineHeight: 1.6, 
            marginBottom: '32px' 
          }}
        >
          O recebimento de votos para as propostas do <strong>ODS Mogi</strong> não está ativo no momento. 
          <br /><br />
          Fique atento às orientações da organização do evento ou acompanhe o painel de resultados.
        </p>

        <button 
          className="btn btn-primary btn-full" 
          onClick={() => navigate('/dashboard')}
          style={{ padding: '16px', fontSize: '16px', fontWeight: 500 }}
        >
          Ver Resultados ao Vivo
        </button>
      </div>
    </div>
  );
}