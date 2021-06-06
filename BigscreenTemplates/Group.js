class Group extends SingleRider {
    async clearScreen() {
        await super.clearScreen();

        return new Promise((resolve, reject) => {
            const defaultElement = document.querySelectorAll(".info .line.secondary .default");

            defaultElement.forEach((element) => {
                element.classList.remove("hidden", "hide", "show");
            })
    
            const hiddenElements = document.querySelectorAll(".info .line.secondary > :not(.default)");
    
            hiddenElements.forEach((element) => {
                element.classList.remove("hide", "show");
                element.classList.add("hidden");
            });

            resolve();
        });
    }

    nextGroup = async (riders) => {
        await this.clearScreen();

        riders.forEach(async (rider, index) => {
            await this.nextRider(rider.name, rider.horse, rider.color, index + 1, false);
        });

        return Promise.resolve();
    }

    fadeToLine = async (selectorToHide, selectorToShow, parent = "") => {
        let parentElement = document.querySelectorAll(`${parent}.info`);

        const elementsToHide = [];
        parentElement.forEach((element) => elementsToHide.push(element.querySelector(`.line.secondary ${selectorToHide}`)));
        const elementsToShow = [];
        parentElement.forEach(element => elementsToShow.push(element.querySelector(`.line.secondary ${selectorToShow}`)));

        if (elementsToHide.length < 1) {
            reject("Element to hide does not exist");
        }

        if (elementsToShow.length < 1) {
            reject("Element to show does not exist");
        }

        const promises = [];
        
        elementsToHide.forEach((elementToHide, index) => {
            const elementToShow = elementsToShow[index];

            if (elementToHide.classList.contains("hidden")) {
                return;
            }

            elementToHide.classList.add("hide")

            const promise = new Promise((resolve, reject) => {
                elementToHide.addEventListener("animationend", (e) => {
                    console.log("remove hide");
                    elementToHide.classList.remove("hide");
                    elementToHide.classList.add("hidden");
        
                    elementToShow.classList.remove("hidden");
                    elementToShow.classList.add("show");
        
                    elementToShow.addEventListener("animationend", (e) => {
                        elementToShow.classList.remove("show");
                        resolve();
                    }, { once: true });
                }, { once: true } )
            });

            promises.push(promise);
        });


        return Promise.all(promises);
    }

    addJudgeMarks = async (marks, finalMark, judge, rider, section = "") => {
        const riderElement = document.getElementById("riderInfo" + rider);

        const horseElement = riderElement.querySelector(".horse");
        horseElement.classList.add("hide");

        const marksElement = riderElement.querySelector(".marks");

        const sectionElement = riderElement.querySelector(".section-name")
        const finalMarkElement = riderElement.querySelector(".final-mark");
        if (section) {
            sectionElement.innerHTML = section;
            sectionElement.classList.remove("hidden");
            finalMarkElement.classList.add("hidden");
        } else {
            sectionElement.classList.add("hidden");
            finalMarkElement.classList.remove("hidden");
        }

        marksElement.querySelector(`.mark:nth-child(${judge})`).innerHTML = this.parseMark(finalMark);

        await this.fadeToLine(".horse", ".marks", `#riderInfo${rider}`);

    }

    resetMarks = async () => {
        const markElements = document.querySelectorAll(".mark");

        await this.fadeToLine(".marks", ".horse");

        markElements.forEach(element => {
            element.innerHTML = loadingIcon;
        })
    }

    addFinalMark = async (mark, rider, autoClear = true) => {
        const riderElement = document.getElementById("riderInfo" + rider);

        const marksElement = riderElement.querySelector(".marks");

        marksElement.querySelector(".final-mark").innerHTML = mark;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (autoClear) {
            this.timer = setTimeout(this.clearScreen, this.autoProgressTime);
        }

        return Promise.resolve();
    }
}