export const admin = {
  errorText: {
    name: {
      duplicate: 'Already in use. Please enter a different name. ',
      empty: 'Please enter your club name.'
    },
    address: {
      duplicate: 'Already in use. Please enter a different address.',
      empty: 'Please enter your club address..'
    },
    category: {
      duplicate: 'Already in use. Please select a category',
      empty: 'Please select a category'
    }
  },
  inputState: {
    blur: 'blur',
    focus: 'focus',
    success: 'success',
    error: 'error'
  },
  headline: {
    title: 'Create Super Club and leads clubs and clans',
    description: 'Recruit members with the same interests as you, run and grow your club.'
  },
  name: {
    title: 'Club Name',
    description: 'The club name can be modified 3 months after the last change date.',
    placeholder: 'Please name your club',
    extraText: '/60 characters'
  },
  address: {
    title: 'Club Address',
    description: 'The club address cannot be changed later.',
    url: 'https://creata.com/clubs/',
    placeholder: 'Please enter the club address',
    extraText: '/20 characters'
  },
  category: {
    title: 'Category',
    description: 'The category can be modified 3 months after the last change date.',
    placeholder: 'Select categoty'
  },
  profileImages: {
    title: 'Profile Image',
    description: 'The profile image is a representative image of the club.',
    extraText: ' / 10mb'
  },
  bannerImage: {
    title: 'Banner Image',
    description: 'The banner image is the background image for the top of the club.',
    extraText: ' / 20mb'
  },
  description: {
    title: 'Description',
    description: 'The entered information is reflected in the club list such as the club main and search results.',
    placeholder: 'Please describe your club',
    extraText: '/300 characters'
  },
  tags: {
    title: 'Tags',
    description: 'Cafe search terms are reflected in Naver searches.',
    placeholder: '# input tag',
    extraText: `/8 tags`
  },
  autoApproval: {
    title: 'Auto Approval',
    yesText: 'Sign up immediately without approval',
    noText: 'Staff must approve to join'
  },
  popupText: {
    create: 'Are you sure to create a club?',
    cancel: 'Are you sure to cancel creating a club?'
  },
  categories: [
    { id: 0, type: 0, text: 'Game' },
    { id: 1, type: 1, text: 'Manga / Anime' },
    { id: 2, type: 2, text: 'Broadcasting / Entertainment' },
    { id: 3, type: 3, text: 'Culture / Arts' },
    { id: 4, type: 4, text: 'Movie' },
    { id: 5, type: 5, text: 'Music' },
    { id: 6, type: 6, text: 'Fan cafe' },
    { id: 7, type: 7, text: 'Travel' },
    { id: 8, type: 8, text: 'Sports / Leisure' },
    { id: 9, type: 9, text: 'Pets / Animals' },
    { id: 10, type: 10, text: 'Hobby' },
    { id: 11, type: 11, text: 'Life' },
    { id: 12, type: 12, text: 'Fashion / Beauty' },
    { id: 13, type: 13, text: 'Health / Diet' },
    { id: 14, type: 14, text: 'family / parenting' },
    { id: 15, type: 15, text: 'Computer / Communication' },
    { id: 16, type: 16, text: 'Education' },
    { id: 17, type: 17, text: 'Foreign Language' },
    { id: 18, type: 18, text: 'Humanities / Science' },
    { id: 19, type: 19, text: 'Economy / Finance' },
    { id: 20, type: 20, text: 'Politics / Social' },
    { id: 21, type: 21, text: 'Literature / Creation' },
    { id: 22, type: 22, text: 'Fellowship / Gathering' },
    { id: 23, type: 23, text: 'Religion / Service' }
  ],
  menu: ['dashboard', 'statistics', 'boards', 'posts', 'members', 'permissions', 'information', 'design', 'operation']
};

export const boardConstants = {
  title: 'Boards Management',
  subTitle: "Create and edit your club's bulletin boards for members to have fun discussing topics!",
  addGroup: '+ ADD GROUP',
  // boardGroups: [
  //   { id: 0, name: 'Basic', type: 'basic', option: [{ text: 'All', text: 'Notice', text: 'Event', text: 'Member' }] },
  //   {
  //     id: 1,
  //     name: 'Board Group',
  //     type: 'board',
  //     option: [{ text: 'All', text: 'Notice', text: 'Event', text: 'Member' }]
  //   },
  //   {
  //     id: 2,
  //     name: 'Basic',
  //     type: 'community',
  //     option: [{ text: 'All', text: 'Notice', text: 'Event', text: 'Member' }]
  //   },
  //   {
  //     id: 3,
  //     name: 'Picture',
  //     type: 'picture',
  //     option: [{ text: 'All', text: 'Notice', text: 'Event', text: 'Member' }]
  //   },
  //   { id: 4, name: 'Picture', type: 'custom', option: [{ text: 'All', text: 'Notice', text: 'Event', text: 'Member' }] }
  // ]
  boardGroups: []
};

export const loadState = {
  LOADING: 0,
  SUCCESS: 1,
  ERROR: 2
};

export const clubForm = {
  NAME: 0x11,
  ADDRESS: 0x12,
  CATEGORIES: 0x13,
  BANNER: 0x14,
  PROFILE: 0x15,
  DESCRIPTION: 0x16,
  TAGS: 0x17,
  AUTO_APPROVAL: 0x18
};
