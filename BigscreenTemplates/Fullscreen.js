class Fullscreen extends BigscreenTemplate {
    interval = null;
    currentPage = 0;
    pageLength = 9;
    pages = 0;

    constructor(finalMarkRounding = 2, autoProgressTime = 10000, autoProgress = true) {
        super(finalMarkRounding);

        this.pages = Math.ceil(document.querySelectorAll(".line:not(.header)").length / this.pageLength) - 1;

        clearInterval(this.interval);

        this.nextPage().then(() => {
            if (autoProgress) {
                this.interval = setInterval(async () => {
                    await this.nextPage();
                }, autoProgressTime);
            }
        })

    }

    async clearScreen() {
        await this.hideLines();
        await super.clearScreen()
    }

    nextPage = async () => {
        if (this.currentPage > this.pages) this.currentPage = 0

        const startIndex = this.currentPage * this.pageLength;
        const endIndex = this.currentPage * this.pageLength + this.pageLength - 1

        await this.hideLines();
        
        await this.showLines(startIndex, endIndex);

        this.currentPage++;
    }

    showLines = async (startIndex, endIndex) => {
        const card = document.querySelector("#fullscreenTemplate")

        return new Promise((resolve, reject) => {
            const promises = []
            card.addEventListener("animationend", async () => {
                card.querySelectorAll(".line.hidden").forEach((line, index) => {
                    if (index < startIndex || index > endIndex) return;
    
                    const promise = new Promise((resolve, reject) => {
                        try {
                            line.classList.remove("hidden");
    
                            line.addEventListener("animationend", () => {
                                resolve();
                            }, {once: true});
                        } catch (e) {
                            reject(e);
                        }
                    });
                    promises.push(promise)
                });
                await Promise.all(promises);

                resolve()
            }, { once: true });
        })
    }

    hideLines = async () => {
        const card = document.querySelector("#fullscreenTemplate");

        return new Promise((resolve, reject) => {
            const promises = [];

            card.querySelectorAll(".line:not(.hidden,.header)").forEach((line) => {
                const promise = new Promise((resolve, reject) => {
                    try {
                        line.classList.add("hide");
            
                        line.addEventListener("animationend", () => {
                            line.classList.add("hidden");
                            line.classList.remove("hide");
                            resolve();
                        }, { once: true });
                    } catch (e) {
                        reject(e);
                    }
                });
                
                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve();
            });
        });
    }

    destroy = async () => {
        clearInterval(this.interval);

        await this.clearScreen();
    }
}