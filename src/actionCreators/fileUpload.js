import actions from '../actions';
import { uploadFile } from '../services/pdfParser';

export const fileUploadActionCreator = (file, uuid) => async dispatch => {
  dispatch({
    type: actions.FILE_UPLOADING
  });
  try {
    const response = await uploadFile(file, uuid);
    dispatch({
      type: actions.FILE_UPLOAD_SUCCEEDED,
      payload: await response.data
    });
  } catch (error) {
    dispatch({
      type: actions.FILE_UPLOAD_FAILED
    });
<<<<<<< HEAD
    console.log('ERROR IN FILE UPLOAD' + error);
=======
>>>>>>> a075f8a6d530f82287036f4ee11f0ad51687c2f6
  }
};
