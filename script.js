const baseURL = "https://ergast.com/api/f1/";
let apiURL;
const yearEntered = document.querySelector(".yearInput");
const resultsData = document.querySelector(".results");
const submit = document.querySelector("form");

submit.addEventListener("submit", fetchResults);

function fetchResults(e) {
  e.preventDefault();
  apiURL = baseURL + yearEntered.value + ".json";
  fetch(apiURL)
    .then(function (result) {
      // console.log(result)
      return result.json();
    })
    .then(function (json) {
      displayResults(json);
    });
}

function displayResults(json) {
  // console.log('I am displaying results');
  while (resultsData.firstChild) {
    resultsData.removeChild(resultsData.firstChild);
  }
  let races = json.MRData.RaceTable.Races;
  if (races.length === 0) {
    resultsData.innerHTML =
      "<p>There were no races that year. Please enter a valid year.</p>";
    resultsData.style.textAlign = "center";
  } else {
    let resultsTable = document.createElement("table");
    resultsData.appendChild(resultsTable);
    resultsTable.classList.add("resultsData");
    resultsTable.style.border = "1px solid black";
    resultsTable.style.marginTop = "5px";
    let tableInternal = document.querySelector(".resultsData");
    for (let i = 0; i <= races.length; i++) {
      let tableRow = document.createElement("tr");
      const currentRace = races[i - 1];
      tableInternal
        .appendChild(tableRow)
        .classList.add("internal-row", "row" + i);
      let tableData = document.createElement("td");
      let currentRow = document.querySelector(".row" + i);
      let createRaceLink = document.createElement("a");
      let createCircuitLink = document.createElement("a");
      if (i == 0) {
        let headerRow = document.querySelector(".row0");
        headerRow.appendChild(tableData);
        headerRow.innerHTML =
          "<td>Round</td><td>Race Name</td><td>Race Date</td><td>City</td><td>Country</td><td>Circuit Name</td>";
      } else {
        currentRow.innerHTML =
          "<td></td><td></td><td></td><td></td><td></td><td></td>";
        // console.log(currentRace);
        let roundNumber = currentRow.firstChild;
        roundNumber.textContent = currentRace.round;
        let raceName = roundNumber.nextSibling;
        raceName.appendChild(createRaceLink);
        raceName.firstChild.textContent = currentRace.raceName;
        raceName.firstChild.href = currentRace.url;
        raceName.firstChild.target = "_blank";
        let raceDate = raceName.nextSibling;
        raceDate.textContent = currentRace.date;
        let raceCity = raceDate.nextSibling;
        raceCity.textContent = currentRace.Circuit.Location.locality;
        let raceCountry = raceCity.nextSibling;
        raceCountry.textContent = currentRace.Circuit.Location.country;
        let circuitName = raceCountry.nextSibling;
        circuitName.appendChild(createCircuitLink);
        circuitName.firstChild.textContent = currentRace.Circuit.circuitName;
        circuitName.firstChild.href = currentRace.Circuit.url;
        circuitName.firstChild.target = "_blank";
      }
    }
  }
}
