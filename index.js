// use this variable to set the timing of progress bar
let timing = 2;

// use this variable to control coundDownTimer waiting time
let countDownTimerTime = 15;

var countDownTimer;

// get btnSubmit
const btnSubmit = document.getElementById('btnSubmit');

// hide svg card at start
$('#svg-card').css('display', 'none');

const optionButton = (e) => {
    if (e.classList.contains('optionOne')) {
        e.classList.remove('optionOne')
        e.classList.add('optionTwo')
        e.innerHTML = `Option B`;
        formText.innerHTML = `My Form Version B`
        body.classList.add('gradient1')
        body.classList.remove('gradient');
        // $('#adddedSuccessfull').css('display', 'none')
        $('.growing-bar').removeClass('growing_barA')
        $('.growing-bar').removeClass('growing_barBPurple')
        $('.growing-bar').addClass('growingBarAnimation')
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.remove('animate__fadeIn')
        $('.confetti__button').attr('disabled', 'false');
        $('.confetti__button').css('cursor', 'default');
    }
    else {
        e.classList.remove('optionTwo');
        e.classList.add('optionOne');
        e.innerHTML = `Option A`;
        formText.innerHTML = `My Form Version A`
        body.classList.remove('gradient1')
        body.classList.add('gradient')
        // $('#adddedSuccessfull').css('display', 'none')
        $('.growing-bar').removeClass('growingBarAnimation')
        $('.growing-bar').removeClass('growing_barBPurple')
        $('.growing-bar').addClass('growing_barA')
        glass2.classList.remove('animate__fadeInRight')
        glass2.classList.remove('animate__fadeIn')
        $('.confetti__button').attr('disabled', 'false')
        $('.confetti__button').css('cursor', 'default');
    }
}

// reset the form
const clickToReturn = (e) => {
    location.reload();
}

function startProgressBar() {
    console.log("startProgressBar");

    // hide the submit button
    btnSubmit.style.display = 'none';

    let glass1 = document.getElementById('glass1');
    let glass2 = document.getElementById('glass2');

    glass1.classList.add('animate__fadeOut');

    setTimeout(() => {
        glass1.style.display = 'none';
        $('#barid').css('display', 'block');
        $('.growing-bar').css('animation', `${timing}s linear 0s 1 normal none running fill`);
    }, 1000);


    setTimeout(() => {
        $('#barid').css('display', 'none');
        glass2.style.display = 'flex';

        glass2.classList.add('animate__fadeInRight');
    }, timing * 1000);


    // add p element to the glass2_textrows
    addTextRow('You can use your code for next ' + countDownTimerTime + ' minutes.', "");
    addTextRow('15:00', 2, "countDownText");
    addTextRow('Thanks!', 3, "");
    addTextRow('Waiting for answer..', 4, "");

    // get 15 minutes time from now
    startCountdownTimer();

    optionDIv.classList.add('buttonDIvOptoveride');
}

function startCountdownTimer() {
    let countDownTime = new Date();
    countDownTime.setMinutes(countDownTime.getMinutes() + countDownTimerTime);

    // Update the count down every 1 second
    countDownTimer = setInterval(function () {
        // Get today's date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownTime - now;

        // Time calculations for days, hours, minutes and seconds
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countDownText").innerHTML = minutes + "m " + seconds + "s ";
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(countDownTimer);
            document.getElementById("countDownText").innerHTML = "COUNTDOWN EXPIRED";

            // enable button
            btnSubmit.style.display = 'block';
            btnSubmit.value = "Start Over";
            // reload the page on click
            btnSubmit.addEventListener('click', clickToReturn);
        }

        // run the fake process every minute
        if (seconds == 1) {
            // console log
            console.log("running fakeProcess2 at " + minutes + ":" + seconds);
            fakeProcess2();
        }

    }, 1000);
}

function addTextRow(text, delay, id) {
    let glass2Textrows = document.getElementById('glass2_textrows');
    let p = document.createElement('p');
    // if id is not null then add id to the p element
    if (id != "") {
        p.id = id;
    }
    p.innerHTML = text;

    // if delay is not 0 then add delay to the p element
    if (delay != 0) {
        setTimeout(() => {
            glass2Textrows.appendChild(p);
        }, (timing + delay) * 1000);
    } else {
        glass2Textrows.appendChild(p);
    }
}

// use this function to stop the progress bar
function stopProgressBar() {
    $('.growing-bar').css('animation', 'asad');
    $('#clickReturn').css('display', 'block');
    $('#barid').css('visibility', 'hidden');
}

