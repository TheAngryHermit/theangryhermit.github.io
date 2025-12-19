// Boot Menu Manager
class BootMenu {
    constructor() {
        this.bootList = document.getElementById('bootList');
        this.bootStatus = document.getElementById('bootStatus');
        this.bootLog = document.getElementById('bootLog');
        this.items = Array.from(document.querySelectorAll('.boot-item'));
        this.currentIndex = this.items.findIndex((item) => item.classList.contains('selected'));
        this.currentIndex = this.currentIndex >= 0 ? this.currentIndex : 0;
        this.booting = false;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
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
        this.currentIndex += direction;

        // Wrap around
        if (this.currentIndex < 0) {
            this.currentIndex = this.items.length - 1;
        } else if (this.currentIndex >= this.items.length) {
            this.currentIndex = 0;
        }

        this.items[this.currentIndex].classList.add('selected');
    }

    bootProject() {
        const selectedItem = this.items[this.currentIndex];
        const projectName = selectedItem.dataset.project;
        const projectUrl = selectedItem.dataset.url;
        const isJsos = projectName.toLowerCase() === 'jsos';

        this.booting = true;
        this.setStatus(`Booting ${projectName}...`);
        const fillerPool = [
            'Loading device drivers...',
            'Calibrating flux capacitor...',
            'Negotiating with caches...',
            'Dusting off floppy drives...',
            'Optimizing coffee-to-code ratio...',
            'Spinning up hamster wheel...',
            'Untangling ethernet cables...',
            'Warming up CRT glow...',
            'Patching memory leaks with duct tape...'
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
        fillerMessages.forEach((message) => {
            const delay = isJsos ? this.randomInRange(300, 700) : this.randomInRange(200, 600);
            elapsed += delay;
            setTimeout(() => {
                this.setStatus(message);
            }, elapsed);
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
                this.showBlackout(() => {
                    window.location.href = projectUrl;
                });
            } else {
                this.setStatus(`Boot sequence complete for ${projectName} (no URL configured).`);
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

    log(message) {
        // Logging disabled; single status line only.
        if (!this.bootLog) return;
        this.bootLog.innerHTML = '';
    }

    pickRandomMessages(list, count) {
        const shuffled = [...list].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    showBlackout(callback, duration = 600) {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.inset = '0';
        overlay.style.background = '#1a1a1a';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        document.body.appendChild(overlay);

        setTimeout(() => {
            callback();
        }, duration);
    }

    timestamp() {
        return new Date().toLocaleTimeString([], { hour12: false });
    }
}

// Initialize boot menu when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new BootMenu();
});
