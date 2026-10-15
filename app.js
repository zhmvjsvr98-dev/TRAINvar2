// =========================
// TOMS
// Train Operation Management System
// app.js
// =========================

const loginScreen =
document.getElementById("loginScreen");

const dashboardScreen =
document.getElementById("dashboardScreen");

const loginBtn =
document.getElementById("loginBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const rememberLogin =
document.getElementById("rememberLogin");

const currentDateTime =
document.getElementById("currentDateTime");

// =========================
// LOGIN
// =========================

function showDashboard() {

    loginScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");

}

function showLogin() {

    dashboardScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");

}

// =========================
// LOGIN BUTTON
// =========================

loginBtn?.addEventListener("click", () => {

    showDashboard();

    if (rememberLogin.checked) {
        localStorage.setItem(
            "tomsLoggedIn",
            "true"
        );
    } else {
        localStorage.removeItem(
            "tomsLoggedIn"
        );
    }

});

// =========================
// LOGOUT
// =========================

logoutBtn?.addEventListener("click", () => {

    localStorage.removeItem(
        "tomsLoggedIn"
    );

    showLogin();

});

// =========================
// AUTO LOGIN
// =========================

window.addEventListener("load", () => {

    const isLoggedIn =
    localStorage.getItem(
        "tomsLoggedIn"
    );

    if (isLoggedIn === "true") {

        showDashboard();

    } else {

        showLogin();

    }

});

// =========================
// CLOCK
// =========================

function updateDateTime() {

    const now = new Date();

    const year =
    now.getFullYear();

    const month =
    String(
        now.getMonth() + 1
    ).padStart(2, "0");

    const day =
    String(
        now.getDate()
    ).padStart(2, "0");

    const hour =
    String(
        now.getHours()
    ).padStart(2, "0");

    const minute =
    String(
        now.getMinutes()
    ).padStart(2, "0");

    const second =
    String(
        now.getSeconds()
    ).padStart(2, "0");

    const weekdays = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ];

    const weekday =
    weekdays[now.getDay()];

    if (currentDateTime) {

        currentDateTime.textContent =
        `${year}/${month}/${day} (${weekday}) ${hour}:${minute}:${second}`;

    }

}

updateDateTime();

setInterval(
    updateDateTime,
    1000
);

// =========================
// SIDEBAR ACTIVE EFFECT
// =========================

const menuItems =
document.querySelectorAll(
    ".sidebar li"
);

menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            menuItems.forEach(el => {
                el.classList.remove(
                    "active"
                );
            });

            item.classList.add(
                "active"
            );

        }
    );

});

// =========================
// LINE TAB
// =========================

const routeTabs =
document.querySelectorAll(
    ".tab"
);

routeTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            routeTabs.forEach(t => {
                t.classList.remove(
                    "active"
                );
            });

            tab.classList.add(
                "active"
            );

        }
    );

});

// =========================
// KPI CARD HOVER GLOW
// =========================

const cards =
document.querySelectorAll(
    ".stat-card"
);

cards.forEach(card => {

    card.addEventListener(
        "mouseenter",
        () => {

            card.style.boxShadow =
            "0 0 25px rgba(30,136,229,.35)";

        }
    );

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.boxShadow =
            "";

        }
    );

});

// =========================
// SIMULATED LIVE NOTICE
// =========================

const notices = [
    "中央線 高尾駅付近で速度規制実施",
    "山手線 平常運転を継続中",
    "京浜東北線 一部車両点検実施",
    "総武線 設備点検完了",
    "東海道線 混雑情報更新",
    "宇都宮線 通常運転中"
];

function addNotice() {

    const noticeList =
    document.querySelector(
        ".notice-list"
    );

    if (!noticeList) return;

    const item =
    document.createElement("div");

    item.className =
    "notice-item";

    const now =
    new Date();

    const time =
    String(
        now.getHours()
    ).padStart(2,"0") +
    ":" +
    String(
        now.getMinutes()
    ).padStart(2,"0");

    item.innerHTML =
    `<span>${time}</span> ${notices[Math.floor(Math.random()*notices.length)]}`;

    noticeList.prepend(item);

    while (
        noticeList.children.length > 5
    ) {
        noticeList.removeChild(
            noticeList.lastElementChild
        );
    }

}

// デモ用
setInterval(
    addNotice,
    30000
);

// =========================
// DASHBOARD START EFFECT
// =========================

window.addEventListener(
    "load",
    () => {

        const panels =
        document.querySelectorAll(
            ".panel, .stat-card"
        );

        panels.forEach(
            (panel,index) => {

                panel.style.opacity = "0";
                panel.style.transform =
                "translateY(15px)";

                setTimeout(() => {

                    panel.style.transition =
                    ".5s ease";

                    panel.style.opacity = "1";

                    panel.style.transform =
                    "translateY(0)";

                }, index * 80);

            }
        );

    }
);

// =========================
// SVG TRAIN BLINK
// =========================

const trainIcons =
document.querySelectorAll(
    "svg circle"
);

setInterval(() => {

    trainIcons.forEach(icon => {

        icon.style.opacity =
        icon.style.opacity === "0.4"
        ? "1"
        : "0.4";

    });

}, 1200);

// =========================
// END
// =========================