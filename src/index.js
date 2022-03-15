 console.log('hello kitty')
document.addEventListener("DOMContentLoaded",yearInit())
//document.addEventListener("DOMContentLoaded",driverInit())
//document.addEventListener("DOMContentLoaded",teamInit())


const tabs = document.querySelectorAll('[data-tab-target]')
const tabContent = document.querySelectorAll('[data-tab-content')



tabs.forEach(tab => {
        tab.addEventListener('click', () =>{
            if(tab.id === 'driverTAB'){
                driverInit()
            }    
            if(tab.id === 'teamTAB'){
                teamInit()
            }
            if(tab.id == 'yearTAB'){

            }

            const target = document.querySelector(tab.dataset.tabTarget)
            tabContent.forEach(tabContent => {
                tabContent.classList.remove('active')
            })
            tabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            target.classList.add('active')
    })

    
})



function yearInit(){
   
    fetch('http://ergast.com/api/f1/seasons.json')
    .then(res => res.json())
    .then(resp => {
        let total = resp.MRData.total
        loadYears(total)
    }).catch(error => console.error('error in yearInit() ' + error))
}

function driverInit(){
   console.log('inside driverINit')
}


function teamInit(){
    console.log('inside teamInit')
}

function loadYears(total){
    fetch(`http://ergast.com/api/f1/seasons.json?limit=${total}`)
    .then(resp => resp.json())
    .then(years => years.MRData.SeasonTable.Seasons.forEach(year => {
        const option = document.createElement('option')
        option.innerHTML = `
            ${year.season}

        `
        option.value = year.season
        
        
        document.getElementById('yearList').appendChild(option)
        
    
    }))
    .catch(error =>console.error('error',error))
    document.getElementById('season-form').addEventListener('submit',(e)=>displayYear(e))
}



function displayYear(evt){
    //add event listener to the reset button
    document.getElementById('reset').addEventListener('click', ()=>{
        driversDiv.textContent = ``
        raceDiv.textContent= ``    
    })
    evt.preventDefault()
    const select = document.getElementById('yearList');
    const value = select.options[select.selectedIndex].value;

    const driversDiv = document.getElementById('driverList')
    const raceDiv = document.getElementById('raceList')


    fetch(`http://ergast.com/api/f1/${value}.json`)
    .then(resp => resp.json())
    .then(resp =>{
        const races = resp.MRData.RaceTable.Races

        //clear the divs
        driversDiv.textContent = ``
        raceDiv.textContent= ``
        

        //shows the driver standings in that year
        const h1stats = document.createElement('h1')
        h1stats.textContent = `Driver Standings For The ${value} Season`
        h1stats.style.textAlign = 'center'
        driversDiv.appendChild(h1stats)


        //fetching driver standings
        fetch(`http://ergast.com/api/f1/${value}/driverStandings.json`)
        .then(resp=> resp.json())
        .then(standings =>{
            standings.MRData.StandingsTable.StandingsLists[0].DriverStandings.forEach(driver =>{

                const driverDiv = document.createElement('div')
                driverDiv.id = 'eachDriver'
                
                const h2 =document.createElement('h2')
                h2.innerHTML = `${driver.position}. <a href='${driver.Driver.url}'> ${driver.Driver.givenName} ${driver.Driver.familyName}</a>`
                const h3 = document.createElement('h4')
                h3.innerHTML= `|| Wins: ${driver.wins}  ||  Points: ${driver.points} ||`
                driverDiv.appendChild(h2)
                driverDiv.appendChild(h3)
                driversDiv.appendChild(driverDiv)

            })
        }).then(resp=>{

        
            //shows what season you are looking at

                const h1 = document.createElement('h1')
                h1.textContent = `Races During The ${value} Season `
                h1.style.textAlign = 'center'
                raceDiv.appendChild(h1)
        
            races.forEach(race => {
                const eachRaceDiv = document.createElement('div')
                eachRaceDiv.id = `eachRace` 
                const h3 = document.createElement('h2')
                const h4 = document.createElement('h4')
                h3.innerHTML = `${race.round}. <a href='${race.url}'>${race.raceName}</a>  `
                h4.innerHTML = `|| Location: ${race.Circuit.Location.locality} , ${race.Circuit.Location.country} ||`
                //h3.className = 'RaceList'
                eachRaceDiv.appendChild(h3)
                eachRaceDiv.appendChild(h4)
                raceDiv.appendChild(eachRaceDiv)
            })
            
        })
        .catch(error => console.error('error'+error))
    })
    .catch(error => console.error('Oh NO! '+error))

}
