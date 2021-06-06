class SingleRider extends BigscreenTemplate {
    timer;

    constructor(finalMarkRounding = 2, autoProgressTime = 30000) {
        super(finalMarkRounding);
        this.autoProgressTime = autoProgressTime;
    }

    nextRider = async (riderName, horseName, color = 'red', groupIndex = "", clear = true) => {
        if (clear) {
            const done = await this.clearScreen();
        }
    
        const riderInfo = document.getElementById("riderInfo" + groupIndex);
    
        riderInfo.querySelector(".rider").innerText = riderName;
        const horseLine = riderInfo.querySelector(".horse")
        horseLine.innerText = horseName;

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
        return new Promise((resolve, reject) => {
            const results = document.querySelector("#riderResults");
        
            const judgeSectionMarks = results.querySelectorAll(`.results-table .section-marks:not(.tot) .mark:nth-child(${judge})`);

            if (judgeSectionMarks.length < sectionMarks.length) {
                reject("You passed in too many section marks!");
                return;
            } else if (judgeSectionMarks.length > sectionMarks.length) {
                reject("You passed in too few section marks");
                return;
            }
            
            judgeSectionMarks.forEach((element, i) => {
                const sectionMark = sectionMarks[i];
                
                element.innerHTML = this.parseMark(sectionMark);
            });

            const totalElement = results.querySelector(`.results-table .section-marks.tot .mark:nth-child(${judge})`);

            totalElement.innerHTML = this.parseMark(total);

            if (results.classList.contains("cleared")) {
                results.classList.remove("cleared");
        
            
                results.addEventListener("animationend", () => {
                    resolve("Results are on screen");
                }, { once: true })
            } else {
                resolve("Results are on screen");
            }
        
        })
    
    }
    
    addFinalMark = async (mark) => {
        return new Promise((resolve, reject) => {
            const finalMark = document.querySelector("#riderResults .final-mark.tot")
            if (isNaN(mark)) {
                finalMark.innerText = mark;
            } else {
                finalMark.innerText = mark.toFixed(this.finalMarkRounding);
            }
        
            this.timer = setTimeout(this.clearScreen, this.autoProgressTime);

            const results = document.getElementById("riderResults");
            if (results.classList.contains("cleared")) {
                results.classList.remove("cleared");
    
                results.addEventListener("animationend", () => {
                    resolve("Final mark is on screen");
                }, { once: true })
            } else {
                resolve("Final mark is on screen");
            }
        })
    }

}