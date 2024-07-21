let pomodoroInterval;
let descansoInterval;
let isPomodoroRunning = false;
let isDescansoRunning = false;
const alertSound = document.querySelector('#alert-sound');

document.querySelector('#start-pomodoro').addEventListener('click', () => {
    startTimer('pomodoro');
});

document.querySelector('#pause-pomodoro').addEventListener('click', () => {
    pauseTimer('pomodoro');
});

document.querySelector('#reset-pomodoro').addEventListener('click', () => {
    resetTimer('pomodoro');
});

document.querySelector('#start-descanso').addEventListener('click', () => {
    startTimer('descanso');
});

document.querySelector('#pause-descanso').addEventListener('click', () => {
    pauseTimer('descanso');
});

document.querySelector('#reset-descanso').addEventListener('click', () => {
    resetTimer('descanso');
});

function openTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    document.querySelector(`.tab-button[onclick="openTab('${tabName}')"]`).classList.add('active');
    document.querySelector(`#${tabName}`).classList.add('active');
}

function startTimer(type) {
    let timerElement = document.querySelector(`#${type}-timer`);
    let [minutes, seconds] = timerElement.textContent.split(':').map(Number);
    
    if (type === 'pomodoro' && !isPomodoroRunning) {
        isPomodoroRunning = true;
        document.querySelector('#start-pomodoro').style.display = 'none';
        document.querySelector('#pause-pomodoro').style.display = 'inline-block';
        
        pomodoroInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(pomodoroInterval);
                    isPomodoroRunning = false;
                    alertSound.play();
                    resetTimer('pomodoro');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    } else if (type === 'descanso' && !isDescansoRunning) {
        isDescansoRunning = true;
        document.querySelector('#start-descanso').style.display = 'none';
        document.querySelector('#pause-descanso').style.display = 'inline-block';
        
        descansoInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(descansoInterval);
                    isDescansoRunning = false;
                    alertSound.play();
                    resetTimer('descanso');
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }, 1000);
    }
}

function pauseTimer(type) {
    if (type === 'pomodoro' && isPomodoroRunning) {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        document.querySelector('#start-pomodoro').style.display = 'inline-block';
        document.querySelector('#pause-pomodoro').style.display = 'none';
    } else if (type === 'descanso' && isDescansoRunning) {
        clearInterval(descansoInterval);
        isDescansoRunning = false;
        document.querySelector('#start-descanso').style.display = 'inline-block';
        document.querySelector('#pause-descanso').style.display = 'none';
    }
}

function resetTimer(type) {
    pauseTimer(type);
    
    if (type === 'pomodoro') {
        document.querySelector('#pomodoro-timer').textContent = '25:00';
        document.querySelector('#start-pomodoro').style.display = 'inline-block';
        document.querySelector('#pause-pomodoro').style.display = 'none';
    } else if (type === 'descanso') {
        document.querySelector('#descanso-timer').textContent = '05:00';
        document.querySelector('#start-descanso').style.display = 'inline-block';
        document.querySelector('#pause-descanso').style.display = 'none';
    }
}
