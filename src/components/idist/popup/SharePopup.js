/* eslint-disable */

import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon
} from 'react-share';

import 'assets/scss/popup.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/idist/Button';

function SharePopup(props) {
  const currentUrl = window.location.href;

  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="sharepopup relative">
        <div className="closebtn" onClick={() => props.setOpen(!props.open)}>
          <img src={require(`images/club/btn-close.png`)} alt="" />
        </div>
        <div className="share-btn flex-center">
          <FacebookShareButton url={currentUrl} onClick={() => props.sharefuc('facebook')}>
            <FacebookIcon size={80} round={true} borderRadius={24}></FacebookIcon>
          </FacebookShareButton>
          <TwitterShareButton url={currentUrl} onClick={() => props.sharefuc('twitter')}>
            <TwitterIcon size={80} round={true} borderRadius={24}></TwitterIcon>
          </TwitterShareButton>
          <TelegramShareButton url={currentUrl} onClick={() => props.sharefuc('telegram')}>
            <TelegramIcon size={80} round={true} borderRadius={24}></TelegramIcon>
          </TelegramShareButton>
        </div>
        <div className="share-link flex-center">
          Link <input type={'text'} value={currentUrl} disabled={'disabled'} />
          <CopyToClipboard text={currentUrl}>
            <Button size={'s'} label={'Copy'} width={120} />
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default SharePopup;
