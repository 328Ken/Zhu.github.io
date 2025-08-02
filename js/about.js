document.addEventListener('DOMContentLoaded', function () {
    // 侧边栏切换
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.visual-sidebar');

    // 检查元素是否存在（防御性编程
    if (sidebarToggle && sidebar) {
        // 为切换按钮添加点击事件监听
        sidebarToggle.addEventListener('click', function () {
            // 切换侧边栏的active类（显示/隐藏）
            sidebar.classList.toggle('active');
        });
    }

    // 卡片悬停效果
    // 获取所有需要3D效果的卡片元素
    const cards = document.querySelectorAll('.band-card, .quote-card');
    // 遍历每个卡片
    cards.forEach(card => {
        // 添加鼠标移动事件监听
        card.addEventListener('mousemove', (e) => {
            // 获取卡片相对于视口的位置和尺寸
            const rect = card.getBoundingClientRect();
            // 计算鼠标在卡片内的X坐标
            const x = e.clientX - rect.left;
            // 计算鼠标在卡片内的Y坐标
            const y = e.clientY - rect.top;
            // 计算卡片中心点X坐标
            const centerX = rect.width / 2;
            // 计算卡片中心点Y坐标
            const centerY = rect.height / 2;

            // 根据鼠标位置计算X轴旋转角度（除以20降低灵敏度）
            const angleX = (centerY - y) / 20;
            // 根据鼠标位置计算Y轴旋转角度
            const angleY = (x - centerX) / 20;

            // 应用3D变换效果
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        // 鼠标移出时重置变换
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    // 创建IntersectionObserver实例，用于检测元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        // 遍历所有观察到的条目
        entries.forEach(entry => {
            // 如果元素进入视口
            if (entry.isIntersecting) {
                // 淡入效果
                entry.target.style.opacity = '1';
                // 从下方移入效果
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // 初始化每个时间线项目
    timelineItems.forEach((item, index) => {
        // 初始状态：完全透明
        item.style.opacity = '0';
        // 初始状态：下移20px
        item.style.transform = 'translateY(20px)';
        // 设置过渡效果，每个项目有0.1秒的延迟增量
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
        // 开始观察该元素
        observer.observe(item);
    });

    // 音乐播放器模拟
    const playBtn = document.querySelector('.player-controls button:nth-child(2)');
    // 检查元素是否存在
    if (playBtn) {
        // 添加点击事件监听 
        playBtn.addEventListener('click', function () {
            // 切换播放/暂停图标
            this.classList.toggle('fa-play');
            this.classList.toggle('fa-pause');

            // 获取进度条元素
            const progress = document.querySelector('.progress');
            // 检查是否处于播放状态
            if (this.classList.contains('fa-pause')) {
                 // 如果是播放状态，启动进度条动画
                progress.style.animation = 'progress 180s linear forwards';
            } else {
                // 如果是暂停状态，停止动画
                progress.style.animation = 'none';
            }
        });
    }

    // 风格标签点击效果
    const styleTags = document.querySelectorAll('.style-tag');
    // 遍历每个标签
    styleTags.forEach(tag => {
        // 添加点击事件监听
        tag.addEventListener('click', function () {
             // 先移除所有标签的active类
            styleTags.forEach(t => t.classList.remove('active'));
            // 为当前点击的标签添加active类
            this.classList.add('active');
        });
    });

    // 页面加载动画
    const mainContent = document.querySelector('.visual-main-content');
     // 检查元素是否存在
    if (mainContent) {
        // 初始状态：完全透明
        mainContent.style.opacity = '0';
        // 初始状态：下移20px
        mainContent.style.transform = 'translateY(20px)';
        // 设置过渡效果
        mainContent.style.transition = 'all 0.6s ease';

           // 延迟300ms后执行动画
        setTimeout(() => {
             // 淡入效果
            mainContent.style.opacity = '1';
            // 上移回原位
            mainContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// 添加CSS动画
const style = document.createElement('style');
// 设置样式内容（定义进度条动画
style.textContent = `
    @keyframes progress {
        from { width: 0; }
        to { width: 100%; }
    }
`;
// 将style元素添加到文档头部
document.head.appendChild(style);

//总结

//事件监听：所有交互都基于事件驱动（click, mousemove等）

// DOM操作：使用classList API高效操作CSS类

// 动画实现：结合CSS transition和JavaScript控制

// 现代API：使用IntersectionObserver实现高效元素可见性检测

// 3D效果：基于鼠标位置的动态transform计算

// 防御性编程：对所有DOM查询进行存在性检查

// 动态样式：通过JavaScript动态创建CSS关键帧动画