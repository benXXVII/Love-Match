/* =========================================
   LOVEMATCH JAVASCRIPT
   ========================================= */


/* Get HTML elements */
const name1Input = document.getElementById("name1");
const name2Input = document.getElementById("name2");

const calculateBtn = document.getElementById("calculateBtn");

const result = document.getElementById("result");

const resultName1 = document.getElementById("resultName1");
const resultName2 = document.getElementById("resultName2");

const percentage = document.getElementById("percentage");

const resultEmoji = document.getElementById("resultEmoji");

const resultTitle = document.getElementById("resultTitle");

const resultMessage = document.getElementById("resultMessage");

const progressBar = document.getElementById("progressBar");

const errorMessage = document.getElementById("errorMessage");

const tryAgainBtn = document.getElementById("tryAgainBtn");

const heartContainer = document.getElementById("heartContainer");

let percentageAnimationFrame;


/* =========================================
   NAME FORMATTING
   First letter uppercase
   Remaining letters lowercase
   ========================================= */

function formatName(name) {

    // Keep only the first name
    name = name.trim().split(/\s+/)[0];

    // Convert everything to lowercase
    name = name.toLowerCase();

    // Make first letter uppercase
    if (name.length > 0) {
        name =
            name.charAt(0).toUpperCase() +
            name.slice(1);
    }

    return name;
}


function allowLettersAndSpaces(input) {

    input.addEventListener("input", function () {

        const caretPosition = this.selectionStart;
        const allowedBeforeCaret =
            this.value.slice(0, caretPosition).replace(/[^\p{L} ]/gu, "");
        const allowedValue =
            this.value.replace(/[^\p{L} ]/gu, "");

        if (this.value !== allowedValue) {
            this.value = allowedValue;
            this.setSelectionRange(
                allowedBeforeCaret.length,
                allowedBeforeCaret.length
            );
        }
    });
}


allowLettersAndSpaces(name1Input);
allowLettersAndSpaces(name2Input);


/* =========================================
   CALCULATE LOVE
   ========================================= */

