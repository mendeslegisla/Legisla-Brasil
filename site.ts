/**
 * Conteúdo do site da Legisla Brasil, num lugar só.
 *
 * Regras:
 * - Nunca invente dados. O que a equipe ainda não confirmou fica entre [colchetes];
 *   `npm run check:launch` lista tudo o que falta antes de publicar.
 * - Um número, uma fonte: os números de impacto ficam em STATS e todas as páginas leem daqui.
 */

export const SITE = {
  name: "Legisla Brasil",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://legislabrasil.org",
  description:
    "Organização suprapartidária e sem fins lucrativos que fortalece mandatos, partidos e quem trabalha nos bastidores do Legislativo.",
  email: "falecom@legislabrasil.org",
  whatsapp: { label: "+55 11 4210-6228", href: "https://wa.me/551142106228" },
  press: { name: "Contê", email: "imprensa@contecomunica.com.br", phone: "(11) 9 1606-0062" },
  pix: "[CHAVE PIX DA LEGISLA]",
  paypal: "https://www.paypal.com/donate/?hosted_button_id=NETWPDYY2HHEJ",
  conduct: "https://drive.google.com/file/d/1UHzUBICkFJvuZts7Oot9zyj7NMsJe3dd/view",
  responseDays: "[X]",
  social: {
    instagram: "https://www.instagram.com/legisla.brasil/",
    linkedin: "https://www.linkedin.com/company/legislabrasil/",
    facebook: "https://www.facebook.com/legisla.brasil/",
  },
};

