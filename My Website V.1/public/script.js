
// javascript for menu button starts

var bar1 = document.getElementById("bar-1");
var bar2 = document.getElementById("bar-2");
var bar3 = document.getElementById("bar-3");


menu.onclick = function(){
    if(bar2.style.display === "none"){
        bar1.style.transform = "rotate(0deg)" ;
        bar1.style.margin = "3px 0px" ;
        bar3.style.transform = "rotate(0deg)" ;
        bar3.style.margin = "3px 0px" ;
        bar2.style.display = "block";
        menu1.style.opacity = "0";
        menu1.style.zIndex = "-50";
        data.style.opacity = "1";
        data.style.zIndex = "50";
        hehe.style.opacity = "1";
        hehe.style.zIndex = "50";
    }
    else{
        bar1.style.transform = "rotate(45deg)" ;
        bar1.style.margin = "0px" ;
        bar3.style.transform = "rotate(-45deg)" ;
        bar3.style.margin = "-3px" ;
        bar2.style.display = "none";
        menu1.style.opacity = "1";
        menu1.style.zIndex = "50";
        data.style.opacity = "0";
        data.style.zIndex = "-50";
        hehe.style.opacity = "0";
        hehe.style.zIndex = "-50";
    }
}

// javascript for menu button ends

window.addEventListener("load", () =>{
       document.querySelector(".home-container").style.opacity = "1";
       document.querySelector(".page-loader").style.opacity = "0";
       document.querySelector(".page-loader").style.zIndex = "-200";
});

window.addEventListener("load", () =>{
    document.querySelector(".about-container").style.opacity = "1";
    document.querySelector(".page-loader").style.opacity = "0";
       document.querySelector(".page-loader").style.zIndex = "-200";
});

window.addEventListener("load", () =>{
    document.querySelector(".contact-container").style.opacity = "1";
    document.querySelector(".page-loader").style.opacity = "0";
       document.querySelector(".page-loader").style.zIndex = "-200";
});



window.addEventListener("load", () =>{
    document.querySelector(".thanks-container").style.opacity = "1";
    document.querySelector(".page-loader").style.opacity = "0";
       document.querySelector(".page-loader").style.zIndex = "-200";
});


