// "There is no place like 127.0.0.1" - Unknown
// BOOT.SYS v1.0 - The Angry Hermit, 2025

class BootMenu {
    constructor() {
        this.bootStatus = document.getElementById('bootStatus');
        this.bootLog = document.getElementById('bootLog');
        this.items = Array.from(document.querySelectorAll('.boot-item'));
        this.currentIndex = Math.max(0, this.items.findIndex(item => item.classList.contains('selected')));
        this.booting = false;
        this.init();
    }

    init() {
        const container = document.querySelector('.boot-container');
        if (container) container.style.display = '';
        
        this.booting = false;
        document.addEventListener('keydown', e => this.handleKeyPress(e));
        this.setStatus('System ready.');
    }

    handleKeyPress(e) {
        if (this.booting) return;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.moveSelection(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.moveSelection(1);
                break;
            case 'Enter':
                e.preventDefault();
                this.bootProject();
                break;
            case 'Escape':
                e.preventDefault();
                this.exitBootMenu();
                break;
        }
    }

    moveSelection(direction) {
        this.items[this.currentIndex].classList.remove('selected');
        this.currentIndex = (this.currentIndex + direction + this.items.length) % this.items.length;
        this.items[this.currentIndex].classList.add('selected');
    }

    bootProject() {
        const selectedItem = this.items[this.currentIndex];
        const projectName = selectedItem.dataset.project;
        const projectUrl = selectedItem.dataset.url;
        const isJsos = projectName.toLowerCase() === 'jsos';

        this.booting = true;
        this.setStatus(`Booting ${projectName}...`);
        
        // 640K ought to be enough for anybody
        const fillerPool = [
            'Loading device drivers...',
            'Calibrating flux capacitor...',
            'Negotiating with caches...',
            'Dusting off floppy drives...',
            'Optimizing coffee-to-code ratio...',
            'Spinning up hamster wheel...',
            'Untangling ethernet cables...',
            'Warming up CRT glow...',
            'Patching memory leaks with duct tape...',
            'Reticulating splines...' // Easter egg: SimCity reference
        ];

        const jsosExtras = [
            'Checking kernel integrity...',
            'Priming bootloader vectors...',
            'Mounting root filesystem...',
            'Starting init process...',
            'Enabling VGA text mode...'
        ];

        const messageCount = isJsos ? 5 : 3;
        const pool = isJsos ? fillerPool.concat(jsosExtras) : fillerPool;
        const fillerMessages = this.pickRandomMessages(pool, messageCount);

        let elapsed = 0;
        fillerMessages.forEach(msg => {
            elapsed += isJsos ? this.randomInRange(300, 700) : this.randomInRange(200, 600);
            setTimeout(() => this.setStatus(msg), elapsed);
        });

        elapsed += isJsos ? this.randomInRange(450, 900) : this.randomInRange(350, 750);
        setTimeout(() => {
            this.setStatus(`Initializing ${projectName} subsystem...`);
        }, elapsed);

        if (isJsos) {
            elapsed += this.randomInRange(400, 800);
            setTimeout(() => {
                this.setStatus('Bringing services online...');
            }, elapsed);

            elapsed += this.randomInRange(400, 800);
            setTimeout(() => {
                this.setStatus('Ready to launch desktop...');
            }, elapsed);
        }

        elapsed += isJsos ? this.randomInRange(500, 1000) : this.randomInRange(350, 750);
        setTimeout(() => {
            if (projectUrl) {
                this.setStatus(`Redirecting to ${projectUrl}`);
                this.hideAndRedirect(() => window.location.href = projectUrl);
            } else {
                this.setStatus(`Boot complete (no URL configured)`);
                alert(`Boot sequence complete!\n\nProject: ${projectName}\n\n(No URL configured)`);
                this.booting = false;
            }
        }, elapsed);
    }

    exitBootMenu() {
        this.booting = true;
        this.setStatus('Exiting boot menu...');
        setTimeout(() => {
            alert('Boot menu closed. (Exit functionality would be implemented here)');
            this.booting = false;
            this.setStatus('System ready.');
        }, 1000);
    }

    setStatus(message) {
        const timestamp = this.timestamp();
        this.bootStatus.textContent = `[${timestamp}] ${message}`;
    }

    hideAndRedirect(callback, duration = 600) {
        const container = document.querySelector('.boot-container');
        if (container) container.style.display = 'none';
        setTimeout(callback, duration);
    }

    pickRandomMessages(list, count) {
        // Fisher-Yates would be proud (or horrified)
        return [...list].sort(() => Math.random() - 0.5).slice(0, count);
    }

    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    timestamp() {
        return new Date().toLocaleTimeString([], { hour12: false });
    }
}

// "It works on my machine" ¯\_(ツ)_/¯
document.addEventListener('DOMContentLoaded', () => new BootMenu());
