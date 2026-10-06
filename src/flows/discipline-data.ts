export type Weekday = 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex';

export type Discipline = {
  id: string;
  name: string;
  teacher: string;
  description: string;
  days: Weekday[];
  start: number;
  end: number;
  vacancies: number;
  period: '1º período' | '2º período';
  category: 'Design' | 'Programação' | 'Negócios' | 'Educação';
  image: string;
  illustration: number;
  /** Protótipo (E3): simula outra pessoa levando a última vaga no instante em que Marina confirma. */
  takenOnConfirm?: boolean;
};

export function scheduleLabel({ days, start, end }: Pick<Discipline, 'days' | 'start' | 'end'>) {
  return `${days.join('/')} · ${start}h-${end}h`;
}

// Quatro cartões usam o conteúdo visível no Figma; os outros quatro completam
// os oito exigidos pelo enunciado e são dados demonstrativos do protótipo.
export const disciplines: Discipline[] = [
  { id: 'ucd', name: 'User Centered Design', teacher: 'Cláudia Ribeiro', description: 'Fundamentos de pesquisa e desenho centrados na pessoa usuária, da entrevista ao protótipo testável.', days: ['Seg', 'Qua'], start: 8, end: 12, vacancies: 6, period: '1º período', category: 'Design', image: 'discipline-ucd.png', illustration: 0 },
  { id: 'dataviz', name: 'Dataviz', teacher: 'Fábio Assis', description: 'Como transformar dados em gráficos e painéis que respondem perguntas de negócio com clareza.', days: ['Ter', 'Qui'], start: 10, end: 12, vacancies: 1, period: '1º período', category: 'Design', image: 'discipline-dataviz.png', illustration: 2, takenOnConfirm: true },
  { id: 'research', name: 'Pesquisa com Usuário', teacher: 'Gustavo Barbosa', description: 'Métodos qualitativos e quantitativos para entender comportamento e validar hipóteses de produto.', days: ['Sex'], start: 8, end: 12, vacancies: 9, period: '1º período', category: 'Design', image: 'discipline-research.png', illustration: 4 },
  { id: 'programming', name: 'Fundamentos de Programação', teacher: 'Cláudia Ribeiro', description: 'Lógica, estruturas de dados básicas e as primeiras linhas de código em um projeto real.', days: ['Seg', 'Qua'], start: 14, end: 18, vacancies: 12, period: '1º período', category: 'Programação', image: 'discipline-four.png', illustration: 3 },
  { id: 'web', name: 'Desenvolvimento Web', teacher: 'Rafael Lima', description: 'HTML, CSS e JavaScript para construir e publicar uma interface web do zero.', days: ['Ter', 'Qui'], start: 18, end: 22, vacancies: 8, period: '2º período', category: 'Programação', image: 'discipline-four.png', illustration: 1 },
  { id: 'business', name: 'Modelos de Negócio', teacher: 'Mariana Costa', description: 'Como estruturar e testar a viabilidade de um modelo de negócio antes de escalar.', days: ['Seg', 'Qua'], start: 14, end: 18, vacancies: 11, period: '2º período', category: 'Negócios', image: 'discipline-dataviz.png', illustration: 2 },
  { id: 'learning', name: 'Tecnologias da Educação', teacher: 'Renata Alves', description: 'Ferramentas digitais aplicadas ao ensino e ao design de experiências de aprendizagem.', days: ['Ter', 'Qui'], start: 10, end: 12, vacancies: 7, period: '2º período', category: 'Educação', image: 'discipline-research.png', illustration: 3 },
  { id: 'methods', name: 'Métodos de Pesquisa', teacher: 'Gustavo Barbosa', description: 'Planejamento e condução de pesquisas acadêmicas e aplicadas, da pergunta ao relatório.', days: ['Sex'], start: 14, end: 18, vacancies: 5, period: '2º período', category: 'Educação', image: 'discipline-ucd.png', illustration: 4 },
];

/**
 * Agenda fixa de Marina (o que ela já cursa), inventada para demonstrar o choque de
 * horário exigido em T2. "Cálculo I" colide de propósito com Fundamentos de Programação
 * (Seg/Qua 14h-18h vs. 14h-16h) — ver `docs/decisoes.md`.
 */
