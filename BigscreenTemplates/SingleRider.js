class SingleRider extends BigscreenTemplate {
    timer;

    constructor(autoProgressTime = 30000) {
        super();
        this.autoProgressTime = autoProgressTime;
    }
    
    nextRider = async (riderName, horseName, color) => {
        const done = await this.clearScreen();
    
        const riderInfo = document.getElementById("riderInfo");
    
        riderInfo.querySelector(".rider").innerText = riderName;
        riderInfo.querySelector(".horse").innerText = horseName;
        const colorElement = riderInfo.querySelector(".color-wrapper")
        colorElement.classList.remove(colorList)
        colorElement.classList.add(color);
    
        riderInfo.classList.remove("cleared");
    
        return new Promise((resolve, reject) => {
            try {
                riderInfo.addEventListener("animationend", () => {
                    resolve("Rider info is on screen");
                }, { once: true });
            } catch (e) {
                reject(e);
            }
        });
    
    }
    
    addJudgeMarks = async (sectionMarks, total, judge) => {
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
    
        results.classList.remove("cleared");
    
        return new Promise((resolve, reject) => {
            results.addEventListener("animationend", () => {
                resolve("Results are on screen");
            }, { once: true })
        })
    
    }
    
    addFinalMark = async (mark) => {
        const finalMark = document.querySelector("#riderResults .final-mark.tot")
        if (isNaN(mark)) {
            finalMark.innerText = mark;
        } else {
            finalMark.innerText = mark.toFixed(1);
        }
    
        this.timer = setTimeout(this.clearScreen, this.autoProgressTime);
    }

}