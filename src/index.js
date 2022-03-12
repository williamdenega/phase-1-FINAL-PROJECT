 console.log('hello kitty')
document.getElementById('yearTAB').addEventListener(`click`,console.log(document.getElementById('yearTAB')))
document.getElementById('driverTAB').addEventListener('click',console.log('hello'))


const tabs = document.querySelectorAll('[data-tab-target]')
const tabContent = document.querySelectorAll('[data-tab-content')

tabs.forEach(tab => {
    tab.addEventListener('click', () =>{
        
        const target = document.querySelector(tab.dataset.tabTarget)
        tabContent.forEach(tabContent => {
            tabContent.classList.remove('active')
        })
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        target.classList.add('active')

        if(tab.id == 'yearTAB') yearInit()
        else if(tab.id == 'driverTAB') driverInit()
        else if(tab.id == 'teamTAB') teamInit()
    })
})



function yearInit(){
   
    fetch('http://ergast.com/api/f1/seasons.json')
    .then(res => res.json())
    .then(resp => {
        let total = resp.MRData.total
        loadYears(total)
    })
    
}

function driverInit(){
    console.log('driver')

}


function teamInit(){
    console.log('team')

}

function loadYears(total){
    const requestOptions ={
        method: 'GET',
        redirect: 'follow'
    }
    fetch(`http://ergast.com/api/f1/seasons.json?limit=${total}`,requestOptions)
    .then(resp => resp.json())
    .then(years => years.MRData.SeasonTable.Seasons.forEach(year => {
        // fetch(`http://ergast.com/api/f1/${year.season}.json`)
        // .then(res => res.json())
        // .then(year =>console.log(year))
        //http://ergast.com/api/f1/2016/driverStandings
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
    fetch(`http://ergast.com/api/f1/${value}.json`)
    .then(resp => resp.json())
    .then(resp =>{
        //clear the div
        displayDiv.innerHTML = ``
        
        //fetching driver standings
        fetch(`http://ergast.com/api/f1/${value}/driverStandings.json`)
        .then(resp=> resp.json())
        .then(standings =>{
            console.log(standings.MRData.StandingsTable.StandingsLists)

        })
        const h2stats = document.createElement('h2')
        h2stats.textContent = `The resutls for the ${value} season`
        displayDiv.appendChild(h2stats)
        //shows what season you are looking at
        const h2 = document.createElement('h2')
        h2.textContent = `The races for the ${value} season `
        displayDiv.appendChild(h2)
        
        const races = resp.MRData.RaceTable.Races
        races.forEach(race => {
            const h3 = document.createElement('h3')
            h3.innerHTML = `<a href='${race.url}'>${race.raceName}</a>`
            //h3.href = `${race.url}`
            //<h1><a href="#">heading</a></h1>
            h3.className = 'RaceList'
            //cursor: pointer;
            displayDiv.appendChild(h3)
        })
        //console.log(races)
        
        
    })

}