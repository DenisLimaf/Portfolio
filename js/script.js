/**
 * PORTFÓLIO - SCRIPT PRINCIPAL
 * Gerenciamento de modais, transições e efeitos interativos
 */

const modalData = {
    experiencias: {
        tag: 'Experiências',
        title: 'Experiências pessoais',
        icon: '💻',
        link: 'pages/experiencias.html'
    },
    habilidades: {
        tag: 'Habilidades',
        title: 'Habilidades',
        icon: '⚡',
        link: 'pages/habilidades.html'
    },
    objetivos: {
        tag: 'Objetivos',
        title: 'Objetivos',
        icon: '🎯',
        link: 'pages/objetivos.html'
    }
};

let hoverCount = 0;
let currentModalKey = '';
let activeEffect = null;
let animationFrameId = null;

let mouseX = -1000;
let mouseY = -1000;

// Inicializa os event listeners do ícone do modal para easter eggs
const modalIcon = document.getElementById('modal-icon');

if (modalIcon) {
    modalIcon.addEventListener('mouseenter', () => {
        hoverCount++;

        if (hoverCount === 21) {
            if (currentModalKey === 'experiencias') {
                startMatrixEffect();
            } else if (currentModalKey === 'habilidades') {
                startTechEffect();
            } else if (currentModalKey === 'objetivos') {
                startContactEffect();
            }
        }
    });
}

const overlay = document.getElementById('modal-overlay');

