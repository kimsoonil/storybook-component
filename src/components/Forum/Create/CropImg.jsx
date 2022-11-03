/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, forwardRef, useImperativeHandle, useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import 'react-image-crop/dist/ReactCrop.css';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        x: 50,
        y: 50,
        width: mediaWidth,
        height: mediaHeight
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function CropImg(props, ref) {
  const { imgType, cropWidth, cropHeight, errors, setErrors, forumInfo, setForumInfo } = props;
  const [imgSrc, setImgSrc] = useState('');
  const [eventType, setEventType] = useState('');
  const [originImg, setOriginImg] = useState({ bannerImg: '', thumbImg: '' });
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const { t } = useTranslation();

  const [crop, setCrop] = useState({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });
  const [completedCrop, setCompletedCrop] = useState();
  const scale = 1;
  const aspect = cropWidth / cropHeight;

  const onDrop = (acceptedFiles, fileRejections) => {
    // img preview
    if (acceptedFiles && acceptedFiles.length > 0) {
      setCrop(undefined);
      setOriginImg({ [imgType]: acceptedFiles[0].name });

      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result.toString() || '');
        setErrors({ ...errors, [imgType]: '' });
      });
      reader.readAsDataURL(acceptedFiles[0]);
    }

    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === 'file-too-large') {
          // setErrors({ ...errors, [imgType]: t('validation.forum.uploadfile.maxsize') });
          setErrors({ ...errors, [imgType]: 'Images cannot exceed 10mb.' });
        }

        if (err.code === 'file-invalid-type') {
          // setErrors({ ...errors, [imgType]: t('validation.forum.uploadfile.invalidfile') });
          setErrors({ ...errors, [imgType]: 'only the extensions jpg, gif, and png are allowed.' });
        }
      });
    });
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png', '.jpg', '.gif']
    },
    maxSize: 1024 * 1024 * 10
  });

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const onRemove = () => {
    setImgSrc('');
    setOriginImg('');
    if (eventType === imgType) {
      setForumInfo({ ...forumInfo, [imgType]: '', [`${imgType}_filename`]: '' });
    }
  };

  const onCreateBlob = () => {
    if (!canvasRef.current) return;
    // canvas를 blob 형태로 만들어서 이미지 업로드하기
    canvasRef.current.toBlob(
      (blob) => {
        if (eventType === imgType) {
          setForumInfo({ ...forumInfo, [imgType]: blob, [`${imgType}_filename`]: originImg[imgType] });
        }
      },
      'image/jpeg',
      0.95
    );
  };

  const createCanvas = () => {
    if (!completedCrop || !canvasRef.current || !imgRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    const newCrop = completedCrop;

    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    const pixelRatio = window.devicePixelRatio;

    canvasRef.current.width = newCrop.width * pixelRatio * scaleX;
    canvasRef.current.height = newCrop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      imgRef.current,
      newCrop.x * scaleX,
      newCrop.y * scaleY,
      newCrop.width * scaleX,
      newCrop.height * scaleY,
      0,
      0,
      newCrop.width * scaleX,
      newCrop.height * scaleY
    );
    onCreateBlob();
  };

  const onBrowseFile = () => {
    onRemove();
    open();
  };

  useImperativeHandle(ref, () => ({
    onBrowseFile: () => {
      console.log('test');
    }
  }));

  useEffect(() => {
    setEventType(imgType);
    createCanvas();
  }, [completedCrop]);

  return (
    <div className="App">
      <div className="Crop-Controls">
        {imgSrc ? (
          <div style={{ width: '1400px' }}>
            <span>
              <button type="button" onClick={onRemove}>
                X
              </button>
            </span>
            <span>
              <button type="button">Upload</button>
            </span>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              onDragEnd={() => onCreateBlob()}
              aspect={aspect}
              locked
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale})` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        ) : (
          <div {...getRootProps()} style={{ height: 200, border: '1px solid black' }}>
            <input {...getInputProps()} />
            {isDragActive ? <p>....</p> : <p>이미지를 드래그하거나 클릭하여 첨부해주세요.</p>}
          </div>
        )}
        <canvas ref={canvasRef} style={{ width: 0, height: 0 }} />
      </div>
      <span>
        <button type="button" onClick={() => onBrowseFile()}>
          Browse files
        </button>
      </span>
      {errors[imgType] && (
        <span className="error_msg msg" id="input_error">
          {errors[imgType]}
        </span>
      )}
    </div>
  );
}

export default forwardRef(CropImg);
