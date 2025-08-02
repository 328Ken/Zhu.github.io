document.addEventListener('DOMContentLoaded', function() {
    /**
     * ===========================================
     * 弧形环绕文字效果（优化版）
     * 解决文字重叠问题，优化视觉效果
     * ===========================================
     */
    const text = "Welcome to My Website"; // 要显示的文字
    const circularText = document.querySelector('.circular-text');
    
    // 清空容器准备重新生成
    circularText.innerHTML = '';
    
    // 配置参数（已调整避免重叠）
    const baseRadius = 140; // 基础半径（像素）
    const startAngle = -75; // 起始角度（度）
    const endAngle = 75;    // 结束角度（度）
    const baseFontSize = 24; // 基础字体大小（像素）
    const anglePadding = 1.2; // 角度填充系数
    
    // 动态计算参数
    const textLength = text.length;
    const radius = baseRadius + (textLength * 0.5); // 根据文字长度动态调整半径
    const fontSize = Math.min(baseFontSize, baseFontSize + (20 - textLength)); // 长文本缩小字体
    
    // 计算总弧长和字符间距
    const arcLength = 2 * Math.PI * radius * ((endAngle - startAngle) / 360);
    const avgCharWidth = fontSize * 0.6; // 估算字符平均宽度
    const spacing = arcLength / textLength; // 字符间距
    
    // 生成弧形文字
    let currentAngle = startAngle;
    for (let i = 0; i < textLength; i++) {
        const charSpan = document.createElement('span');
        charSpan.textContent = text[i];
        charSpan.style.position = 'absolute';
        charSpan.style.fontSize = `${fontSize}px`;
        charSpan.style.color = 'white';
        charSpan.style.textShadow = '0 0 8px rgba(0,0,0,0.9)';
        charSpan.style.fontWeight = 'bold';
        charSpan.style.whiteSpace = 'nowrap';
        charSpan.style.zIndex = '2';
        
        // 计算字符位置（考虑字符宽度）
        const angleRad = currentAngle * (Math.PI / 180);
        const charWidth = avgCharWidth * anglePadding;
        const x = radius * Math.sin(angleRad);
        const y = -radius * Math.cos(angleRad);
        
        // 应用变换
        charSpan.style.transform = `
            translate(calc(-50% + ${x}px), calc(-50% + ${y}px))
            rotate(${currentAngle}deg)
        `;
        charSpan.style.transformOrigin = 'center center';
        
        circularText.appendChild(charSpan);
        
        // 更新角度（基于字符实际占位）
        const angleIncrement = (spacing / arcLength) * (endAngle - startAngle) * anglePadding;
        currentAngle += angleIncrement;
    }

    /**
     * ===========================================
     * 中央图片视觉效果增强
     * ===========================================
     */
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        // 初始光晕效果
        mainImage.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.8)';
        mainImage.style.transition = 'all 0.3s ease';
        
        // 光晕呼吸动画
        setInterval(() => {
            const glowIntensity = 0.7 + Math.random() * 0.3;
            const glowSize = 35 + Math.random() * 25;
            mainImage.style.boxShadow = `0 0 ${glowSize}px rgba(255, 255, 255, ${glowIntensity})`;
        }, 2000);
        
        // 点击交互效果
        mainImage.addEventListener('click', function(e) {
            this.style.transform = 'translate(-50%, -50%) scale(1.12)';
            setTimeout(() => {
                this.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);
        });
        
        // 悬停效果
        mainImage.addEventListener('mouseenter', () => {
            mainImage.style.filter = 'brightness(1.1)';
        });
        mainImage.addEventListener('mouseleave', () => {
            mainImage.style.filter = 'brightness(1)';
        });
    }

    /**
     * ===========================================
     * 窗口大小变化时的自适应调整
     * ===========================================
     */
    function handleResize() {
        const scale = Math.min(
            window.innerWidth / 1200,
            window.innerHeight / 800,
            1
        );
        circularText.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始化执行
});