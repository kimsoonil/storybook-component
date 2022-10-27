import React from 'react';
import chatProfileImg from 'html/img/com/chat.png';

function Chat() {
  return (
    <div className="main_chat">
      <div className="main_chat_title">
        <div className="title on">Chat</div>
        <div className="btn_group">
          <button type="button" className="expand">
            <span className="a11y">확장</span>
          </button>
          <button type="button" className="logout">
            <span className="a11y">로그아웃</span>
          </button>
        </div>
      </div>
      <div className="main_chat_list">
        <div className="main_chat_over" />
        <ul>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hi! Nice to meet you 😊</span>
            </div>
          </li>
          <li className="my_chat">
            <div className="ballon">
              <span className="chat_name">Cherry Blossom</span>
              <span className="chat_con">Hello~</span>
            </div>
            <div className="chat_profile">
              <img src={chatProfileImg} alt="" />
            </div>
          </li>
        </ul>
      </div>
      <div className="main_chat_form">
        <div className="main_chat_setting">
          <ul>
            <li>
              <button type="button">
                <span>👋Hello~</span>
              </button>
            </li>
            <li>
              <button type="button">
                <span>🎉Congratulations!</span>
              </button>
            </li>
          </ul>
          <button type="button" className="input_setting">
            <span className="a11y">설정</span>
          </button>
        </div>
        <div className="main_chat_input">
          <div className="chat_profile">
            <img src={chatProfileImg} alt="" />
          </div>
          <div className="form_wrap">
            <span className="form_cell form_input input_lg">
              <input type="text" defaultValue="Hellow~" />
            </span>
          </div>
          <button type="button" className="input_submit">
            <span className="a11y">입력</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
