const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle= document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo= document.getElementById('complete-info');
const completeBtn= document.getElementById('complete-btn');


let countdownTitle='';
let countdownDate='';
let countdownActive;
let countdownValue=Date;
let second = 1000;
let minute = second*60;
let hour = minute*60;
let day = hour*24;
let savedCountdown;

// Set Date Input Min With todays date

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);




// update DOm / COmplete UI

function updateDOM(){
   countdownActive = setInterval(()=>{
    const now = new Date().getTime();
    const distance = countdownValue-now;

    const days = Math.floor((distance/day));
    const hours= Math.floor((distance%day)/hour);
    const minutes = Math.floor((distance%hour)/minute);
    const seconds = Math.floor((distance%minute)/second);


    // Hide input
    inputContainer.hidden=true;

    if (distance < 0){
        countdownEl.hidden=true;
        clearInterval(countdownActive);
        completeInfo.textContent= `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden=false;
    }else{
        // show countdown in progress
        countdownElTitle.textContent= `${countdownTitle}`;
        timeElements[0].textContent= `${days}`;
        timeElements[1].textContent= `${hours}`;
        timeElements[2].textContent=`${minutes}`;
        timeElements[3].textContent= `${seconds}`;
        completeEl.hidden=true;
        countdownEl.hidden=false;
    }
   }, second)
}

//  Take values from form input

function updateCountdown(e){
    e.preventDefault();
    countdownTitle= e.srcElement[0].value;
    countdownDate= e.srcElement[1].value;
    savedCountdown={
        title: countdownTitle,
        date: countdownDate
    };
    console.log(savedCountdown);
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // check for valid date
    if (countdownDate===''){
        alert('Please select a valid date');
    }else{
       countdownValue = new Date(countdownDate).getTime();
    updateDOM(); 
    }
}

// reset all values

function reset (){
    // hide countdown show input
    countdownEl.hidden=true;
    inputContainer.hidden=false;
    completeEl.hidden=true;
    // stop countdown
    clearInterval(countdownActive);
    // reset values
    countdownTitle='';
    countdownDate='';
    localStorage.removeItem('countdown')
}

function checkPreviousCountdown(){
    if(localStorage.getItem('countdown')){
       savedCountdown= JSON.parse(localStorage.getItem('countdown'));
       countdownDate= savedCountdown.date;
       countdownTitle= savedCountdown.title;
       countdownValue= new Date(countdownDate).getTime();
       updateDOM();
    }
}

// Even listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// on load

checkPreviousCountdown();