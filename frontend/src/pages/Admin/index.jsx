import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Hero from '../../components/Hero';
import styles from '../Login/login.module.css';

export default function AdminPropostas() {
  const navigate = useNavigate();

  // Estados de Autenticação
  const [secret, setSecret] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem('adminSecret')
  );
  const [authErro, setAuthErro] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  // Estados do Formulário e Listagem
  const [eixos, setEixos] = useState([]);
  const [loadingEixos, setLoadingEixos] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [form, setForm] = useState({
    eixoId: '',
    titulo: '',
    descricao: '',
    autor: '',
    autorEmail: '',
  });

  // Estado da Modal de Exclusão
  const [modalDelete, setModalDelete] = useState({
    isOpen: false,
    id: null,
    titulo: '',
  });

  // Busca os eixos e propostas assim que estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      carregarDados();
    }
  }, [isAuthenticated]);

  async function carregarDados() {
    setLoadingEixos(true);
    try {
      const res = await api.get('/eixos');
      setEixos(res.data.eixos);
    } catch (err) {
      setMensagem({
        texto: 'Erro ao carregar eixos e propostas.',
        tipo: 'erro',
      });
    } finally {
      setLoadingEixos(false);
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!secret.trim()) return;

    setIsChecking(true);
    setAuthErro('');

    try {
      await api.get('/propostas/auth', {
        headers: { 'X-Admin-Secret': secret },
      });

      sessionStorage.setItem('adminSecret', secret);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthErro('Senha incorreta. Acesso negado.');
      setSecret('');
      setIsAuthenticated(false);
      sessionStorage.removeItem('adminSecret');
    } finally {
      setIsChecking(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('adminSecret');
    setSecret('');
    setIsAuthenticated(false);
    setForm({
      eixoId: '',
      titulo: '',
      descricao: '',
      autor: '',
      autorEmail: '',
    });
    setMensagem({ texto: '', tipo: '' });
    setAuthErro('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const adminSecret = sessionStorage.getItem('adminSecret');

    if (!adminSecret) {
      handleLogout();
      return;
    }

    setSubmitting(true);
    setMensagem({ texto: '', tipo: '' });

    try {
      await api.post(
        '/propostas',
        {
          eixoId: Number(form.eixoId),
          titulo: form.titulo,
          descricao: form.descricao,
          autor: form.autor || null,
          autorEmail: form.autorEmail || null,
        },
        {
          headers: { 'X-Admin-Secret': adminSecret },
        }
      );

      setMensagem({
        texto: 'Proposta cadastrada com sucesso!',
        tipo: 'sucesso',
      });
      setForm({
        eixoId: '',
        titulo: '',
        descricao: '',
        autor: '',
        autorEmail: '',
      });
      await carregarDados();
    } catch (err) {
      if (err.response?.status === 401) {
        setAuthErro('Sessão expirada ou senha inválida.');
        handleLogout();
      } else {
        setMensagem({
          texto: err.response?.data?.mensagem || 'Erro ao cadastrar proposta.',
          tipo: 'erro',
        });
      }
    } finally {
      setSubmitting(false);
    }
  }

  // Abre a modal em vez de usar window.confirm
  function handleExcluir(id, titulo) {
    setModalDelete({
      isOpen: true,
      id,
      titulo,
    });
  }

  async function confirmarExclusao() {
    const adminSecret = sessionStorage.getItem('adminSecret');
    setSubmitting(true);

    try {
      await api.delete(`/propostas/${modalDelete.id}`, {
        headers: { 'X-Admin-Secret': adminSecret },
      });

      setMensagem({ texto: 'Proposta removida com sucesso.', tipo: 'sucesso' });
      setModalDelete({ isOpen: false, id: null, titulo: '' });
      await carregarDados();
    } catch (err) {
      setMensagem({
        texto: err.response?.data?.mensagem || 'Erro ao excluir proposta.',
        tipo: 'erro',
      });
      setModalDelete({ isOpen: false, id: null, titulo: '' });
    } finally {
      setSubmitting(false);
    }
  }

  // ================= TELA DE LOGIN (ÁREA RESTRITA) =================
  if (!isAuthenticated) {
    return (
      <div className={`screen active ${styles.screen}`}>
        <Hero>
          <h1>Painel de Gestão</h1>
          <p>1ª Conferência Nacional ODS — Fatec Mogi das Cruzes</p>
        </Hero>
        <div className={styles.loginCard}>
          <h2>Área Restrita</h2>
          <p className={styles.sub}>
            Coordenação — 1ª Conferência Nacional ODS
          </p>

          <form onSubmit={handleLogin}>
            <div className="field" style={{ marginBottom: '20px' }}>
              <label
                className="field-label"
                style={{ marginBottom: '8px', display: 'block' }}
              >
                Senha de Admin
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showSecret ? 'text' : 'password'}
                  placeholder="Digite a senha..."
                  value={secret}
                  onChange={(e) => {
                    setSecret(e.target.value);
                    setAuthErro('');
                  }}
                  style={{
                    width: '100%',
                    padding: '14px 40px 14px 16px',
                    borderRadius: '12px',
                    border: authErro
                      ? '1.5px solid #fca5a5'
                      : '1.5px solid var(--border)',
                    backgroundColor: authErro ? '#fef2f2' : 'var(--surface)',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowSecret((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '4px',
                    width: '26px',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {showSecret ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {authErro && (
              <p
                style={{
                  color: '#dc2626',
                  fontSize: '13px',
                  marginTop: '-12px',
                  marginBottom: '16px',
                }}
              >
                {authErro}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={!secret || isChecking}
            >
              {isChecking ? 'Verificando...' : 'Acessar →'}
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-full"
              onClick={() => navigate('/')}
              style={{ marginTop: '10px' }}
            >
              ← Voltar ao Início
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= TELA PRINCIPAL DO ADMIN =================
  return (
    <div
      className={`screen active ${styles.screen}`}
      style={{ overflowY: 'auto' }}
    >
      <div
        className={styles.loginCard}
        style={{ margin: '24px 20px', paddingBottom: '30px' }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2 style={{ fontFamily: '"Fraunces", serif' }}>Painel de Gestão</h2>
          <button
            onClick={handleLogout}
            className="btn btn-ghost"
            style={{ padding: '4px 12px', fontSize: '12px' }}
          >
            Sair
          </button>
        </div>

        <p className={styles.sub}>
          Adicione ou remova propostas para o evento nos dias 28/03 e 04/04.
        </p>

        {mensagem.texto && (
          <div
            style={{
              background: mensagem.tipo === 'sucesso' ? '#dcfce7' : '#fee2e2',
              color: mensagem.tipo === 'sucesso' ? '#166534' : '#b91c1c',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              border: `1px solid ${mensagem.tipo === 'sucesso' ? '#bbf7d0' : '#fecaca'}`,
            }}
          >
            {mensagem.texto}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#f9f9f6',
            padding: '20px',
            borderRadius: '16px',
            border: '1px solid var(--border)',
          }}
        >
          <h3 style={{ fontSize: '15px', marginBottom: '15px' }}>
            Cadastrar Proposta
          </h3>

          <div className="field" style={{ marginBottom: '16px' }}>
            <label className="field-label">Eixo ODS</label>
            <select
              required
              value={form.eixoId}
              onChange={(e) => setForm({ ...form, eixoId: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1.5px solid var(--border)',
                background: '#fff',
              }}
            >
              <option value="">Selecione o eixo...</option>
              {eixos.map((eixo) => (
                <option key={eixo.id} value={eixo.id}>
                  {eixo.nome} - {eixo.descricao}
                </option>
              ))}
            </select>
          </div>

          <div className="field" style={{ marginBottom: '16px' }}>
            <label className="field-label">Título</label>
            <input
              type="text"
              required
              placeholder="Ex: Ampliação da Coleta Seletiva"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              maxLength="150"
            />
          </div>

          <div className="field" style={{ marginBottom: '16px' }}>
            <label className="field-label">Descrição</label>
            <textarea
              required
              rows="3"
              placeholder="Descreva a proposta brevemente..."
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                border: '1.5px solid var(--border)',
                fontFamily: 'inherit',
                resize: 'none',
              }}
              maxLength="2000"
            />
          </div>

          <div className="field" style={{ marginBottom: '16px' }}>
            <label className="field-label">Autor (opcional)</label>
            <input
              type="text"
              placeholder="Ex: João da Silva"
              value={form.autor}
              onChange={(e) => setForm({ ...form, autor: e.target.value })}
              maxLength="200"
            />
          </div>

          <div className="field" style={{ marginBottom: '20px' }}>
            <label className="field-label">E-mail do Autor (opcional)</label>
            <input
              type="email"
              placeholder="Ex: joao@email.com"
              value={form.autorEmail}
              onChange={(e) => setForm({ ...form, autorEmail: e.target.value })}
              maxLength="300"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={
              submitting || !form.eixoId || !form.titulo || !form.descricao
            }
          >
            {submitting ? 'Processando...' : 'Salvar Proposta'}
          </button>
        </form>

        <hr
          style={{
            margin: '32px 0',
            border: '0',
            borderTop: '1px solid var(--border)',
          }}
        />

        <div className={styles.listaAtual}>
          <h3
            style={{
              fontFamily: '"Fraunces", serif',
              fontSize: '18px',
              marginBottom: '16px',
            }}
          >
            Lista de Propostas
          </h3>

          {loadingEixos ? (
            <p
              style={{
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '14px',
              }}
            >
              Atualizando...
            </p>
          ) : (
            eixos.map((eixo) => (
              <div
                key={eixo.id}
                style={{
                  marginBottom: '16px',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#fff',
                }}
              >
                <div
                  style={{
                    padding: '10px 16px',
                    background: 'var(--green-pale)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '500',
                      fontSize: '13px',
                      color: 'var(--green)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {eixo.nome} — {eixo.descricao}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      background: 'rgba(0,0,0,0.06)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                    }}
                  >
                    {eixo.propostas?.length || 0} itens
                  </span>
                </div>
                <div>
                  {eixo.propostas?.map((prop) => (
                    <div
                      key={prop.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid #f0f0f0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: '500',
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          {prop.titulo}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            lineHeight: '1.4',
                          }}
                        >
                          {prop.descricao}
                        </div>
                        {prop.autor && (
                          <div
                            style={{
                              fontSize: '11px',
                              color: 'var(--green)',
                              fontWeight: 500,
                              marginBottom: '2px',
                            }}
                          >
                            Autor: {prop.autor}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleExcluir(prop.id, prop.titulo)}
                        style={{
                          background: 'transparent',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '11px',
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {modalDelete.isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              padding: '28px 24px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.09em',
                color: '#b91c1c',
                marginBottom: '8px',
                fontWeight: 'bold',
              }}
            >
              ATENÇÃO
            </div>
            <h2
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '12px',
              }}
            >
              Excluir Proposta?
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              Você está prestes a remover: <br />{' '}
              <strong>"{modalDelete.titulo}"</strong>. <br /> Esta ação não pode
              ser desfeita.
            </p>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <button
                className="btn btn-primary btn-full"
                onClick={confirmarExclusao}
                style={{ background: '#dc2626', color: '#fff', border: 'none' }}
                disabled={submitting}
              >
                {submitting ? 'Excluindo...' : 'Sim, excluir proposta'}
              </button>
              <button
                className="btn btn-ghost btn-full"
                onClick={() =>
                  setModalDelete({ isOpen: false, id: null, titulo: '' })
                }
                disabled={submitting}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
