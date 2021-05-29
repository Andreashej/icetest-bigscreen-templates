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
    
    clearScreen = async () => {
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
                            element.querySelectorAll(".results-table .mark, .final-mark.tot").forEach(element => {
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
}