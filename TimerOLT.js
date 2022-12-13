export default class Timer{
    constructor(root){
     console.log(root);
     root.innerHTML=Timer.getHTML();
     this.el={
         hours:root.querySelector(".timer__part--hours"),
         minutes:root.querySelector(".timer__part--minutes"),
         seconds:root.querySelector(".timer__part--seconds"),
         control:root.querySelector(".timer__btn--control"),
         reset:root.querySelector(".timer__btn--reset"),
     };
     this.interval=null;
     this.currentSeconds=0;
    //  this.coef=0;
       
     this.el.control.addEventListener("click",()=>{
        if(this.interval===null){
            this.start();
        }
        else{
            this.stop();
        }
     });
 
 
     this.el.reset.addEventListener("click",()=>{
        var inputTime=prompt("Enter time taken:");
        // var coef=prompt("Enter round up number:");
        inputTime.toString();
        var colRegex=/[:]/g;
        var minRegex=/minutes|minute/;
        var hoursRegex=/hour|hours/;
        var secondsRegex=/seconds|second/;
        console.log(inputTime);
        if(hoursRegex.test(inputTime)==true){
            var hourStr=inputTime.slice(0,inputTime.match(hoursRegex).index);
            var hours=parseInt(hourStr.replace(/\D/g,""),10);
            this.currentSeconds=this.currentSeconds+hours*3600;    
        }
        if(minRegex.test(inputTime)==true){
            var minStr=inputTime.slice(inputTime.match(minRegex).index-3,inputTime.match(minRegex).index);
            var minutes=parseInt(minStr.replace(/\D/g,""),10);
            this.currentSeconds=this.currentSeconds+minutes*60;    
        }
        if(secondsRegex.test(inputTime)==true){
            var secondsStr=inputTime.slice(inputTime.match(secondsRegex).index-3,inputTime.match(secondsRegex).index);
            var seconds=parseInt(secondsStr.replace(/\D/g,""),10);
            this.currentSeconds=this.currentSeconds+seconds;    
        }
        if(colRegex.test(inputTime)==true){
            var timeArr=inputTime.split(colRegex);
            var hours=parseInt(timeArr[0],10);
            var minutes=parseInt(timeArr[1],10);
            var seconds=parseInt(timeArr[2],10);
            this.currentSeconds=this.currentSeconds+hours*3600;
            this.currentSeconds=this.currentSeconds+minutes*60; 
            this.currentSeconds=this.currentSeconds+seconds; 
        }
        this.stop();    
        this.updateInterfaceTime();
     });
    } 
 
    updateInterfaceTime(){
    const hours=Math.floor(Math.floor(this.currentSeconds/60)/60);
    const minutes=Math.floor((this.currentSeconds/60)%60);
    const seconds=this.currentSeconds%60;


    this.el.hours.textContent = hours.toString().padStart(2,"00");
    this.el.minutes.textContent = minutes.toString().padStart(2,"00");
    this.el.seconds.textContent = seconds.toString().padStart(2,"0");
     }
     updateInterfaceControls(){
         if(this.interval===null){
             this.el.control.innerHTML=`<span class="material-icons">play_arrow</span>`;
             this.el.control.classList.add("timer__btn--start");
             this.el.control.classList.remove("timer__btn--stop");
         }
         else{
             this.el.control.innerHTML=`<span class="material-icons">pause</span>`;
             this.el.control.classList.add("timer__btn--stop");
             this.el.control.classList.remove("timer__btn--start");
         }
     }
 
 
     start(){ 
         this.interval=setInterval(()=>{
             this.currentSeconds++;
             this.updateInterfaceTime();
         },1000);
         this.updateInterfaceControls();
     }
     
 
     stop(){
         clearInterval(this.interval);
         this.interval=null;
        //  if(coef==10 || coef==60){
        //     if(minutes%coef<coef/2){
        //      while(minutes%coef!=0){
        //          minutes--;
        //      }
        //  }
        //  if(minutes%coef>coef/2){
        //      while(minutes%coef!=0){
        //          minutes++;
        //      }
        //  } 
        //  }
        //  if(minutes%coef<coef){
        //      while(minutes%coef!=0){
        //          minutes--;
        //      }
        //  }
        //  if(minutes%coef>coef){
        //      while(minutes%coef!=0){
        //          minutes++;
        //      }
        //  }
         
         this.updateInterfaceControls();

     }
 
 
    static getHTML(){
     return `
         <span class="timer__part timer__part--hours">00</span>
         <span class="timer__part">:</span>
         <span class="timer__part timer__part--minutes">00</span>
         <span class="timer__part">:</span>
         <span class="timer__part timer__part--seconds">00</span>
         <button type="button" class="timer__btn timer__btn--control timer__btn--start">
         <span class="material-icons">play_arrow</span> 
         </button>
         <button type="button" class="timer__btn timer__btn--reset">
         <span class="material-icons">timer</span> 
         </button>
     `;
    }
 }