let heightOfWindow = 0;
let widthOfWindow = 0;
let bodyContainers = document.querySelectorAll(".heightWindow");
let amountOfBodyContainers = bodyContainers.length;

function reportWindowSize() {
    heightOfWindow = window.innerHeight;
    widthOfWindow = window.innerWidth;

    bodyContainers = document.querySelectorAll(".heightWindow").forEach((elm) => {
        elm.style.height = heightOfWindow + "px";
    });
}

document.addEventListener("DOMContentLoaded",() => {
    reportWindowSize();
});

window.addEventListener('resize', () => {
    reportWindowSize();
});

let counterScroller = 0;

function scroll() {
    setTimeout(function () {
        window.scrollTo(0, heightOfWindow * counterScroller);
    }, 300);

    bodyContainers = document.querySelectorAll(".heightWindow").forEach((elm) => {
        elm.classList.add("noOpacity");

        setTimeout(function () {
            elm.classList.remove("noOpacity");
        }, 600);
    });
}

function pauseScrollListener() {
    window.removeEventListener("wheel", onScroll);
    setTimeout(function () {
        window.addEventListener("wheel", onScroll);
    }, 500);
}

function onScroll(){
    let scrollPosition = window.scrollY;
    let scrollNumber = event.deltaY;
    if (scrollNumber >= 0){
        if (counterScroller >= 0 && counterScroller < amountOfBodyContainers - 1){
            counterScroller ++;
            console.log("down", counterScroller);
            scroll();

            //Pausing scrolling
            pauseScrollListener();
        }
    } else {
        if (counterScroller > 0 && counterScroller < amountOfBodyContainers){
            counterScroller --;
            console.log("up", counterScroller);
            scroll();

            //Pausing scrolling
            pauseScrollListener();
        }
    }
}

window.addEventListener("wheel", onScroll);

