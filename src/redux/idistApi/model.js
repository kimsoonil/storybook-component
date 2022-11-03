/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-syntax */
// export const clubModel = (data) => ({
//   ...(data?.address && { address: data?.address }),
//   ...(data?.banner_image && { bannerImage: data?.banner_image }),
//   ...(data?.banner_image_url && { bannerImageUrl: data?.banner_image_url }),
//   ...(data?.board_groups && { boardGroups: data?.board_groups }),
//   ...(data?.category && { category: data?.category }),
//   ...(data?.description && { description: data?.description }),
//   ...(data?.id && { id: data?.id }),
//   ...(data?.is_auto_approval && { isAutoApproval: data?.is_auto_approval }),
//   ...(data?.is_pin && { isPin: data?.is_pin }),
//   ...(data?.member_count && { memberCount: data?.member_count }),
//   ...(data?.pin_count && { pinCount: data?.pin_count }),
//   ...(data?.post_count && { postCount: data?.post_count }),
//   ...(data?.profile && { profile: data?.profile }),
//   ...(data?.profile_image && { profileImage: data?.profile_image }),
//   ...(data?.profile_image_url && { profileImageUrl: data?.profile_image_url }),
//   ...(data?.tags && { tags: data?.tags }),
//   ...(data?.title && { title: data?.title }),
// });

import { toCamelCase } from 'utils';

const optimizeModel = (data) => {
  const ret = {};
  if (typeof data === 'object') {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (element !== undefined) {
          ret[key] = element;
        }
      }
    }
    return ret;
  }
  return data;
};

export const clubModel = (data) => {
  const boardGroups = data?.board_groups
    ? data?.board_groups.map((boardGroup) => boardGroupModel({ ...boardGroup, clubId: data?.id }))
    : undefined;

  const model = {
    id: data?.id,
    title: data?.title,
    address: data?.address,
    category: data?.club_category,
    description: data?.description,
    tags: data?.tags,
    bannerImage: data?.banner_image,
    bannerImageUrl: data?.banner_image_url,
    profileImage: data?.profile_image,
    profileImageUrl: data?.profile_image_url,

    boardGroups,

    isAutoApproval: data?.is_auto_approval,
    isPined: data?.is_pined,
    isLiked: data?.is_liked,
    isDisliked: data?.is_disliked,

    memberCount: data?.member_count,
    pinCount: data?.pin_count,
    postCount: data?.post_count,

    profile: toCamelCase(data?.profile),
    master: toCamelCase(data?.master)
  };

  return optimizeModel(model);
};

export const boardType = {
  DEFAULT: 0,
  MEDIA: 1,
  NORMAL: 2
};

export const boardGroupModel = (data) => {
  const type = !data?.type ? undefined : data?.type === 'DEFAULT' ? boardType.DEFAULT : boardType.NORMAL;

  const boards = data?.boards
    ? data?.boards.map((board) => boardModel({ ...board, clubId: data?.clubId, boardGroupId: data?.id }))
    : undefined;

  const model = {
    id: data?.id,
    title: data?.title,
    type,
    isActive: data?.is_active,
    order: data?.order,
    boards,
    clubId: data?.clubId,
    isGroup: true
  };

  return optimizeModel(model);
};

export const boardGroupPayload = (data) => {
  const payload = {
    title: data?.title,
    is_active: data?.isActive,
    order: data?.order
  };

  return optimizeModel(payload);
};

export const viewModeType = {
  LIST: 0,
  ALBUM: 1,
  CARD: 2
};

export const boardPermissionType = {
  GUEST: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLD: 3,
  PLATINUM: 4,
  DIAMOND: 5,
  LEGEND: 6,
  STAFF: 7,
  PRO_STAFF: 8,
  SUPER_STAFF: 9,
  MASTER: 10,

  0: 'GUEST',
  1: 'BRONZE',
  2: 'SILVER',
  3: 'GOLD',
  4: 'PLATINUM',
  5: 'DIAMOND',
  6: 'LEGEND',
  7: 'STAFF',
  8: 'PRO_STAFF',
  9: 'SUPER_STAFF',
  10: 'MASTER'
};

export const boardModel = (data) => {
  const type = !data?.type
    ? undefined
    : data?.type === 'All' || data?.type === 'Notices' || data?.type === 'Events'
    ? boardType.DEFAULT
    : data?.type === 'Videos' || data?.type === 'Galleries'
    ? boardType.MEDIA
    : boardType.NORMAL;

  const viewMode =
    data?.view_mode === 'LIST_TYPE'
      ? viewModeType.LIST
      : data?.view_mode === 'ALBUM_TYPE'
      ? viewModeType.ALBUM
      : data?.view_mode === 'CARD_TYPE'
      ? viewModeType.CARD
      : undefined;

  const model = {
    id: data?.id,
    title: data?.title,
    description: data?.description,
    viewMode,
    type,
    readPermission: data?.read_permission,
    writePermission: data?.write_permission,
    isActive: data?.is_active,
    order: data?.order,
    clubId: data?.clubId,
    boardGroupId: data?.boardGroupId,
    isBoard: true
  };

  return optimizeModel(model);
};

export const boardPayload = (data) => {
  const view_mode =
    data?.viewMode === viewModeType.LIST
      ? 'LIST_TYPE'
      : data?.viewMode === viewModeType.ALBUM
      ? 'ALBUM_TYPE'
      : data?.viewMode === viewModeType.CARD
      ? 'CARD_TYPE'
      : undefined;

  const payload = {
    title: data?.title,
    description: data?.description,
    view_mode,
    read_permission: data?.readPermission,
    write_permission: data?.writePermission,
    is_active: data?.isActive,
    order: data?.order
  };

  return optimizeModel(payload);
};

export const userModel = () => {};
