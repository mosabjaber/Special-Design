// setting box toggle
let settingBox = document.querySelector(".settings-box");
let icon = document.querySelector(".toggle-setting .my-Sett");
icon.addEventListener("click", function () {
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
});
// switch colors &  save switch colors in local storage
let allColors = document.querySelectorAll(".colors-list li");
if (window.localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  allColors.forEach((li) => {
    li.classList.remove("active");
  });
  document
    .querySelector(`[data-color="${window.localStorage.getItem("color")}"]`)
    .classList.add("active");
}

allColors.forEach((li) => {
  li.addEventListener("click", (e) => {
    allColors.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    window.localStorage.setItem("color", e.target.dataset.color);
  });
});
// variable
let bgOption = true;
let bgInterval;
// check background local storage item
let bgLocalItem = window.localStorage.getItem("background");
if (bgLocalItem !== null) {
  // console.log(bgLocalItem);
  // console.log(typeof bgLocalItem);
  if (bgLocalItem === "true") {
    bgOption = true;
  } else {
    bgOption = false;
  }

  document.querySelectorAll(".random-background  button").forEach((btn) => {
    btn.classList.remove("active");
  });

  if (bgLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}
// random background
let bgColor = document.querySelectorAll(".random-background  button");
bgColor.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    bgColor.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    // random background image
    if (e.target.dataset.background === "yes") {
      bgOption = true;
      randomImg();
      localStorage.setItem("background", true);
    } else {
      bgOption = false;
      clearInterval(bgInterval);
      localStorage.setItem("background", false);
    }
  });
});

// random background image
let landingPage = document.querySelector(".landing-page");
let imgArr = ["land1.jpg", "land2.jpg", "land3.jpg", "land4.jpg", "land5.jpg"];

function randomImg() {
  if (bgOption == true) {
    bgInterval = setInterval(() => {
      let randomImg = Math.trunc(Math.random() * imgArr.length);
      landingPage.style.backgroundImage = `url(imgs/${imgArr[randomImg]})`;
    }, 4000);
  }
}
randomImg();
// skills scroll
let skills = document.querySelector(".about-us");
let spans = document.querySelectorAll(".skills-progress span");
window.addEventListener("scroll", () => {
  if (window.scrollY >= skills.offsetTop - 40) {
    spans.forEach((span) => {
      span.style.width = span.dataset.prog;
    });
  }
});
// create popup with the image
// create overlay
let ourGallary = document.querySelectorAll(".gallary img");
ourGallary.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    // create popup box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    // create title of image
    if (img.alt !== null) {
      let imgHead = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHead.appendChild(imgText);
      imgHead.className = "image-head";
      popupBox.prepend(imgHead);
    }
    // create close
    let closeBtn = document.createElement("span");
    let closeBtnText = document.createTextNode("X");
    closeBtn.appendChild(closeBtnText);
    closeBtn.className = "close-btn";
    popupBox.prepend(closeBtn);
    closeBtn.addEventListener("click", (e) => {
      e.target.parentNode.remove();
      overlay.remove();
    });
  });
});
// nav bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// show bullets & store in local storage
let showBul = document.querySelectorAll(".bullets-option button");
let navBullets = document.querySelector(".nav-bullets");
let bulletLocStorage = localStorage.getItem("bullets-option");
if (bulletLocStorage) {
  showBul.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (bulletLocStorage === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

showBul.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    showBul.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");
    if (e.target.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});
// reset option from setting box
let reset = document.querySelector(".bullets-option .reset");
reset.addEventListener("click", () => {
  localStorage.clear();
  //OR >>>>>> if it is in any data from website use below code becase the clear reset all data for website
  // localStorage.removeItem("background");
  // localStorage.removeItem("color");
  // localStorage.removeItem("bullets-option");
  location.reload();
});
// toggle-menu
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu.classList.toggle("m-active");
  links.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== links) {
    if (links.classList.contains("open")) {
      links.classList.toggle("open");
      toggleMenu.classList.toggle("m-active");
    }
  }
});
// stop propagation on menu
links.onclick = function (e) {
  e.stopPropagation();
};
