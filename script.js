const goalsContainer = document.getElementById('goals');
const button=document.getElementsByClassName('addbtn')
goalsContainer.addEventListener('click',function(event){
if(event.target.innerText=='-'){
    event.target.parentNode.remove()
}
else if(event.target.innerText=='+') {
 event.target.innerText='-'
    addnewcard()
}

})

goalsContainer.addEventListener('click',function(event){
   if(event.target.className('input').value){
    event.target.className('roundbtn').
    


   } 
})
function addnewcard(){

    const newGoal = document.createElement('div');
    newGoal.className = "card flex items-center rounded-2xl border border-slate-500 mb-10";
    newGoal.innerHTML = `
        <div class="w-6 h-6 ml-5 rounded-full border border-slate-500 flex-shrink-0 cursor-pointer"></div>
        <input class="p-7 outline-none w-full" type="text" placeholder="Add new goal...">
        <span class="addbtn cursor-pointer text-xl p-7 text-center">+</span>
    `;
    goalsContainer.appendChild(newGoal);



   

    


}




