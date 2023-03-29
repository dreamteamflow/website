/**
 *
 * Copyright 2023 José dBruxelles. All rights reserved.
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

/**
 * Draw a fir tree with - and *.
 * @param {number} nbLine number of line
 * @return {string} tree
 */
function drawTree(nbLine) {
  let nbCol = (nbLine * 2) - 1; // number of column
  let starCount = 1; // number of star
  let tiretCount = nbLine - starCount;
  let line = "<p>$0</p>"; // $0 = where line content will be inserted
  let value = ""; // line content
  let tree = "";
  let i, j;

  for (i = 0; i < nbLine; i++) {  // loop for line
    for (j = 0; j < nbCol; j++) { // loop for column
      // type = debut: >= ; fin: <=
      // ln 1 = debut: 4 ; fin: 5
      // ln 2 = debut: 3 ; fin: 6
      // ln 3 = debut: 2 ; fin: 7
      // ln 4 = debut: 1 ; fin: 8
      // ln 5 = debut: 0 ; fin: 9
      if (
        j >= ((nbCol - starCount) / 2 ) && // start of stars
        j < (nbCol - tiretCount)           // end of stars
      ) {
        value += "<span>*</span>";
      } else {
        value += "<span>-</span>";
      }
    }
    tiretCount--;    // decrement tiretCount
    starCount += 2;  // add 2 stars each line
    tree += line.replace("$0", value); // replace $0 by value
    value = "";      // reset value
  }

  return tree;
}

function init() {
  let nbLine = prompt("Combien de lignes voulez-vous dessiner ?");
  while (isNaN(nbLine)) { // isNaN = is not a number
    nbLine = prompt("Veuillez entrer un nombre !");
  }
  let tree = drawTree(nbLine);
  document.getElementById("app").innerHTML = tree;
}

init();