if (overlay) {
    overlay.addEventListener('mousemove', (e) => {
        const rect = overlay.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
}

/**
 * Abre o modal para navegar até a página detalhada
 * @param {string} key - Chave do card ('experiencias', 'habilidades', 'objetivos')
 */
function openModal(key) {
    const data = modalData[key];
    if (!data) return;

    currentModalKey = key;
    hoverCount = 0;

    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalIconEl = document.getElementById('modal-icon');

    if (modalTag) modalTag.textContent = data.tag;
    if (modalTitle) {
        modalTitle.textContent = data.title;
        modalTitle.href = data.link;
    }
    if (modalIconEl) modalIconEl.textContent = data.icon;

    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Fecha o modal
 */
function closeModal(event, force = false) {
    if (force || (event && event.target && event.target.id === 'modal-overlay')) {
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        stopEffects();
        hoverCount = 0;
        currentModalKey = '';
    }
}

/**
 * Para e limpa efeitos do canvas
 */
function stopEffects() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    activeEffect = null;

    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        canvas.classList.remove('active');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    const modalCard = document.querySelector('.modal-card');
    if (modalCard) {
        modalCard.style.display = '';
    }

    const modalIcon = document.getElementById('modal-icon');
    if (modalIcon && currentModalKey === 'objetivos') {
        modalIcon.textContent = '🎯';
    }
}

function setupCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return null;

    canvas.classList.add('active');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return canvas;
}

/* ==========================================================================
   1. EFEITO MATRIX (EXPERIÊNCIAS)
   ========================================================================== */

function startMatrixEffect() {
    const canvas = setupCanvas();
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    activeEffect = 'matrix';

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890';
    const alphabet = katakana.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const rainDrops = Array(columns).fill(1);

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    function loop(timestamp) {
        if (activeEffect !== 'matrix') return;

        animationFrameId = requestAnimationFrame(loop);
        const delta = timestamp - lastTime;
        if (delta < interval) return;

        lastTime = timestamp - (delta % interval);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet[Math.floor(Math.random() * alphabet.length)];
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    }

    animationFrameId = requestAnimationFrame(loop);
}

/* ==========================================================================
   2. EFEITO HACKER (HABILIDADES)
   ========================================================================== */

function startTechEffect() {
    const canvas = setupCanvas();
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    activeEffect = 'tech';

    const techList = [
        'HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'GIT', 'GITHUB',
        'UI_UX', 'NODE_JS', 'REST_API', 'SQL', 'TYPESCRIPT'
    ];

    const particles = [];
    const sparks = [];
    const hackingLogs = [
        '>> INITIALIZING SYSTEM OVERRIDE...',
        '>> BYPASSING SECURITY LAYER 1...',
        '>> CORRUPTING CSS FIREWALLS...',
        '>> INJECTING JAVASCRIPT PAYLOAD...',
        '>> DECRYPTING SKILLS DATABASE...'
    ];

    let hackPhase = 'floating';
    let phaseStartTime = Date.now();

    function getEncryptedText(original, progress) {
        let result = '';
        const chars = '!@#$%&*()_+-=[]{}|;:,./?';
        for (let i = 0; i < original.length; i++) {
            if (i < progress) {
                result += original[i];
            } else {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }
        return result;
    }

    function spawnText() {
        const text = techList[Math.floor(Math.random() * techList.length)];
        particles.push({
            x: Math.random() * (canvas.width - 250) + 150,
            y: canvas.height + 30,
            vx: (Math.random() - 0.5) * 1.0,
            vy: -(Math.random() * 1.5 + 1.2),
            originalText: text,
            displayText: getEncryptedText(text, 0),
            progress: 0,
            frameCounter: 0,
            fontSize: Math.floor(Math.random() * 6) + 18,
            popped: false
        });
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(spawnText, i * 1000);
    }

    function loop() {
        if (activeEffect !== 'tech') return;

        animationFrameId = requestAnimationFrame(loop);
        const now = Date.now();
        const elapsed = now - phaseStartTime;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (hackPhase === 'floating') {
            ctx.fillStyle = '#00ff00';
            ctx.font = '14px Courier New, monospace';

            if (Math.random() < 0.015 && hackingLogs.length < 25) {
                const extraLogs = [
                    `>> ACCESS_GRANTED: MODULE_${techList[Math.floor(Math.random() * techList.length)]}`,
                    '>> MEMORY DUMP PREPARED...',
                    '>> FETCHING DATABASE TABLES...',
                    '>> CRACKING ROOT PRIVILEGES...'
                ];
                hackingLogs.push(extraLogs[Math.floor(Math.random() * extraLogs.length)]);
                if (hackingLogs.length > 20) hackingLogs.shift();
            }

            hackingLogs.forEach((log, index) => {
                ctx.fillText(log, 20, 40 + index * 24);
            });

            if (Math.random() < 0.02 && particles.length < 10) {
                spawnText();
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.frameCounter++;

                if (p.frameCounter % 15 === 0 && p.progress < p.originalText.length) {
                    p.progress++;
                }

                p.displayText = getEncryptedText(p.originalText, p.progress);
                ctx.font = `bold ${p.fontSize}px Courier New, monospace`;

                const textWidth = ctx.measureText(p.displayText).width;
                const textHeight = p.fontSize;
                const dist = Math.hypot((p.x + textWidth / 2) - mouseX, (p.y - textHeight / 2) - mouseY);

                if (dist < 40 && !p.popped) {
                    p.popped = true;
                    for (let s = 0; s < 10; s++) {
                        sparks.push({
                            x: p.x + textWidth / 2,
                            y: p.y - textHeight / 2,
                            vx: (Math.random() - 0.5) * 5,
                            vy: (Math.random() - 0.5) * 5,
                            char: Math.random() < 0.5 ? '0' : '1',
                            fontSize: Math.floor(Math.random() * 6) + 12,
                            life: 1.0
                        });
                    }
                }

                if (p.y < -30 || p.popped) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.fillStyle = p.progress < p.originalText.length ? '#39ff14' : '#00ff00';
                ctx.fillText(p.displayText, p.x, p.y);
            }

            for (let i = sparks.length - 1; i >= 0; i--) {
                const s = sparks[i];
                s.x += s.vx;
                s.y += s.vy;
                s.life -= 0.025;

                if (s.life <= 0) {
                    sparks.splice(i, 1);
                    continue;
                }

                ctx.font = `${s.fontSize}px Courier New, monospace`;
                ctx.fillStyle = `rgba(0, 255, 0, ${s.life})`;
                ctx.fillText(s.char, s.x, s.y);
            }

            if (elapsed >= 10000) {
                hackPhase = 'loading';
                phaseStartTime = Date.now();
                const modalCard = document.querySelector('.modal-card');
                if (modalCard) modalCard.style.display = 'none';
            }
        } else if (hackPhase === 'loading') {
            const progressRatio = Math.min(elapsed / 6000, 1);
            ctx.fillStyle = '#00ff00';
            ctx.font = '28px Courier New, monospace';
            ctx.textAlign = 'center';
            ctx.fillText('HABILIDADES CARREGADAS COM SUCESSO', canvas.width / 2, canvas.height / 2 - 50);

            const barWidth = 400;
            const barHeight = 30;
            const x = canvas.width / 2 - barWidth / 2;
            const y = canvas.height / 2;

            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, barWidth, barHeight);

            ctx.fillStyle = '#00ff00';
            ctx.fillRect(x + 4, y + 4, (barWidth - 8) * progressRatio, barHeight - 8);

            ctx.font = '16px Courier New, monospace';
            ctx.fillText(`${Math.floor(progressRatio * 100)}%`, canvas.width / 2, y + barHeight + 30);
            ctx.textAlign = 'left';

            if (progressRatio >= 1) {
                setTimeout(() => {
                    stopEffects();
                    window.location.href = 'pages/habilidades.html';
                }, 1000);
            }
        }
    }

    animationFrameId = requestAnimationFrame(loop);
}

/* ==========================================================================
   3. EFEITO AVIÃO (OBJETIVOS)
   ========================================================================== */

function startContactEffect() {
    const canvas = setupCanvas();
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    activeEffect = 'contact';

    const modalIcon = document.getElementById('modal-icon');
    if (modalIcon) modalIcon.textContent = '✈️';

    const plane = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: 0,
        speed: 5,
        time: 0
    };

    const trail = [];

    function loop() {
        if (activeEffect !== 'contact') return;

        animationFrameId = requestAnimationFrame(loop);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        plane.time += 0.015;
        const targetX = canvas.width / 2 + Math.sin(plane.time) * (canvas.width * 0.35);
        const targetY = canvas.height / 2 + Math.sin(plane.time * 2) * (canvas.height * 0.25);

        const dx = targetX - plane.x;
        const dy = targetY - plane.y;
        plane.angle = Math.atan2(dy, dx);

        plane.x += Math.cos(plane.angle) * plane.speed;
        plane.y += Math.sin(plane.angle) * plane.speed;

        trail.push({
            x: plane.x,
            y: plane.y,
            life: 1.0,
            radius: Math.random() * 4 + 2
        });

        for (let i = trail.length - 1; i >= 0; i--) {
            const t = trail[i];
            t.life -= 0.015;

            if (t.life <= 0) {
                trail.splice(i, 1);
                continue;
            }

            ctx.beginPath();
            ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(30, 58, 138, ${t.life * 0.5})`;
            ctx.fill();
        }

        ctx.save();
        ctx.translate(plane.x, plane.y);
        ctx.rotate(plane.angle + Math.PI / 2);
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✈️', 0, 0);
        ctx.restore();
    }

    animationFrameId = requestAnimationFrame(loop);
}
