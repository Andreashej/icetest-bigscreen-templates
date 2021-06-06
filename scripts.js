
const testSingle = async () => {
    const template = new SingleRider();

    await template.nextRider("Marie-Louise Skjønnemand", "Kilja fra Kjarri", "red");

    const marks = [6.0, 6.5, 5.5, 6.0, 5.5];
    
    for (const [i, mark] of marks.entries()) {
        setTimeout(async () => {
            await template.addJudgeMarks([4.5,5,5.5,6.0,5], mark, i + 1);
        }, i * 1000);
    }

    setTimeout(async () => {
        await template.addFinalMark(5.97);
    }, 6000);
}


const group = [
    {
        name: "Marie-Louise",
        horse: "Kilja fra Kjarri",
        color: "red"
    },
    {
        name: "Marie-Louise Skjønnemand",
        horse: "Kilja fra Kjarri",
        color: "blue"
    },
    {
        name: "Marie-Louise Skjønnemand",
        horse: "Kilja fra Kjarri",
        color: "green"
    },
    {
        name: "Marie-Louise Skjønnemand",
        horse: "Kilja fra Kjarri",
        color: "yellow"
    },
    {
        name: "Marie-Louise Skjønnemand",
        horse: "Kilja fra Kjarri",
        color: "white"
    },
    {
        name: "Marie-Louise Skjønnemand",
        horse: "Kilja fra Kjarri",
        color: "purple"
    },
]
const template = new Group();
const testGroup = async () => {

    await template.nextGroup(group);

    for (let j = 1; j <= 6; j++) {
        const marks = ["R", "R", "Y5.5", 6.0, 5.5];
        
        const promises = [];

        for (const [i, mark] of marks.entries()) {
                promises.push(template.addJudgeMarks([], mark, i + 1, j));
        }

        await Promise.all(promises);
    
        // await template.addFinalMark("ELIM", j, false);
    }
}

document.addEventListener("DOMContentLoaded", testGroup);