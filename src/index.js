document.addEventListener("DOMContentLoaded",init)

function init(){
    console.log('hello kitty')
    fetch('http://ergast.com/api/f1/seasons.json')
    .then(res => res.json())
    .then(resp => {
        let total = resp.MRData.total
        loadYears(total)
    })
    
}


function loadYears(total){
    console.log(total)
    let requestOptions ={
        method: 'GET',
        redirect: 'follow'
    }
    fetch(`http://ergast.com/api/f1/seasons.json`,requestOptions)
    .then(resp => resp.json())
    .then(years => years.MRData.SeasonTable.Seasons.forEach(year => {
        let option = document.createElement('option')
        option.innerHTML = `
            ${year.season}

        `
        option.value = year.season
        
        
        document.getElementById('yearList').appendChild(option)
        
    
    }))
    
    .catch(error => console.log('error',error))
    let p = document.createElement('p')

    p.innerHTML = `Hello test`
    document.getElementById('yearList').appendChild(p)
    document.getElementById('season-form').addEventListener('submit',(e)=>displayYear(e))
}



function displayYear(evt){
    evt.preventDefault()
    const select = document.getElementById('yearList');
    const value = select.options[select.selectedIndex].value;
    const displayDiv = document.getElementById("yearResult")
    console.log(value);
    fetch(`http://ergast.com/api/f1/${value}.json`)
    .then(resp => resp.json())
    .then(resp =>{
        //clear the div
        displayDiv.innerHTML = ``

        //shows what season you are looking at
        const h2 = document.createElement('h2')
        h2.textContent = `The races for the ${value} season `
        displayDiv.appendChild(h2)
        
        const races = resp.MRData.RaceTable.Races
        races.forEach(race => {

            const h3 = document.createElement('h3')
            h3.innerHTML = `${race.raceName}`
            displayDiv.appendChild(h3)
        })
        console.log(races)
        
        
    })

}