function calculateLove() {

    /* Get names */
    const rawName1 = name1Input.value;
    const rawName2 = name2Input.value;


    /* Check if names are empty */
    if (
        rawName1.trim() === "" ||
        rawName2.trim() === ""
    ) {

        errorMessage.textContent =
            "Please enter both names ❤️";

        result.classList.add("hidden");

        return;
    }

    if (
        !/^[\p{L} ]+$/u.test(rawName1) ||
        !/^[\p{L} ]+$/u.test(rawName2)
    ) {
        errorMessage.textContent =
            "Names can contain letters and spaces only.";

        result.classList.add("hidden");

        return;
    }


    /* Format names */
    const name1 = formatName(rawName1);
    const name2 = formatName(rawName2);


    /* Put formatted names back into inputs */
    name1Input.value = name1;
    name2Input.value = name2;


    /* Clear error */
    errorMessage.textContent = "";


    /* =====================================
       GENERATE RANDOM LOVE SCORE
       0 - 100
       ===================================== */

    const loveScore =
        Math.floor(Math.random() * 101);


    /* =====================================
       DISPLAY NAMES
       ===================================== */

    resultName1.textContent = name1;

    resultName2.textContent = name2;


    /* =====================================
       RESET RESULT
       ===================================== */

    result.classList.remove(
        "red",
        "yellow",
        "green",
        "blue"
    );


    /* Show result */
    result.classList.remove("hidden");


    /* =====================================
       RESULT CATEGORIES
       ===================================== */


    /*
        0 - 30
        Red + Sad
    */

    if (loveScore <= 30) {

        result.classList.add("red");

        resultEmoji.textContent = "😢";

        resultTitle.textContent =
            "A Little More Love Needed";

        resultMessage.textContent =
            `${name1} and ${name2}, your love score is a little low. Keep communicating and caring for each other! ❤️`;
    }


    /*
        31 - 69
        Yellow + Neutral
    */

    else if (loveScore <= 69) {

        result.classList.add("yellow");

        resultEmoji.textContent = "😐";

        resultTitle.textContent =
            "It's a Possibility!";

        resultMessage.textContent =
            `${name1} and ${name2}, there is some potential here. Keep getting to know each other! 💛`;
    }


    /*
        70 - 89
        Green + Happy
    */

    else if (loveScore <= 89) {

        result.classList.add("green");

        resultEmoji.textContent = "😊";

        resultTitle.textContent =
            "Great Love Match!";

        resultMessage.textContent =
            `${name1} and ${name2}, you two have a beautiful connection! Keep the love growing! 💚`;
    }


    /*
        90 - 100
        Blue + Celebration
    */

    else {

        result.classList.add("blue");

        resultEmoji.textContent = "🥳🎉🎊";

        resultTitle.textContent =
            "Perfect Love Match!";

        resultMessage.textContent =
            `${name1} and ${name2}, WOW! Your love score is incredible! You are a fantastic match! 🎉🥳💙`;
    }


    /* =====================================
       ANIMATE PERCENTAGE
       ===================================== */

    animatePercentage(loveScore);


    /* =====================================
       ANIMATE PROGRESS BAR
       ===================================== */

    progressBar.style.width = "0%";


    setTimeout(() => {

        progressBar.style.width =
            loveScore + "%";

    }, 100);


    /* Scroll to result on small screens */
    setTimeout(() => {

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 200);
}


/* =========================================
   ANIMATE PERCENTAGE NUMBER
   ========================================= */

function animatePercentage(target) {

    let current = 0;

    if (percentageAnimationFrame !== undefined) {
        cancelAnimationFrame(percentageAnimationFrame);
    }

    setResultColor(current);
    result.classList.add("counting");
    percentage.textContent = "0";


    const duration = 1200;

    const startTime = performance.now();


    function updateNumber(currentTime) {

        const elapsed =
            currentTime - startTime;

        const progress =
            Math.min(elapsed / duration, 1);


        /*
            Ease-out effect
        */
        const easedProgress =
            1 - Math.pow(1 - progress, 3);


        current =
            Math.floor(easedProgress * target);

        setResultColor(current);
        percentage.textContent = current;


        if (progress < 1) {

            percentageAnimationFrame =
                requestAnimationFrame(updateNumber);

        } else {

            percentage.textContent = target;
            setResultColor(target);
            result.classList.remove("counting");
            percentageAnimationFrame = undefined;
            createHeartPopups(target);
        }
    }


    percentageAnimationFrame =
        requestAnimationFrame(updateNumber);
}


function setResultColor(score) {

    result.classList.remove(
        "red",
        "yellow",
        "green",
        "blue"
    );

    if (score <= 30) {
        result.classList.add("red");
    } else if (score <= 69) {
        result.classList.add("yellow");
    } else if (score <= 89) {
        result.classList.add("green");
    } else {
        result.classList.add("blue");
    }
}


/* =========================================
   CREATE FLYING HEARTS
   ========================================= */

function createHeartPopups(score) {

    /*
        More hearts for higher scores
    */

    let numberOfHearts = 15;


    if (score >= 90) {

        numberOfHearts = 35;

    } else if (score >= 70) {

        numberOfHearts = 25;

    } else if (score >= 31) {

        numberOfHearts = 18;
    }


    const hearts = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓",
        "💘",
        "💝"
    ];


    for (let i = 0; i < numberOfHearts; i++) {

        setTimeout(() => {

            const heart =
                document.createElement("div");


            heart.classList.add(
                "flying-heart"
            );


            /* Random heart */
            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];


            /* Random horizontal movement */
            const randomX =
                (Math.random() * 500) - 250;


            /* Random rotation */
            const randomRotation =
                (Math.random() * 360) - 180;


            heart.style.setProperty(
                "--x",
                `${randomX}px`
            );


            heart.style.setProperty(
                "--rotation",
                `${randomRotation}deg`
            );


            /* Random size */
            const size =
                20 + Math.random() * 25;


            heart.style.fontSize =
                `${size}px`;


            heartContainer.appendChild(
                heart
            );


            /*
                Remove after animation
            */

            setTimeout(() => {

                heart.remove();

            }, 2600);


        }, i * 80);
    }
}


/* =========================================
   CALCULATE BUTTON
   ========================================= */

calculateBtn.addEventListener(
    "click",
    calculateLove
);


/* =========================================
   TRY AGAIN BUTTON
   ========================================= */

tryAgainBtn.addEventListener(
    "click",
    () => {

        result.classList.add("hidden");

        errorMessage.textContent = "";

        name1Input.focus();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);


/* =========================================
   PRESS ENTER TO CALCULATE
   ========================================= */

name1Input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            name2Input.focus();
        }
    }
);


name2Input.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            calculateLove();
        }
    }
);


/* =========================================
   AUTOMATIC NAME FORMATTING
   ========================================= */

name1Input.addEventListener(
    "blur",
    function () {

        if (this.value.trim() !== "") {

            this.value =
                formatName(this.value);
        }
    }
);


name2Input.addEventListener(
    "blur",
    function () {

        if (this.value.trim() !== "") {

            this.value =
                formatName(this.value);
        }
    }
);