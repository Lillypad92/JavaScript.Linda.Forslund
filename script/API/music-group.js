//Pagination
const paginatedList = document.getElementById("list-of-items");
const previousButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");

let musicGroupsElements = null;
const paginationLimit = 10;
let pageCount = 0
let currentPaginationPage = 1;
//

//API
let totalMusicGroups = -1;
//

async function setupMusicGroups() {

  document.getElementById("spinner").style.display = "";

  let numberOfMusicGroups = await fetchNumberOfMusicGroups();
  if (numberOfMusicGroups === -1) return;

  let musicGroups = await fetchMusicGroups(numberOfMusicGroups);
  if (musicGroups === null) return;

  pageCount = Math.ceil(musicGroups.length / paginationLimit);

  createMusicGroupsElement(musicGroups);
  createPaginationNumbers();

  musicGroupsElements = paginatedList.querySelectorAll("a");

  setCurrentPaginationPage(1);

  document.getElementById("spinner").style.display = ""; //TODO:Make spinner bigger and center where list should be. When fixed, set display to none
}

async function fetchNumberOfMusicGroups() {
  let url = "https://appmusicwebapinet8.azurewebsites.net/api/csAdmin/Info";
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return json.nrSeededMusicGroups + json.nrUnseededMusicGroups;
  } else {
    console.log("Could not fetch info!");
    return -1;
  }
}

async function fetchMusicGroups(totalMusicGroups) {
  let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/Read?flat=true&pageSize=${totalMusicGroups}`;
  let response = await fetch(url);
  if (response.ok) {
    let json = await response.json();
    return json.pageItems;
  } else {
    console.log("Could not fetch all music groups!");
    return null;
  }
}

function disableButton(button){
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
}

function enableButton(button){
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
}

function handlePaginationButtonStatus(){
  if (currentPaginationPage === 1){
    disableButton(previousButton);
  }else{
    enableButton(previousButton);
  }

  if(pageCount === currentPaginationPage){
    disableButton(nextButton);
  }else{
    enableButton(nextButton);
  }
}

function handleActivePaginationPage(){
  document.querySelectorAll(".page-item").forEach((pagination) => {
    pagination.classList.remove("active");

    const pageIndex = parseInt(pagination.querySelector("a").dataset.page);
    if(pageIndex === currentPaginationPage) {
      pagination.classList.add("active");
    }
  })
}

function setCurrentPaginationPage(pageNumber) {
  currentPaginationPage = pageNumber;

  handleActivePaginationPage();
  handlePaginationButtonStatus();

  const previousRange = (pageNumber - 1) * paginationLimit;
  const currentRange = pageNumber * paginationLimit;

  musicGroupsElements.forEach((item, index) => {
    item.style.display = "none";
    if (index >= previousRange && index < currentRange) {
      item.style.display = "";
    }
  });
}

function createPaginationNumbers() {
  for (let i = 1; i <= pageCount; i++) {
    let li = document.createElement("li");
    li.classList.add("page-item");

    let link = document.createElement("a");
    link.classList.add("page-link");
    link.href = "#list-of-items";
    link.dataset.page = i;
    link.addEventListener("click", () => {
      setCurrentPaginationPage(i);
    })
    link.innerText = i;
    li.appendChild(link);
    document.getElementById("nextPageContainer").before(li)
  }
}

function createMusicGroupsElement(musicGroups) {
  for (let musicGroup of musicGroups) {
    let div = document.createElement("div");
    div.classList.add("col-md-10", "themed-grid-col");

    let pTitle = document.createElement("p");
    pTitle.innerText = musicGroup.name;
    div.appendChild(pTitle);

    let pEstablishedYear = document.createElement("p");
    pEstablishedYear.innerText = `Etablerades ${musicGroup.establishedYear}`;
    div.appendChild(pEstablishedYear);

    let spanGenre = document.createElement("span");
    setBadgeTheme(musicGroup.genre, spanGenre);
    spanGenre.innerText = musicGroup.strGenre;
    div.appendChild(spanGenre);

    let a = document.createElement("a");
    a.href = `view-music-band.html?id=${musicGroup.musicGroupId}`;
    a.appendChild(div);

    paginatedList.appendChild(a);
  }
}

function searchMusicGroup() {
  let inputField = document.getElementById("searchInput");
  let inputValue = inputField.value;

  searchAllMusicGroups();
}
