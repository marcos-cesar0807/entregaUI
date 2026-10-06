const imagens = import.meta.glob('../../evidencias/**/*.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

/** Remove o `# Título` inicial do markdown de `docs/componentes`, já que o Storybook Docs mostra o próprio título do componente. */
export function docBody(markdown: string) {
  return markdown
    .replace(/^#\s.*\n/, '')
    // ../evidencias/x.png (caminho do repositório) → URL que o Vite serve
    .replace(/\(\.\.\/(evidencias\/[^)\s]+\.png)\)/g, (todo, caminho) => `(${imagens['../../' + caminho] ?? todo.slice(1, -1)})`);
}
