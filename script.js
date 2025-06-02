function addSkill(value = "") {
  const container = document.getElementById('skills-container');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'skill-input';
  newInput.placeholder = 'New skill...';
  newInput.value = value;
  newInput.maxLength = 20;
  container.appendChild(newInput);
}

function addItem(value = "") {
  const container = document.getElementById('items-container');
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'item-input';
  newInput.placeholder = 'Item...';
  newInput.value = value;
  newInput.maxLength = 20;
  container.appendChild(newInput);
}

function saveData() {
  const name = document.getElementById('char-name').value;

  const skillInputs = document.querySelectorAll('.skill-input');
  const skills = [];
  skillInputs.forEach(input => {
    if (input.value.trim() !== "") skills.push(input.value.trim());
  });

  const itemInputs = document.querySelectorAll('.item-input');
  const items = [];
  itemInputs.forEach(input => {
    if (input.value.trim() !== "") items.push(input.value.trim());
  });

  const data = { name, skills, items };
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;

  const skillContainer = document.getElementById('skills-container');
  skillContainer.innerHTML = '';
  data.skills.forEach(skill => addSkill(skill));

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
