import actions from '../actions';

export const fileUploadCreator = (file, UUID) => async dispatch => {
  dispatch({
    type: actions.FILE_UPLOADING
  });
};