export const enrolledSchedule: { name: string; days: Weekday[]; start: number; end: number; room: string; topic: string }[] = [
  { name: 'Cálculo I', days: ['Seg', 'Qua'], start: 14, end: 16, room: 'B-204', topic: 'Aula 7 · Limites laterais' },
  { name: 'Inglês Instrumental', days: ['Ter'], start: 8, end: 10, room: 'A-110', topic: 'Leitura de abstracts' },
];

/** Início e Agenda (decisão 17): "hoje" fixo na segunda para a demonstração ter sempre aula no dia; prazo da matrícula é demonstrativo. */
/**
 * Limite de créditos (decisão 26, dados demonstrativos): 1 crédito = 2 horas semanais, e o teto vale para o semestre
 * inteiro, contando o que a Marina já cursa (3 créditos) mais a seleção. O Confirmar bloqueia acima do limite.
 */
export const CREDIT_LIMIT = 12;

export function creditsOf({ days, start, end }: { days: Weekday[]; start: number; end: number }) {
  return ((end - start) * days.length) / 2;
}

export const enrolledCredits = enrolledSchedule.reduce((total, block) => total + creditsOf(block), 0);

/** Créditos do semestre: o que já está matriculado mais as disciplinas informadas. */
export function totalCredits(items: { days: Weekday[]; start: number; end: number }[]) {
  return enrolledCredits + items.reduce((total, item) => total + creditsOf(item), 0);
}

export const WEEKDAYS: Weekday[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
export const DEMO_TODAY: Weekday = 'Seg';
export const ENROLLMENT_DAYS_LEFT = 3;

type Busy = { days: Weekday[]; start: number; end: number };

export function overlaps(a: Busy, b: Busy) {
  return a.days.some(day => b.days.includes(day)) && a.start < b.end && a.end > b.start;
}

/** Choque contra a agenda fixa da Marina e, opcionalmente, contra outras disciplinas ainda no carrinho (`extra`). */
export function hasConflict(discipline: Busy, extra: Busy[] = []) {
  return [...enrolledSchedule, ...extra].some(block => overlaps(discipline, block));
}

export const teacherBios: Record<string, string> = {
  'Cláudia Ribeiro': 'Product designer há 10 anos, também leciona programação para quem vem de outras áreas.',
  'Fábio Assis': 'Analista de dados focado em visualização e storytelling com dados.',
  'Gustavo Barbosa': 'Pesquisador de UX com passagens por academia e mercado, orienta TCCs de pesquisa.',
  'Rafael Lima': 'Desenvolvedor front-end, ensina a primeira interface web de quem está começando.',
  'Mariana Costa': 'Consultora de novos negócios e professora de empreendedorismo.',
  'Renata Alves': 'Especialista em tecnologia educacional e formação de professores.',
};

export type Teacher = { role: string; years: number; rating: number; areas: string[]; education: string; photo: string };

// Dados fictícios do protótipo (não vêm do Figma): só a bio existia antes. Fotos: banco de imagens pravatar.cc, salvas em public/assets (build offline não usa CDN).
export const teachers: Record<string, Teacher> = {
  'Cláudia Ribeiro': { role: 'Product designer', years: 10, rating: 4.9, areas: ['Design', 'Programação'], education: 'Design — USP', photo: 'teacher-claudia-ribeiro.jpg' },
  'Fábio Assis': { role: 'Analista de dados', years: 8, rating: 4.8, areas: ['Design'], education: 'Estatística — Unicamp', photo: 'teacher-fabio-assis.jpg' },
  'Gustavo Barbosa': { role: 'Pesquisador de UX', years: 12, rating: 4.7, areas: ['Design', 'Educação'], education: 'Psicologia — PUC-SP', photo: 'teacher-gustavo-barbosa.jpg' },
  'Rafael Lima': { role: 'Desenvolvedor front-end', years: 9, rating: 4.8, areas: ['Programação'], education: 'Ciência da Computação — UFMG', photo: 'teacher-rafael-lima.jpg' },
  'Mariana Costa': { role: 'Consultora de negócios', years: 11, rating: 4.6, areas: ['Negócios'], education: 'Administração — FGV', photo: 'teacher-mariana-costa.jpg' },
  'Renata Alves': { role: 'Especialista em tecnologia educacional', years: 14, rating: 4.9, areas: ['Educação'], education: 'Pedagogia — UFRJ', photo: 'teacher-renata-alves.jpg' },
};

export const creditsLabel = (n: number) => `${n} ${n === 1 ? 'crédito' : 'créditos'}`;
