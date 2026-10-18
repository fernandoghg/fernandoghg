// Sätteri build-time plugin: preserve native table semantics and layout.
export const scrollableTables = {
  name: 'scrollable-tables',
  element: {
    filter: ['table'],
    visit(node, context) {
      context.wrapNode(node, {
        type: 'element',
        tagName: 'div',
        properties: { className: ['article-table-scroll'], tabIndex: 0 },
        children: [],
      });
    },
  },
};
