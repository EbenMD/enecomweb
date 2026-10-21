const PHONE_PRIMARY = "233500111663";
const PHONE_SECONDARY = "233245867221";
const EMAIL = "enecomitsolutionsgh@gmail.com";
const BRAND = "Enecom IT Solutions GH";

function waLink(message, secondary=false) {
  return `https://wa.me/${secondary ? PHONE_SECONDARY : PHONE_PRIMARY}?text=${encodeURIComponent(message)}`;
}
function navToggle(){
  const nav=document.querySelector(".nav");
  if(nav) nav.classList.toggle("open");
}
function setActiveNav(){
  const page=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  document.querySelectorAll(".nav a[data-page]").forEach(a=>{
    if(a.dataset.page===page) a.classList.add("active");
  });
}
function setYear(){const el=document.querySelector("[data-year]");if(el)el.textContent=new Date().getFullYear();}
function bindWhatsApp(){
  document.querySelectorAll("[data-wa]").forEach(el=>{
    const message=el.dataset.wa || `Hello ${BRAND}, I would like to make an enquiry.`;
    el.href=waLink(message,el.dataset.secondary==="true");
    el.target="_blank";el.rel="noopener";
  });
}
function bindContactForm(){
 const form=document.querySelector("#contactForm");
 if(!form)return;
 form.addEventListener("submit",e=>{
   e.preventDefault();
   const d=new FormData(form);
   const message=[
     `Hello ${BRAND},`,
     `Name: ${d.get("name")}`,
     `Phone: ${d.get("phone")}`,
     `Email: ${d.get("email")||"Not provided"}`,
     `I'm interested in: ${d.get("interest")}`,
     `Preferred learning mode: ${d.get("mode")||"Not specified"}`,
     `Message: ${d.get("message")||"Please contact me with more details."}`
   ].join("\n");
   window.open(waLink(message),"noopener");
 });
}
function initCourseFilter(){
 const grid=document.querySelector("#courseGrid");
 if(!grid)return;
 const search=document.querySelector("#courseSearch"),category=document.querySelector("#courseCategory");
 const cards=[...grid.querySelectorAll("[data-course-card]")];
 function filter(){
  const q=(search.value||"").toLowerCase().trim(),cat=category.value;
  let count=0;
  cards.forEach(card=>{
   const matchQ=card.textContent.toLowerCase().includes(q);
   const matchCat=cat==="all"||card.dataset.category===cat;
   card.hidden=!(matchQ&&matchCat);if(!card.hidden)count++;
  });
  const empty=document.querySelector("#noCourses");if(empty)empty.hidden=count!==0;
 }
 search.addEventListener("input",filter);category.addEventListener("change",filter);
}
document.addEventListener("DOMContentLoaded",()=>{setActiveNav();setYear();bindWhatsApp();bindContactForm();initCourseFilter();});
