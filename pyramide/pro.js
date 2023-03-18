function drawTriangle(nbCols) {
  // 1
  // 1 2
  // 1 2 3
  // 1 2 3 4
  // 1 2 3 4 5
  // 1 2 3 4
  // 1 2 3
  // 1 2
  // 1

  let triangle = "";
  let values = [];
  let line = "<p>$0</p>";

  for (let i = 1; i <= nbCols * 2 - 1; i++) {
    if (i < nbCols + 1) {
      values.push(`&nbsp;${i}&nbsp;`);
      triangle += line.replace("$0", values.join(""));
    } else {
      values.pop();
      triangle += line.replace("$0", values.join(""));
    }
  }
  return triangle;
}

function init() {
  let nbCols = prompt("Combien de colonnes voulez-vous dessiner ?");
  while (isNaN(nbCols)) {
    nbCols = prompt("Veuillez entrer un nombre !");
  }
  let triangle = drawTriangle(Number(nbCols));
  document.getElementById("app").innerHTML = triangle;
}

init();
