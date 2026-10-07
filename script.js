const root = document.documentElement;
        const themeToggle = document.getElementById("theme-toggle");
        const savedTheme = localStorage.getItem("portfolio-theme");
        if (savedTheme) root.dataset.theme = savedTheme;
        themeToggle.addEventListener("click", () => {
            const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
            if (nextTheme === "dark") delete root.dataset.theme;
            else root.dataset.theme = nextTheme;
            localStorage.setItem("portfolio-theme", nextTheme);
            themeToggle.textContent = nextTheme === "light" ? "☾" : "☼";
        });

        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "×" : "☰";
        });
        navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }));

        document.querySelectorAll(".filter-button").forEach(button => {
            button.addEventListener("click", () => {
                document.querySelectorAll(".filter-button").forEach(item => item.classList.remove("active"));
                button.classList.add("active");
                const filter = button.dataset.filter;
                document.querySelectorAll(".project-card").forEach(card => {
                    card.classList.toggle("hidden-project", filter !== "all" && card.dataset.category !== filter);
                });
            });
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: .12 });
        document.querySelectorAll(".reveal").forEach(item => observer.observe(item));

        document.getElementById("year").textContent = new Date().getFullYear();
        document.querySelector(".contact-form").addEventListener("submit", () => {
            document.getElementById("form-status").textContent = "Sending your message…";
        });
