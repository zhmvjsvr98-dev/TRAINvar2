/* =====================================
   TOMS
   Train Operation Management System
===================================== */

/* =====================================
   DOM
===================================== */

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

/* =====================================
   SCREEN CONTROL
===================================== */

function showDashboard(){

    loginScreen.classList.add("hidden");
    dashboardScreen.classList.remove("hidden");

}

function showLogin(){

    dashboardScreen.classList.add("hidden");
    loginScreen.classList.remove("hidden");

}

/* =====================================
   LOGIN
===================================== */

loginBtn?.addEventListener("click",()=>{

    showDashboard();

    if(rememberLogin.checked){

        localStorage.setItem(
            "toms_login",
            "true"
        );

    }else{

        localStorage.removeItem(
            "toms_login"
        );

    }

});

/* =====================================
   LOGOUT
===================================== */

logoutBtn?.addEventListener("click",()=>{

    localStorage.removeItem(
        "toms_login"
    );

    showLogin();

});

/* =====================================
   AUTO LOGIN
===================================== */

window.addEventListener("load",()=>{

    const loginState =
    localStorage.getItem(
        "toms_login"
    );

    if(loginState==="true"){

        showDashboard();

    }else{

        showLogin();

    }

});

/* =====================================
   CLOCK
===================================== */

function updateClock(){

    const now = new Date();

    const weeks = [
        "日",
        "月",
        "火",
        "水",
        "木",
        "金",
        "土"
    ];

    const yyyy =
    now.getFullYear();

    const mm =
    String(
        now.getMonth()+1
    ).padStart(2,"0");

    const dd =
    String(
        now.getDate()
    ).padStart(2,"0");

    const hh =
    String(
        now.getHours()
    ).padStart(2,"0");

    const mi =
    String(
        now.getMinutes()
    ).padStart(2,"0");

    const ss =
    String(
        now.getSeconds()
    ).padStart(2,"0");

    const ww =
    weeks[now.getDay()];

    if(currentDateTime){

        currentDateTime.textContent =
        `${yyyy}/${mm}/${dd} (${ww}) ${hh}:${mi}:${ss}`;

    }

}

updateClock();

setInterval(
    updateClock,
    1000
);

/* =====================================
   SIDEBAR
===================================== */

const sidebarItems =
document.querySelectorAll(
    ".sidebar li"
);

sidebarItems.forEach(item=>{

    item.addEventListener("click",()=>{

        sidebarItems.forEach(li=>{

            li.classList.remove(
                "active"
            );

        });

        item.classList.add(
            "active"
        );

    });

});

/* =====================================
   LINE BUTTON
===================================== */

const lineButtons =
document.querySelectorAll(
    ".line-btn"
);

lineButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        lineButtons.forEach(b=>{

            b.classList.remove(
                "active"
            );

        });

        btn.classList.add(
            "active"
        );

    });

});

/* =====================================
   KPI GLOW
===================================== */

const kpiCards =
document.querySelectorAll(
    ".kpi-card"
);

kpiCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
        "translateY(-4px) scale(1.02)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
        "translateY(0) scale(1)";

    });

});

/* =====================================
   PANEL ANIMATION
===================================== */

window.addEventListener("load",()=>{

    const panels =
    document.querySelectorAll(
        ".dashboard-panel,.kpi-card"
    );

    panels.forEach(
        (panel,index)=>{

            panel.style.opacity="0";
            panel.style.transform=
            "translateY(20px)";

            setTimeout(()=>{

                panel.style.transition=
                ".5s ease";

                panel.style.opacity="1";

                panel.style.transform=
                "translateY(0)";

            },index*80);

        }
    );

});

/* =====================================
   SVG TRAIN MOVEMENT
===================================== */

const train1 =
document.getElementById("train1");

const train2 =
document.getElementById("train2");

const train3 =
document.getElementById("train3");

let t1 = 0;
let t2 = 0.33;
let t3 = 0.66;

/* 路線1周 */

function trainPosition(t){

    let x;
    let y;

    if(t < 0.25){

        const p = t / 0.25;

        x = 150 + p * 670;
        y = 70;

    }else if(t < 0.5){

        const p = (t - 0.25) / 0.25;

        x = 820;
        y = 70 + p * 260;

    }else if(t < 0.75){

        const p = (t - 0.5) / 0.25;

        x = 820 - p * 670;
        y = 330;

    }else{

        const p =
        (t - 0.75) / 0.25;

        x = 150;
        y = 330 - p * 260;

    }

    return {x,y};

}

/* =====================================
   TRAIN LOOP
===================================== */

function animateTrains(){

    t1 += 0.0012;
    t2 += 0.0010;
    t3 += 0.0015;

    if(t1 > 1) t1 = 0;
    if(t2 > 1) t2 = 0;
    if(t3 > 1) t3 = 0;

    const p1 =
    trainPosition(t1);

    const p2 =
    trainPosition(t2);

    const p3 =
    trainPosition(t3);

    if(train1){

        train1.setAttribute(
            "transform",
            `translate(${p1.x},${p1.y})`
        );

    }

    if(train2){

        train2.setAttribute(
            "transform",
            `translate(${p2.x},${p2.y})`
        );

    }

    if(train3){

        train3.setAttribute(
            "transform",
            `translate(${p3.x},${p3.y})`
        );

    }

    requestAnimationFrame(
        animateTrains
    );

}

animateTrains();

/* =====================================
   DELAY TRAIN BLINK
===================================== */

let blink = true;

setInterval(()=>{

    blink = !blink;

    if(train2){

        train2.style.opacity =
        blink ? "1" : "0.4";

    }

},600);

/* =====================================
   LIVE NOTICE
===================================== */

const noticeMessages = [

"中央線 一部区間で速度規制中",
"上野駅構内 設備点検実施",
"山手線 平常運転を継続中",
"京浜東北線 運転調整中",
"信号設備点検完了",
"運転整理を実施しています",
"車両入換作業を実施中"

];

function addNotice(){

    const list =
    document.querySelector(
        ".notice-list"
    );

    if(!list) return;

    const item =
    document.createElement(
        "div"
    );

    item.className =
    "notice-item";

    const now =
    new Date();

    const hh =
    String(
        now.getHours()
    ).padStart(2,"0");

    const mm =
    String(
        now.getMinutes()
    ).padStart(2,"0");

    const text =
    noticeMessages[
        Math.floor(
            Math.random() *
            noticeMessages.length
        )
    ];

    item.innerHTML =
    `${hh}:${mm} ${text}`;

    list.prepend(item);

    while(
        list.children.length > 6
    ){

        list.removeChild(
            list.lastElementChild
        );

    }

}

setInterval(
    addNotice,
    30000
);

/* =====================================
   PANEL GLOW EFFECT
===================================== */

setInterval(()=>{

    const glowPanels =
    document.querySelectorAll(
        ".dashboard-panel"
    );

    glowPanels.forEach(panel=>{

        panel.style.boxShadow =
        "0 0 25px rgba(0,160,255,.08)";

        setTimeout(()=>{

            panel.style.boxShadow =
            "0 0 10px rgba(0,160,255,.03)";

        },800);

    });

},4000);

/* =====================================
   END
===================================== */