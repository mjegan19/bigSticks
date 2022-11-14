import api from "./api";

// MAIN API Axios Methods
// GET Request
function get() {
  return api.get('/api/card');
}

// GET BY ID Request
function getById(id) {
  return api.get('/api/card/' + id);
}

// POST Request
function post(data) {
  const formData = prepareFormData(data);
  return api.post(
    '/api/card',
    formData,
    formConfig
  )
}

// PUT - Edit Existing Card Data
function put(id, data, uploadedfile) {
  const formData = prepareFormData(data, uploadedfile)
  return api.put(
    '/api/card/' + id,
    formData,
    formConfig
  )
}

// DELETE  - Remove Existing Card Data
function del(id) {
  return api.delete('/api/card/' + id);
}


// REFACTORED VARIABLES/FUNCTIONS
// 1. Form Config Headers
const formConfig = {
  headers: {
    'content-type': 'multipart/form-data'
  }
}

// 2. Structuring the Form Data
function prepareFormData(data, uploadedfile) {
  let formData = new FormData();

  // Append reconfigured mixed data to the new object
  formData.append('year', data.year);
  formData.append('manufacturer', data.manufacturer);
  formData.append('playerName', data.playerName);
  formData.append('teamName', data.teamName);
  formData.append('competition', data.competition);
  formData.append('cardNo', data.cardNo);
  formData.append('setTotal', data.setTotal);
  formData.append('description', data.description);
  formData.append('description', data.description);
  formData.append('condition', data.condition);
  formData.append('rarity', data.rarity);
  formData.append('value', data.value);
  formData.append('image', data.image);
  if(uploadedfile) {
    formData.append('uploadedFile', uploadedfile);
  }

  return formData;
}

// [3] Create Uploaded File Name from downloadURL
function getFileFromUrl(downloadURL) {
  const baseURL = `https://firebasestorage.googleapis.com/v0/b/${process.env.REACT_APP_STORAGE_BUCKET_URL}/o/`;
  console.log(baseURL);

  // (i) Remove baseURL from downloadURL
  let fileGlob = downloadURL.replace(baseURL, "");

  // (ii) Remove everything after "?"
  const indexOfEndPath = fileGlob.indexOf("?");
  fileGlob = fileGlob.substring(0, indexOfEndPath);

  // Return existing uploaded file
  console.log(`Generated File Glob: ${fileGlob}`);
  return fileGlob;
}

const cardRequest = {
  get,
  post,
  getById,
  put,
  del,
  getFileFromUrl
}

export default cardRequest;