export const JoditEdit = () => {
  const iframePart = () => {
    return {
      __html: '<iframe src="/jodit.html" width="100%" height="511px"></iframe>'
    };
  };

  return (
    <div
      style={{ margin: 'auto', position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      dangerouslySetInnerHTML={iframePart()}
    />
  );
};
