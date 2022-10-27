import React from 'react';
import { useNavigate } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import ForumListBanner from 'components/Forum/SideBanner/ForumCategoryBanner';
import Top5Forums from 'components/Forum/SideBanner/Top5Forums';

function TransferAuth() {
  const navigate = useNavigate();
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <ForumTop />
          <div className="main_div">
            <div className="con_div">
              <div className="creat_div">
                <div className="content_subtitle creat">
                  <h4 className="title creat">Transfer of Master Authority</h4>
                  <div className="title_menu">
                    <button type="button" className="text_btn" onClick={() => navigate(-1)}>
                      <span>Cancle</span>
                    </button>
                  </div>
                </div>
                <div className="creat_form">
                  <div className="power_title">You can transfer the Forum master authority to staff.</div>
                  <span className="staff title">Staff Member</span>
                  <div className="form_div">
                    <div>
                      <dl className="staff_msg">
                        <dt>Select a staff member</dt>
                        <dd>
                          There are no staff for this Forum. After <span>appointing staff</span>, you can transfer
                          authority.
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="page_btn_wrap full">
                  <button type="button" className="btn primary button_xl" disabled>
                    <span>Appointment of Staff</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="right_div">
              <div>
                <button type="button" className="btn writing">
                  <span>Writing</span>
                </button>
              </div>
              <SideImgBanner />
              <HistoryBanner />
              <ForumListBanner />
              <Top5Forums />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default TransferAuth;
