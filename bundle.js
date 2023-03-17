const PAGE = "https://api.saletaneczne.pl/inventory"
const FIRST_HOUR = 18
const LAST_HOUR = 21

const selectedDate = new Date();
let list = [];
let maxResponse = 0;
let countResponse = 0;

const startDateElement = document.getElementById('startDate')
startDateElement.valueAsDate = new Date();

const endDateElement = document.getElementById('endDate')
endDateElement.valueAsDate = new Date();

const button = document.getElementsByTagName('button')[0];

const listElement = document.getElementById('list');

const getDateFormat = (d) => {
    let day = d.getDate();
    if (day.toString().length === 1) {
        day = "0" + day
    }
    let month = d.getMonth() + 1;
    if (month.toString().length === 1) {
        month = "0" + month
    }
    return `${day}.${month}.${d.getFullYear()}`
}

const onBegin = () => {
    list = [];
    countResponse = 0;
    clearList()
    button.disabled = true
}

const daysBetween = (sd, ed) => {
    const diffInTime = ed.getTime() - sd.getTime();
    return diffInTime / (1000 * 3600 * 24)
}

const calculateMaxResponseByDays = (days) => {
    return (LAST_HOUR - FIRST_HOUR + 1) * 2 * days
}

const generateList = () => {
    onBegin()
    let startDate = startDateElement.valueAsDate;
    let endDate = endDateElement.valueAsDate;

    maxResponse = calculateMaxResponseByDays(daysBetween(startDate, endDate) + 1)
    for(let d = startDate; d.getTime() <= endDate.getTime(); d.setDate(d.getDate()+1)) {
        generateListForSpecificDay(d)
    }
}

const generateListForSpecificDay = (sd) => {
    for (let i = FIRST_HOUR; i <= LAST_HOUR; i++) {
        generateListForSpecificHour(getDateFormat(sd), i)
    }
}

const generateListForSpecificHour = (date, sh) => {
    generateListForSpecificHourWithMinutes(date, sh.toString(), "00", (sh + 2).toString(), "00")
    generateListForSpecificHourWithMinutes(date, sh.toString(), "30", (sh + 2).toString(), "30")
}

const generateListForSpecificHourWithMinutes = (date, sh, sm, fh, fm) => {
    fetch(`${PAGE}?capacity=2&city=Wroc%C5%82aw&date=${date}&from=${sh}%3A${sm}&to=${fh}%3A${fm}&addressActive=true`)
        .then(response => response.json())
        .then(info => {
            countResponse++
            if (info.totalCount > 0) {
                const price = info.data[0].priceData.price / 100;
                const text = `${date} - ${sh}:${sm} - ${fh}:${fm} (${price} zł)`
                attachLi(text)
                list.push({text})
            }
            if (isFinish()) {
                onFinish()
            }
        })
}
const isFinish = () => countResponse === maxResponse

const onFinish = () => {
    list.sort((a, b) => (a.text > b.text) ? 1 : -1)
    maxResponse = 0
    clearList()
    for (let i = 0; i < list.length; i++) {
        attachLi(list[i].text)
    }
    button.disabled = false
}

const attachLi = (text) => {
    const li = document.createElement('li');
    li.innerHTML = text;  
    listElement.appendChild(li);
}

const clearList = () => listElement.innerHTML = '';

button.addEventListener("click", generateList);
