export const numFM = (value) => {
  if (typeof value === 'number') {
    if (value >= 1000) {
      const str = value.toString();
      const len = str.length;
      const pos = ((len - 1) % 3) + 1; // 1의 자리
      const suffixes = ['', 'k', 'm', 'b', 't'];
      const suffixNum = Math.floor(len - 1);
      return (
        (str[len - 1] === '0' ? str.slice(0, pos) : str.slice(0, pos) + '.' + str.slice(pos, pos + 1)) +
        suffixes[suffixNum]
      );
    }
  }
  return value;
};

export const fileSizeFM = (value, decimals = 1) => {
  if (typeof value === 'number') {
    if (value === 0) {
      return '0';
    }
    const k = 1024;
    const suffixes = ['byte', 'kb', 'mb', 'gb', 'tb', 'pb', 'eb', 'zb', 'yb'];
    const suffixNum = Math.floor(Math.log(value) / Math.log(k));
    return `${parseFloat((value / Math.pow(k, suffixNum)).toFixed(decimals))} ${suffixes[suffixNum]}`;
  }
  return value;
};
