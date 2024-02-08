const hourStartInp = document.querySelector("#hourStart")
const minStartInp = document.querySelector("#minStart")
const secStartInp = document.querySelector("#secStart")
const hourEndInp = document.querySelector("#hourEnd")
const minEndInp = document.querySelector("#minEnd")
const secEndInp = document.querySelector("#secEnd")
const calcBtn = document.querySelector("#calculate")

const utskriftEl = document.querySelector("#utskrift")


calcBtn.onclick = () => {
    const hourStart = parseInt(hourStartInp.value) || 0;
    const minStart = parseInt(minStartInp.value) || 0;
    const secStart = parseInt(secStartInp.value) || 0;

    const hourEnd = parseInt(hourEndInp.value) || 0;
    const minEnd = parseInt(minEndInp.value) || 0;
    const secEnd = parseInt(secEndInp.value) || 0;

    let totalTimeSeconds = (hourEnd * 3600 + minEnd * 60 + secEnd) - (hourStart * 3600 + minStart * 60 + secStart);
    if (totalTimeSeconds < 0) {
        totalTimeSeconds += 24 * 3600;

    }

    const hours = Math.floor(totalTimeSeconds / 3600);
    const totalHours = parseFloat((totalTimeSeconds / 3600).toFixed(3));
    const totalMinutes = parseFloat((totalTimeSeconds /60).toFixed(3));
    const totalSeconds = totalTimeSeconds
    totalTimeSeconds %= 3600;

    const minutes = Math.floor(totalTimeSeconds / 60);
    const seconds = totalTimeSeconds % 60;
    
    

    utskriftEl.innerHTML = "";
    utskriftEl.innerHTML += (
        `Total time: ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds.<br><br>
        Total hours: ${totalHours}<br><br>
        Total minutes: ${totalMinutes}<br><br>
        Total seconds: ${totalSeconds}
    `);


};


