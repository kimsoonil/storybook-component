/* eslint-disable */

import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

function SideSuperClub() {
  const clubId = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="club-home-content side-member">
      <div className="flex-between">
        <div className="side-box-title">Super Club</div>
        <div className="see-all" onClick={() => navigate(`/club/${clubId.data.id}/SuperClub`)}>
          See All
        </div>
      </div>
      {/* {profile.message !== 'ok' ? (
        <div className="root-center">
          <Loader />
        </div>
      ) : ( */}
      <div className="side-superclub-list">
        {[...Array(6)].map((e, index) => {
          return (
            <div
              className="side-superclub-list-item flex-center"
              key={index}
              onClick={() => navigate(`/club/${clubId.data.id}/superclub`)}
            >
              <div className="side-superclub-list-img">
                <img src={require(`images/main/superclub${index + 1}.png`)} />
              </div>
            </div>
          );
        })}
      </div>
      {/* )} */}
    </div>
  );
}

export default SideSuperClub;
