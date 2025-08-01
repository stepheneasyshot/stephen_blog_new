/**
 * 博客网站主JavaScript文件
 */

document.addEventListener('DOMContentLoaded', function() {
  // 初始化代码高亮
  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // 初始化工具提示
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // 添加平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 返回顶部按钮
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 文章编辑器增强
  const markdownEditor = document.getElementById('content');
  if (markdownEditor) {
    // 添加Tab键支持
    markdownEditor.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        
        // 设置textarea的值为：当前值的前半部分 + tab + 当前值的后半部分
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
        
        // 将光标位置设置到插入tab之后
        this.selectionStart = this.selectionEnd = start + 2;
      }
    });

    // 自动保存草稿
    let typingTimer;
    const doneTypingInterval = 1000; // 1秒后保存

    markdownEditor.addEventListener('keyup', function() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(saveToLocalStorage, doneTypingInterval);
    });

    markdownEditor.addEventListener('keydown', function() {
      clearTimeout(typingTimer);
    });

    function saveToLocalStorage() {
      const title = document.getElementById('title').value;
      const content = markdownEditor.value;
      
      if (title || content) {
        localStorage.setItem('markdown_draft_title', title);
        localStorage.setItem('markdown_draft_content', content);
        console.log('草稿已自动保存');
      }
    }

    // 加载草稿
    const savedTitle = localStorage.getItem('markdown_draft_title');
    const savedContent = localStorage.getItem('markdown_draft_content');
    
    if (savedTitle && document.getElementById('title').value === '') {
      document.getElementById('title').value = savedTitle;
    }
    
    if (savedContent && markdownEditor.value === '') {
      markdownEditor.value = savedContent;
    }

    // 清除草稿按钮
    const clearDraftBtn = document.getElementById('clear-draft');
    if (clearDraftBtn) {
      clearDraftBtn.addEventListener('click', function() {
        localStorage.removeItem('markdown_draft_title');
        localStorage.removeItem('markdown_draft_content');
        document.getElementById('title').value = '';
        markdownEditor.value = '';
        alert('草稿已清除');
      });
    }
  }

  // 响应式图片处理
  document.querySelectorAll('.markdown-content img').forEach(img => {
    img.classList.add('img-fluid');
  });

  // 表格响应式处理
  document.querySelectorAll('.markdown-content table').forEach(table => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('table-responsive');
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    table.classList.add('table');
  });
});