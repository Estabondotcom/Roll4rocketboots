function createSkillInput(value = "", levels = [true, false, false, false]) {
  const container = document.createElement('div');
  container.className = 'input-wrapper';

  const checkboxes = document.createElement('div');
  checkboxes.className = 'skill-levels';

  for (let i = 1; i <= 4; i++) {
    const label = document.createElement('label');
    label.className = 'level-label';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'skill-level';
    checkbox.dataset.level = i;
    checkbox.checked = levels[i - 1];

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode((i + 1) + "🎲"));
    checkboxes.appendChild(label);
  }

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'skill-input';
  input.placeholder = 'New skill...';
  input.value = value;
  input.maxLength = 20;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '✕';
  button.className = 'delete-button';
  button.onclick = () => container.remove();

  container.appendChild(checkboxes);
  container.appendChild(input);
  container.appendChild(button);

  return container;
}

function createItemInput(value = "") {
  const container = document.createElement('div');
  container.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'item-input';
  input.placeholder = 'Item...';
  input.value = value;
  input.maxLength = 20;

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '✕';
  button.className = 'delete-button';
  button.onclick = () => container.remove();

  container.appendChild(input);
  container.appendChild(button);

  return container;
}

function addSkill(value = "", levels = [true, false, false, false]) {
  const container = document.getElementById('skills-container');
  container.appendChild(createSkillInput(value, levels));
}

function addItem(value = "") {
  const container = document.getElementById('items-container');
  container.appendChild(createItemInput(value));
}

function saveData() {
  const name = document.getElementById('char-name').value;

  const skillInputs = document.querySelectorAll('.input-wrapper .skill-input');
  const skills = [];
  skillInputs.forEach(input => {
    const container = input.parentElement;
    const checkboxes = container.querySelectorAll('.skill-level');
    const levels = Array.from(checkboxes).map(cb => cb.checked);
    if (input.value.trim() !== "") {
      skills.push({ name: input.value.trim(), levels });
    }
  });

  const itemInputs = document.querySelectorAll('.item-input');
  const items = [];
  itemInputs.forEach(input => {
    if (input.value.trim() !== "") items.push(input.value.trim());
  });

  const data = {name, skills, items,
  conditions: Array.from(document.querySelectorAll('#conditions-container .input-wrapper')).map(wrapper => ({ name: wrapper.querySelector('.skill-input').value, levels: Array.from(wrapper.querySelectorAll('.skill-level')).map(cb => cb.checked) }))
};
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  data.skills.forEach(skill => addSkill(skill.name, skill.levels));
if (data.conditions) data.conditions.forEach(condition => addCondition(condition.name, condition.levels));

  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';
  data.items.forEach(item => addItem(item));

  alert('Character loaded!');
}

function clearData() {
  localStorage.removeItem('rfrbCharacter');
  document.getElementById('char-form').reset();

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  addSkill('Do anything');

  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';

  alert('Character cleared.');
}


    }
  });

  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme && themes.includes(savedTheme)) {
    document.body.className = `theme-${savedTheme}`;
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const themes = ['green', 'blue', 'pink', 'mono'];

  themes.forEach(theme => {
    const btn = document.querySelector(`.palette-${theme}`);
    if (btn) {
      btn.addEventListener("click", () => {
        document.body.classList.remove(...themes.map(t => "theme-" + t));
        document.body.classList.add("theme-" + theme);
        localStorage.setItem("selectedTheme", theme);
      });
    }
  });

  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme && themes.includes(savedTheme)) {
    document.body.classList.add("theme-" + savedTheme);
  }
});
