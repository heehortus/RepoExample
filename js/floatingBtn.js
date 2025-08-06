document.getElementById('scrollBtn').addEventListener('click', function() {
    const currentScroll = window.pageYOffset;
    const targetScroll = currentScroll + 1080;
    
    window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
    });
});