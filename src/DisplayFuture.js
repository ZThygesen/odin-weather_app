const displayFuture = (function () {
    const container = document.querySelector('.future');

    const display = (data) => {
        container.innerHTML = '';
        data.forEach(elem => createElem(elem));
    }

    const createElem = (elem) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
            <p>${elem.date}</p>
            <p>${elem.time}</p>
            <img src=${elem.weatherIcon} alt="Weather Icon">
            <p>${elem.temp}°</p>
            <p>${elem.weatherDesc}</p>
        `;

        container.appendChild(card);
    }

    return { display };
})();

export { displayFuture };
