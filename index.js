// document.getElementById("resume-link-1").addEventListener("click", () => {
//   window.open;
//   "https://drive.google.com/file/d/1hrqyL-UtRO5vuL0LRUvFcqCWiv41DtEM/view?usp=sharing"();
// });

// document.getElementById("resume-link-2").addEventListener("click", () => {
//   window.open;
//   "https://drive.google.com/file/d/1hrqyL-UtRO5vuL0LRUvFcqCWiv41DtEM/view?usp=sharing"();
// });

// let details = document.getElementsByClassName("skill-ed");
// let content = document.getElementsByClassName("contents");

// opentab = (name) => {
//   for (detail of details) {
//     detail.classList.remove("active");
//   }
//   for (con of content) {
//     con.classList.remove("active-tab");
//   }
//   event.currentTarget.classList.add("active");
//   document.getElementById(name).classList.add("active-tab");
// };;;

// let sidemenu = document.getElementById("sidemenu");

// openmenu = () => {
//   sidemenu.style.right = "0";
// };

// closemenu = () => {
//   sidemenu.style.right = "-200px";
// };

// const scriptURL = "https://getform.io/f/cf1da311-2ccf-400d-8f87-b150d9841021";
// const form = document.forms["submit-to-google-sheet"];
// const msg = document.getElementById("msg");
// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   fetch(scriptURL, { method: "POST", body: new FormData(form) })
//     .then((response) => {
//       msg.innerHTML = "Message Sent Successfully";
//       setTimeout(() => {
//         msg.innerHTML = "";
//       }, 5000);
//       form.reset();
//     })
//     .catch((error) => console.error("Error!", error.message));
// });

// window.addEventListener("scroll", function () {
//   let nav = this.document.querySelector("nav");
//   nav.classList.toggle("sticky", window.scrollY > 0);
// });

// let container = document.getElementById("skill_container");

// let skill_arr = [
//   "./assets/html.png",
//   "./assets/css.png",
//   "./assets/js.png",
//   "./assets/netlify.png",
//   "./assets/git.png",
//   "./assets/github.png",
//   "./assets/dsa_logo.png",
//   "./assets/postman.png",
//   "./assets/swagger.png",
//   "./assets/react.png",
// ];
// let skill_name = [
//   "HTML",
//   "CSS",
//   "JavaScript",
//   "Netlify",
//   "GIT",
//   "GitHub",
//   "DSA",
//   "Postman",
//   "Swagger",
//   "React",
// ];
// let count = 0;
// AppendSkills = (arr) => {
//   container.innerHTML = null;
//   arr.forEach((ele) => {
//     let div = document.createElement("div");

//     div.classList.add("skills-card");

//     let img = document.createElement("img");
//     img.src = ele;
//     img.classList.add("skills-card-img");

//     let name = document.createElement("h2");
//     name.classList.add("skills-card-name");

//     name.innerText = skill_name[count];
//     name.style.color = "white";
//     count++;
//     div.append(img, name);
//     container.append(div);
//   });
// };

// window.addEventListener("load", () => {
//   AppendSkills(skill_arr);
// });

// //https://drive.google.com/file/d/1hrqyL-UtRO5vuL0LRUvFcqCWiv41DtEM/view?usp=sharing
document.getElementById("resume-link-1").addEventListener("click", () => {
  window.open(
    "https://drive.google.com/file/d/1hrqyL-UtRO5vuL0LRUvFcqCWiv41DtEM/view?usp=sharing"
  );
});

document.getElementById("resume-link-2").addEventListener("click", () => {
  window.open(
    "https://drive.google.com/file/d/1hrqyL-UtRO5vuL0LRUvFcqCWiv41DtEM/view?usp=sharing"
  );
});

let details = document.getElementsByClassName("skill-ed");
let content = document.getElementsByClassName("contents");

opentab = (name, event) => {
  for (detail of details) {
    detail.classList.remove("active");
  }
  for (con of content) {
    con.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active");
  document.getElementById(name).classList.add("active-tab");
};

let sidemenu = document.getElementById("sidemenu");

openmenu = () => {
  sidemenu.style.right = "0";
};

closemenu = () => {
  sidemenu.style.right = "-200px";
};

const scriptURL = "https://getform.io/f/cf1da311-2ccf-400d-8f87-b150d9841021";
const form = document.forms["submit-to-google-sheet"];
const msg = document.getElementById("msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      msg.innerHTML = "Message Sent Successfully";
      setTimeout(() => {
        msg.innerHTML = "";
      }, 5000);
      form.reset();
    })
    .catch((error) => console.error("Error!", error.message));
});

window.addEventListener("scroll", function () {
  let nav = document.querySelector("nav");
  nav.classList.toggle("sticky", window.scrollY > 0);
});

let container = document.getElementById("skill_container");

let skill_arr = [
  "./assets/html.png",
  "./assets/css.png",
  "./assets/js.png",
  "./assets/netlify.png",
  "./assets/git.png",
  "./assets/github.png",
  "./assets/dsa_logo.png",
  "./assets/postman.png",
  "./assets/swagger.png",
  "./assets/react.png",
];
let skill_name = [
  "HTML",
  "CSS",
  "JavaScript",
  "Netlify",
  "GIT",
  "GitHub",
  "DSA",
  "Postman",
  "Swagger",
  "React",
];
let count = 0;
AppendSkills = (arr) => {
  container.innerHTML = "";
  arr.forEach((ele) => {
    let div = document.createElement("div");

    div.classList.add("skills-card");

    let img = document.createElement("img");
    img.src = ele;
    img.classList.add("skills-card-img");

    let name = document.createElement("h2");
    name.classList.add("skills-card-name");

    name.innerText = skill_name[count];
    name.style.color = "white";
    count++;
    div.append(img, name);
    container.append(div);
  });
};

window.addEventListener("load", () => {
  AppendSkills(skill_arr);
});
