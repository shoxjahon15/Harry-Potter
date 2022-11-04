const search = document.querySelector(".search");
const btns = document.querySelectorAll('.btn');
let data;

const fetchData = async () => {
  const response = await fetch("https://hp-api.herokuapp.com/api/characters");
  const json = await response.json();
  data = await json;
  loadCharacters(data);
};

fetchData();
// const foo = (data) => {
// }

const imgCheck = (img, gender) => {
  if (img == "") {
    switch (gender) {
      case "male":
        return "https://vmh.espcdesign.com/wp-content/uploads/2015/12/Female-Avatar.jpg";
      case "female":
        return "https://www.wcaeagles.org/wp-content/uploads/2016/07/male-placeholder.jpg";
      default:
        return "error";
    }
  } else {
    return img;
  }
};

const back = (house) => {
  switch (house) {
    case "Gryffindor":
      return "red";
    case "Ravenclaw":
      return "blue";
    case "Slytherin":
      return "green";
    case "Hufflepuff":
      return "yellow";
    default:
      return "rgba(214,214,213,1)";
  }
};

const main = document.querySelector("main");

function loadCharacters(data) {
  // Берет все данные из локалки и ковертирует в массив
  console.log(data);
  main.innerHTML = "";
  let accounts = Array.from(data);
  accounts.forEach((account) => {
    const card = document.createElement("div");
    main.append(card);
    card.innerHTML = `<div class="card" style="background: ${back(
      account.house
    )};">
    <div class="card_block">
      <img src='${imgCheck(account.image, account.gender)}' alt="" />
      <div class="card_text">
        <p>${account.species}</p>
        <p>${account.gender}</p>
        <p>${account.house}</p>
        <p>${account.ancestry}</p>
      </div>
    </div>
    <div class="card_text">
      <p>${account.name}</p>
      
      <p>Actor: ${account.actor}</p>
    </div>
  </div>`;
    // card.style.cssText = `background-color: ${back(account.house)};`;
  });
}

search.addEventListener("input", (e) => {
  main.innerHTML = "";
  const filteredData = data.filter((account) =>
    account.name
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  
});

const filteringDataByFaculties = (data, house) => {
  const filteredData = data.filter((account) =>
    account.house
      .toLocaleLowerCase()
      .includes(house.toLocaleLowerCase())
  );
  loadCharacters(filteredData)
}

btns[0].addEventListener('click', () => { loadCharacters(data) })
btns[1].addEventListener('click', () => { filteringDataByFaculties(data, 'Gryffindor') })
btns[2].addEventListener('click', () => { filteringDataByFaculties(data, 'Slytherin') })
btns[3].addEventListener('click', () => { filteringDataByFaculties(data, 'Hufflepuff') })
