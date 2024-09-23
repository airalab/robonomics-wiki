// docs
const getDocs = collection => {
  return collection.getFilteredByGlob('./src/docs/**/*.md');
};

const getRuDocs = collection => {
  return collection.getFilteredByGlob('./src/ru/docs/**/*.md');
};

const getZhDocs = collection => {
  return collection.getFilteredByGlob('./src/zh/docs/**/*.md');
};

/** All docs from all locales as a collection. */
const allDocs = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags
      .filter(tag => !['all-docs', 'all'].includes(tag))
      .forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

module.exports = {
  getDocs,
	getRuDocs,
	getZhDocs,
	allDocs,
};
