import DataSource from "../data/data-source.js";

const main = () => {
  const searchElement = document.querySelector('#searchElement');
  const buttonSearchElement = document.querySelector('#searchButtonElement');
  const clubListElement = document.querySelector('#clubList');

  // menggunakan menggunakan method biasa
  // const onButtonSearchClicked = () => {
  //   DataSource.searchClub(searchElement.value)
  //     .then(renderResult)
  //     .catch(fallbackResult)
  //   // const dataSource = new DataSource(renderResult, fallbackResult);
  //   // dataSource.searchClub(searchElement.value);
  // };

  // menggunakan async/await

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchClub(searchElement.value)
      renderResult(result);
    } catch (message) {
      fallbackResult(message)
    }
  };

  const renderResult = results => {
    clubListElement.innerHTML = '';
    results.forEach(club => {
      const { name, fanArt, description } = club;

      const clubElement = document.createElement('div');
      clubElement.setAttribute('class', 'club');
      clubElement.innerHTML = `
        < img class="fan-art-club" src = "${fanArt}" alt = "Fan Art" >
          <div class="club-info">
            <h2> ${name} </h2>
            <p> ${description} </p>
          </div>
      `;
      clubListElement.appendChild(clubElement);
    });
  };

  const fallbackResult = message => {
    clubListElement.innerHTML = '';
    clubListElement.innerHTML += `<h2 class="placeholder"> ${message} </h2>`;
  };

  buttonSearchElement.addEventListener('click', onButtonSearchClicked);
};

export default main;