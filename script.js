const goalsContainer = document.getElementById('goals');
const button = document.getElementsByClassName('addbtn');

goalsContainer.addEventListener('keypress', function (event) {
  if (event.target.classList.contains("input")) {
    setData();
  }
});

goalsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("addbtn")) {
    if (event.target.innerText.trim() == "-") {
      event.target.parentNode.remove();
      updateGoalCounts()
      setData()

    } else if (event.target.innerText.trim() == "+") {
      addNewCard();
      num++
      event.target.innerText = "-"; // Change "+" to "-"
    }
  }
});


let num = 1
function addNewCard() {

  const newGoal = document.createElement("div");
  newGoal.id = num

  newGoal.className = "card flex items-center rounded-2xl border border-slate-500 mb-10";
  newGoal.innerHTML = `
          <div class="circle w-6 h-6 ml-5 rounded-full border border-slate-500 flex-shrink-0 cursor-pointer flex justify-center items-center"></div>
          <input class="input p-7 outline-none w-full font-bold " type="text" placeholder="Add new goal...">
          <span class="addbtn cursor-pointer text-xl p-7 text-center">+</span>
      `;
  goalsContainer.appendChild(newGoal);
  setData()


}
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("circle")) {
    let card = event.target.parentNode;
    let inputField = card.querySelector("input");
    const isCompleted = card.classList.contains("completed");
    let Btn = event.target;
    if (isCompleted) {
      Btn.classList.remove("bg-green-700");
      Btn.innerHTML = "";
      card.classList.remove("completed");
      inputField.classList.remove("text-green-700", "line-through", "decoration-3");
      inputField.disabled = false;
      updateGoalCounts();
      setData();
    }
    else if (inputField.value.trim() !== "") {
      Btn.classList.add("bg-green-700");
      // Btn.innerHTML = `<img src="./assets/Vector 1.png" alt="">`;
      
      card.classList.add("completed");
      inputField.classList.add("text-green-700", "line-through", "decoration-3");
      inputField.disabled = true;
      updateGoalCounts();
      setData();
    } else {
      document.getElementById("error").classList.remove("hidden");

    }
  }
});


document.addEventListener('click', function (event) {
  if (event.target.classList.contains('input')) {
    document.getElementById('error').classList.add('hidden');

    setData()
  }
});


function updateGoalCounts() {
  document.getElementById('progress').classList.remove('invisible')
  let totalGoals = 0;
  const goals = document.querySelectorAll("#goals .card");
  goals.forEach(element => {
    if (element.querySelector('.input').value.trim() !== '') {
      totalGoals++;
    }
  });
  if (totalGoals === 0) {
    document.getElementById('progress').classList.add('invisible')

  }

  const completedGoals = document.querySelectorAll("#goals .completed").length;

  let progress = `${completedGoals} / ${totalGoals} Completed`
  document.getElementById('progress').innerText = progress
  if (totalGoals == completedGoals) {
    document.getElementById('progress').innerText = "🎉 Congratulation 🎉"

  }

}


function setData() {
  const goals = [];
  document.querySelectorAll('.card').forEach((card, index) => {
    const inputField = card.querySelector(".input");
    const isCompleted = card.classList.contains("completed");
    goals.push({
      id: index,
      text: inputField.value,
      completed: isCompleted
    });
  });
  const htmlData = document.getElementById('goals').innerHTML
  console.log(htmlData)
  localStorage.setItem("goals", JSON.stringify(goals));
  localStorage.setItem("htmlData", JSON.stringify(htmlData));

}





function getData() {
  const storedGoals = localStorage.getItem("goals");
  const storedHtml = localStorage.getItem("htmlData");
  const goalsContainer = document.getElementById("goals");


  if (storedHtml) {
    // Remove default card before loading stored data
    goalsContainer.innerHTML = "";
    goalsContainer.innerHTML = JSON.parse(storedHtml);
  }

  if (storedGoals) {
    const goals = JSON.parse(storedGoals);
    goals.forEach((goal, index) => {
      const card = document.querySelectorAll('.card')[index];
      if (card) {
        const inputField = card.querySelector(".input");
        const Btn = card.querySelector(".circle");
        const Btn2 = card.querySelector(".addbtn");

        inputField.value = goal.text;

        if (goal.completed) {
          card.classList.add("completed");
          inputField.classList.add("text-green-700", "line-through", "decoration-3");
          inputField.disabled = true;
          Btn.classList.add("bg-green-700");
          Btn.innerHTML = `<img src="./assets/Vector 1.png" alt="">`;
        }
        const isLastCard = index === goals.length - 1
        if (!isLastCard) {
          Btn2.innerText = '-';
        } else {
          Btn2.innerText = '+';
        }
      }

    });
  }
  setData()
}


getData()