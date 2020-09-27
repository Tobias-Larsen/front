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

    headerSizing();
});

let counterScroller = 0;

function scroll() {
    setTimeout(function () {
        window.scrollTo(0, heightOfWindow * counterScroller);

        cycleNav();
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




//Header menu

let header = document.querySelector("header");
let nav = document.querySelector(".navContainer > nav");
let navHeight = nav.clientHeight;
let navElmCycle = document.querySelector(".navCycle");
let indicator = document.querySelector(".navContainer > .fa-caret-left");

let pageUp = document.querySelector(".fa-chevron-up");
let pageDown = document.querySelector(".fa-chevron-down");

let allPages = document.querySelectorAll(".pageListItem");

function currentPage() {
    allPages.forEach((item) => {
        item.style.opacity = "0.6";
    });

    let currentPage = document.getElementsByClassName("pageListItem")[counterScroller];
    currentPage.style.opacity = "1";
}

function cycleNav() {
    currentPage();

    if (counterScroller === 0){
        header.classList.add("hideHeader");
        if (widthOfWindow < 576){
            navElmCycle.style.marginTop = (1) * - navHeight + "px";
        } else {
            indicator.style.marginTop = (1) * navHeight/4 + "px";
        }
    } else {
        header.classList.remove("hideHeader");
        if (widthOfWindow < 576){
            navElmCycle.style.marginTop = (counterScroller) * - navHeight + "px";
        } else {
            indicator.style.marginTop = (counterScroller) * navHeight/4 + "px";
        }
    }
}

function headerSizing() {
    if (widthOfWindow >= 576){
        navElmCycle.style.marginTop = 0;
    }
}

pageUp.addEventListener("click",() => {
    if (counterScroller > 0 && counterScroller < amountOfBodyContainers){
        counterScroller --;
        console.log("up", counterScroller);
        scroll();

        //Pausing scrolling
        pauseScrollListener();
    }
});

pageDown.addEventListener("click",() => {
    if (counterScroller >= 0 && counterScroller < amountOfBodyContainers - 1){
        counterScroller ++;
        console.log("down", counterScroller);
        scroll();

        //Pausing scrolling
        pauseScrollListener();
    }
});

document.querySelector("header > .topLogo").addEventListener("click",() => {
    if (counterScroller > 0){
        counterScroller = 0;
        console.log("to top", counterScroller);
        scroll();

        //Pausing scrolling
        pauseScrollListener();
    }
});

document.querySelector(".landing > .fa-chevron-down").addEventListener("click",() => {
    if (counterScroller === 0){
        counterScroller = 1;
        console.log("to first page", counterScroller);
        scroll();

        //Pausing scrolling
        pauseScrollListener();
    }
});


//Clicked menu element


allPages.forEach((e) => {
    e.addEventListener("click",() => {
        let clickedElement = (e.offsetTop - 8) / e.clientHeight;
        counterScroller = clickedElement;

        console.log("to page number " + clickedElement, counterScroller);
        scroll();

        //Pausing scrolling
        pauseScrollListener();
    });
});
