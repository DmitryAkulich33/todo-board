function parseItemId(id) {
  return Number(id.split('_')[1]);
}

function parseBoardId(id) {
  return id.split('_')[1].replace('-', ' ');
}

export { parseItemId, parseBoardId };
