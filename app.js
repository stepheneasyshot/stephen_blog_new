const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs-extra');
const marked = require('marked');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 配置模板引擎
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 配置EJS布局
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// 配置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 配置中间件
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'markdown-blog-secret',
  resave: false,
  saveUninitialized: true
}));

// 配置文件上传
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 根据文件类型决定存储位置
    if (file.fieldname === 'cover') {
      cb(null, path.join(__dirname, 'public', 'images', 'covers'));
    } else {
      cb(null, path.join(__dirname, 'content'));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// 首页路由 - 显示所有博客文章
app.get('/', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, 'content'));
    const posts = [];
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(__dirname, 'content', file);
        const content = await fs.readFile(filePath, 'utf8');
        const title = file.replace('.md', '');
        
        // 提取文章摘要（前150个字符）
        const excerpt = content.length > 150 ? content.substring(0, 150) + '...' : content;
        
        // 检查是否有对应的封面图片（支持JPG和PNG格式）
        const coverImageName = title.replace(/\s+/g, '-');
        let coverImagePath = null;
        let hasCover = false;
        
        // 检查JPG格式
        const jpgPath = `/images/covers/${coverImageName}.jpg`;
        const fullJpgPath = path.join(__dirname, 'public', jpgPath.substring(1));
        const hasJpg = await fs.pathExists(fullJpgPath);
        
        // 检查PNG格式
        const pngPath = `/images/covers/${coverImageName}.png`;
        const fullPngPath = path.join(__dirname, 'public', pngPath.substring(1));
        const hasPng = await fs.pathExists(fullPngPath);
        
        // 设置封面图片路径
        if (hasJpg) {
          coverImagePath = jpgPath;
          hasCover = true;
        } else if (hasPng) {
          coverImagePath = pngPath;
          hasCover = true;
        }
        
        posts.push({
          id: file,
          title: title,
          excerpt: excerpt,
          coverImage: coverImagePath,
          date: new Date((await fs.stat(filePath)).mtime).toLocaleDateString()
        });
      }
    }
    
    // 按日期排序（最新的在前面）
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.render('index', { posts });
  } catch (error) {
    console.error('Error loading posts:', error);
    res.status(500).render('error', { message: '无法加载博客文章' });
  }
});

// 查看单篇文章
app.get('/post/:id', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'content', req.params.id);
    const content = await fs.readFile(filePath, 'utf8');
    const htmlContent = marked.parse(content);
    const title = req.params.id.replace('.md', '');
    
    // 检查是否有对应的封面图片（支持JPG和PNG格式）
    const coverImageName = title.replace(/\s+/g, '-');
    let coverImagePath = null;
    
    // 检查JPG格式
    const jpgPath = `/images/covers/${coverImageName}.jpg`;
    const fullJpgPath = path.join(__dirname, 'public', jpgPath.substring(1));
    const hasJpg = await fs.pathExists(fullJpgPath);
    
    // 检查PNG格式
    const pngPath = `/images/covers/${coverImageName}.png`;
    const fullPngPath = path.join(__dirname, 'public', pngPath.substring(1));
    const hasPng = await fs.pathExists(fullPngPath);
    
    // 设置封面图片路径
    if (hasJpg) {
      coverImagePath = jpgPath;
    } else if (hasPng) {
      coverImagePath = pngPath;
    }
    
    res.render('post', { 
      title: title, 
      content: htmlContent,
      coverImage: coverImagePath,
      date: new Date((await fs.stat(filePath)).mtime).toLocaleDateString()
    });
  } catch (error) {
    console.error('Error loading post:', error);
    res.status(404).render('error', { message: '文章未找到' });
  }
});

// 创建新文章页面
app.get('/new', (req, res) => {
  res.render('new');
});

// 处理新文章提交
app.post('/new', async (req, res) => {
  try {
    const { title, content } = req.body;
    const fileName = `${title.replace(/\s+/g, '-')}.md`;
    const filePath = path.join(__dirname, 'content', fileName);
    
    await fs.writeFile(filePath, content);
    res.redirect('/');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).render('error', { message: '创建文章失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`博客服务器运行在 http://localhost:${PORT}`);
});