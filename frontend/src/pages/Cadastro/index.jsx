import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../../components/Hero';
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
    try {
      await api.post('/sessao/cadastro', form);
      navigate('/votacao');
    } catch (e) {
      if (e.response?.status === 409) {
        setErro('Este e-mail já está cadastrado. Faça check-in.');
      } else {
        setErro('Erro ao realizar cadastro. Tente novamente.');
      }
    } finally {
      setEnviando(false);
    }
  }

  if (loading)
    return (
      <div className="scroll">
        <p  className={styles.loadingText}>Carregando formulário...</p>
      </div>
    );

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

        {erro && <p className={styles.erro}>{erro}</p>}
      </div>

      <div className={styles.cadastroFooter}>
        <button
          className="btn btn-primary btn-full"
          disabled={!isFormularioValido(form) || enviando}
          onClick={handleSubmit}
        >
          {enviando ? 'Enviando...' : 'Continuar para votação →'}
        </button>
      </div>
    </div>
  );
}
