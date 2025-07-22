// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const loveMessage = document.getElementById('loveMessage');
    
    // Loading screen functionality
    function hideLoadingScreen() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                mainContent.classList.add('show');
            }, 800);
        }, 3000); // Show loading for 3 seconds
    }
    
    // Start loading sequence
    hideLoadingScreen();
    
    // Create floating hearts continuously
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.zIndex = '-1';
        heart.style.pointerEvents = 'none';
        heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear forwards`;
        
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.parentNode.removeChild(heart);
            }
        }, 7000);
    }
    
    // Add CSS for floating hearts
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Create hearts periodically
    setInterval(createFloatingHeart, 2000);
    
    // Yes button functionality
    yesBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Show love message
        setTimeout(() => {
            loveMessage.classList.add('show');
        }, 300);
    });
    
    // No button functionality - make it move around randomly
    function moveNoButton() {
        const button = noBtn;
        const maxX = window.innerWidth - button.offsetWidth - 20;
        const maxY = window.innerHeight - button.offsetHeight - 20;
        
        const randomX = Math.max(20, Math.random() * maxX);
        const randomY = Math.max(20, Math.random() * maxY);
        
        button.style.position = 'fixed';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
        button.style.transition = 'all 0.3s ease';
        
        // Add shake effect
        button.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            button.style.animation = '';
        }, 500);
    }
    
    // Add shake animation
    const shakeStyle = document.createElement('style');
    shakeStyle.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(shakeStyle);
    
    // No button event listeners
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveNoButton();
    });
    
    // Optional: Move button on hover for desktop
    noBtn.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) { // Only on desktop
            moveNoButton();
        }
    });
    
    // Add sparkle effect on mouse move
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.95) { // Only sometimes
            createSparkle(e.clientX, e.clientY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.fontSize = '12px';
        sparkle.style.animation = 'sparkleAnim 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
    
    // Add sparkle animation
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkleAnim {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1.2) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Add touch effects for mobile
    document.addEventListener('touchstart', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            const touch = e.touches[0];
            createSparkle(touch.clientX, touch.clientY);
        }
    });
    
    // Prevent context menu on mobile
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Add resize handler
    window.addEventListener('resize', function() {
        // Reset no button position if it's moved
        if (noBtn.style.position === 'fixed') {
            const maxX = window.innerWidth - noBtn.offsetWidth - 20;
            const maxY = window.innerHeight - noBtn.offsetHeight - 20;
            
            const currentX = parseInt(noBtn.style.left);
            const currentY = parseInt(noBtn.style.top);
            
            if (currentX > maxX || currentY > maxY) {
                noBtn.style.left = Math.min(currentX, maxX) + 'px';
                noBtn.style.top = Math.min(currentY, maxY) + 'px';
            }
        }
    });
    
    // Add some fun easter eggs
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 10) {
            createHeartBurst();
            clickCount = 0;
        }
    });
    
    function createHeartBurst() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💕';
                heart.style.position = 'fixed';
                heart.style.left = '50%';
                heart.style.top = '50%';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                heart.style.fontSize = '20px';
                
                const angle = (i * 18) * Math.PI / 180;
                const velocity = 200;
                
                heart.style.animation = `heartBurst 2s ease-out forwards`;
                
                // Custom animation for each heart
                const burstStyle = document.createElement('style');
                burstStyle.textContent = `
                    @keyframes heartBurst {
                        0% {
                            transform: translate(-50%, -50%) scale(0);
                            opacity: 1;
                        }
                        100% {
                            transform: translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(1);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(burstStyle);
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    if (heart.parentNode) {
                        heart.parentNode.removeChild(heart);
                    }
                    if (burstStyle.parentNode) {
                        burstStyle.parentNode.removeChild(burstStyle);
                    }
                }, 2000);
            }, i * 50);
        }
    }
    
});