class Petal {
    constructor() {
        this.el = document.createElement('div');
        this.el.className = 'rose-petal';
        this.el.innerHTML = Math.random() > 0.5 ? '🌸' : '🌹';
        this.reset();
        this.el.onclick = (e) => {
            e.stopPropagation();
            const wishes = ["🌸 Luôn rạng rỡ nhé!", "💝 Hạnh phúc trọn vẹn!", "✨ Tỏa sáng rực rỡ!", "🌷 Ngày thật tuyệt vời!", "🌹 Mãi xinh đẹp!", "💖 Yêu đời nha!"];
            document.getElementById('wish-display').innerText = wishes[Math.floor(Math.random() * wishes.length)];
            this.el.style.opacity = '0';
            setTimeout(() => { this.reset(); this.el.style.opacity = '1'; }, 1000);
        };
        document.body.appendChild(this.el);
    }
    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -30;
        this.s = 1 + Math.random() * 2;
        this.r = Math.random() * 360;
    }
    update() {
        this.y += this.s;
        this.r += 1;
        const wave = Math.sin(this.y / 30) * 15; // Tạo hiệu ứng lắc lư
        this.el.style.top = this.y + 'px';
        this.el.style.left = (this.x + wave) + 'px';
        this.el.style.transform = `rotate(${this.r}deg)`;
        
        // Reset nếu rơi quá màn hình hoặc màn hình bị xoay làm thay đổi width/height
        if (this.y > window.innerHeight || this.x > window.innerWidth) this.reset();
    }
}

const App = {
    petals: [],
    env: document.getElementById('envelope'),
    init: function() {
        this.env.onclick = () => {
            if (this.env.classList.contains('open')) return;
            this.env.classList.add('open');
            setTimeout(() => {
                this.env.classList.add('zoom-out');
                setTimeout(() => {
                    for(let i=0; i<12; i++) this.petals.push(new Petal());
                    this.animate();
                }, 800);
            }, 2300);
        };
    },
    animate: function() {
        this.petals.forEach(p => p.update());
        requestAnimationFrame(() => this.animate());
    }
};
App.init();
