# 欢迎使用Markdown博客

这是一个基于Node.js构建的简洁美观的Markdown博客系统。你可以使用它来轻松创建和管理你的博客文章。

## Markdown简介

Markdown是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的HTML文档。

### 基本语法

以下是一些基本的Markdown语法示例：

#### 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 强调

```markdown
*斜体文本*
**粗体文本**
***粗斜体文本***
```

*斜体文本*
**粗体文本**
***粗斜体文本***

#### 列表

无序列表：

```markdown
- 项目1
- 项目2
- 项目3
```

- 项目1
- 项目2
- 项目3

有序列表：

```markdown
1. 第一项
2. 第二项
3. 第三项
```

1. 第一项
2. 第二项
3. 第三项

#### 链接和图片

```markdown
[链接文本](https://example.com)
![图片描述](https://example.com/image.jpg)
```

#### 代码

行内代码：

```markdown
`console.log('Hello World')`
```

代码块：

````markdown
```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```
````

```javascript
function greeting(name) {
  return `Hello, ${name}!`;
}

console.log(greeting('World'));
```

#### 引用

```markdown
> 这是一段引用文本。
> 
> 这是引用的第二段。
```

> 这是一段引用文本。
> 
> 这是引用的第二段。

#### 表格

```markdown
| 表头1 | 表头2 | 表头3 |
| ----- | ----- | ----- |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |
```

| 表头1 | 表头2 | 表头3 |
| ----- | ----- | ----- |
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

## 使用技巧

1. **创建新文章**：点击导航栏中的"写文章"链接。
2. **查看文章**：在首页点击文章卡片上的"阅读全文"按钮。
3. **编辑文章**：目前需要手动编辑content目录下的.md文件。

## 关于本博客系统

本博客系统使用以下技术构建：

- **Node.js**：JavaScript运行环境
- **Express**：Web应用框架
- **EJS**：模板引擎
- **Marked**：Markdown解析器
- **Bootstrap**：前端UI框架

希望你喜欢这个简洁美观的Markdown博客系统！