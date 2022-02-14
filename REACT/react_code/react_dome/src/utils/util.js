// 等待图片加载
export const imgLoad = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = path;

    image.onload  = function() {
      resolve(path)
    };
    image.onerror = function() {
      reject(new Error('图片加载失败'+path))
    };
  });
};