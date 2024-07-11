function transform({ document, params }) {
  const potentialBlocks = {};
  [...document.querySelectorAll('.ups-component')].forEach((block) => {
    const blockName = block.classList[1];
    if (blockName) {
      const blockVariants = potentialBlocks[blockName] || [];
      // this assumes the first class is always `ups-component`
      // and the second class is always the component name
      [...block.classList].slice(2).forEach((className) => {
        if (!blockVariants.includes(className)) {
          blockVariants.push(className);
        }
      });
      potentialBlocks[blockName] = blockVariants;
    }
  });

  return [{
    path: new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.page$/, '').toLowerCase(),
    report: {
      title: document.title,
      potentialBlocks,
    },
  }];
}

export default {
  transform,
};
