/* eslint-disable */

import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { postClubShareInit } from 'redux/store/clubSlice';
import { useParams } from 'react-router';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon
} from 'react-share';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/Button';

function SharePopup(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUrl = 'https://super-club.netlify.app/';

  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="sharepopup relative">
        <div className="closebtn" onClick={() => props.setOpen(!props.open)}>
          <img src={require(`images/club/btn-close.png`)} alt="" />
        </div>
        <div className="share-btn flex-center">
          <FacebookShareButton url={currentUrl} onClick={() => dispatch(postClubShareInit(id))}>
            <FacebookIcon size={80} round={true} borderRadius={24}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl} onClick={() => dispatch(postClubShareInit(id))}>
            <TwitterIcon size={80} round={true} borderRadius={24}></TwitterIcon>
          </TwitterShareButton>
          <TelegramShareButton url={currentUrl} onClick={() => dispatch(postClubShareInit(id))}>
            <TelegramIcon size={80} round={true} borderRadius={24}></TelegramIcon>
          </TelegramShareButton>
        </div>
        <div className="share-link flex-center">
          Link <input type={'text'} value="https://super-club.netlify.app/" disabled={'disabled'} />
          <CopyToClipboard text={currentUrl}>
            <Button size={'s'} label={'Copy'} width={120} />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
