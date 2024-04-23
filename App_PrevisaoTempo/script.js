function obterClima() {
    const apiKey = 'cf1fed3f2e9d2f4683812cd77b1330fe';
    const cidade = document.getElementById('cidade').value;

    if (!cidade) {
        alert('Digite o nome da cidade');
        return;
    }

    const urlClimaAtual = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt`;
    const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${apiKey}&lang=pt`;

    fetch(urlClimaAtual)
        .then(response => response.json())
        .then(data => {
            mostrarClima(data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados meteorológicos atuais:', error);
            alert('Erro ao buscar dados meteorológicos atuais. Por favor, tente novamente.');
        });

    fetch(urlPrevisao)
        .then(response => response.json())
        .then(data => {
            mostrarPrevisaoHora(data.list);
        })
        .catch(error => {
            console.error('Erro ao buscar dados de previsão por hora:', error);
            alert('Erro ao buscar dados de previsão por hora. Por favor, tente novamente.');
        });
}

function mostrarClima(data) {
    const divInfoTemp = document.getElementById('div-info-temp');
    const divInfoClima = document.getElementById('div-info-clima');
    const iconeClima = document.getElementById('icone-clima');
    const previsaoHoraDiv = document.getElementById('previsao-hora');

    // Limpar conteúdo anterior
    divInfoClima.innerHTML = '';
    previsaoHoraDiv.innerHTML = '';
    divInfoTemp.innerHTML = '';

    if (data.cod === '404') {
        divInfoClima.innerHTML = `<p>${data.message}</p>`;
    } else {
        const nomeCidade = data.name;
        const temperatura = Math.round(data.main.temp - 273.15); // Converter para Celsius
        const descricao = data.weather[0].description;
        const codigoIcone = data.weather[0].icon;
        const urlIcone = `https://openweathermap.org/img/wn/${codigoIcone}@4x.png`;

        const temperaturaHTML = `
            <p>${temperatura}°C</p>
        `;

        const climaHtml = `
            <p>${nomeCidade}</p>
            <p>${descricao}</p>
        `;

        divInfoTemp.innerHTML = temperaturaHTML;
        divInfoClima.innerHTML = climaHtml;
        iconeClima.src = urlIcone;
        iconeClima.alt = descricao;

        mostrarImagem();
    }
}

function mostrarPrevisaoHora(dadosHora) {
    const previsaoHoraDiv = document.getElementById('previsao-hora');

    const proximas24Horas = dadosHora.slice(0, 8); 

    proximas24Horas.forEach(item => {
        const dataHora = new Date(item.dt * 1000); 
        const hora = dataHora.getHours();
        const temperatura = Math.round(item.main.temp - 273.15); 
        const codigoIcone = item.weather[0].icon;
        const urlIcone = `https://openweathermap.org/img/wn/${codigoIcone}.png`;

        const itemPrevisaoHoraHtml = `
            <div class="item-previsao-hora">
                <span>${hora}:00</span>
                <img src="${urlIcone}" alt="Ícone do Clima Horário">
                <span>${temperatura}°C</span>
            </div>
        `;

        previsaoHoraDiv.innerHTML += itemPrevisaoHoraHtml;
    });
}

function mostrarImagem() {
    const iconeClima = document.getElementById('icone-clima');
    iconeClima.style.display = 'block'; 
}
