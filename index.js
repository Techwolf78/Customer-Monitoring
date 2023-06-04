let counter = document.getElementById("count-el")
let count = 0
let table = document.getElementById("table-el")

function incrementCount() {
    count += 1
    counter.textContent = count
    counter.style.color = "green"
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
    let notesInput = document.createElement("input");
    notesInput.setAttribute("type", "text");
    notesInput.setAttribute("placeholder", "Optional observations");
    cell3.appendChild(notesInput)


    let data = {
        timestamp: new Date().getTime(),
        customerCount: count,
        tableData: Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.children.length ? cell.children[0].value : cell.innerText))
    };
    localStorage.setItem('FootfallData', JSON.stringify(data));

    count = 0
    counter.textContent = count

}

window.onload = function () {
    let data = JSON.parse(localStorage.getItem('FootfallData'));
    if (data) {
        let now = new Date().getTime();
        if (now - data.timestamp > 24 * 60 * 60 * 1000) {
            localStorage.removeItem('FootfallData');
        } else {
            count = data.customerCount;
            counter.textContent = count;
            data.tableData.slice(1).forEach(rowData => {
                let row = table.insertRow(-1);
                rowData.forEach((cellData, index) => {
                    let cell = row.insertCell();
                    if (index === 2) {
                        let input = document.createElement("input");
                        input.setAttribute("type", "text");
                        input.setAttribute("placeholder", "Optional observations");
                        input.value = cellData;
                        cell.appendChild(input);
                    } else {
                        cell.innerText = cellData;
                    }
                });
            });
        }
    }
};
