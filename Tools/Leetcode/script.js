const speedRewards = [{
        name: "First Contest Submission",
        coins: 200
    },
    {
        name: "Top 200",
        coins: 50
    },
    {
        name: "Top 100",
        coins: 100
    },
    {
        name: "Top 50",
        coins: 300
    },
    {
        name: "3rd Place",
        coins: 1000
    },
    {
        name: "2nd Place",
        coins: 2500
    },
    {
        name: "1st Place",
        coins: 5000
    },
];

let bonusCoins = 0;

function loadRewards() {
    let html = "";

    speedRewards.forEach((r, i) => {
        html += `
<div class="speedItem">
<div>
<b>${r.name}</b><br>
<span class="green">+${r.coins}</span>
</div>
<div>
<button onclick="applyReward(${i})">Apply</button>
<button onclick="undoReward(${i})">Undo</button>
</div>
</div>`;
    });

    document.getElementById("speedGrid").innerHTML = html;
}

loadRewards();

function applyReward(i) {
    bonusCoins += speedRewards[i].coins;
    calculate();
}

function undoReward(i) {
    bonusCoins -= speedRewards[i].coins;
    if (bonusCoins < 0) bonusCoins = 0;
    calculate();
}

function resetAll() {
    bonusCoins = 0;

    document.getElementById("currentCoins").value = 0;
    document.getElementById("targetCoins").value = 9400;
    document.getElementById("weekly").checked = false;
    document.getElementById("biweekly").checked = false;
    document.getElementById("startDate").value = "";

    document.getElementById("timeline").innerHTML = "";
    document.getElementById("progressBar").style.width = "0%";
}

function calculate() {

    const startValue = document.getElementById("startDate").value;
    if (!startValue) {
        alert("Choose start date");
        return;
    }

    let current = Number(document.getElementById("currentCoins").value) + bonusCoins;
    let target = Number(document.getElementById("targetCoins").value);

    const weekly = document.getElementById("weekly").checked;
    const biweekly = document.getElementById("biweekly").checked;

    let date = new Date(startValue);
    let timeline = "";
    let dayCount = 0;

    let solvedThisMonth = 0;
    let got25Bonus = false;

    let month = date.getMonth();

    while (current < target) {

        dayCount++;
        date.setDate(date.getDate() + 1);

        // reset month
        if (date.getMonth() != month) {
            month = date.getMonth();
            solvedThisMonth = 0;
            got25Bonus = false;
        }

        solvedThisMonth++;
        current += 10;

        // 25 solve bonus
        if (!got25Bonus && solvedThisMonth == 25) {
            current += 25;
            got25Bonus = true;
        }

        // month end bonus
        const tomorrow = new Date(date);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (tomorrow.getMonth() != date.getMonth()) {
            const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            if (solvedThisMonth >= daysInMonth) {
                current += 50;
            }
        }

        // weekly
        if (weekly && !biweekly) {
            if (dayCount % 7 == 0) current += 5;
        }

        // biweekly
        if (!weekly && biweekly) {
            if (dayCount % 14 == 0) current += 5;
        }

        // both
        if (weekly && biweekly) {
            if (dayCount % 14 == 0) current += 35;
        }

        if (dayCount > 10000) break;
    }

    document.getElementById("timeline").innerHTML = timeline;

    document.getElementById("rDate").innerHTML = date.toDateString();
    document.getElementById("rDays").innerHTML = dayCount;
    document.getElementById("rWeeks").innerHTML = (dayCount / 7).toFixed(1);

    document.getElementById("rCurrent").innerHTML = current;
    document.getElementById("rTarget").innerHTML = target;
    document.getElementById("rNeed").innerHTML = Math.max(0, target - current);

    document.getElementById("progressBar").style.width =
        Math.min(100, (current / target) * 100) + "%";
}