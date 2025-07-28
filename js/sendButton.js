document.getElementById("contactForm").addEventListener("submit", function (e) {
    const name = document.querySelector('.contactTitle').value.trim();
    const email = document.querySelector('.contactEmail').value.trim();
    const message = document.querySelector('.contactMessage').value.trim();

    if (name && email && message) {
        alert("메시지가 성공적으로 전송되었습니다!");
        window.location.reload(); // 페이지 새로고침
    } else {
        e.preventDefault(); // 기본 제출 막기
    }
});