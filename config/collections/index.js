// default (en) docs
export const getDocs = collection => {
  return collection.getFilteredByGlob('./src/docs/**/*.md');
};

/** All docs from all locales as a collection. */
export const allDocs = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags
      .filter(tag => !['all-docs', 'all'].includes(tag))
      .forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

