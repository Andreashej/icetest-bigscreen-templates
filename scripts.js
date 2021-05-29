const template = new SingleRider();

document.addEventListener("DOMContentLoaded", () => {
    
    template.nextRider("Marie-Louise Skjønnemand", "Kilja fra Kjarri", "red");
    
    for (let i = 1; i < 6; i++) {
        console.log(i);
        setTimeout(() => {
            template.addJudgeMarks([5.5,6.0,6.0,"R",6.5], 6.0, i);
        }, i * 1000);
    }

    setTimeout(() => {
        template.addFinalMark(6.0);
    }, 6000)

});