document.addEventListener('DOMContentLoaded', function () {
    const yearTabs = document.querySelectorAll('.year-tab');
    const projectItems = document.querySelectorAll('.project-item');
    const projectGrid = document.querySelector('.project-grid');
    const container = document.querySelector('.project-container');

    // 페이지네이션 관련
    const itemsPerPage = 6; // 한 페이지당 6개 (2줄)
    let currentPage = 1;
    let currentFilteredItems = [];

    // 연도 탭 클릭 이벤트
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const selectedYear = this.getAttribute('data-year');

            yearTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            currentPage = 1; // 필터 변경 시 첫 페이지로 리셋
            filterProjects(selectedYear, true);
        });
    });

    // 로딩 스피너 생성 함수
    function createLoader() {
        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="spinner"></div>';
        return loader;
    }

    // 프로젝트 필터링 함수
    function filterProjects(year, showLoader = false) {
        if (showLoader) {
            projectGrid.style.opacity = '0';

            const loader = createLoader();
            container.appendChild(loader);

            setTimeout(() => {
                applyFilter(year);

                setTimeout(() => {
                    loader.remove();
                    projectGrid.style.opacity = '1';
                }, 80);
            }, 120);
        } else {
            applyFilter(year);
        }
    }

    function applyFilter(year) {
        // 필터링된 아이템들 저장
        currentFilteredItems = Array.from(projectItems).filter(item => {
            const itemYear = item.getAttribute('data-year');
            return year === 'all' || itemYear === year;
        });

        // 모든 아이템 숨기기
        projectItems.forEach(item => {
            item.style.display = 'none';
        });

        // 페이지네이션 업데이트 및 현재 페이지 아이템 표시
        updatePagination();
        showPage(currentPage);
    }

    // 페이지 표시 함수
    function showPage(page) {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        currentFilteredItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 페이지네이션 업데이트 함수
    function updatePagination() {
        const totalPages = Math.ceil(currentFilteredItems.length / itemsPerPage);
        const pageNumbers = document.getElementById('pageNumbers');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        // 페이지 번호 생성
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'page-number';
            pageBtn.textContent = i;
            if (i === currentPage) pageBtn.classList.add('active');

            pageBtn.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                updatePagination();
            });

            pageNumbers.appendChild(pageBtn);
        }

        // 이전/다음 버튼 상태
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;

        // 이전/다음 버튼 이벤트
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
                updatePagination();
            }
        };

        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
                updatePagination();
            }
        };
    }

    // 페이지 로드 시 기본적으로 모든 프로젝트 표시
    filterProjects('all', false);
});