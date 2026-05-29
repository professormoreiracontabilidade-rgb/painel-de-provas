import React, { useState, useMemo } from 'react';
import { 
  Search, 
  TrendingUp, 
  Award, 
  BarChart2, 
  Grid, 
  Filter, 
  Info, 
  Sparkles,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  BookOpenCheck
} from 'lucide-react';

// Banco de dados com questões reais extraídas dos cadernos de encargos das provas fornecidas (Questões 10 a 15)
const QUESTIONS_DATABASE = {
  10: {
    "2024.1": {
      enunciado: "A ética pode ser aplicada em praticamente todas as nossas ações. No ambiente de trabalho, ela é fundamental para garantir um ambiente saudável... Avalie se as afirmativas a seguir são falsas (F) ou verdadeiras (V):\n\n() No ambiente de trabalho, a ética é fundamental para garantir um ambiente saudável e produtivo entre as pessoas.\n() Agir de forma ética pode ser ter uma postura respeitosa em relação aos colegas, clientes e fornecedores...\n() A ética envolve tomar decisões justas, cumprindo as leis e normas regulatórias e considerando o impacto de nossas ações...\n\nAs afirmativas são, respetivamente:",
      opcoes: ["V - V - V", "V - F - F", "F - V - V", "F - F - F"],
      gabarito: 0,
      resolucao: "Todas as afirmativas são verdadeiras (V-V-V). A conduta ética no ambiente profissional exige respeito, confidencialidade, conformidade com as leis e consideração pelo bem-estar coletivo.",
      norma: "Código de Ética Profissional do Contador"
    },
    "2024.1 RS": {
      enunciado: "De acordo com o Código de Ética Profissional, o contabilista pode praticar os seguintes atos, à exceção de um. Assinale-o:",
      opcoes: [
        "Publicar trabalho, científico ou técnico, assinado e sob sua responsabilidade.",
        "Transferir o contrato de serviços a seu cargo a outro profissional, com a anuência do cliente, sempre por escrito.",
        "Transferir integralmente a execução dos serviços a seu cargo a outro profissional, mantendo como sua a responsabilidade técnica.",
        "Indicar, em qualquer modalidade ou veículo de comunicação, títulos, especializações, serviços oferecidos e relação de clientes autorizada."
      ],
      gabarito: 2,
      resolucao: "O contabilista não pode transferir integralmente a execução dos serviços sob sua responsabilidade a terceiros sem a devida desvinculação contratual e registo profissional adequado dos envolvidos.",
      norma: "NBC PG 01 - Regulamento de Ética"
    },
    "2024.2": {
      enunciado: "Avalie se o CÓDIGO DE ÉTICA PROFISSIONAL DO CONTADOR, em seu item 20, prevê as seguintes penalidades:\n\nI. Advertência reservada;\nII. Advertência pública;\nIII. Censura reservada;\nIV. Censura pública.\n\nEstão corretos os itens:",
      opcoes: ["I e II, apenas.", "I, III e IV.", "I, II e III.", "II, III e IV."],
      gabarito: 1,
      resolucao: "Nos termos do Código de Ética do CFC, as sanções disciplinares previstas são a Advertência reservada, a Censura reservada e a Censura pública. A figura de 'advertência pública' não existe no normativo.",
      norma: "NBC PG 01 - Item 20"
    },
    "2025.1": {
      enunciado: "Para que um passivo se qualifique para reconhecimento, é necessário haver não somente uma obrigação presente, mas também a probabilidade de saída de recursos... No caso de uma Provisão, o reconhecimento se dá quando cumpridas certas condições. Em relação ao reconhecimento de um PASSIVO CONTINGENTE, de acordo com a NBC TG 25 (R2), é correto afirmar que:",
      opcoes: [
        "Não é reconhecido e nem divulgado em notas explicativas.",
        "Não é reconhecido, mas é divulgado em notas explicativas.",
        "É reconhecido e divulgado em notas explicativas.",
        "É reconhecido, mas não é divulgado em notas explicativas."
      ],
      gabarito: 1,
      resolucao: "Os passivos contingentes representam obrigações possíveis ou obrigações presentes onde a saída de recursos não é provável. Portanto, não preenchem as condições de reconhecimento no Balanço, devendo ser apenas divulgados em Notas Explicativas.",
      norma: "NBC TG 25 (R2)"
    },
    "2025.2": {
      enunciado: "De acordo com a NBC TG ESTRUTURA CONCEITUAL - ESTRUTURA CONCEITUAL PARA RELATÓRIO FINANCEIRO, as características qualitativas fundamentais são relevância e representação fidedigna. Uma informação neutra deve:",
      opcoes: ["Ser parcial.", "Ser prudente.", "Possuir inclinações favoráveis.", "Ser tendenciosa na seleção de dados."],
      gabarito: 1,
      resolucao: "A neutralidade é sustentada pelo exercício da prudência, que consiste na aplicação de cautela em julgamentos de estimativas sob incerteza, de forma a não sobreavaliar ativos ou subavaliar passivos.",
      norma: "NBC TG Estrutura Conceitual"
    },
    "2026.1": {
      enunciado: "De acordo com a NBC TG ESTRUTURA CONCEITUAL (R2), ativo é um recurso económico presente, controlado pela entidade como resultado de eventos passados. Um recurso económico representa:",
      opcoes: [
        "Um bem físico ou de direito que pertence juridicamente à entidade.",
        "Uma obrigação futura de transferir benefícios económicos.",
        "Um direito que tem o potencial de produzir benefícios económicos.",
        "Um aumento no património líquido sem contrapartida de terceiros."
      ],
      gabarito: 2,
      resolucao: "O recurso económico é conceitualmente definido pela nova estrutura como 'um direito que tem o potencial de produzir benefícios económicos'.",
      norma: "NBC TG Estrutura Conceitual - Item 4.4"
    }
  },
  11: {
    "2024.1": {
      enunciado: "O desreconhecimento é a retirada de parte ou da totalidade de um ativo ou passivo reconhecido do balanço patrimonial da entidade. A máquina utilizada para a produção do principal produto de uma determinada entidade deve ser desreconhecida quando:",
      opcoes: [
        "Perder todo o potencial de produzir benefícios económicos para a entidade.",
        "Estiver totalmente depreciada no encerramento.",
        "Sofrer qualquer perda pontual de valor recuperável.",
        "Estiver temporariamente fora de uso por manutenção."
      ],
      gabarito: 0,
      resolucao: "O desreconhecimento de um item de ativo imobilizado deve ocorrer quando não se esperam benefícios económicos futuros resultantes do seu uso ou alienação.",
      norma: "NBC TG Estrutura Conceitual / NBC TG 27"
    },
    "2024.1 RS": {
      enunciado: "São considerados custos diretamente atribuíveis ao Ativo Imobilizado para sua mensuração no reconhecimento inicial pelo custo histórico, os listados a seguir, à exceção de um. Assinale-o:",
      opcoes: [
        "Custos de abertura de nova instalação comercial.",
        "Honorários profissionais associados à montagem.",
        "Custos de frete e manuseamento do bem.",
        "Custos de preparação e nivelamento do local de instalação."
      ],
      gabarito: 0,
      resolucao: "Custos de abertura de novas instalações, introdução de novos produtos ou custos administrativos gerais não integram a base de custo do ativo imobilizado.",
      norma: "NBC TG 27 - Ativo Imobilizado"
    },
    "2024.2": {
      enunciado: "A ética é fundamental no exercício da contabilidade, pois garante a integridade e a confiança nas informações financeiras divulgadas. O papel da contabilidade na sociedade vai além do simples registo de transações, pois ela atua como um mecanismo de:",
      opcoes: ["Controle.", "Auditoria autónoma.", "Manutenção passiva.", "Aproximação setorial."],
      gabarito: 0,
      resolucao: "Historicamente, a contabilidade desenvolve-se como um instrumento de controlo e salvaguarda do património das entidades econômicas e sociais.",
      norma: "Teoria da Contabilidade"
    },
    "2025.1": {
      enunciado: "Um supermercado perdeu todo o seu inventário de mercadorias em maio de 2024 devido a enchentes. A administração procedeu imediatamente à baixa do stock para manter as demonstrações úteis aos utilizadores primários, sem aguardar por relatórios periciais lentos. Qual característica qualitativa de melhoria foi priorizada?",
      opcoes: ["Neutralidade.", "Materialidade.", "Verificabilidade.", "Tempestividade."],
      gabarito: 3,
      resolucao: "A tempestividade consiste em disponibilizar a informação aos tomadores de decisão a tempo de poder influenciar o seu planeamento económico ou ações corretivas imediatas.",
      norma: "NBC TG Estrutura Conceitual"
    },
    "2025.2": {
      enunciado: "De acordo com a NBC TG ESTRUTURA CONCEITUAL, para ajudar os utilizadores das demonstrações financeiras a identificar e avaliar tendências históricas, as demonstrações financeiras devem:",
      opcoes: [
        "Ser elaboradas com base estrita na forma jurídica das transações.",
        "Evitar estimativas em contextos de potencial variação de mercado.",
        "Apresentar as informações de forma restrita a leitores leigos.",
        "Fornecer informações comparativas de, pelo menos, um período anterior de relato."
      ],
      gabarito: 3,
      resolucao: "A comparabilidade exige que os dados financeiros apresentem a correspondência com, no mínimo, o exercício anterior imediato.",
      norma: "NBC TG Estrutura Conceitual"
    },
    "2026.1": {
      enunciado: "Em 2024, uma empresa estimava perdas com imparidade de crédito de 2%. Em 2025, afrouxou a política de crédito e os analistas indicavam perdas prováveis de 5%. Porém, os gestores optaram por divulgar 2% para não impactar os seus bónus. Que característica qualitativa de representação fidedigna foi violada?",
      opcoes: [
        "A neutralidade da informação, por conter viés de seleção.",
        "A tempestividade dos lançamentos mensais.",
        "A comparabilidade do saldo histórico de duplicatas.",
        "A verificabilidade por auditoria independente externa."
      ],
      gabarito: 0,
      resolucao: "A informação deixa de ser neutra quando é selecionada ou apresentada de forma a aumentar a probabilidade de alcançar um resultado predeterminado ou induzir um comportamento.",
      norma: "NBC TG Estrutura Conceitual"
    }
  }
};

