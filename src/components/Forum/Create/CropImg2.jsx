/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useRef } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { IMAGE_TYPE_BANNER, IMAGE_TYPE_THUMBNAIL } from 'constants/type';

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        x: 0,
        y: 0,
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

function CropImg2(props) {
  const { imgType, cropWidth, cropHeight, errors, setErrors, forumInfo, setForumInfo } = props;
  const [imgSrc, setImgSrc] = useState(forumInfo[imgType]);
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
          setErrors({ ...errors, [imgType]: t('validation.forum.uploadfile.maxsize') });
        }

        if (err.code === 'file-invalid-type') {
          setErrors({ ...errors, [imgType]: t('validation.forum.uploadfile.invalidfile') });
        }
      });
    });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
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

  useEffect(() => {
    setEventType(imgType);
    createCanvas();
  }, [completedCrop]);

  useEffect(() => {
    console.log('imgSrc', imgSrc);
    console.log(forumInfo[imgType]);
  }, [forumInfo, imgSrc]);
  return (
    <div>
      <span className="form_title">
        {imgType === IMAGE_TYPE_THUMBNAIL ? 'Forum Thumbnail' : 'Forum Top Image'} <span>(Option)</span>
      </span>
      <span className="title_text">
        Forum’s thumbnail can only use image files with jpg, gif, or png extensions of less than 10MB.{' '}
        <span>(Best size : {imgType === IMAGE_TYPE_THUMBNAIL ? '200 x 200px' : '1280 x 268px'})</span>
      </span>
      <div
        className={classNames(
          'img_upload',
          { thum: imgType === IMAGE_TYPE_THUMBNAIL },
          { top: imgType === IMAGE_TYPE_BANNER }
        )}
      >
        {imgSrc ? (
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
            <button type="button" className="img_delete" onClick={onRemove}>
              <span className="a11y">이미지 업로드 삭제</span>
            </button>
          </ReactCrop>
        ) : (
          <div className="img_upload_box" {...getRootProps()}>
            <input {...getInputProps()} />
            <span>
              Drag and drop
              {imgType === IMAGE_TYPE_THUMBNAIL && <br />}
              your files here
            </span>
          </div>
        )}
        <div className="img_upload_btn">
          <div className="or_line">
            <span>OR</span>
          </div>
          <button type="button" onClick={onBrowseFile}>
            <span>Browse files</span>
          </button>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ width: 0, height: 0 }} />
    </div>
  );
}
export default CropImg2;
