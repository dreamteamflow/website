/**
 *
 * Copyright 2022 José dBruxelles. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
