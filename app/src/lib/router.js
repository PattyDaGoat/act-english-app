// Tiny hash-based router. Routes are functions returning DOM nodes.
const routes = new Map();

export const router = {
  register(path, handler) { routes.set(path, handler); },
  start() {
    window.addEventListener('hashchange', render);
    window.addEventListener('popstate', render);
    render();
  }
};

function currentPath() {
  const h = window.location.hash || '#/';
  const [path, query] = h.slice(1).split('?');
  return { path: path || '/', query: parseQuery(query) };
}

function parseQuery(q) {
  const out = {};
  if (!q) return out;
  for (const pair of q.split('&')) {
    const [k, v] = pair.split('=');
    out[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
  }
  return out;
}

export function navigate(path, query) {
  let url = '#' + path;
  if (query) {
    const qs = Object.entries(query)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    url += '?' + qs;
  }
  window.location.hash = url;
}

export function getQuery() {
  return currentPath().query;
}

function render() {
  const { path } = currentPath();
  const handler = routes.get(path) || routes.get('/');
  const root = document.getElementById('app');
  const node = handler();
  root.replaceChildren(node);
  window.scrollTo(0, 0);
}
