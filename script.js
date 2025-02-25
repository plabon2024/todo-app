const goalsContainer = document.getElementById('goals');
const button = document.getElementsByClassName('addbtn')
goalsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("addbtn")) {
    if (event.target.innerText.trim() == "-") {
      event.target.parentNode.remove();
      updateGoalCounts()
     
    } else if (event.target.innerText.trim() == "+") {
      addNewCard();
      event.target.innerText = "-"; // Change "+" to "-"
    }
  }
});


function addNewCard() {
  const newGoal = document.createElement("div");
  newGoal.className =
    "card flex items-center rounded-2xl border border-slate-500 mb-10";
  newGoal.innerHTML = `
          <div class="circle w-6 h-6 ml-5 rounded-full border border-slate-500 flex-shrink-0 cursor-pointer flex justify-center items-center"></div>
          <input class="input p-7 outline-none w-full font-bold " type="text" placeholder="Add new goal...">
          <span class="addbtn cursor-pointer text-xl p-7 text-center">+</span>
      `;
  goalsContainer.appendChild(newGoal);
  updateGoalCounts()
}

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("circle")) {
    let card = event.target.parentNode;
    let inputField = card.querySelector("input");
    let Btn = card.querySelector(".circle");


    if (inputField.value.trim() !== "") {
      Btn.classList.add("bg-green-500");
      Btn.innerHTML = `<img src="./assets/Vector 1.png" alt="">`;
      card.classList.add('completed')
      console.log(card)

      inputField.classList.add("text-green-500", "line-through", "decoration-3");
      inputField.disabled=true


      updateGoalCounts()

    }
    else {
      document.getElementById('error').classList.remove('hidden')
    }
  }
});


document.addEventListener('click', function (event) {
  if (event.target.classList.contains('input')) {
    document.getElementById('error').classList.add('hidden');
    updateGoalCounts()
  }
});


function updateGoalCounts() {
  document.getElementById('progress').classList.remove('invisible')

  const totalGoals = document.querySelectorAll("#goals .card").length;
  const completedGoals = document.querySelectorAll("#goals .completed").length;

  let progress = `${completedGoals} / ${totalGoals} Completed`
  document.getElementById('progress').innerText = progress
  if (totalGoals == completedGoals) {
    document.getElementById('progress').innerText = "🎉 Congratulation 🎉"

  }
}
