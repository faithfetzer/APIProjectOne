const baseURL = 'http://ergast.com/api/f1/';
let apiURL;
const yearEntered = document.querySelector('.yearInput');
const resultsData = document.querySelector('.results');
const submit = document.querySelector('form');

submit.addEventListener('submit', fetchResults);


function fetchResults(e) {
    e.preventDefault();
    apiURL = baseURL + yearEntered.value + '.json';
    fetch(apiURL)
        .then(function(result){
            // console.log(result)
            return result.json();
        // }) .then(function(json){
        //     console.log(json);
        }) .then(function(json){
            displayResults(json);
        })
};

function displayResults(json) {
    // console.log('I am displaying results');
    while (resultsData.firstChild) {
        resultsData.removeChild(resultsData.firstChild);
    }
    let races = json.MRData.RaceTable.Races;
    if(races.length === 0){
        resultsData.innerHTML='<p>No Races That Year. Please enter a valid year.</p>';
    } else {
        let resultsTable = document.createElement('table');
        resultsData.appendChild(resultsTable);
        resultsTable.classList.add('resultsData');
        let tableInternal = document.querySelector('.resultsData');
        resultsTable.innerHTML='<tr><th>Race Name</th><th>Race Date</th><th>Circuit Name</th><th>City</th><th>Country</th></tr>'
        let tableRow =document.createElement('tr');
        let tableData = document.createElement('td');
        let link = document.createElement('a');
        for({raceName, date} of races){
            tableInternal.appendChild(tableRow);
            // resultsTable.tableRow();
            console.log(raceName, date);
            // tableRow.tableData();
            // tableRow.firstChild.innerHTML = raceName;
            // tableRow.appendChild.innerHTML = '<td>date</td>';
        }
        };
        console.log(resultsData);
    }
    

