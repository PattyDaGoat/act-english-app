// Tiny hyperscript-style DOM helper. h('div.cls', { onClick }, [children])
export function h(tag, props = {}, children = []) {
  if (Array.isArray(props)) { children = props; props = {}; }
  if (typeof props === 'string' || props instanceof Node) { children = [props]; props = {}; }

  let tagName = tag, classes = [];
  const dotIdx = tag.indexOf('.');
  if (dotIdx >= 0) {
    tagName = tag.slice(0, dotIdx) || 'div';
    classes = tag.slice(dotIdx + 1).split('.').filter(Boolean);
  }

  const el = document.createElement(tagName);
  if (classes.length) el.className = classes.join(' ');

  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class' || k === 'className') {
      el.className = (el.className ? el.className + ' ' : '') + v;
    } else if (k === 'style' && typeof v === 'object') {
      Object.assign(el.style, v);
    } else if (k.startsWith('on') && typeof v === 'function') {
      el.addEventListener(k.slice(2).toLowerCase(), v);
    } else if (k === 'html') {
      el.innerHTML = v;
    } else if (k in el && typeof v !== 'string') {
      el[k] = v;
    } else {
      el.setAttribute(k, v === true ? '' : v);
    }
  }

  appendChildren(el, children);
  return el;
}

function appendChildren(el, children) {
  if (!children) return;
  if (!Array.isArray(children)) children = [children];
  for (const c of children) {
    if (c == null || c === false) continue;
    if (Array.isArray(c)) appendChildren(el, c);
    else if (c instanceof Node) el.appendChild(c);
    else el.appendChild(document.createTextNode(String(c)));
  }
}

export function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
