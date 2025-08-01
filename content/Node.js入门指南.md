# Node.js入门指南

## 什么是Node.js？

Node.js是一个基于Chrome V8引擎的JavaScript运行环境，它使开发者能够使用JavaScript来编写服务器端的应用程序。Node.js采用事件驱动、非阻塞I/O模型，使其轻量且高效，非常适合运行在分布式设备的数据密集型实时应用。

## 为什么选择Node.js？

以下是选择Node.js的几个主要原因：

1. **JavaScript全栈开发**：前后端使用同一种语言，减少上下文切换成本
2. **高性能**：V8引擎提供的高性能JavaScript执行环境
3. **非阻塞I/O**：适合处理高并发请求
4. **丰富的生态系统**：npm是世界上最大的开源库生态系统
5. **活跃的社区**：持续更新和改进

## 安装Node.js

### Windows

1. 访问[Node.js官网](https://nodejs.org/)
2. 下载LTS（长期支持）版本
3. 运行安装程序，按照向导完成安装
4. 打开命令提示符，输入`node -v`和`npm -v`验证安装

### macOS

使用Homebrew安装：

```bash
brew install node
```

### Linux (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install nodejs npm
```

## Node.js基础概念

### 模块系统

Node.js使用CommonJS模块系统，允许你将代码分割成多个文件：

```javascript
// 导出模块
module.exports = function(x) {
  return x * x;
};

// 导入模块
const square = require('./square.js');
console.log(square(5)); // 输出: 25
```

### 包管理器 (npm)

npm是Node.js的包管理器，用于安装和管理项目依赖：

```bash
# 初始化项目
npm init

# 安装包
npm install express

# 安装开发依赖
npm install --save-dev nodemon

# 全局安装
npm install -g typescript
```

### 事件循环

Node.js的事件循环是其非阻塞I/O模型的核心：

```javascript
const fs = require('fs');

// 非阻塞I/O操作
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
console.log('继续执行其他代码');
```

## 创建第一个Node.js应用

### 简单的HTTP服务器

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('服务器运行在 http://127.0.0.1:3000/');
});
```

### 使用Express框架

Express是最流行的Node.js Web应用框架：

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`应用运行在 http://localhost:${port}`);
});
```

## 异步编程

### 回调函数

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, '数据');
  }, 1000);
}

fetchData((err, data) => {
  if (err) {
    console.error('出错了:', err);
    return;
  }
  console.log('获取的数据:', data);
});
```

### Promise

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('数据');
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log('获取的数据:', data);
  })
  .catch(err => {
    console.error('出错了:', err);
  });
```

### Async/Await

```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log('获取的数据:', data);
  } catch (err) {
    console.error('出错了:', err);
  }
}

getData();
```

## 常用Node.js模块

### 文件系统 (fs)

```javascript
const fs = require('fs');

// 同步读取
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// 异步读取
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 使用Promise (Node.js 10+)
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### 路径 (path)

```javascript
const path = require('path');

// 连接路径
const fullPath = path.join(__dirname, 'folder', 'file.txt');
console.log(fullPath);

// 解析路径
const pathInfo = path.parse('/home/user/file.txt');
console.log(pathInfo);
// 输出: { root: '/', dir: '/home/user', base: 'file.txt', ext: '.txt', name: 'file' }
```

## 调试Node.js应用

### 使用console

```javascript
console.log('信息消息');
console.error('错误消息');
console.warn('警告消息');
console.time('计时器');
// 一些操作
console.timeEnd('计时器'); // 显示操作耗时
```

### 使用调试器

```bash
node --inspect app.js
```

然后在Chrome浏览器中访问 `chrome://inspect`

## 部署Node.js应用

### 使用进程管理器 (PM2)

```bash
# 安装PM2
npm install -g pm2

# 启动应用
pm2 start app.js

# 查看应用状态
pm2 list

# 监控
pm2 monit
```

### 使用Docker容器化

```dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

## 结论

Node.js是一个强大的JavaScript运行环境，适合构建各种类型的应用程序，从简单的命令行工具到复杂的Web应用。通过学习本指南中的基础知识，你已经迈出了成为Node.js开发者的第一步。

随着你的深入学习，你会发现Node.js生态系统提供了丰富的工具和库，可以帮助你构建高效、可扩展的应用程序。祝你在Node.js开发之旅中取得成功！