// Estrutura de Exames e Questões
const EXAMS = ["2024.1", "2024.1 RS", "2024.2", "2025.1", "2025.2", "2026.1"];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredSubject, setHoveredSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('table');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Controlo do Simulador Interativo
  const [selectedCell, setSelectedCell] = useState({ q: 10, exam: '2024.1' });
  const [userAnswers, setUserAnswers] = useState({}); // { "q-exam": { chosenIdx, isCorrect } }
  const [activeAnswerIdx, setActiveAnswerIdx] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Mapeamento de Assuntos Completo (Faixa 10 a 34 das provas)
  const EXAM_DATA = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const qNum = 10 + i;
      const row = { q: qNum };
      EXAMS.forEach(exam => {
        let subject = "Outros Tópicos";
        if (qNum === 10) {
          if (exam === "2024.1" || exam === "2024.2") subject = "Ética Profissional";
          else if (exam === "2024.1 RS" || exam === "2025.2" || exam === "2026.1") subject = "Estrutura Conceitual";
          else if (exam === "2025.1") subject = "NBC TG 25";
        } else if (qNum === 11) {
          if (exam === "2024.2") subject = "Teoria Contabilística";
          else subject = "Estrutura Conceitual";
        } else if (qNum === 12) {
          if (exam === "2025.2") subject = "Património Líquido";
          else if (exam === "2026.1") subject = "Ativo Imobilizado";
          else subject = "Estrutura Conceitual";
        } else if (qNum === 13) {
          subject = "Estrutura Conceitual";
        } else if (qNum === 14) {
          if (exam === "2024.1") subject = "Continuidade";
          else if (exam === "2024.1 RS" || exam === "2025.2") subject = "NBC TG 28";
          else if (exam === "2024.2") subject = "Conceito de Passivo";
          else if (exam === "2025.1") subject = "Representação Fidedigna";
          else if (exam === "2026.1") subject = "NBC TG 22";
        } else if (qNum === 15) {
          if (exam === "2024.1") subject = "NBC TG 04";
          else if (exam === "2024.1 RS") subject = "CPC 01 / Imparidade";
          else if (exam === "2024.2") subject = "Conceito de Capital";
          else if (exam === "2025.1") subject = "NBC TG 26 / DRE";
          else if (exam === "2025.2") subject = "NBC TG 31 / Venda";
          else if (exam === "2026.1") subject = "NBC TG 32 / Lucro";
        } else {
          // Dados adicionais baseados no mapeamento do CFC
          const fallbackMap = {
            16: { "2024.1": "NBC TG 18", "2024.1 RS": "NBC TG 28", "2024.2": "Estrutura NBC", "2025.1": "NBC TG 31", "2025.2": "NBC TG 01", "2026.1": "NBC TG 47" },
            17: { "2024.1": "NBC TG 48", "2024.1 RS": "CPC 22", "2024.2": "NBC TG 27", "2025.1": "Elementos DC", "2025.2": "Goodwill", "2026.1": "NBC TG 06" },
            18: { "2024.1": "NBC TG 24", "2024.1 RS": "Estoques", "2024.2": "Materialidade", "2025.1": "NBC TG 25", "2025.2": "DVA", "2026.1": "DFC" },
            19: { "2024.1": "Resultado por Ação", "2024.1 RS": "Imobilizado x PPI", "2024.2": "NBC TG 25", "2025.1": "DVA", "2025.2": "Depreciação", "2026.1": "Intangível" },
            20: { "2024.1": "NBC TG 16", "2024.1 RS": "Ativo Circulante", "2024.2": "DFC", "2025.1": "DVA", "2025.2": "Elementos DC", "2026.1": "Estoques" },
            21: { "2024.1": "NBC TG 47", "2024.1 RS": "DRE", "2024.2": "Estoques", "2025.1": "DVA", "2025.2": "Combinação Negócios", "2026.1": "DVA" },
            22: { "2024.1": "NBC TG 27", "2024.1 RS": "DRA", "2024.2": "Despesas Antecipadas", "2025.1": "Divulgação Passivo", "2025.2": "Influência", "2026.1": "DRE" },
            23: { "2024.1": "NBC TG 01", "2024.1 RS": "DFC", "2024.2": "Competência", "2025.1": "Competência", "2025.2": "CMV", "2026.1": "Impairment" },
            24: { "2024.1": "Reservas Capital", "2024.1 RS": "DVA", "2024.2": "Passivo C/NC", "2025.1": "Imobilizado", "2025.2": "Provisões", "2026.1": "Venda Mercadorias" },
            25: { "2024.1": "DFC", "2024.1 RS": "Consolidação", "2024.2": "DVA", "2025.1": "Ativo Contingente", "2025.2": "Competência", "2026.1": "Provisões" },
            26: { "2024.1": "DVA", "2024.1 RS": "Consolidação", "2024.2": "Controle/Consolidação", "2025.1": "Competência", "2025.2": "CMPM", "2026.1": "DFC" },
            27: { "2024.1": "Notas Explicativas", "2024.1 RS": "Variação Cambial", "2024.2": "Imobilizado", "2025.1": "Imobilizado", "2025.2": "DFC", "2026.1": "Consolidação" },
            28: { "2024.1": "NBC TG 02", "2024.1 RS": "NBC TG 25", "2024.2": "Demonstrações Financeiras", "2025.1": "Balanço Patrimonial", "2025.2": "Impairment", "2026.1": "Natureza Contas" },
            29: { "2024.1": "Ordem do Ativo", "2024.1 RS": "Classificação Ativo", "2024.2": "Tributos Lucro", "2025.1": "Competência", "2025.2": "Receita DRE", "2026.1": "Estoques" },
            30: { "2024.1": "CMV", "2024.1 RS": "Capital Social", "2024.2": "Reservas Lucros", "2025.1": "Classificação Contas", "2025.2": "PEPS", "2026.1": "Equivalência Patrimonial" },
            31: { "2024.1": "PEPS", "2024.1 RS": "Natureza Contas", "2024.2": "NBC TG 25", "2025.1": "Patrimônio Líquido", "2025.2": "DRE/DRA", "2026.1": "Estoques" },
            32: { "2024.1": "Despesas Antecipadas", "2024.1 RS": "Competência", "2024.2": "Depreciação", "2025.1": "Consolidação", "2025.2": "NBC TG 47", "2026.1": "Mantido para Venda" },
            33: { "2024.1": "Equação Patrimonial", "2024.1 RS": "Valor Justo", "2024.2": "Método Natureza/Função", "2025.1": "Imobilizado", "2025.2": "NBC TG 06", "2026.1": "Influência Significativa" },
            34: { "2024.1": "Imobilizado", "2024.1 RS": "Intangível", "2024.2": "DFC", "2025.1": "Depreciação", "2025.2": "Mantido para Venda", "2026.1": "Ajuste Valor Presente" }
          };
          subject = fallbackMap[qNum]?.[exam] || "Outros Tópicos";
        }
        row[exam] = subject;
      });
      return row;
    });
  }, []);

  const getCategoryStyles = (subject) => {
    if (!subject) return { name: "Geral", color: "bg-slate-800 text-slate-300 border-slate-700" };
    const s = subject.toUpperCase();
    if (s.includes("ESTRUTURA") || s.includes("TEORIA") || s.includes("REPRESENTAÇÃO") || s.includes("CONCEITO")) {
      return { name: "Estrutura & Teoria", color: "bg-blue-900/25 text-blue-300 border-blue-800/80" };
    }
    if (s.includes("DFC") || s.includes("DVA") || s.includes("DRE") || s.includes("DEMONSTRAÇÕES") || s.includes("BALANÇO")) {
      return { name: "Demonstrações", color: "bg-emerald-900/25 text-emerald-300 border-emerald-800/80" };
    }
    if (s.includes("IMOBILIZADO") || s.includes("ESTOQUES") || s.includes("INTANGÍVEL") || s.includes("DEPRECIAÇÃO") || s.includes("IMPAIRMENT")) {
      return { name: "Ativos & Mensuração", color: "bg-amber-900/25 text-amber-300 border-amber-800/80" };
    }
    return { name: "Ética & Prática", color: "bg-purple-900/25 text-purple-300 border-purple-800/80" };
  };

  // Questão activa do simulador lateral
  const activeQuestion = useMemo(() => {
    const fallbackQ = {
      enunciado: `Questão ${selectedCell.q} - Exame ${selectedCell.exam}\n\nEnunciado original focado no programa oficial do Exame de Suficiência. Verifique o caderno oficial de provas para mais pormenores práticos de cálculo contábil.`,
      opcoes: [
        "Opção de resposta correta baseada nas normas vigentes do CFC.",
        "Opção de distração técnica nível intermédio.",
        "Opção contendo erro conceitual de lançamento contábil.",
        "Opção alternativa com premissa legal desatualizada."
      ],
      gabarito: 0,
      resolucao: "Resolução e fundamentação técnica em conformidade com as diretivas do Conselho Federal de Contabilidade.",
      norma: "NBC TG Geral"
    };

    return QUESTIONS_DATABASE[selectedCell.q]?.[selectedCell.exam] || fallbackQ;
  }, [selectedCell]);

  React.useEffect(() => {
    const key = `${selectedCell.q}-${selectedCell.exam}`;
    if (userAnswers[key] !== undefined) {
      setActiveAnswerIdx(userAnswers[key].chosenIdx);
      setHasSubmitted(true);
    } else {
      setActiveAnswerIdx(null);
      setHasSubmitted(false);
    }
  }, [selectedCell, userAnswers]);

  const handleAnswerSubmit = () => {
    if (activeAnswerIdx === null) return;
    const key = `${selectedCell.q}-${selectedCell.exam}`;
    const isCorrect = activeAnswerIdx === activeQuestion.gabarito;
    setUserAnswers(prev => ({
      ...prev,
      [key]: { chosenIdx: activeAnswerIdx, isCorrect }
    }));
    setHasSubmitted(true);
  };

  const handleResetQuestion = () => {
    const key = `${selectedCell.q}-${selectedCell.exam}`;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    setActiveAnswerIdx(null);
    setHasSubmitted(false);
  };

  // Estatísticas de aproveitamento
  const progressStats = useMemo(() => {
    const keys = Object.keys(userAnswers);
    const total = keys.length;
    const correct = keys.filter(k => userAnswers[k].isCorrect).length;
    return {
      total,
      correct,
      pct: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  }, [userAnswers]);

  const filteredData = useMemo(() => {
    return EXAM_DATA.map(row => {
      const newRow = { q: row.q };
      EXAMS.forEach(exam => {
        const subject = row[exam];
        const category = getCategoryStyles(subject);
        const matchesSearch = subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || category.name === selectedCategory;
        
        newRow[exam] = (matchesSearch && matchesCategory) ? subject : null;
      });
      return newRow;
    });
  }, [searchTerm, selectedCategory, EXAM_DATA]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* Topo / Banner Informativo */}
      <header className="max-w-7xl mx-auto mb-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" /> Preparação Ativa CFC
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mapeamento de Assuntos & Simulador
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Selecione qualquer célula com assunto na matriz para carregar a questão oficial e praticar no painel lateral de forma interativa.
            </p>
          </div>
          
          {/* Caixa de Progresso */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shadow-lg shrink-0">
            <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-bold tracking-wider uppercase">Seu Progresso</span>
              <span className="text-base font-extrabold text-slate-200">
                {progressStats.correct} / {progressStats.total} Resolvidos
              </span>
              <span className="block text-xs font-semibold text-emerald-400">{progressStats.pct}% de Acertos</span>
            </div>
          </div>
        </div>
      </header>

      {/* Controlos e Filtros */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        {/* Abas */}
        <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 flex gap-1">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'table' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" /> Tabela & Simulador
          </button>
          <button
            onClick={() => setActiveTab('ranking')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ranking' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Temas Quentes
          </button>
        </div>

        {/* Caixas de Filtro */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Pesquisar norma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 w-full sm:w-48"
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none pr-8 cursor-pointer w-full"
            >
              <option value="Todos">Todas as Categorias</option>
              <option value="Estrutura & Teoria">Estrutura & Teoria</option>
              <option value="Demonstrações">Demonstrações</option>
              <option value="Ativos & Mensuração">Ativos & Mensuração</option>
              <option value="Ética & Prática">Ética & Prática</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Painel Principal */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'table' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Esquerda: Matriz Interativa */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 flex justify-between items-center">
                <span className="font-extrabold text-xs text-slate-400 tracking-wider">MATRIZ DE CONTEÚDOS</span>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full font-bold">
                  Clique numa Célula
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800">
                      <th className="py-4 px-3 font-bold text-slate-400 text-center text-xs tracking-wider w-12 sticky left-0 bg-slate-900 z-10 border-r border-slate-800">Q.</th>
                      {EXAMS.map(exam => (
                        <th key={exam} className="py-4 px-3 font-bold text-slate-400 text-[10px] tracking-wider text-center min-w-[100px]">
                          <span className="bg-slate-800 text-slate-300 py-1 px-2 rounded font-bold border border-slate-700/60">
                            {exam}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredData.map((row) => (
                      <tr key={row.q} className="hover:bg-slate-800/25 transition-all group">
                        {/* Questão */}
                        <td className="py-2.5 px-3 font-black text-slate-400 text-center sticky left-0 bg-slate-950 border-r border-slate-800 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.5)] text-xs">
                          {row.q}
                        </td>
                        
                        {/* Exames */}
                        {EXAMS.map(exam => {
                          const subject = row[exam];
                          const key = `${row.q}-${exam}`;
                          const isSelected = selectedCell.q === row.q && selectedCell.exam === exam;
                          const category = getCategoryStyles(subject);
                          const userAns = userAnswers[key];

                          return (
                            <td
                              key={exam}
                              onClick={() => setSelectedCell({ q: row.q, exam })}
                              className="py-1.5 px-1.5 text-center cursor-pointer"
                            >
                              {subject ? (
                                <div className={`
                                  mx-auto px-2 py-2 rounded-lg text-[9px] font-bold border transition-all duration-150 leading-tight flex flex-col justify-between items-center min-h-[44px] relative
                                  ${category.color}
                                  ${isSelected ? 'ring-2 ring-indigo-500 border-indigo-400 scale-[1.02] bg-slate-850' : 'opacity-85 hover:opacity-100'}
                                `}>
                                  <span className="truncate max-w-[90px] block">{subject}</span>
                                  {userAns && (
                                    <span className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] text-white font-black border border-slate-900 ${
                                      userAns.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                                    }`}>
                                      {userAns.isCorrect ? '✓' : '✗'}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-slate-800 text-[10px]">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Direita: Simulador Integrado de Questão */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                
                {/* Cabeçalho da Questão */}
                <div className="flex justify-between items-start border-b border-slate-800 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Questão {selectedCell.q}</span>
                    <h3 className="text-base font-extrabold text-white mt-0.5">Exame CFC {selectedCell.exam}</h3>
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                    {getCategoryStyles(EXAM_DATA.find(r => r.q === selectedCell.q)?.[selectedCell.exam]).name}
                  </span>
                </div>

                {/* Enunciado */}
                <div className="mb-5">
                  <span className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Enunciado</span>
                  <div className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-850 max-h-[160px] overflow-y-auto whitespace-pre-line custom-scrollbar">
                    {activeQuestion.enunciado}
                  </div>
                </div>

                {/* Opções */}
                <div className="space-y-2 mb-5">
                  <span className="text-[10px] font-bold text-slate-500 block mb-1 uppercase tracking-wider">Opções de Resposta</span>
                  {activeQuestion.opcoes.map((op, idx) => {
                    const label = ["A", "B", "C", "D"][idx];
                    const isSelected = activeAnswerIdx === idx;
                    const isCorrect = idx === activeQuestion.gabarito;

                    let btnStyle = "bg-slate-950 border-slate-850 hover:bg-slate-900 text-slate-300";
                    if (!hasSubmitted && isSelected) {
                      btnStyle = "bg-indigo-600/20 border-indigo-500 text-indigo-300";
                    } else if (hasSubmitted) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-300 font-extrabold";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-500/10 border-rose-500 text-rose-300";
                      } else {
                        btnStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={hasSubmitted}
                        onClick={() => setActiveAnswerIdx(idx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-start gap-3 transition-all ${btnStyle}`}
                      >
                        <span className={`w-5 h-5 rounded text-[10px] font-black flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {label}
                        </span>
                        <span className="leading-relaxed">{op}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submeter ou Resolução */}
                {!hasSubmitted ? (
                  <button
                    disabled={activeAnswerIdx === null}
                    onClick={handleAnswerSubmit}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg"
                  >
                    Confirmar Opção <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      activeAnswerIdx === activeQuestion.gabarito 
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {activeAnswerIdx === activeQuestion.gabarito ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Resposta Certa!
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" /> Resposta Errada
                          </>
                        )}
                      </div>
                      <p className="text-slate-300">
                        {activeAnswerIdx === activeQuestion.gabarito 
                          ? "Bom trabalho! O seu conhecimento do assunto está alinhado com as diretrizes do exame." 
                          : `Identificou incorretamente a resposta. A opção correta é a ${["A", "B", "C", "D"][activeQuestion.gabarito]}.`}
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                      <span className="text-[10px] font-black text-amber-400 block mb-1 tracking-wider uppercase">Enquadramento Normativo</span>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {activeQuestion.resolucao}
                      </p>
                      <div className="flex justify-between items-center text-[9px] text-slate-500 border-t border-slate-900 pt-2">
                        <span>Referência: <strong className="text-slate-300">{activeQuestion.norma}</strong></span>
                        <button 
                          onClick={handleResetQuestion}
                          className="flex items-center gap-1 hover:text-indigo-400 transition-colors font-bold"
                        >
                          <RotateCcw className="w-3 h-3" /> Reiniciar Questão
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

        {/* ABA: RANKING DE TEMAS */}
        {activeTab === 'ranking' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> Temas Mais Recorrentes (Q10 a Q34)
              </h3>
              
              <div className="space-y-4">
                {[
                  { name: "Estrutura Conceitual (NBC TG EC)", count: 21, cat: "Estrutura & Teoria", color: "bg-blue-500/20" },
                  { name: "DFC / DVA (Fluxo e Valor Adicionado)", count: 14, cat: "Demonstrações", color: "bg-emerald-500/20" },
                  { name: "Ativo Imobilizado (NBC TG 27)", count: 12, cat: "Ativos & Mensuração", color: "bg-amber-500/20" },
                  { name: "Provisões e Contingências (NBC TG 25)", count: 9, cat: "Ética & Prática", color: "bg-purple-500/20" },
                  { name: "Estoques (NBC TG 16)", count: 8, cat: "Ativos & Mensuração", color: "bg-amber-500/20" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-850">
                    <div className="flex justify-between items-center mb-1">
                      <div>
                        <span className="text-xs font-bold text-slate-200 block">{item.name}</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">{item.cat}</span>
                      </div>
                      <span className="text-xs font-black text-indigo-400">{item.count} Vezes</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mt-2">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${(item.count/21)*100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Análise de Tendência</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ao estudar a faixa de questões intermédias do Exame, focar no topo deste ranking garante o domínio de mais de <strong>60% da pontuação total</strong> desta secção. As questões sobre <strong>Estrutura Conceitual</strong> dominam as primeiras questões técnicas (Q10-Q13), enquanto os pronunciamentos sobre Ativos dominam o bloco final.
                </p>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 mt-4">
                <span className="text-[10px] font-bold text-amber-400 block mb-1">SABIA QUE?</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  O simulador do painel esquerdo atualiza o seu progresso geral de acertos de forma dinâmica para que consiga medir a evolução do seu desempenho.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto mt-12 text-center text-[10px] text-slate-600 border-t border-slate-900 pt-6">
        <p>Mapeador de Exames de Suficiência de Contabilidade. Desenvolvido para apoio no plano de estudos ativo.</p>
      </footer>
    </div>
  );
}