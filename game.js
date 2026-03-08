const story = {
  start: {
    text: "You wake up in a small lantern-lit room. On the wall hangs a map and a locked door stands in front of you.",
    image: "images/scene1.svg",
    choices: [
      { label: "Examine the map", next: "map" },
      { label: "Try the door", next: "door" },
      { label: "Look around the room", next: "room" }
    ]
  },

  map: {
    text: "The map shows three locations: a foggy forest, a cracked bridge, and a tower. A scribble in the corner reads: ‘Trust what you see.’",
    image: "images/scene2.svg",
    choices: [
      { label: "Head to the forest", next: "forest" },
      { label: "Cross the bridge", next: "bridge" },
      { label: "Climb the tower", next: "tower" }
    ]
  },

  door: {
    text: "The door is locked with a simple tumbler lock. You don't have a key, but there is a loose stone in the wall nearby.",
    image: "images/scene1.svg",
    choices: [
      { label: "Search the stone", next: "stone" },
      { label: "Return to the center", next: "start" }
    ]
  },

  room: {
    text: "A few shelves hold dusty books and a lantern. The lantern flickers when you touch it.",
    image: "images/scene1.svg",
    choices: [
      { label: "Inspect the books", next: "books" },
      { label: "Return to the center", next: "start" }
    ]
  },

  stone: {
    text: "Behind the stone is a small key. You have it now. The door still seems locked.",
    image: "images/scene3.svg",
    choices: [
      { label: "Use the key on the door", next: "unlocked" },
      { label: "Go back", next: "start" }
    ]
  },

  books: {
    text: "One book has an illustration of the three locations. It hints that the right path depends on what you’re willing to leave behind.",
    image: "images/scene2.svg",
    choices: [
      { label: "Go back", next: "start" }
    ]
  },

  unlocked: {
    text: "The door clicks open. Beyond it you see a winding hallway leading to new adventures.",
    image: "images/scene4.svg",
    choices: [
      { label: "Step through the door", next: "end" },
      { label: "Stay in the room", next: "start" }
    ]
  },

  end: {
    text: "You walk into the unknown. For now, the story ends — but the adventure continues in your imagination.",
    image: "images/scene4.svg",
    choices: [
      { label: "Restart the story", next: "start" }
    ]
  }
};

const elements = {
  sceneText: document.getElementById("sceneText"),
  sceneImage: document.getElementById("sceneImage"),
  choices: document.getElementById("choices"),
  restartBtn: document.getElementById("restartBtn")
};

function renderScene(key) {
  const scene = story[key];
  if (!scene) {
    console.warn(`Unknown scene: ${key}`);
    return;
  }

  elements.sceneText.textContent = scene.text;
  elements.sceneImage.src = scene.image;
  elements.sceneImage.alt = scene.text;

  elements.choices.innerHTML = "";
  scene.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn";
    button.textContent = choice.label;
    button.addEventListener("click", () => renderScene(choice.next));
    elements.choices.appendChild(button);
  });
}

function init() {
  renderScene("start");
}

elements.restartBtn.addEventListener("click", () => renderScene("start"));

init();
