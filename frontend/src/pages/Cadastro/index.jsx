import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
import Loading from '../../components/Loading';
import api from '../../services/api';
import styles from './cadastro.module.css';
import { isFormularioValido, eixos } from './cadastroUtils.js';
import DadosPessoaisSection from './sections/DadosPessoaisSection.jsx';
import IdentidadeSection from './sections/IdentidadeSection.jsx';
import AcessibilidadeSection from './sections/AcessibilidadeSection.jsx';
import LocalizacaoSection from './sections/LocalizacaoSection.jsx';
import VinculosSection from './sections/VinculosSection.jsx';
import FormacaoOcupacaoSection from './sections/FormacaoOcupacao.jsx';
import FatecSection from './sections/FatecSection.jsx';
import EixosInteresseSection from './sections/EixosInteresseSection.jsx';
import AutorizacaoSection from './sections/AutorizacaoSection.jsx';

// ─── Estado inicial ──────────────────────────────────────────

const FORM_INICIAL = {
  nome: '',
  email: '',
  telefone: '',
  dataConferencia: '',
  identidadeGeneroId: '',
  orientacaoSexualId: '',
  racaCorId: '',
  cidadeId: '',
  cidadeOutro: '',
  regiaoId: '',
  pertenceCadeiaProdutiva: null,
  cadeiasProdutivosIds: [],
  instituicaoId: '',
  instituicaoOutro: '',
  areasFormacaoIds: [],
  ocupacao: '',
  publicosFatecIds: [],
  tipoParticipanteId: '',
  possuiDeficiencia: null,
  deficienciasIds: [],
  recursoAcessibilidade: '',
  eixosInteresseIds: [],
  autorizacaoImagem: false,
};

const OPCOES_VAZIAS = {
  identidadesGenero: [],
  orientacoesSexuais: [],
  racasCores: [],
  cidades: [],
  regioes: [],
  instituicoes: [],
  areasFormacao: [],
  publicosFatec: [],
  cadeiasProdutivas: [],
  tiposParticipante: [],
  deficiencias: [],
  eixos: [],
};

// ─── Componente principal ────────────────────────────────────

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(FORM_INICIAL);
  const [opcoes, setOpcoes] = useState(OPCOES_VAZIAS);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [modalEmailExiste, setModalEmailExiste] = useState(false);

  useEffect(() => {
    async function carregarOpcoes() {
      try {
        const resOpcoes = await api.get('/sessao/opcoes');
        setOpcoes({
          ...resOpcoes.data,
          ...eixos,
        });
      } catch {
        setErro('Erro ao carregar o formulário. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
    carregarOpcoes();
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setEnviando(true);
    setErro(null);
    const formSanitized = form;
    formSanitized.telefone = form.telefone.replaceAll(/\D/g, '');

    try {
      const { data } = await api.post('/sessao/cadastro', formSanitized);
      sessionStorage.setItem('sessaoToken', data.sessaoToken);
      sessionStorage.setItem('participante', JSON.stringify(data.participante));
      navigate('/votacao');
    } catch (e) {
      if (e.response?.status === 409) {
        setErro('Este e-mail já está cadastrado. Faça check-in.');
        setModalEmailExiste(true);
      } else {
        setErro('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setEnviando(false);
    }
  }

  if (loading) return <Loading texto="Carregando formulário..." />;

  return (
    <div className={`screen active ${styles.screen}`} id="screen-cadastro">
      <Hero>
        <div className={styles.btnBack}>
          <button onClick={() => navigate('/')}>← Voltar</button>
        </div>
        <h1>Cadastro</h1>
        <p>Preencha seus dados para participar</p>
      </Hero>

      <div className="scroll">
        <DadosPessoaisSection form={form} handleChange={handleChange} />
        <IdentidadeSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <AcessibilidadeSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <LocalizacaoSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <VinculosSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <FormacaoOcupacaoSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <FatecSection form={form} opcoes={opcoes} handleChange={handleChange} />
        <EixosInteresseSection
          form={form}
          opcoes={opcoes}
          handleChange={handleChange}
        />
        <AutorizacaoSection form={form} handleChange={handleChange} />
      </div>

      <div className={styles.cadastroFooter}>
        <button
          className="btn btn-primary btn-full"
          disabled={!isFormularioValido(form) || enviando}
          onClick={handleSubmit}
        >
          {enviando ? 'Cadastrando...' : 'Continuar para votação →'}
        </button>
      </div>
      {modalEmailExiste && (
        <div
          style={{
            display: 'flex',
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: 'var(--surface)',
              borderRadius: '24px',
              padding: '32px 24px',
              width: '100%',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>👋</div>

            <h2
              style={{
                fontFamily: '"Fraunces", serif',
                fontSize: '20px',
                fontWeight: 600,
                marginBottom: '8px',
                color: 'var(--text)',
              }}
            >
              E-mail já cadastrado
            </h2>

            <p
              style={{
                fontSize: '14px',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              Este e-mail já está registrado no nosso sistema. Vá para a aba de
              Check-in para continuar sua sessão.
            </p>

            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <button
                className="btn btn-primary btn-full"
                onClick={() => {
                  setModalEmailExiste(false);
                  navigate('/');
                }}
              >
                Fazer Check-in
              </button>
              <button
                className="btn btn-ghost btn-full"
                onClick={() => setModalEmailExiste(false)}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
