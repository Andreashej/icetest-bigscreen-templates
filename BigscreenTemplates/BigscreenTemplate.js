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
        case "W":
            return "<div class='card white'></div>";
    }
}

class BigscreenTemplate {

    constructor(finalMarkRounding = 2) {
        this.finalMarkRounding = finalMarkRounding;
    }
    
    async clearScreen() {
        clearTimeout(this.timer);
        const elementsToRemove = document.querySelectorAll(".clear:not(.cleared)");
        
        elementsToRemove.forEach(element => {
            element.classList.add("cleared");
        })
    
        return new Promise((resolve, reject) => {
            try {
                if (elementsToRemove.length > 0) {
                    elementsToRemove.forEach(element => {
                        element.addEventListener("animationend", (e) => {
                            element.querySelectorAll(".mark, .final-mark.tot").forEach(element => {
                                element.innerHTML = loadingIcon;
                            });
        
                            resolve("Screen cleared");
                        }, { once: true });
                    })
                } else {
                    resolve("No elements to remove");
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    parseMark = (mark) => {
        if (isNaN(mark)) {
            let markText = null;
            const card = createCard(mark[0]);
            if (mark.length > 1) {
                markText = parseFloat(mark.slice(1, 4)).toFixed(this.finalMarkRounding - 1);
            }

            return (markText ? markText : "") + card;
        }
        
        return mark.toFixed(this.finalMarkRounding - 1);
    }
}