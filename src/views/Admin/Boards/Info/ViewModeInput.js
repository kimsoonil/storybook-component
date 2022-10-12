import React, { useMemo } from 'react';
import { BVD } from '..';

const ViewModeInput = ({ viewMode, onChange }) => {
  const sampleImage = useMemo(
    () =>
      viewMode === BVD.viewMode.type.list
        ? require('images/admin/board/viewmode-list.svg').default
        : viewMode === BVD.viewMode.type.album
        ? require('images/admin/board/viewmode-album.svg').default
        : viewMode === BVD.viewMode.type.card
        ? require('images/admin/board/viewmode-card.svg').default
        : null,

    [viewMode]
  );
  return (
    <div className="boards-contents-view">
      <div className="info-title">{BVD.viewMode.title}</div>
      <div className="info-desc">{BVD.viewMode.subtitle}</div>
      <div className="view-button-wrapper">
        {BVD.viewMode.list.map((viewModeItem) => {
          const isActive = viewModeItem.key === viewMode;
          const activeClassName = isActive ? 'active' : 'inactive';
          const onClickViewMode = () => {
            onChange(viewModeItem.key);
          };

          return (
            <div
              key={viewModeItem.key}
              className={`view-button view-button-${activeClassName}`}
              onClick={onClickViewMode}
            >
              <div className="title-wrapper">
                <img className="title-image" src={isActive ? viewModeItem.activeImage : viewModeItem.defaultImage} />
                <div className="title-text">{viewModeItem.title}</div>
              </div>
              <div className="view-subtitle">{viewModeItem.subtitle}</div>
            </div>
          );
        })}
      </div>

      <div className="boards-contents-view-sample">
        <img src={sampleImage} />
      </div>
    </div>
  );
};

export default ViewModeInput;
