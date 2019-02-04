import axios from 'axios';
export const uploadFile = async (file = null, uuid = null) => {
  if (!file || !uuid) {
    return [];
  }
  let formData = new FormData();
  formData.append('file', file);

  return axios({
<<<<<<< HEAD
    url: 'http://127.0.0.1:5000/api/parser',
=======
    url: 'https://ezplanner-flask-api.herokuapp.com/api/parser',
>>>>>>> a075f8a6d530f82287036f4ee11f0ad51687c2f6
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: formData,
    params: {
      uuid
    }
  });
};
