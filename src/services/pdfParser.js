import axios from 'axios';
export const uploadFile = async (file = null, uuid = null) => {
  if (!file || !uuid) {
    return [];
  }
  let formData = new FormData();
  formData.append('file', file);

  return axios({
    url: 'http://127.0.0.1:5000/api/parser',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: formData,
    params: {
      uuid
    }
  });
};
