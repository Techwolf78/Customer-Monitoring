let counter = document.getElementById("count-el")
let count = 0
let table = document.getElementById("table-el")

function incrementCount() {
    count += 1
    counter.textContent = count
    counter.style.color = "red"
    setTimeout(function () { counter.style.color = "black" }, 1000)

}

function getOrdinalSuffix(date) {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function saveRecord() {
    let date = new Date()
    let day = date.getDate()

    // let formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })}`
    //let formattedDate = `${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })} - ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`
    let formattedDate = `${day}${getOrdinalSuffix(day)}, ${date.toLocaleString('default', { month: 'long' })} - ${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`

    let row = table.insertRow(-1)
    let cell1 = row.insertCell(0)
    let cell2 = row.insertCell(1)
    let cell3 = row.insertCell(2)

    cell1.innerHTML = formattedDate
    cell2.innerHTML = count
    cell3.innerHTML = '<input type="text" placeholder="Optional observations"/>'

    count = 0
    counter.textContent = count

}