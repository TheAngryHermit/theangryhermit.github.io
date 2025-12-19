// Boot Menu Manager
class BootMenu {
    constructor() {
        this.bootList = document.getElementById('bootList');
        this.bootStatus = document.getElementById('bootStatus');
        this.items = Array.from(document.querySelectorAll('.boot-item'));
        this.currentIndex = 0;
        this.booting = false;

        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
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

        this.booting = true;
        this.bootStatus.textContent = `Booting ${projectName}...`;

        // Simulate boot sequence
        setTimeout(() => {
            this.bootStatus.textContent = `Loading device drivers...`;
        }, 500);

        setTimeout(() => {
            this.bootStatus.textContent = `Initializing ${projectName} subsystem...`;
        }, 1000);

        setTimeout(() => {
            // Navigate to URL if available
            if (projectUrl) {
                window.location.href = projectUrl;
            } else {
                alert(`Boot sequence complete!\n\nProject: ${projectName}\n\n(No URL configured)`);
                this.booting = false;
                this.bootStatus.textContent = '';
            }
        }, 2000);
    }

    exitBootMenu() {
        this.booting = true;
        this.bootStatus.textContent = 'Exiting boot menu...';
        setTimeout(() => {
            alert('Boot menu closed. (Exit functionality would be implemented here)');
            this.booting = false;
            this.bootStatus.textContent = '';
        }, 1000);
    }
}

// Initialize boot menu when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new BootMenu();
});
