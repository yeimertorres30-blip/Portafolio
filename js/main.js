(() => {
    'use strict';

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const THEME_KEY = 'portfolio-theme';
    const root = document.documentElement;
    const toggleBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        if (theme === 'light') {
            root.setAttribute('data-theme', 'light');
        } else {
            root.removeAttribute('data-theme');
        }
        toggleBtn?.setAttribute('aria-pressed', String(theme === 'light'));
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

    toggleBtn?.addEventListener('click', () => {
        const isLight = root.getAttribute('data-theme') === 'light';
        const next = isLight ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
    });

    const burger = document.getElementById('burger');
    const nav = document.getElementById('main-nav');

    burger?.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        burger.classList.toggle('is-open', isOpen);
        burger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            nav?.classList.remove('is-open');
            burger?.classList.remove('is-open');
            burger?.setAttribute('aria-expanded', 'false');
        });
    });

    const emailBtn = document.getElementById('email-copy');
    const emailText = document.getElementById('email-text');

    emailBtn?.addEventListener('click', async () => {
        const email = emailBtn.dataset.email;
        try {
            await navigator.clipboard.writeText(email);
            const original = emailText.textContent;
            emailText.textContent = '¡Copiado!';
            setTimeout(() => { emailText.textContent = original; }, 1800);
        } catch {
            // Fallback silencioso si el navegador bloquea el portapapeles
            window.location.href = `mailto:${email}`;
        }
    });

    const canvas = document.getElementById('water-trail');
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canvas && canHover && !reducedMotion) {
        const ctx = canvas.getContext('2d');
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        let width, height;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        resize();
        window.addEventListener('resize', resize);

        const cursorDot = { x: width / 2, y: height / 2 };
        const target = { x: cursorDot.x, y: cursorDot.y };

        window.addEventListener('pointermove', (e) => {
            target.x = e.clientX;
            target.y = e.clientY;
        });

        const ripples = [];
        let lastRippleTime = 0;
        const RIPPLE_INTERVAL = 55; 

        function spawnRipple(x, y) {
            ripples.push({
                x, y,
                r: 2,
                alpha: 0.5,
                maxR: 34 + Math.random() * 18,
            });
            if (ripples.length > 40) ripples.shift();
        }

        window.addEventListener('pointermove', (e) => {
            const now = performance.now();
            if (now - lastRippleTime > RIPPLE_INTERVAL) {
                spawnRipple(e.clientX, e.clientY);
                lastRippleTime = now;
            }
        });

        function getWaterColor() {
            const val = getComputedStyle(document.body).getPropertyValue('--water').trim();
            return val || '#4FD1C5';
        }
        let waterColor = getWaterColor();
        
        const themeObserver = new MutationObserver(() => { waterColor = getWaterColor(); });
        themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

        function draw() {
            ctx.clearRect(0, 0, width, height);

            cursorDot.x += (target.x - cursorDot.x) * 0.22;
            cursorDot.y += (target.y - cursorDot.y) * 0.22;

            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += (rp.maxR - rp.r) * 0.09 + 0.4;
                rp.alpha *= 0.94;

                if (rp.alpha < 0.02) {
                    ripples.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
                ctx.strokeStyle = hexToRgba(waterColor, rp.alpha);
                ctx.lineWidth = 1.4;
                ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(cursorDot.x, cursorDot.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = hexToRgba(waterColor, 0.9);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(cursorDot.x, cursorDot.y, 10, 0, Math.PI * 2);
            ctx.strokeStyle = hexToRgba(waterColor, 0.35);
            ctx.lineWidth = 1;
            ctx.stroke();

            requestAnimationFrame(draw);
        }

        function hexToRgba(hex, alpha) {
            const clean = hex.replace('#', '');
            const bigint = parseInt(clean.length === 3
                ? clean.split('').map((c) => c + c).join('')
                : clean, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        requestAnimationFrame(draw);
    }

    const heroCanvas = document.getElementById('hero-waves');
    if (heroCanvas) {
        const hctx = heroCanvas.getContext('2d');
        let hw, hh, hdpr;

        function resizeHero() {
            const rect = heroCanvas.parentElement.getBoundingClientRect();
            hdpr = Math.min(window.devicePixelRatio || 1, 2);
            hw = rect.width;
            hh = rect.height;
            heroCanvas.width = hw * hdpr;
            heroCanvas.height = hh * hdpr;
            hctx.setTransform(hdpr, 0, 0, hdpr, 0, 0);
        }
        resizeHero();
        window.addEventListener('resize', resizeHero);

        function heroColor() {
            return getComputedStyle(document.body).getPropertyValue('--water').trim() || '#4FD1C5';
        }

        let t = 0;
        function drawHeroWaves() {
            hctx.clearRect(0, 0, hw, hh);
            const color = heroColor();
            const lines = 5;

            for (let i = 0; i < lines; i++) {
                hctx.beginPath();
                const amplitude = 14 + i * 4;
                const yBase = (hh / (lines + 1)) * (i + 1);
                for (let x = 0; x <= hw; x += 8) {
                    const y = yBase + Math.sin((x * 0.02) + t + i) * amplitude * 0.4;
                    if (x === 0) hctx.moveTo(x, y);
                    else hctx.lineTo(x, y);
                }
                hctx.strokeStyle = color;
                hctx.globalAlpha = 0.12 + (i / lines) * 0.14;
                hctx.lineWidth = 1.5;
                hctx.stroke();
            }
            hctx.globalAlpha = 1;

            if (!reducedMotion) {
                t += 0.012;
                requestAnimationFrame(drawHeroWaves);
            }
        }
        drawHeroWaves();
    }
})();
