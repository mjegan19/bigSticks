import api from "./api";

function getRarity() {
  return api.get('/api/rarity/terms');
}

function getCondition() {
  return api.get('/api/condition/terms');
}

const formRequest = {
  getRarity,
  getCondition
}

export default formRequest;