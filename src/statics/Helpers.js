
export const getDefaultMedImage = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    const defaultImg = arr.find(item => item.default === true);
    const img = defaultImg || arr[0];
    return img.medium;
  }
  return false;
};

export const getDefaultLargeImage = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    const defaultImg = arr.find(item => item.default === true);
    const img = defaultImg || arr[0];
    return img.large;
  }
  return false;
};

export const getDefaultThumbImage = (arr) => {
  if (Array.isArray(arr) && arr.length > 0) {
    const defaultImg = arr.find(item => item.default === true);
    const img = defaultImg || arr[0];
    return img.thumb;
  }
  return false;
};

export const bindActionToPromise = (dispatch, actionCreator) => payload => {
  return new Promise((resolve, reject) =>
    dispatch(actionCreator(payload, resolve, reject))
  )
}