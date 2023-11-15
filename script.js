const allSection = document.querySelectorAll("section");
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
const listHolder = document.querySelector(".list-holder");
const add = document.querySelector(".add img");
const save2 = document.querySelector(".check-mark-page2");
const cancel = document.querySelector(".close-mark-page2");

const thirdPage = document.querySelector(".third-page");
const thirdTitle = document.querySelector(".third-title");

var sch;
var chk;
var insd;
var editing=false;
var openedDay = null;
var trans = 0;

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
var insideDay = {
   monday : [],
   tuesday : [],
   wedn : [],
   thursday : [],
   friday : [],
   saturday : [],
   sunday : []
}

//end





// this part is the part that loads when the app is opened, like the infos and stuff

if(localStorage.getItem("schedule") != null){
   schedule = JSON.parse(localStorage.getItem("schedule"));
}
if(localStorage.getItem("workedDays") != null){
   workedDays = JSON.parse(localStorage.getItem("workedDays"));
}
if(localStorage.getItem("insideDay") != null){
   insideDay = JSON.parse(localStorage.getItem("insideDay"));
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
   slider("prev");
})


day.forEach(function(value) {
   value.addEventListener("click", function(event) {
      if(!editing){
         slider("next");
         nextPageTitle.innerHTML = `<h1>${value.getAttribute("value")}<span>list</span></h1>`;
         openedDay = value.getAttribute("value");
         insideDayDisplay(value);
         if(insideDay[`${openedDay.toLowerCase()}`].length<5){add.style.display = "flex";}
         else{add.style.display = "none";}
         save2.style.display = "none";
         cancel.style.display = "none";
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
add.addEventListener("click", function(){
   listHolder.innerHTML += `
         <div class="list-element">
            <input type="text" id="inputDataList" list="dataList" 
            class="input-page2" placeholder="Enter Muscle Group">
            <datalist id="dataList">
               <option value="Shoulders">
               <option value="Chest">
               <option value="Triceps">
               <option value="Back">
               <option value="Biceps">
               <option value="Fore-arm">
               <option value="Core Abs">
               <option value="Leg">
            </datalist>
         </div>`
      add.style.display = "none";
      save2.style.display = "flex";
      cancel.style.display = "flex";
   })
save2.addEventListener("click", function(){
   
      const inputPage2 = document.querySelector(".input-page2");
      
      if(inputPage2.value===''){insideDay[`${openedDay.toLowerCase()}`].push('Untitled');}
      else{insideDay[`${openedDay.toLowerCase()}`].push(inputPage2.value);}
      if(openedDay==="Monday"){i=0;}
      else if(openedDay==="Tuesday"){i=1;}
      else if(openedDay==="Wedn"){i=2;}
      else if(openedDay==="Thursday"){i=3;}
      else if(openedDay==="Friday"){i=4;}
      else if(openedDay==="Saturday"){i=5;}
      else if(openedDay==="Sunday"){i=6;}
      insideDayDisplay(day[i]);
      insideDayUpdate();
      save2.style.display = "none";
      cancel.style.display = "none";
      if(insideDay[`${openedDay.toLowerCase()}`].length<5){add.style.display = "flex";}
})

cancel.addEventListener("click", function(){
   if(openedDay==="Monday"){i=0;}
   else if(openedDay==="Tuesday"){i=1;}
   else if(openedDay==="Wedn"){i=2;}
   else if(openedDay==="Thursday"){i=3;}
   else if(openedDay==="Friday"){i=4;}
   else if(openedDay==="Saturday"){i=5;}
   else if(openedDay==="Sunday"){i=6;}
   insideDayDisplay(day[i]);
   save2.style.display = "none";
   cancel.style.display = "none";
   if(insideDay[`${openedDay.toLowerCase()}`].length<5){add.style.display = "flex";}
})

thirdTitle.addEventListener("click", ()=>{
   slider("prev");
})
//end



const slider = (dir)=>{
   dir === "next"? trans -= 100 : trans += 100;

   allSection.forEach(function (value){
      value.style.transform = `translateX(${trans}%)`;
   })
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

function insideDayUpdate(){
   if(localStorage.getItem("insideDay") != null){
      localStorage.removeItem("insideDay");
   }
   insd = JSON.stringify(insideDay);
   localStorage.setItem("insideDay", insd);
}




function insideDayDisplay(value){
   if(value.getAttribute('value')==="Monday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.monday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.monday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Tuesday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.tuesday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.tuesday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Wedn"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.wedn.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.wedn[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Thursday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.thursday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.thursday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Friday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.friday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.friday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Saturday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.saturday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.saturday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }

   else if(value.getAttribute('value')==="Sunday"){
      listHolder.innerHTML = null;
      for(i=0; i<insideDay.sunday.length; i++){
         listHolder.innerHTML += `
         <div class="list-element">
            <p>${insideDay.sunday[i]}</p>
            <img src="resource/delete.png">
         </div>`
      }
   }



   if((insideDay[`${openedDay.toLowerCase()}`].length)>0){
      const deleteBtn = document.querySelectorAll(".list-element img");
      const inside_day_lists = document.querySelectorAll(".list-element");

      inside_day_lists.forEach((value)=>{
         value.addEventListener("click", ()=>{
            slider("next");
            thirdTitle.innerHTML = `<h1>${value.innerText}<span>exercises</span></h1>`;
         })
      })
      


      deleteBtn.forEach(function(value, index){
         value.addEventListener("click", function(click){
            click.stopPropagation();
            insideDay[`${openedDay.toLowerCase()}`].splice(index, 1);
            insideDayUpdate();
            if(openedDay==="Monday"){i=0;}
            else if(openedDay==="Tuesday"){i=1;}
            else if(openedDay==="Wedn"){i=2;}
            else if(openedDay==="Thursday"){i=3;}
            else if(openedDay==="Friday"){i=4;}
            else if(openedDay==="Saturday"){i=5;}
            else if(openedDay==="Sunday"){i=6;}
            insideDayDisplay(day[i]);
         })
      })


      if(insideDay[`${openedDay.toLowerCase()}`].length<5){add.style.display = "flex";}

    }

}
//end
