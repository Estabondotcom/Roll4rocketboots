function handleSkillInput() {
  const container = document.getElementById('skills-container');
  const inputs = container.getElementsByClassName('skill-input');
  const lastInput = inputs[inputs.length - 1];

  if (lastInput.value.trim() !== "") {
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'skill-input';
    newInput.placeholder = 'New skill...';
    newInput.oninput = handleSkillInput;
    container.appendChild(newInput);
  }
}

function saveData() {
  const name = document.getElementById('char-name').value;
  const inventory = document.getElementById('inventory').value;

  const skillInputs = document.querySelectorAll('.skill-input');
  const skills = [];
  skillInputs.forEach(input => {
    if (input.value.trim() !== "") skills.push(input.value.trim());
  });

  const data = { name, skills, inventory };
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;
  document.getElementById('inventory').value = data.inventory;

  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  data.skills.forEach(skill => {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'skill-input';
    input.value = skill;
    input.oninput = handleSkillInput;
    container.appendChild(input);
  });

  // Add one empty field
  const newInput = document.createElement('input');
  newInput.type = 'text';
  newInput.className = 'skill-input';
  newInput.placeholder = 'New skill...';
  newInput.oninput = handleSkillInput;
  container.appendChild(newInput);

  alert('Character loaded!');
}

function clearData() {
  localStorage.removeItem('rfrbCharacter');
  document.getElementById('char-form').reset();

  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'skill-input';
  input.value = 'Do anything';
  input.oninput = handleSkillInput;
  container.appendChild(input);

  alert('Character cleared.');
}
