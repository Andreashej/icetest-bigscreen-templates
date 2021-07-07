var client = Stomp.client('xxx');
client.heartbeat.outgoing = 30000; // client will send heartbeats every 30000ms
client.heartbeat.incoming = 30000;
client.debug = function(msg) {};
var on_connect = function(x) {
    id = client.subscribe("/exchange/ticker", function(d) {
      onMessage(d);
      var objPushedRaw2 = JSON.parse( d.body );
        console.log(objPushedRaw2);
    });
  };
  
var on_error =  function() {
    console.log('error');
};
  
client.connect('yyy', 'zzz', on_connect, on_error, 'southpole');

// Process the message
async function onMessage(evt) {
    var objPushedRaw = JSON.parse( evt.body );
  
    if (objPushedRaw.MESSAGE.TYPE != "videowall") {
        return;
      }

    var objPushed = (typeof objPushedRaw.MESSAGE == 'string') ? JSON.parse( objPushedRaw.MESSAGE ) : objPushedRaw.MESSAGE;
    console.log(objPushed);

    // sample for MESSAGE.TEMPLATE = "riderinfo":
    const template = new SingleRider();
    await template.nextRider(objPushed.DATA.RIDER, objPushed.DATA.HORSE, objPushed.DATA.COLOR);
    var empty = [];
    await template.addJudgeMarks(empty, 5.5, 1);
    await template.addFinalMark(5.77);
    
  
    timeout = 250; // reset the timeout to a short value in case we lose the connection.
    delay = Math.floor(Math.random() * Math.floor(3000));    
}

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
const testGroup = async () => {
    const template = new Group();

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

const template = new Fullscreen(2, 0, false);
const testFullscreen = async () => {

    // await template.showLines(0,8);

    // console.log("finished showing");

    // setTimeout(() => {
    //     template.hideLines().then(() => {
    //         template.showLines(9, 17).then(() => {
    //             console.log("finished");
    //         });
    //     });
    // }, 1000)

}

document.addEventListener("DOMContentLoaded", testFullscreen);