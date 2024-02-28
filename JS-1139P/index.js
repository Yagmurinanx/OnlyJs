function updateTeamName(team) {
  let newName = prompt("Enter new name for " + team + ":");
  if (newName !== null && newName.trim() !== "") {
    if (team === "Team A") {
      teamAName = newName;
      document.getElementById("teamAName").innerText = teamAName;
    } else if (team === "Team B") {
      teamBName = newName;
      document.getElementById("teamBName").innerText = teamBName;
    }
  }
}



function updateTeamGoals(team, action, value) {
  let currentValue;
  if (team === "Team A") {
    currentValue = parseInt(document.getElementById("scoreA").value);
  } else if (team === "Team B") {
    currentValue = parseInt(document.getElementById("scoreB").value);
  }

  let newValue;
  if (action === "increase") {
    newValue = currentValue + value;
  } else if (action === "decrease") {
    newValue = Math.max(0, currentValue - value); 
  } else if (action === "assign") {
    newValue = parseInt(value);
    if (isNaN(newValue)) {
      alert("Lütfen geçerli bir sayı giriniz!");
      return;
    }
  }

  if (team === "Team A") {
    teamAGoals = newValue;
    document.getElementById("scoreA").value = teamAGoals;
  } else if (team === "Team B") {
    teamBGoals = newValue;
    document.getElementById("scoreB").value = teamBGoals;
  }
}
