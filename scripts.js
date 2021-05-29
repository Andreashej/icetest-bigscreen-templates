const template = new SingleRider();

const test = async () => {
    await template.nextRider("Marie-Louise Skjønnemand", "Kilja fra Kjarri", "red");

    const marks = [6.0, 6.5, 5.5, 6.0, 5.5];
    
    for (const [i, mark] of marks.entries()) {
        template.addJudgeMarks([4.5,5,5.5,6.0,5], mark, i + 1);
    }

    await template.addFinalMark(7.07);
}

document.addEventListener("DOMContentLoaded", test);