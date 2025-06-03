function createSkillInput(value = "", levels = [false, false, false, false]) {
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
    label.appendChild(document.createTextNode(i));
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

function addSkill(value = "", levels = [false, false, false, false]) {
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
  addItem();

  alert('Character cleared.');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('skills-container').children.length === 0) {
    addSkill('Do anything');
  }
  if (document.getElementById('items-container').children.length === 0) {
    addItem();
  }
});


function adjustExp(amount) {
  const expSpan = document.getElementById('exp-value');
  let current = parseInt(expSpan.textContent);
  current += amount;
  if (current < 0) current = 0;
  expSpan.textContent = current;
}

function saveData() {
  const name = document.getElementById('char-name').value;
  const exp = parseInt(document.getElementById('exp-value').textContent);

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

  const data = {name, exp, skills, items,
  conditions: Array.from(document.querySelectorAll('#conditions-container .input-wrapper')).map(wrapper => ({ name: wrapper.querySelector('.skill-input').value, levels: Array.from(wrapper.querySelectorAll('.skill-level')).map(cb => cb.checked) }))
};
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;
  document.getElementById('exp-value').textContent = data.exp || 0;

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
  document.getElementById('exp-value').textContent = '0';

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  addSkill('Do anything');

  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';
  addItem();

  alert('Character cleared.');
}


function adjustLuck(amount) {
  const luckSpan = document.getElementById('luck-value');
  let current = parseInt(luckSpan.textContent);
  current += amount;
  if (current < 0) current = 0;
  luckSpan.textContent = current;
}

function saveData() {
  const name = document.getElementById('char-name').value;
  const exp = parseInt(document.getElementById('exp-value').textContent);
  const luck = parseInt(document.getElementById('luck-value').textContent);

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

  const data = {name, exp, luck, skills, items,
  conditions: Array.from(document.querySelectorAll('#conditions-container .input-wrapper')).map(wrapper => ({ name: wrapper.querySelector('.skill-input').value, levels: Array.from(wrapper.querySelectorAll('.skill-level')).map(cb => cb.checked) }))
};
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;
  document.getElementById('exp-value').textContent = data.exp ?? 0;
  document.getElementById('luck-value').textContent = data.luck ?? 1;

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
  document.getElementById('exp-value').textContent = '0';
  document.getElementById('luck-value').textContent = '1';

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  addSkill('Do anything');

  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';
  addItem();

  alert('Character cleared.');
}

function toggleWound(index) {
  const woundButtons = document.querySelectorAll('.wounds button');
  if (woundButtons[index]) {
    woundButtons[index].classList.toggle('active');
  }
}

function saveData() {
  const name = document.getElementById('char-name').value;
  const exp = parseInt(document.getElementById('exp-value').textContent);
  const luck = parseInt(document.getElementById('luck-value').textContent);
  const woundButtons = document.querySelectorAll('.wounds button');
  const wounds = Array.from(woundButtons).map(button => button.classList.contains('active'));

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

  const data = {name, exp, luck, wounds, skills, items,
  conditions: Array.from(document.querySelectorAll('#conditions-container .input-wrapper')).map(wrapper => ({ name: wrapper.querySelector('.skill-input').value, levels: Array.from(wrapper.querySelectorAll('.skill-level')).map(cb => cb.checked) }))
};
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;
  document.getElementById('exp-value').textContent = data.exp ?? 0;
  document.getElementById('luck-value').textContent = data.luck ?? 1;

  const woundButtons = document.querySelectorAll('.wounds button');
  if (data.wounds) {
    data.wounds.forEach((isActive, i) => {
      if (woundButtons[i]) {
        woundButtons[i].classList.toggle('active', isActive);
      }
    });
  }

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
  document.getElementById('exp-value').textContent = '0';
  document.getElementById('luck-value').textContent = '1';

  const woundButtons = document.querySelectorAll('.wounds button');
  woundButtons.forEach(button => button.classList.remove('active'));

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  addSkill('Do anything');

  const itemContainer = document.getElementById('items-container');
  itemContainer.innerHTML = '';
  addItem();

  alert('Character cleared.');
}

function toggleRules() {
  const modal = document.getElementById('rules-modal');
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
}

function downloadCharacter() {
  const name = document.getElementById('char-name').value;
  const exp = parseInt(document.getElementById('exp-value').textContent);
  const luck = parseInt(document.getElementById('luck-value').textContent);
  const woundButtons = document.querySelectorAll('.wounds button');
  const wounds = Array.from(woundButtons).map(button => button.classList.contains('active'));

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

  const data = {name, exp, luck, wounds, skills, items,
  conditions: Array.from(document.querySelectorAll('#conditions-container .input-wrapper')).map(wrapper => ({ name: wrapper.querySelector('.skill-input').value, levels: Array.from(wrapper.querySelectorAll('.skill-level')).map(cb => cb.checked) }))
};
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name || "character"}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function uploadCharacter(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const data = JSON.parse(e.target.result);

    document.getElementById('char-name').value = data.name || "";
    document.getElementById('exp-value').textContent = data.exp ?? 0;
    document.getElementById('luck-value').textContent = data.luck ?? 1;

    const woundButtons = document.querySelectorAll('.wounds button');
    woundButtons.forEach((btn, i) => {
      btn.classList.toggle('active', data.wounds?.[i]);
    });

    const skillContainer = document.getElementById('skills-container');
    skillContainer.innerHTML = '';
    (data.skills || []).forEach(skill => addSkill(skill.name, skill.levels));

    const itemContainer = document.getElementById('items-container');
    itemContainer.innerHTML = '';
    (data.items || []).forEach(item => addItem(item));

    alert('Character loaded from file!');
  };
  reader.readAsText(file);
}



function addCondition(name = '', levels = [false, false, false]) {
  const container = document.getElementById('conditions-container');

  const wrapper = document.createElement('div');
  wrapper.className = 'input-wrapper';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'skill-input';
  input.placeholder = 'New condition...';
  input.value = name;
  wrapper.appendChild(input);

  const checkboxes = document.createElement('div');
  checkboxes.className = 'skill-levels';

  for (let i = 0; i < 3; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'skill-level';
    checkbox.checked = levels[i];
    checkboxes.appendChild(checkbox);
  }

  wrapper.appendChild(checkboxes);
  container.appendChild(wrapper);
}
