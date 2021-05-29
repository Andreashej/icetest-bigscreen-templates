const colorList = ["red","blue","green","yellow","white","purple","black"];

const loadingIcon = "<img class='loading' src='loading.svg' />";

const createCard = (type) => {

    switch(type) {
        case "R":
            return "<div class='card red'></div>";
        case "Y":
            return "<div class='card yellow'></div>";
        case "B":
            return "<div class='card blue'></div>";
    }
}

const clearScreen = async () => {
    const elementsToRemove = document.querySelectorAll("#riderInfo:not(.removing), #riderResults:not(.removing)");
    
    elementsToRemove.forEach(element => {
        element.classList.add("removing");
    })

    return new Promise((resolve, reject) => {
        try {
            if (elementsToRemove.length > 0) {
                elementsToRemove.forEach(element => {
                    element.addEventListener("animationend", (e) => {
                        element.querySelectorAll(".results-table .mark, .final-mark.tot").forEach(element => {
                            element.innerHTML = loadingIcon;
                        });
    
                        resolve("Animation done");
                    }, { once: true });
                })
            } else {
                resolve("No elementes to remove");
            }
        } catch (error) {
            reject(error);
        }
    })
}

const nextRider = async (riderName, horseName, color) => {
    const done = await clearScreen();

    console.log(done);

    const riderInfo = document.getElementById("riderInfo");

    riderInfo.querySelector(".rider").innerText = riderName;
    riderInfo.querySelector(".horse").innerText = horseName;
    const colorElement = riderInfo.querySelector(".color-wrapper")
    colorElement.classList.remove(colorList)
    colorElement.classList.add(color);

    riderInfo.classList.remove("removing");
}

const addJudgeMarks = async (sectionMarks, total, judge) => {
    const results = document.querySelector("#riderResults");

    const judgeSectionMarks = results.querySelectorAll(`.results-table .section-marks:not(.tot) .mark:nth-child(${judge})`);

    judgeSectionMarks.forEach((element, i) => {
        const sectionMark = sectionMarks[i];
        if (isNaN(sectionMark)) {
            let mark = null;
            const card = createCard(sectionMark[0]);
            if (sectionMark.length > 1) {
                mark = parseFloat(sectionMark.slice(1, 4)).toFixed(1);
            }

            element.innerHTML = (mark ? mark : "") + card;
        } else {
            element.innerText = sectionMark.toFixed(1);
        }
    })
    const totalElement = results.querySelector(`.results-table .section-marks.tot .mark:nth-child(${judge})`);

    if (isNaN(total)) {
        totalElement.innerHTML = createCard(total);
    } else {
        totalElement.innerText = total.toFixed(1);
    }

    results.classList.remove("removing");

}

const addFinalMark = async (mark) => {
    const finalMark = document.querySelector("#riderResults .final-mark.tot")
    if (isNaN(mark)) {
        finalMark.innerText = mark;
    } else {
        finalMark.innerText = mark.toFixed(1);
    }
}