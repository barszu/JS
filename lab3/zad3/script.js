// requestFrame na glowym bo zlagowalo licznik
// setInterval , setTimeout - na osobnym watku,
//              czeka na zwolnienie stosu kiedy sie wykonalo i jest wrzucane na stos

let animation;
let counter = 0;

function startAnimation() {
  document.forms[0].start.disabled = true;
  document.forms[0].stop.disabled = false;
  animation = window.requestAnimationFrame(step);
}

function step() {
  document.forms[0].counter.value = counter++;
  animation = window.requestAnimationFrame(step);
}

function stopAnimation() {
  document.forms[0].start.disabled = false;
  document.forms[0].stop.disabled = true;
  window.cancelAnimationFrame(animation)
}



function calculatePrimesInBackground(iterations) {
  // window.alert('Implement missing functionality')
  const worker = new Worker('worker.js');
  worker.postMessage({iterations});

  worker.onmessage = function (MessageEvent) {
    const {res} = MessageEvent.data;
    document.forms[0].result_worker.value = res;

  }
  worker.onerror = function (error) {
    console.log(error);
    window.alert(`Error in worker: ${error}`);
  }

}