let counter = 0;

window.onload = function() {
    if (counter === 0) {
      document.getElementById("lazyCat").style.display = "none";
    }
  };
function increaseCounter() {
  counter++;
  document.getElementById("counterIndicator").innerHTML = counter;

  if (counter > 5) {
    document.getElementById("studyCat").style.display = "none";
    document.getElementById("lazyCat").style.display = "block";
  }
}

function decreaseCounter() {
  if (counter > 0) {
    counter--;
  } else {
    counter = 0;
  }
  document.getElementById("counterIndicator").innerHTML = counter;

  if (counter <= 5) {
    document.getElementById("studyCat").style.display = "block";
    document.getElementById("lazyCat").style.display = "none";
  }
}