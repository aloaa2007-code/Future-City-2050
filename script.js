const modeBtn = document.getElementById("modeBtn");

function applyTheme() {

  const dark =
    localStorage.getItem("futureCityDark") === "true";

  document.body.classList.toggle("dark", dark);

  if (modeBtn) {
    modeBtn.textContent = dark ? "☀️" : "🌙";
  }
}

applyTheme();

if (modeBtn) {

  modeBtn.addEventListener("click", () => {

    const dark =
      !document.body.classList.contains("dark");

    localStorage.setItem("futureCityDark", dark);

    applyTheme();

  });

}


const energyNumber =
  document.getElementById("energyNumber");

const energyBar =
  document.getElementById("energyBar");

const energyBtn =
  document.getElementById("energyBtn");


if (energyBtn) {

  let value =
    Number(localStorage.getItem("cleanEnergy") || 75);

  function updateEnergy() {

    energyNumber.textContent = value + "%";

    energyBar.style.width =
      value + "%";
  }

  updateEnergy();

  energyBtn.addEventListener("click", () => {

    value =
      value >= 100
        ? 10
        : value + 5;

    localStorage.setItem(
      "cleanEnergy",
      value
    );

    updateEnergy();

  });

}


const quizQuestions = [

  {
    q: "What does IoT stand for?",
    options: [
      "Internet of Technology",
      "Internet of Things",
      "Information of Tools"
    ],
    answer: 1
  },

  {
    q: "Which technology can help a car drive without a human driver?",
    options: [
      "LiDAR Sensors",
      "Solar Panels",
      "BIM"
    ],
    answer: 0
  },

  {
    q: "Which is a renewable energy source?",
    options: [
      "Coal",
      "Solar Energy",
      "Gasoline"
    ],
    answer: 1
  },

  {
    q: "What is telemedicine?",
    options: [
      "Remote healthcare services",
      "Smart traffic lights",
      "Energy storage"
    ],
    answer: 0
  },

  {
    q: "What does AI mean?",
    options: [
      "Automatic Infrastructure",
      "Artificial Intelligence",
      "Advanced Internet"
    ],
    answer: 1
  }

];


let quizIndex = 0;
let quizScore = 0;


function renderQuiz() {

  const question =
    document.getElementById("quizQuestion");

  const options =
    document.getElementById("quizOptions");

  const progress =
    document.getElementById("quizProgress");

  if (!question) return;


  if (quizIndex >= quizQuestions.length) {

    question.textContent =
      "Quiz Complete!";

    options.innerHTML = "";

    progress.textContent =
      `Your Score: ${quizScore} / ${quizQuestions.length}`;

    const result =
      document.getElementById("quizResult");

    result.style.display = "block";

    result.innerHTML =
      `🎉 Great job! You scored
      <strong>${quizScore}/${quizQuestions.length}</strong>.`;

    return;
  }


  const item =
    quizQuestions[quizIndex];

  question.textContent =
    item.q;

  progress.textContent =
    `Question ${quizIndex + 1}
     of ${quizQuestions.length}`;

  options.innerHTML = "";


  item.options.forEach((option, index) => {

    const button =
      document.createElement("button");

    button.className = "option";

    button.textContent =
      option;

    button.onclick = () => {

      if (index === item.answer) {
        quizScore++;
      }

      quizIndex++;

      renderQuiz();

    };

    options.appendChild(button);

  });

}

renderQuiz();


const buildBtn =
  document.getElementById("buildBtn");


if (buildBtn) {

  buildBtn.addEventListener("click", () => {

    const energy =
      document.getElementById("energyChoice").value;

    const transport =
      document.getElementById("transportChoice").value;

    const building =
      document.getElementById("buildingChoice").value;


    let sustainability = 70;
    let technology = 70;
    let efficiency = 70;


    if (energy === "solar") {

      sustainability += 20;
      efficiency += 15;

    }

    if (energy === "wind") {

      sustainability += 18;
      efficiency += 12;

    }

    if (energy === "mixed") {

      sustainability += 25;
      efficiency += 18;

    }


    if (transport === "autonomous") {

      technology += 20;
      efficiency += 8;

    }

    if (transport === "electric") {

      sustainability += 10;
      technology += 15;

    }

    if (transport === "smart") {

      technology += 18;
      efficiency += 12;

    }


    if (building === "green") {

      sustainability += 10;
      efficiency += 10;

    }

    if (building === "ai") {

      technology += 18;
      efficiency += 10;

    }

    if (building === "smart") {

      technology += 12;
      efficiency += 8;

    }


    sustainability =
      Math.min(100, sustainability);

    technology =
      Math.min(100, technology);

    efficiency =
      Math.min(100, efficiency);


    const overall =
      Math.round(
        (sustainability +
         technology +
         efficiency) / 3
      );


    localStorage.setItem(
      "cityChoices",
      JSON.stringify({
        energy,
        transport,
        building
      })
    );


    document.getElementById(
      "sustainability"
    ).textContent =
      sustainability + "%";


    document.getElementById(
      "technology"
    ).textContent =
      technology + "%";


    document.getElementById(
      "efficiency"
    ).textContent =
      efficiency + "%";


    document.getElementById(
      "overall"
    ).textContent =
      overall + "%";


    document.getElementById(
      "buildResult"
    ).style.display =
      "block";

  });

}