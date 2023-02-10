//-------------elements
let aplha_container = document.querySelector(".alpha_container");
let words_container = document.querySelector(".words");
let messageUI = document.querySelector(".message_box");
let restartBtn = document.querySelector(".main_btn");
let nextBtn = document.querySelector(".next_btn");
let livesUI = document.querySelector(".lives");
let revealWrd = document.querySelector(".reveal_word");

//----------- variables
let words = [
  "honey",
  "computer",
  "home",
  "sport",
  "book",
  "learn",
  "dream",
  "fun",
];
let alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let trials = 5;
let randomWord = genRandomWord();
let userInput;

//---------- Event listeners
restartBtn.addEventListener("click", () => {
  reset();
});

nextBtn.addEventListener("click", () => {
  next();
});

aplha_container.addEventListener("click", (e) => {
  if (e.target.dataset.index && !e.target.disabled) {
    e.target.setAttribute("disabled", true);
    handleHangman(e.target.dataset.index);
  }
});

function genRandomWord() {
  let ranNum = Math.floor(Math.random() * words.length);
  return words[ranNum];
}

function updateHangman(index, userInput) {
  words_container.children[index].textContent = userInput;
}

function fillLives() {
  //initialize lives
  for (let i = 0; i < trials; i++) {
    let lives = "<span>💖</span>";
    if (livesUI.childElementCount != 5) {
      livesUI.innerHTML += lives;
    }
  }
}

function initializeHangman() {
  restartBtn.style.display = "none";
  nextBtn.style.display = "none";
  // set alphabet button
  alphabets.forEach((alphabet) => {
    let alpha_box = `<button class="box alphabet" data-index="${alphabet}">${alphabet}</div>`;
    if (aplha_container.childElementCount < 26) {
      aplha_container.innerHTML += alpha_box;
    }
  });

  // set hangman dash
  randomWord.split("").forEach(() => {
    let word = `<span class="dash">_</span>`;
    words_container.innerHTML += word;
  });
}

function reset() {
  // for (child of aplha_container.children) {
  //   child.hasAttribute("disabled")
  //     ? child.removeAttribute("disabled")
  //     : console.log("false");
  // }
  livesUI.innerHTML = "";
  trials = 5;
  next();
  fillLives();
}

function next() {
  messageUI.innerHTML = "";
  aplha_container.innerHTML = "";
  words_container.innerHTML = "";
  revealWrd.style.display = "none";
  randomWord = genRandomWord();
  randomWord = genRandomWord();
  initializeHangman();
}

function handleMessage(text, status = null) {
  let message = `<div class="message ${status}">${text}</div>`;
  messageUI.innerHTML += message;
  setTimeout(() => {
    messageUI.firstChild.remove();
  }, 2000);
}

function disableBtn() {
  for (let i = 0; i < 26; i++) {
    let button = aplha_container.children[i];
    if (!button.disabled) {
      button.disabled = true;
    }
  }
}

function handleHangman(userInput) {
  let correct = false;
  // let isGameEnd = false;
  for (let i = 0; i <= randomWord.length; i++) {
    if (userInput == randomWord[i]) {
      updateHangman(i, userInput);
      correct = true;
      handleMessage(`You guessed ${userInput} right`);
    }
  }
  if (!correct) {
    trials--;
    livesUI.lastChild.remove();
    handleMessage(`${userInput} is wrong!`, "error");
  }

  if (!words_container.textContent.includes("_")) {
    // isGameEnd = true;
    nextBtn.style.display = "block";
    disableBtn();
  }

  if (trials == 0) {
    restartBtn.style.display = "block";
    revealWrd.innerHTML = `<p>The word is ${randomWord}</p>`;
    revealWrd.style.display = "block";
  }

  if (!trials) {
    disableBtn();
  }
}

// function calls
initializeHangman();
fillLives();
