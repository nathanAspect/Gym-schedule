const edit = document.querySelector(".home-edit");
const save = document.querySelector(".home-save");
const combo = document.querySelectorAll(".combobox");
const checkbox = document.querySelectorAll(".checkbox");
const push_pull = document.querySelectorAll(".push-pull");

var sch;

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


//end

if(localStorage.getItem("schedule") != null){
   schedule = JSON.parse(localStorage.getItem("schedule"));
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


//event listeners declaration starts here

edit.addEventListener("click", editMode);
save.addEventListener("click", saveMode);

//end




//functions start here

function editMode(){
   edit.style.display = "none";
   save.style.display = "flex";
   for(i = 0; i<7; i++){
      combo[i].style.display = "flex";
      checkbox[i].style.display = "none";
      push_pull[i].style.display = "none";
   }
}

function saveMode(){
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
//end

