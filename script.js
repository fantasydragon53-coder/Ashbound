// =========================
// CANVAS SETUP
// =========================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// =========================
// STATE
// =========================
let state = "LOGO";

// =========================
// IMAGES
// =========================
let logo = new Image();
logo.src = "Assets/logo.png"

let splashBG = new Image();
splashBG.src = "Assets/splash_background.png";

let playBtn = new Image();
playBtn.src = "Assets/play_button.png";

let menuBG = new Image();
menuBG.src = "Assets/menu_bg.png";

let storyBtn = new Image();
storyBtn.src = "Assets/story.png";

let skillsBtn = new Image();
skillsBtn.src = "Assets/skills.png";

let weaponsBtn = new Image();
weaponsBtn.src = "Assets/weapons.png";

let settingsBtn = new Image();
settingsBtn.src = "Assets/settings.png";

let shopBtn = new Image();
shopBtn.src = "Assets/shop.png";

let rateBtn = new Image();
rateBtn.src = "Assets/rate_us.png";

// =========================
// LOGO ANIMATION
// =========================
let logoAlpha = 0;
let logoTimer = 0;

// =========================
// POSITIONS
// =========================
let playX = canvas.width * 0.7;
let playY = canvas.height * 0.6;
let playW = 200;
let playH = 80;

// MENU POSITIONS
let storyX = canvas.width * 0.3;
let storyY = canvas.height * 0.6;

let skillsX = canvas.width * 0.2;
let skillsY = canvas.height * 0.3;

let weaponsX = canvas.width * 0.45;
let weaponsY = canvas.height * 0.3;

let panelW = canvas.width * 0.3;
let panelH = panelW * 0.6;

let smallW = canvas.width * 0.18;
let smallH = smallW * 0.6;

// RIGHT BUTTONS (TOUCHING EDGE)
let btnW = canvas.width * 0.18;
let btnH = btnW * 0.4;

let settingsX = canvas.width - btnW;
let shopX = canvas.width - btnW;
let rateX = canvas.width - btnW;

let settingsY = canvas.height * 0.7;
let shopY = settingsY - btnH - 10;
let rateY = shopY - btnH - 10;

// =========================
// GAME LOOP
// =========================
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
gameLoop();

// =========================
// UPDATE
// =========================
function update() {

    if (state === "LOGO") {
        if (logoAlpha < 1) {
            logoAlpha += 0.02;
        } else {
            logoTimer += 0.016;
            if (logoTimer > 1.5) {
                state = "SPLASH";
            }
        }
    }
}

// =========================
// DRAW
// =========================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (state === "LOGO") drawLogo();
    else if (state === "SPLASH") drawSplash();
    else if (state === "MENU") drawMenu();
}

// =========================
// LOGO SCREEN
// =========================
function drawLogo() {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("LOGO SCREEN", 100, 100);
    }
}

// =========================
// SPLASH SCREEN
// =========================
function drawSplash() {
    ctx.drawImage(splashBG, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(playBtn, playX, playY, playW, playH);
}

// =========================
// MENU
// =========================
function drawMenu() {
    ctx.drawImage(menuBG, 0, 0, canvas.width, canvas.height);

    // DARK OVERLAY
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // LEFT PANELS
    ctx.drawImage(storyBtn, storyX, storyY, panelW, panelH);
    ctx.drawImage(skillsBtn, skillsX, skillsY, smallW, smallH);
    ctx.drawImage(weaponsBtn, weaponsX, weaponsY, smallW, smallH);

    // RIGHT BUTTONS
    ctx.drawImage(settingsBtn, settingsX, settingsY, btnW, btnH);
    ctx.drawImage(shopBtn, shopX, shopY, btnW, btnH);
    ctx.drawImage(rateBtn, rateX, rateY, btnW, btnH);
}

// =========================
// INPUT
// =========================
canvas.addEventListener("click", function(e) {
    let x = e.clientX;
    let y = e.clientY;

    if (state === "SPLASH") {
        if (isInside(x, y, playX, playY, playW, playH)) {
            state = "MENU";
        }
    }
});

// =========================
// HITBOX
// =========================
function isInside(x, y, bx, by, bw, bh) {
    return x > bx && x < bx + bw && y > by && y < by + bh;
}