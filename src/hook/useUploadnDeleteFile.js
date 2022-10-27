import { useDispatch, useSelector } from 'react-redux';
import { reqDeleteFile, reqUploadFile } from 'redux/store/common/uploadFileSlice';

const useUploadnDeleteFile = () => {
  const { url } = useSelector((state) => ({ ...state.uploadFile }));
  const dispatch = useDispatch();

  const onUploadFile = (formData) => {
    dispatch(reqUploadFile(formData));
  };

  const onDeleteFile = (filename) => {
    dispatch(reqDeleteFile(filename));
  };

  return [url, onUploadFile, onDeleteFile];
};

export default useUploadnDeleteFile;
