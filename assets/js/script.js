document.addEventListener('DOMContentLoaded', () => {
    // 1. AOS Animation Init
    AOS.init({ once: true, duration: 1000 });

    // 2. Portfolio Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Manage Button Styles (Active state)
            filterBtns.forEach(b => {
                b.classList.remove('btn-cinematic');
                b.classList.add('btn-outline-cinematic');
            });
            btn.classList.add('btn-cinematic');
            btn.classList.remove('btn-outline-cinematic');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    // Trigger a tiny delay for CSS transitions if you have them
                    setTimeout(() => { item.style.opacity = '1'; }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                }
            });
        });
    });

    // 3. Counter Animation Logic
    const updateCount = (el) => {
        const target = +el.getAttribute('data-target');
        const count = +el.innerText.replace('+', ''); // Clean existing text
        const speed = 200; 
        const inc = target / speed;

        if (count < target) {
            el.innerText = Math.ceil(count + inc);
            setTimeout(() => updateCount(el), 15);
        } else {
            el.innerText = target + "+";
        }
    };

    // Intersection Observer for Statistics Section
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counterElements = entry.target.querySelectorAll('.counter');
                counterElements.forEach(el => updateCount(el));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Targeting the stats section (Make sure index.html has this specific border-top class)
    const statsSection = document.querySelector('.py-5.border-top');
    if(statsSection) {
        counterObserver.observe(statsSection);
    }
});