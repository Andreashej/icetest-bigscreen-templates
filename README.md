# Icetest templates

This repository contains templates, styling and scripts for handling output to a screen or livestream in Icetest.

All functions are promise-based, so it is possible to use .then or async/await to listen for animations to end.

## Single rider output

To interact with the template, make an instance of the class SingleRider in the Javascript:

`const template = new SingleRider()`

The single rider template consist of two main parts.

### Rider Info

The rider info must contain three `div`s for color, rider name and horse name. The divs should be empty when the DOM is rendered, but should have the classes specified in the template.

To display info for a rider, do the following:

`template.nextRider(riderName: string, horseName: string, color: string)`

The color is optional, and will default to red.

Calling this function will clear the screen of all content, and display the information for the new rider.

### Results

The results can be rendered in different ways, depending on how the test is setup:

If marks are entered normally through the "Enter marks"-screen, only the `div`s with the classes `.row .section-marks .tot` and `.final-mark .tot` are needed.

If secretary marks are available, the `div`s must be rendered as shown in the template.

If using secretary mode, the marks for each section can be shown when the judge has locked the marks:

`template.addJudgeMarks(sectionMarks: Array<string | number>, total: number | string, judge: number)`

sectionMarks is an array of that judge's marks from all sections, and can be either strings or numbers. If no section marks are available, pass an empty array. If they are strings, the following is assumed:

R, Y or B means a red, yellow or blue card. In case a yellow or blue card and a mark is given, it can be given in the following format: "Y5.5".

The same values are valid for the total for the judge, which represents what would be shown by the judge.

For pace, where red or white flags are shown, "W" or "R" can be passed instead of a mark.

The final parameter "judge" is the position of the judge, usually, 1 - 5.

When all section marks has been given and locked, the final mark is calculated. It is then put on the screen by calling this function:

`template.addFinalMark(mark: number | string)`

If a normal mark is given, it is passed as a number. If the result state, a string can be passed to display, e.g. "ELIM" or "DISQ";

When calling this function, the results will be shown on the screen for 30 seconds by default. The time can be modified on the class:

`template.autoProgressTime = 20000`

The screen can be cleared manually at any time by calling

`template.clearScreen()`

## Group test and finals

The group test template has the same functions as the single-rider output, and supports both grouptests and finals. It is initialised from another class:

`const template = new Group()`

It has an additional function:

`template.nextGroup(riders: Array<{ name: string, horse: string, color: string }>)`

This template does not support section marks, so when calling `addJudgeMarks()`, the first parameter must always be an empty array. It takes an additional parameter, section, which can be passed for finals, to display the section name.

To reset the marks for a section and display the horse name again, call

`template.resetMarks()`

## Start lists and result lists

Startlists and result lists must be built according to the templates. They use the class Fullscreen, which has some additional methods. By default, it will automatically flip through the pages every 10 seconds.

It is initialised the following way:

`const template = new Fullscreen(finalMarkRounding: number, autoProgressTime: number, autoProgress: boolean)`

By default it automatically progresses, but it can be disabled, and progressing can be handled manually by calling:

`template.nextPage()`

When the template is no longer used, it must be destroyed to remove all interval timers, that will interfere if a new object is instatiated at a later point. Calling destroy will also clear the screen.

`template.destroy()`