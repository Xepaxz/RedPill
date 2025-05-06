const canvas = document.getElementById("wireframe");
const ctx = canvas.getContext("2d");

// Resize the canvas to cover the entire viewport but not cover the footer
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60; // Adjust height to leave space for the footer
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Shape {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 100 + 20;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = `rgba(255, 0, 0, ${this.opacity})`;
        this.rotation = Math.random() * Math.PI * 2;
        this.type = Math.floor(Math.random() * 5);
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        if (this.type === 0) { 
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.stroke();
        } else if (this.type === 1) { 
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.stroke();
        } else if (this.type === 2) {
            ctx.beginPath();
            ctx.moveTo(-this.size / 2, 0);
            ctx.lineTo(this.size / 2, 0);
            ctx.stroke();
        } else if (this.type === 3) { 
            ctx.beginPath();
            ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.stroke();
        } else {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                let angle = (Math.PI / 3) * i;
                let x = Math.cos(angle) * this.size / 2;
                let y = Math.sin(angle) * this.size / 2;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += 0.01;
        if (this.x > canvas.width) this.x = 0;
        if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y < 0) this.y = canvas.height;
    }
}

let shapes = Array.from({ length: 50 }, () => new Shape());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });
    requestAnimationFrame(animate);
}
animate();

// Info Box Toggle Functionality
document.addEventListener("DOMContentLoaded", function () {
    const howItWorksLink = document.getElementById("how-it-works-link");
    const infoBox = document.getElementById("info-box");
    const exitButton = document.getElementById("exit-button");

    howItWorksLink.addEventListener("click", function (event) {
        event.preventDefault(); 
        infoBox.classList.add("show");
    });

    exitButton.addEventListener("click", function () {
        infoBox.classList.remove("show");
    });
});
// Theme toggle functionality
document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        themeToggle.checked = true;
    }

    themeToggle.addEventListener("change", function () {
        if (themeToggle.checked) {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        }
    });
});
