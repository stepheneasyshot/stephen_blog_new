const fs = require('fs');
const https = require('https');
const path = require('path');

// 确保covers目录存在
const coversDir = path.join(__dirname, 'public', 'images', 'covers');
if (!fs.existsSync(coversDir)) {
  fs.mkdirSync(coversDir, { recursive: true });
}

// 定义要下载的图片
const images = [
  {
    url: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/node-js-736399_960_720.png',
    filename: 'Node.js入门指南.jpg'
  },
  {
    url: 'https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_960_720.png',
    filename: '欢迎使用Markdown博客.jpg'
  }
];

// 下载图片函数
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(coversDir, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 删除不完整的文件
      console.error(`Error downloading ${filename}: ${err.message}`);
      reject(err);
    });
  });
}

// 下载所有图片
async function downloadAllImages() {
  console.log('Starting to download cover images...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All downloads completed!');
}

// 执行下载
downloadAllImages();