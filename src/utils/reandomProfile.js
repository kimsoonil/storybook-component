function reandomProfile() {
  const backgroundArr = [];

  for (let i; i < 40; i += 1) {
    backgroundArr[i] = `images/profile/profile-img${i + 1}.png`;
  }
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundImg = backgroundArr[randomIndex];
  console.log('backgroundImg', backgroundImg);
  return backgroundImg;
}

export default reandomProfile;
