export const highlightCode = (code: string) => {
  // Sanitización básica
  let html = code
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')

  // Definición de colores basada en tu estética Nexus
  const tokens = [
    {
      name: 'comment',
      regex: /(\/\/.*|#.*)/g,
      class: 'text-gray-500 italic',
    },
    {
      name: 'string',
      regex: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
      class: 'text-emerald-400',
    },
    {
      name: 'keyword',
      regex:
        /\b(import|from|const|await|for|process|return|let|var|async|function|def|in|if|print)\b/g,
      class: 'text-purple-400',
    },
    { name: 'number', regex: /\b(\d+)\b/g, class: 'text-amber-400' },
    {
      name: 'method',
      regex: /\.\b([a-z0-9_]+)(?=\()/gi,
      class: 'text-blue-400',
    },
    {
      name: 'curl',
      regex: /\b(curl|-X|-H|-d)\b/g,
      class: 'text-purple-300 font-medium',
    },
  ]

  const store: string[] = []
  tokens.forEach((t) => {
    html = html.replace(t.regex, (m) => {
      const id = `__TK_${store.length}__`
      store.push(`<span class="${t.class}">${m}</span>`)
      return id
    })
  })
  store.forEach((content, i) => (html = html.replace(`__TK_${i}__`, content)))
  return html
}
