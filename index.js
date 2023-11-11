const homeTitle = document.querySelector(".home-title");
const edit = document.querySelector(".home-edit");
const save = document.querySelector(".home-save");
const combo = document.querySelectorAll(".combobox");
const checkbox = document.querySelectorAll(".checkbox");
const push_pull = document.querySelectorAll(".push-pull");

const day = document.querySelectorAll(".day");
const home = document.querySelector(".home");
const nextPage = document.querySelector(".nextPage");
const nextPageTitle = document.querySelector(".nextPageTitle h1");
const nextPageTitleHolder = document.querySelector(".next-title");


var sch;
var chk;
var editing=false;

//object declaration starts here

var schedule = {
   "day1": "Push",
   "day2": "Pull",
   "day3": "Leg",
   "day4": "Push",
   "day5": "Pull",
   "day6": "Rest",
   "day7": "Rest"
}

var workedDays = {
   array : [0, 0, 0, 0, 0, 0, 0]
}

//end





// this part is the part that loads when the app is opened, like the infos and stuff

if(localStorage.getItem("schedule") != null){
   schedule = JSON.parse(localStorage.getItem("schedule"));
}
if(localStorage.getItem("workedDays") != null){
   workedDays = JSON.parse(localStorage.getItem("workedDays"));
}


for(i = 0; i<7; i++){
   push_pull[i].innerText = schedule["day"+String((i+1))];
   if(schedule["day"+(i+1)]==='Push'){
      push_pull[i].classList.remove("pull");
      push_pull[i].classList.remove("push");
      push_pull[i].classList.remove("leg");
      push_pull[i].classList.remove("rest");
      push_pull[i].classList.add("push");
   } else if(schedule["day"+(i+1)]==='Pull'){
      push_pull[i].classList.remove("pull");
      push_pull[i].classList.remove("push");
      push_pull[i].classList.remove("leg");
      push_pull[i].classList.remove("rest");
      push_pull[i].classList.add("pull");
   } else if(schedule["day"+(i+1)]==='Leg'){
      push_pull[i].classList.remove("pull");
      push_pull[i].classList.remove("push");
      push_pull[i].classList.remove("leg");
      push_pull[i].classList.remove("rest");
      push_pull[i].classList.add("leg");
   } else{
      push_pull[i].classList.remove("pull");
      push_pull[i].classList.remove("push");
      push_pull[i].classList.remove("leg");
      push_pull[i].classList.remove("rest");
      push_pull[i].classList.add("rest");
   }
}

for(i = 0; i < 7; i++){
   if(workedDays.array[i]===1){checkbox[i].checked = true;}
   else{
      checkbox[i].checked = false;
   }
}

// end






//event listeners declaration starts here

edit.addEventListener("click", editMode);
save.addEventListener("click", saveMode);
homeTitle.addEventListener("click", offEdit);
nextPageTitleHolder.addEventListener("click", function(){
   nextPage.style.transform = "translateX(100%)";
   home.style.transform = "translateX(0%)";
})


day.forEach(function(value) {
   value.addEventListener("click", function(event) {
      if(!editing){
         slide();
         nextPageTitle.innerHTML = `<h1>${value.getAttribute("value")}<span>list</span></h1>`;
      }
   });
 });

 checkbox.forEach(function(value, index) {
   value.addEventListener("click", function(event) {
      event.stopPropagation();
      if(value.checked){workedDays.array[index] = 1;}
      else{workedDays.array[index] = 0;}
      checkboxUpdate();
   });
 });

//end




//functions start here
function slide(){
   nextPage.style.transform = "translateX(-100%)";
   home.style.transform = "translateX(-100%)";
}


function offEdit(){
      editing = false;
      edit.style.display = "flex";
      save.style.display = "none";
      for(i=0; i<7; i++){
         combo[i].style.display = "none";
         checkbox[i].style.display = "flex";
         push_pull[i].style.display = "flex";
      }
}

function editMode(){
   editing = true;
   edit.style.display = "none";
   save.style.display = "flex";
   for(i = 0; i<7; i++){
      combo[i].style.display = "flex";
      checkbox[i].style.display = "none";
      push_pull[i].style.display = "none";
   }
}

function saveMode(){
   editing = false;
   for(i = 0; i<7; i++){
       push_pull[i].innerText = combo[i].value;
       schedule["day"+String(i+1)] = combo[i].value;
      if(combo[i].value==='Push'){
         push_pull[i].classList.remove("pull");
         push_pull[i].classList.remove("push");
         push_pull[i].classList.remove("leg");
         push_pull[i].classList.remove("rest");
         push_pull[i].classList.add("push");
      } else if(combo[i].value==='Pull'){
         push_pull[i].classList.remove("pull");
         push_pull[i].classList.remove("push");
         push_pull[i].classList.remove("leg");
         push_pull[i].classList.remove("rest");
         push_pull[i].classList.add("pull");
      } else if(combo[i].value==='Leg'){
         push_pull[i].classList.remove("pull");
         push_pull[i].classList.remove("push");
         push_pull[i].classList.remove("leg");
         push_pull[i].classList.remove("rest");
         push_pull[i].classList.add("leg");
      } else{
         push_pull[i].classList.remove("pull");
         push_pull[i].classList.remove("push");
         push_pull[i].classList.remove("leg");
         push_pull[i].classList.remove("rest");
         push_pull[i].classList.add("rest");
      }

      scheduleUpdate();
      edit.style.display = "flex";
      save.style.display = "none";
      combo[i].style.display = "none";
      checkbox[i].style.display = "flex";
      push_pull[i].style.display = "flex";
   }
}

function scheduleUpdate(){
   if(localStorage.getItem("schedule") != null){
      localStorage.removeItem("schedule");
   }
   sch = JSON.stringify(schedule);
   localStorage.setItem("schedule", sch);
}


function checkboxUpdate(){
   if(localStorage.getItem("workedDays") != null){
      localStorage.removeItem("workedDays");
   }
   chk = JSON.stringify(workedDays);
   localStorage.setItem("workedDays", chk);
}

//end