function fakeProcess2() {
    // get a random true false
    let random = Math.random() >= 0.5;
    console.log("random: " + random);

    // if random is true then show the success message
    if (random) {
        let message = 'Messsage Received! Your code is valid!';
        addTextRow(message, 0, "");

        document.getElementById("countDownText").innerHTML = "COUNTDOWN ENDED";
        clearInterval(countDownTimer);
        btnSubmit.style.display = 'block';
        btnSubmit.value = "Ok!";
        // reload the page on click
        btnSubmit.addEventListener('click', clickToReturn);
    }
}

// long running process goes here
function fakeProcess() {
    let x = "Hello world! Done!!";

    // set fake timeout to simulate a long process
    // when the process is done, show the success message
    // and hide the progress bar
    setTimeout(function () {
        console.log("Timeout...");

        $('#adddedSuccessfull').html(x);
        $('#adddedSuccessfull').css('display', 'block');
        stopProgressBar();

        // show svg-card
        $('#svg-card').css('display', 'block');

        startCardAnimation();

        // get cardText1
        let cardText1 = document.getElementById('cardText1');
        let cardText2 = document.getElementById('cardText2');
        let cardText3 = document.getElementById('cardText3');

        // get the value of the first dropdown
        const dropdown1Value = dropdown1.options[dropdown1.selectedIndex].innerHTML;
        // get the value of the second dropdown
        const dropdown2Value = dropdown2.options[dropdown2.selectedIndex].innerHTML;

        cardText1.innerHTML = dropdown1Value;
        cardText2.innerHTML = dropdown2Value;

        // generate random phone number
        let phoneNumber = Math.floor(Math.random() * 10000000000000);
        cardText3.innerHTML = '+' + phoneNumber;


    }, `${timing}000`);
}

// once dropdown1 and dropdown2 are both selected, call startProgressBar and fakeProcess
const dropdown1 = document.getElementById('dropdown1');
const dropdown2 = document.getElementById('dropdown2');


// call startProgressBar and fakeProcess when btnSubmit is clicked
btnSubmit.addEventListener('click', function () {
    if (dropdown1.value != "" && dropdown2.value != "") {
        startProgressBar();
        fakeProcess();
    }
    else {
        alert("Please select both dropdown options");
    }
});

// const tl = startCardAnimation();

function startCardAnimation() {
    gsap.timeline()
        .set('svg', { opacity: 1 })
        .set('.scratches', { rotation: 70, x: 450, y: -10 })
        .set('#tri2', { scale: 0.5 })
        .from('#cardMask rect', { scale: 0, rotation: -20, duration: 2, transformOrigin: '50% 50%', ease: 'expo.inOut' }, 0)
        .to('#tri1', {
            motionPath: {
                path: "#midC",
                align: "#midC",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 1,
                end: 0
            }, duration: 6, repeat: -1, ease: 'none', repeatDelay: 1
        }, 0.5)
        .to('#tri2', {
            motionPath: {
                path: "#innerC",
                align: "#innerC",
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
                start: 0,
                end: 1
            }, duration: 5, repeat: -1, ease: 'none', repeatDelay: 1
        }, 1.5)
        .from('.coil', { attr: { 'stroke-dashoffset': (i) => (i == 1) ? -28 : 28 }, ease: 'none', duration: 1, repeat: -1 }, 1)
        .fromTo('#orb1', { y: 160 }, { y: -20, ease: 'circ', repeat: -1, yoyo: true, duration: 1 }, 0.8)
        .from('.logoPt', { x: (i) => [18, -10][i], duration: 1.2, ease: 'expo.inOut' }, 0.9)
        .from('svg text', { x: -40, duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
        .from('.txtBox', { scaleX: 0, transformOrigin: '100% 0', duration: 1.1, ease: 'expo.inOut', stagger: 0.2 }, 1)
        .fromTo('#wave1', { x: 0, y: 0 }, { duration: 5, x: -701, y: 815, repeat: -1, ease: 'none' }, 0)
        .fromTo('#wave2', { x: 0, y: 0 }, { duration: 6, x: 804, y: -917, repeat: -1, ease: 'none', onRepeat: () => starShine.play(0) }, 0)
    // .set("#cardText1", { text: "February435" });

    starShine = gsap.timeline()
        .set('#star', { scale: 0, transformOrigin: '50% 50%', x: 2, y: 10 })
        .to('#star', { scale: 1, repeat: 1, yoyo: true, yoyoEase: true, duration: 0.4, ease: 'power4' }, 0)
        .fromTo('#star', { rotate: -20 }, { rotate: 120, duration: 0.8, ease: 'none' }, 0);
}
