function saveData() {
  const name = document.getElementById('char-name').value;
  const skills = document.getElementById('skills').value;
  const inventory = document.getElementById('inventory').value;

  const data = { name, skills, inventory };
  localStorage.setItem('rfrbCharacter', JSON.stringify(data));
  alert('Character saved!');
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('rfrbCharacter'));
  if (!data) return alert('No saved character!');

  document.getElementById('char-name').value = data.name;
  document.getElementById('skills').value = data.skills;
  document.getElementById('inventory').value = data.inventory;
  alert('Character loaded!');
}

function clearData() {
  localStorage.removeItem('rfrbCharacter');
  document.getElementById('char-form').reset();
  alert('Character cleared.');
}
