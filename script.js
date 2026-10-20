
document.addEventListener("DOMContentLoaded", function () {
  // DARK MODE
  const themeButton = document.getElementById("theme-toggle");

  if (themeButton) {
    themeButton.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");
      themeButton.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
    });
  }

  // STRETCH LIBRARY FILTER
  const filter = document.getElementById("stretch-filter");
  const stretchCards = document.querySelectorAll(".stretch-card");
  const noStretches = document.getElementById("no-stretches");

  if (filter) {
    filter.addEventListener("change", function () {
      let visibleCount = 0;

      stretchCards.forEach(function (card) {
        const matches =
          filter.value === "all" ||
          card.dataset.group === filter.value;

        card.hidden = !matches;

        if (matches) {
          visibleCount++;
        }
      });

      if (noStretches) {
        noStretches.hidden = visibleCount > 0;
      }
    });
  }

  // ROUTINE GENERATOR
  const generateButton = document.getElementById("generate-routine");
  const results = document.getElementById("routine-results");
  const routineList = document.getElementById("routine-list");
  const routineMessage = document.getElementById("routine-message");
  const routineSummary = document.getElementById("routine-summary");

  const stretches = [
    {
      group: "legs",
      name: "Standing Quad Stretch",
      description: "Stand tall and gently bring one heel toward your glutes. Use a wall for balance if needed.",
      duration: "20–30 seconds per side"
    },
    {
      group: "legs",
      name: "Hamstring Stretch",
      description: "Extend one leg with your heel on the floor and gently hinge forward at your hips.",
      duration: "20–30 seconds per side"
    },
    {
      group: "glutes",
      name: "Figure-Four Stretch",
      description: "Lie on your back, cross one ankle over the opposite thigh, and gently draw the supporting leg toward you.",
      duration: "20–30 seconds per side"
    },
    {
      group: "glutes",
      name: "Knees-to-Chest Stretch",
      description: "Lie on your back and gently bring your knees toward your chest.",
      duration: "20–30 seconds"
    },
    {
      group: "back",
      name: "Child's Pose",
      description: "Kneel, sit your hips back toward your heels, and reach your arms forward comfortably.",
      duration: "20–30 seconds"
    },
    {
      group: "back",
      name: "Cat-Cow Stretch",
      description: "On your hands and knees, slowly round and gently arch your back while breathing steadily.",
      duration: "6–8 slow cycles"
    },
    {
      group: "upper",
      name: "Cross-Body Shoulder Stretch",
      description: "Bring one arm across your chest and gently support it with your other arm.",
      duration: "20–30 seconds per side"
    },
    {
      group: "upper",
      name: "Chest Opener",
      description: "Stand tall, gently bring your arms behind you, and open your chest.",
      duration: "20–30 seconds"
    },
    {
      group: "core",
      name: "Gentle Cobra Stretch",
      description: "Lie on your stomach and gently lift your chest only as far as feels comfortable.",
      duration: "10–20 seconds"
    },
    {
      group: "core",
      name: "Side Stretch",
      description: "Stand tall, raise one arm, and lean gently to the opposite side.",
      duration: "20 seconds per side"
    }
  ];

  if (generateButton) {
    generateButton.addEventListener("click", function () {
      const selectedGroups = Array.from(
        document.querySelectorAll('input[name="muscle"]:checked')
      ).map(function (checkbox) {
        return checkbox.value;
      });

      if (selectedGroups.length === 0) {
        routineMessage.textContent =
          "Please select at least one muscle group first.";
        results.hidden = true;
        return;
      }

      routineMessage.textContent = "";
      routineList.replaceChildren();

      const chosenStretches = stretches.filter(function (stretch) {
        return selectedGroups.includes(stretch.group);
      });

      chosenStretches.forEach(function (stretch, index) {
        const item = document.createElement("article");
        item.className = "routine-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute(
          "aria-label",
          "Mark " + stretch.name + " as completed"
        );

        const content = document.createElement("div");
        const heading = document.createElement("h3");
        const description = document.createElement("p");
        const duration = document.createElement("p");

        heading.textContent = (index + 1) + ". " + stretch.name;
        description.textContent = stretch.description;
        duration.textContent = "Hold: " + stretch.duration;
        duration.className = "stretch-time";

        content.append(heading, description, duration);
        item.append(checkbox, content);
        routineList.appendChild(item);

        checkbox.addEventListener("change", function () {
          item.classList.toggle("completed", checkbox.checked);
        });
      });

      routineSummary.textContent =
        chosenStretches.length + " stretches selected. Move slowly and breathe normally.";

      results.hidden = false;
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // PRINT ROUTINE
  const printButton = document.getElementById("print-routine");

  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  // 30-SECOND STRETCH TIMER
  const timerDisplay = document.getElementById("timer-display");
  const startButton = document.getElementById("start-timer");
  const resetButton = document.getElementById("reset-timer");
  const timerStatus = document.getElementById("timer-status");

  let secondsLeft = 30;
  let timerInterval = null;

  function updateTimerDisplay() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    timerDisplay.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }

  if (timerDisplay && startButton && resetButton) {
    updateTimerDisplay();

    startButton.addEventListener("click", function () {
      if (timerInterval !== null) {
        return;
      }

      if (secondsLeft === 0) {
        secondsLeft = 30;
        updateTimerDisplay();
      }

      timerStatus.textContent = "Timer running. Keep your stretch comfortable.";
      startButton.textContent = "Timer Running…";

      timerInterval = setInterval(function () {
        secondsLeft--;
        updateTimerDisplay();

        if (secondsLeft <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;
          timerStatus.textContent = "Time is up! Switch sides or choose another stretch.";
          startButton.textContent = "Start Again";
        }
      }, 1000);
    });

    resetButton.addEventListener("click", function () {
      clearInterval(timerInterval);
      timerInterval = null;
      secondsLeft = 30;
      updateTimerDisplay();
      timerStatus.textContent = "Timer reset. Ready when you are.";
      startButton.textContent = "Start 30 Seconds";
    });
  }
});
