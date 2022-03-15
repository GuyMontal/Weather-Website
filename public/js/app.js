const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const locationElement = document.getElementById('location');
const forcastElement = document.getElementById('forcast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value;
    locationElement.textContent = 'Loading data...';
    forcastElement.textContent = '';
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                locationElement.textContent = data.error;
            } else {
                locationElement.textContent = data.location;
                forcastElement.textContent = data.forcast;
            }
        })
    })
})

