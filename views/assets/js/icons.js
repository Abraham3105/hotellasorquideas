'use strict';
// Sustituye flechas tipográficas por trazos SVG, incluso en diálogos dinámicos.
(() => {
  const paths = {'↗':'M6 18 18 6M6 6h12v12','→':'M4 12h16m-6-6 6 6-6 6','←':'M20 12H4m6-6-6 6 6 6','↓':'M12 4v16m-6-6 6 6 6-6'};
  function replaceArrows(root) {
    const nodes = [];
    if (root.nodeType === Node.TEXT_NODE) nodes.push(root);
    else {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) nodes.push(walker.currentNode);
    }
    nodes.forEach(node => {
      if (!/[↗→←↓]/.test(node.textContent) || node.parentElement?.closest('script,style,svg,textarea,option')) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/([↗→←↓])/).forEach(part => {
        if (!paths[part]) { fragment.append(document.createTextNode(part)); return; }
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('class','ui-arrow'); svg.setAttribute('aria-hidden','true');
        const path = document.createElementNS(svg.namespaceURI,'path'); path.setAttribute('d',paths[part]); svg.append(path); fragment.append(svg);
      });
      node.replaceWith(fragment);
    });
  }
  replaceArrows(document.body);
  new MutationObserver(records => records.forEach(record => {
    if (record.type === 'characterData') replaceArrows(record.target);
    else record.addedNodes.forEach(node => replaceArrows(node));
  })).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
