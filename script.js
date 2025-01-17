// math functions
const hourStartInp = document.querySelector("#hourStart")
const minStartInp = document.querySelector("#minStart")
const secStartInp = document.querySelector("#secStart")
const hourEndInp = document.querySelector("#hourEnd")
const minEndInp = document.querySelector("#minEnd")
const secEndInp = document.querySelector("#secEnd")
const calcBtn = document.querySelector("#calculate")
const utskriftEl = document.querySelector("#utskrift")

function saveData() {
    const data = {
        hourStart: hourStartInp.value,
        minStart: minStartInp.value,
        secStart: secStartInp.value,
        hourEnd: hourEndInp.value,
        minEnd: minEndInp.value,
        secEnd: secEndInp.value,
        utskrift: utskriftEl.innerHTML
    };

    chrome.storage.sync.set({ data }, () => {
        console.log('data savevd:', data );
    });
}

function loadData() {
    chrome.storage.sync.get(['data'], (result) => {
      if (result.data) {
        hourStartInp.value = result.data.hourStart;
        minStartInp.value = result.data.minStart;
        secStartInp.value = result.data.secStart;
        hourEndInp.value = result.data.hourEnd;
        minEndInp.value = result.data.minEnd;
        secEndInp.value = result.data.secEnd;
        utskriftEl.innerHTML = result.data.utskrift;
      }
    });
  }
   
  loadData();


 function performCalculation() {
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

    //local storage logic
    utskriftEl.innerHTML = (
        `Total time: ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds.<br><br>
        Total hours: ${totalHours}<br><br>
        Total minutes: ${totalMinutes}<br><br>
        Total seconds: ${totalSeconds}`
    );

// Save the data after calculation
saveData();
};

calcBtn.onclick = performCalculation;

[hourStartInp, minStartInp, secStartInp, hourEndInp, minEndInp, secEndInp].forEach(input => {
    input.addEventListener('keypress', (event) => {
      if (event.key === "Enter" || event.keyCode === 13) {
        performCalculation();
      }})})