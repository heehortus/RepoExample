document.addEventListener('DOMContentLoaded', function () {
    const cursor = document.getElementById('cursor');

    if (cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // 마우스 위치 추적
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // 부드러운 애니메이션 함수
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.4;
            cursorY += (mouseY - cursorY) * 0.4;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }

        // 파도 효과 생성 함수
        // 파도 효과 생성 함수
        function createRippleWave(x, y) {
            // 1개의 파도만 생성
            const ripple = document.createElement('div');
            ripple.className = 'cursor-ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';  // 20px에서 10px로 줄임
            ripple.style.height = '20px'; // 20px에서 10px로 줄임

            document.body.appendChild(ripple);

            // 애니메이션 끝나면 요소 제거
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        }

        // 애니메이션 시작
        animateCursor();

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // 클릭할 때 파도 효과!
        document.addEventListener('click', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            createRippleWave(e.clientX, e.clientY);
        });
    }
});