/** Números oficiais: troque aqui e o site inteiro acompanha. */
export const STATS = {
  mandatos: "[nº]",
  partidos: "[nº]",
  comunidade: "[nº]",
  fundacao: "2017",
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

export const NAV: NavItem[] = [
  { label: "Para mandatos", href: "/mandatos/" },
  { label: "Para partidos", href: "/partidos/" },
  { label: "Comunidade", href: "/comunidade/" },
  {
    label: "Publicações",
    href: "/publicacoes/",
    children: [
      { label: "Pesquisas e guias", href: "/publicacoes/" },
      { label: "Legisla na mídia", href: "/na-midia/" },
    ],
  },
  {
    label: "Sobre nós",
    href: "/quem-somos/",
    children: [
      { label: "Quem somos", href: "/quem-somos/" },
      { label: "Equipe e governança", href: "/equipe/" },
      { label: "Redes e parceiros", href: "/parceiros/" },
      { label: "Transparência", href: "/transparencia/" },
      { label: "Contato", href: "/contato/" },
    ],
  },
];

export type Program = { title: string; text: string; status: string; open: boolean | null; link: string; href: string };

export const PROGRAMS: Program[] = [
  { title: "Programa Lideranças Legislativas", text: "Imersão presencial de 2 dias e 4 meses de mentoria para chefias de gabinete.", status: "Inscrições encerradas", open: false, link: "Lista de espera", href: "/programa-pll/" },
  { title: "Programa Nossas Excelências", text: "O primeiro programa do país voltado a lideranças partidárias.", status: "[Status da edição]", open: null, link: "Conhecer o NEx", href: "/programa-nex/" },
  { title: "Sherpas", text: "Formação de 2 a 3 anos, com mentorias, para membros da Comunidade Legisla.", status: "[Próxima seleção]", open: null, link: "Como participar", href: "/comunidade/" },
];

export type Motif = "hemiciclo" | "congresso" | "rede" | "documento";
export type Publication = { type: string; title: string; text: string; label: string; href: string; tone: "vinho" | "tinta" | "coral" | "papel"; motif: Motif };

export const PUBLICATIONS: Publication[] = [
  { type: "Pesquisa, 2026", title: "Juventudes e Participação Partidária", text: "A relação entre as novas gerações e os partidos: caminhos, barreiras, oportunidades e recomendações para ampliar a participação jovem.", label: "Baixar a pesquisa", href: "https://legislabrasil.org/wp-content/uploads/2026/08/Pesquisa-Juventudes.pdf", tone: "vinho", motif: "hemiciclo" },
  { type: "Guia", title: "Boas Práticas para um Legislativo Antirracista", text: "As recomendações da pesquisa sobre assessores negros transformadas em práticas de equidade racial para mandatos, partidos e Casas Legislativas.", label: "Acessar o guia", href: "https://legislabrasil.org/guia-de-boas-praticas-para-um-legislativo-antirracista/", tone: "tinta", motif: "documento" },
  { type: "Pesquisa", title: "Trajetória de Assessores Negros no Congresso Nacional", text: "Desafios, barreiras e resistências de assessores negros nos bastidores da política, em parceria com o Movimento Mulheres Negras Decidem.", label: "Acessar a pesquisa", href: "https://docs.google.com/forms/d/e/1FAIpQLSedrI79rhEqlhJB79isjV5wwmq5tUY2hUnOsXJ8Lx2V04UmZA/viewform", tone: "coral", motif: "rede" },
  { type: "Metodologia", title: "Gabinetes de Impacto Positivo (GIP)", text: "Preditores de sucesso para orientar decisões, definir prioridades e ampliar a capacidade de atuação dos mandatos.", label: "Acessar o GIP", href: "https://legislabrasil.org/gip/", tone: "papel", motif: "congresso" },
  { type: "Ferramenta de dados", title: "Índice Legisla Brasil", text: "Monitora a produtividade dos deputados federais em quatro eixos: produção legislativa, mobilização, fiscalização e alinhamento partidário.", label: "Consultar o Índice", href: "https://legislabrasil.org/conhecimento/", tone: "vinho", motif: "hemiciclo" },
  { type: "Relatório", title: "500 dias de mandato", text: "Um retrato da Câmara dos Deputados nos primeiros 500 dias da legislatura, a partir dos dados do Índice Legisla.", label: "Ler o relatório", href: "https://legislabrasil.org/500-dias-legisla-brasil/", tone: "tinta", motif: "documento" },
  { type: "Guia", title: "Regimento Externo", text: "Tudo o que o Regimento Interno não mostra: caminhos para tirar do papel as promessas de campanha e articular nas Casas Legislativas.", label: "Baixar o Regimento Externo", href: "https://drive.google.com/file/d/1GAJt_ZhFKOBACWi1E5h35vGu9qe5NOJf/view", tone: "coral", motif: "rede" },
  { type: "Guia", title: "Guia de Diversidade", text: "Informações e ferramentas para criar uma cultura acolhedora e inclusiva no mandato, e para recrutar e desenvolver profissionais diversos.", label: "Acessar o guia", href: "https://legislabrasil.org/guia-de-diversidade/", tone: "papel", motif: "congresso" },
];

export type MediaItem = { tag: string; title: string; href: string; source: string };

export const MEDIA: { artigos: MediaItem[]; imprensa: MediaItem[] } = {
  artigos: [
    { tag: "Artigo", title: "Por que elegemos poucos jovens?", href: "https://www.correiobraziliense.com.br/opiniao/2026/08/amp/7476246-por-que-elegemos-poucos-jovens.html", source: "Fernando Moura, Correio Braziliense" },
    { tag: "Coluna", title: "Da representatividade à influência: o papel das massas críticas no Legislativo", href: "https://www.congressoemfoco.com.br/coluna/120738/o-papel-das-massas-criticas-no-legislativo", source: "Fernando Moura, Congresso em Foco" },
    { tag: "Artigo", title: "As eleições legislativas e os bastidores da disputa", href: "https://www.congressoemfoco.com.br/artigo/118149/as-eleicoes-legislativas-e-os-bastidores-da-disputa", source: "Fernando Moura, Congresso em Foco" },
    { tag: "Artigo", title: "Por que investimos nos nossos craques do futebol, mas não em formar bons políticos?", href: "https://www.congressoemfoco.com.br/artigo/117208/por-que-nao-investimos-em-formar-bons-politicos", source: "Fernando Moura, Congresso em Foco" },
  ],
  imprensa: [
    { tag: "Reportagem", title: "Candidato jovem tem menos recurso e mais dificuldade de se eleger, aponta estudo", href: "https://valor.globo.com/politica/eleicoes-2026/noticia/2026/08/10/candidato-jovem-tem-menos-recurso-e-mais-dificuldade-de-se-eleger-aponta-estudo.ghtml", source: "Valor Econômico" },
    { tag: "Reportagem", title: "Falta de recursos e estrutura de campanha trava eleição de jovens, diz pesquisa", href: "https://www.jota.info/eleicoes/eleicoes-2026/falta-de-recursos-e-estrutura-de-campanha-trava-eleicao-de-jovens-diz-pesquisa", source: "Jota" },
  ],
};

export type Person = { name: string; role: string; bio?: string; linkedin?: string };

export const TEAM: Person[] = [
  { name: "Fernando Moura", role: "Diretor executivo", linkedin: "https://www.linkedin.com/in/fernandohmoura/", bio: "Mais de 10 anos no terceiro setor, com passagens por TETO e ActionAid, e experiência como assessor parlamentar na Alesp. Mestre em Administração Pública pela Universidade Columbia." },
  { name: "Lana Faria", role: "Diretora de operações", linkedin: "https://www.linkedin.com/in/lana-faria-09412210b/", bio: "Graduada em Administração Pública pela Unicamp, atua no desenho de estratégias políticas e em inovação legislativa." },
  { name: "Ana Carolina Carvalho", role: "Coordenadora de formação política", linkedin: "https://www.linkedin.com/in/anacarolinacomunica/", bio: "Mestra em Inovação em Comunicação, tem mais de 20 anos de experiência em campanhas, gabinetes parlamentares e secretarias de estado." },
  { name: "Matheus Miranda", role: "[Cargo a confirmar]", bio: "Formado em Relações Internacionais pela USP, com residência acadêmica na Stellenbosch University. Atua em captação de recursos e parcerias estratégicas." },
  { name: "Ana Clara Alves", role: "Coordenadora de estratégia política", linkedin: "https://www.linkedin.com/in/anaclaraalvessilva", bio: "Advogada especialista em Direito Eleitoral. Foi assessora legislativa na Câmara dos Deputados e coordenadora jurídica no legislativo municipal." },
  { name: "João Lucas Ribeiro", role: "Coordenador de equidade racial", linkedin: "https://www.linkedin.com/in/jo%C3%A3olucasribeiro/", bio: "Consultor político e advogado, especialista em Direito Legislativo. Atua em campanhas desde 2016 e foi assessor parlamentar." },
  { name: "Alana Portes", role: "Coordenadora de aprendizagem", linkedin: "https://www.linkedin.com/in/alana-portes-0362a82b0", bio: "Especialista em Direitos Humanos e Políticas Públicas e mestra em Educação. Foi assessora legislativa nas esferas federal e municipal." },
  { name: "Francisco Alvares", role: "Gerente de mandatos", linkedin: "https://www.linkedin.com/in/francisco-santos-alvares/", bio: "Gestor público pela FGV, lidera o trabalho com mandatos e o desenvolvimento de soluções com inteligência artificial." },
  { name: "Marina Frota", role: "Gerente de comunidade", linkedin: "https://br.linkedin.com/in/marina-frota-24a064128", bio: "Tem 15 anos de experiência em gestão de projetos e voluntariado. Foi diretora da organização Atados." },
  { name: "Synthya Maia", role: "Gestora de conhecimento", bio: "Advogada e doutoranda em Sociologia pela UnB, com experiência em análise de dados e monitoramento de impacto de políticas públicas." },
  { name: "Gabriela Lima", role: "Analista de engajamento da comunidade", bio: "Graduada em Relações Internacionais, atua com comunicação estratégica e articulação de redes." },
  { name: "Lucas Mendes", role: "Analista de criação", bio: "Publicitário e designer gráfico, foi diretor de arte e de criação em mandatos na CLDF e no Senado Federal." },
  { name: "Pedro Brandine", role: "Assistente de experiência do usuário", linkedin: "https://br.linkedin.com/in/pedro-brandine", bio: "Graduando em Administração Pública pela Unesp, apoia a equipe de operações com análise de dados e automação de processos." },
  { name: "Márcio Rocha", role: "Assistente de captação", linkedin: "https://br.linkedin.com/in/m%C3%A1rciorocha", bio: "Estudante de Relações Internacionais na UFABC e pesquisador CNPq, atua no relacionamento institucional e em parcerias." },
];

export const FISCAL: Person[] = [
  { name: "César Fazano de Lucca", role: "Sócio de Fazano & De Lucca Advogados", linkedin: "https://www.linkedin.com/in/cesar-delucca/" },
  { name: "Classius Marques", role: "Diretor de Finanças, Controle e Desenvolvimento do Ecossistema da Fundação Lemann", linkedin: "https://www.linkedin.com/in/classius-marques-5867a8168/" },
];

export const CONSULTIVO: Person[] = [
  { name: "Luciana Elmais", role: "Fundadora e presidente do Conselho", linkedin: "https://www.linkedin.com/in/luciana-elmais-52b48ab5" },
  { name: "Marianna Sampaio", role: "Gestora pública e professora de Gestão e Políticas Públicas no Insper", linkedin: "https://www.linkedin.com/in/marianna-sampaio-46132a142/" },
  { name: "Pedro Telles", role: "Cofundador do Quid", linkedin: "https://www.linkedin.com/in/pedrortelles/" },
  { name: "Carolina Araujo", role: "Diretora associada e head de América Latina e Caribe da Delivery Associates" },
  { name: "Sergio Fausto", role: "Diretor geral da Fundação Fernando Henrique Cardoso", linkedin: "https://www.linkedin.com/in/sergio-fausto/" },
  { name: "Bruna Barros", role: "Skoll Fellow", linkedin: "https://www.linkedin.com/in/brunahelenabarros/" },
];

export type Partner = { name: string; about: string; href?: string };

export const SUPPORTERS: Partner[] = [
  { name: "Fundação Lemann", about: "[Uma linha sobre o apoio]", href: "https://fundacaolemann.org.br" },
  { name: "Open Society Foundations", about: "[Uma linha sobre o apoio]", href: "https://www.opensocietyfoundations.org" },
  { name: "Instituto Ibirapitanga", about: "[Uma linha sobre o apoio]", href: "https://www.ibirapitanga.org.br" },
  { name: "VélezReyes+", about: "[Uma linha sobre o apoio]" },
  { name: "Instituto Galo da Manhã", about: "[Uma linha sobre o apoio]" },
  { name: "Instituto Betty Jacob Lafer", about: "[Uma linha sobre o apoio]" },
];

export const NETWORKS: Partner[] = [
  { name: "Movimento Mulheres Negras Decidem", about: "Parceiro na pesquisa Trajetória de Assessores Negros no Congresso Nacional." },
  { name: "Bem-Te-Vi Diversidade", about: "[Uma linha sobre a parceria]" },
  { name: "[Nome do parceiro]", about: "[Uma linha sobre a parceria]" },
];

export type Doc = { year: string; title: string; href: string; note: string };

export const IMPACT_REPORTS: Doc[] = [
  { year: "2025", title: "Relatório de Impacto 2025", href: "https://legislabrasil.org/wp-content/uploads/2026/07/Relatorio-de-Impacto-2025_LegislaBrasil_.pdf", note: "PDF" },
  { year: "2025", title: "2025 Activity Report (em inglês)", href: "https://legislabrasil.org/wp-content/uploads/2026/07/2025-Activity-Report.pdf", note: "PDF" },
  { year: "2024", title: "Relatório de Impacto 2024", href: "https://legislabrasil.org/wp-content/uploads/2025/04/RELATORIO-IMPACTO-2024.pdf", note: "PDF" },
  { year: "2023", title: "Relatório de Impacto 2023", href: "https://drive.google.com/file/d/162YmTpmOXcGPwlMcPpbMPwwhro4NP44a/view", note: "PDF" },
  { year: "2022", title: "Relatório de Impacto 2022", href: "https://drive.google.com/file/d/1RKa3AWp_v5_fMBZpqK6qEc25SehutFxm/view", note: "PDF" },
  { year: "2018", title: "Relatório de Impacto 2018", href: "https://drive.google.com/file/d/1eHsaQ1obgbO7152jOQ87yWseHbkPN42V/view", note: "PDF" },
];

export const AUDITS: Doc[] = [
  { year: "2024", title: "Relatório de Auditoria 2024", href: "https://legislabrasil.org/wp-content/uploads/2026/05/Relatorio-Auditoria-2024.pdf", note: "PDF" },
  { year: "2023", title: "Relatório de Auditoria 2023", href: "https://drive.google.com/file/d/1XHtRtTCWryxc67kPomM3xQBYiq_TJ9jI/view", note: "PDF" },
  { year: "2022", title: "Relatório de Auditoria 2022", href: "https://legislabrasil.org/wp-content/uploads/2024/02/Caderno-Digital-Rel.Auditoria-Demonstracoes-Contabeis-Notas-Explicativas-2022-X-2021.pdf", note: "PDF" },
  { year: "2021", title: "Relatório de Auditoria 2021", href: "https://legislabrasil.org/wp-content/uploads/2024/02/Relatorio-auditoria-2021-pdf.pdf", note: "PDF" },
  { year: "2020", title: "Relatório de Auditoria 2020", href: "https://legislabrasil.org/wp-content/uploads/2024/02/Relatorio-Auditoria-2020.pdf", note: "PDF" },
];

export const TIMELINE = [
  { year: "2017", title: "A Legisla nasce", text: "Fundada informalmente em agosto por Luciana Elmais, Caio Rolim e Ana Kuntz." },
  { year: "2018", title: "Registro oficial", text: "Em abril, a organização é oficialmente registrada." },
  { year: "2021", title: "Programa O2", text: "O Oxigenando a política brasileira passa a selecionar profissionais para levar mais diversidade às Casas Legislativas." },
  { year: "2022", title: "Índice Legisla Brasil e NEx", text: "Lançamos a primeira avaliação não ideológica do trabalho parlamentar e o primeiro programa para lideranças partidárias do país." },
  { year: "2024", title: "Eleições municipais mais inclusivas", text: "Uma edição do NEx reúne 30 lideranças partidárias com esse foco." },
  { year: "2026", title: "Juventudes, NEGRA e 5ª edição do PLL", text: "Pesquisa sobre jovens e partidos, formação de lideranças de setoriais de negritude e a 5ª edição do Programa Lideranças Legislativas." },
];

export type Testimonial = { text: string; name: string; role: string };

export const COMMUNITY_QUOTES: Testimonial[] = [
  { text: "O curso realizado em São Paulo abriu um novo mundo para mim.", name: "Thainá do Prado Braz", role: "Assessora parlamentar da vereadora Lívia Macedo, Pouso Alegre (MG)" },
  { text: "Fazer parte da comunidade da Legisla BR foi um marco na minha trajetória profissional.", name: "Elaine Gontijo", role: "Chefe de gabinete do senador Alessandro Vieira" },
  { text: "Uma oportunidade transformadora para a realidade política da Região Norte do Brasil.", name: "Otávio Monteiro Benjó de Filpo", role: "Chefe de gabinete do vereador Jorge Vaz, Belém (PA)" },
  { text: "Estar na Comunidade Legisla é escolher legislar com propósito, responsabilidade e afeto com os pés no chão e os olhos voltados para um futuro mais digno para todas as pessoas.", name: "Valneide Nascimento dos Santos Nascimento", role: "Secretária Nacional da Negritude Socialista Brasileira do PSB" },
];

export const MANDATE_QUOTES: Testimonial[] = [
  { text: "A Legisla Brasil foi essencial para estruturarmos nosso mandato com clareza estratégica, eficiência e foco em resultados.", name: "Gisela Simona", role: "[Cargo, partido e UF]" },
  { text: "Um mandato bem planejado é um mandato que consegue responder com mais agilidade aos desafios, fiscalizar com mais eficiência e propor soluções que realmente impactem a vida das pessoas.", name: "Lohanna", role: "PV-MG" },
];

export type Faq = { q: string; a: string };
