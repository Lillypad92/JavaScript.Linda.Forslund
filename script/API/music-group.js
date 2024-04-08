//Pagination
const paginatedList = document.getElementById("list-of-items");
const previousButton = document.getElementById("prevPage");
const nextButton = document.getElementById("nextPage");
//
const musicBandTitleElement = document.getElementById("musicBandTitle");

let musicGroupsElements = null;
const paginationLimit = 10;
let pageCount = 0
let currentPaginationPage = 1;

let totalMusicGroups = -1;

console.log("hello");
//Search test
let musicGroups = []

async function setupMusicGroups() {

  let numberOfMusicGroups = await fetchNumberOfMusicGroups();
  if (numberOfMusicGroups === -1) return;

  musicGroups = await fetchMusicGroups(numberOfMusicGroups);
  if (musicGroups === null) return;

  musicBandTitleElement.innerText = `Music bands ${musicGroups.length}`;

  pageCount = Math.ceil(musicGroups.length / paginationLimit);

  createMusicGroupsElement(musicGroups);
  createPaginationNumbers();

  musicGroupsElements = paginatedList.querySelectorAll("a");

  setCurrentPaginationPage(1);
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
    li.id = "paginationButton";

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

function removeFilter(){
  //Remove old stuff
  document.getElementById("btnRemoveFilter").style.display = "none";
  document.getElementById("searchInput").value = "";
  paginatedList.innerHTML = ""
  let paginationButtons = document.getElementById("pagination").querySelectorAll("#paginationButton");
  for(let button of paginationButtons){
    button.remove();
  }
  //

  pageCount = Math.ceil(musicGroups.length / paginationLimit);

  createMusicGroupsElement(musicGroups);
  createPaginationNumbers();

  musicGroupsElements = paginatedList.querySelectorAll("a");

  setCurrentPaginationPage(1);

  musicBandTitleElement.innerText = `Music bands ${musicGroups.length}`;
}

function searchMusicGroup() {

  document.getElementById("btnRemoveFilter").style.display = "";

  let inputValue = document.getElementById("searchInput").value;

  let filteredMusicGroups = []

  for(let musicGroup of musicGroups){

    let musicGroupName = musicGroup.name.toLowerCase();

    if(musicGroupName.includes(inputValue.toLowerCase())){
      filteredMusicGroups.push(musicGroup);
    }
  }

  musicBandTitleElement.innerText = `Music bands ${filteredMusicGroups.length}`;

  //Remove old stuff
  paginatedList.innerHTML = ""
  let paginationButtons = document.getElementById("pagination").querySelectorAll("#paginationButton");
  for(let button of paginationButtons){
    button.remove();
  }
  //

  pageCount = Math.ceil(filteredMusicGroups.length / paginationLimit);

  createMusicGroupsElement(filteredMusicGroups);
  createPaginationNumbers();

  musicGroupsElements = paginatedList.querySelectorAll("a");

  setCurrentPaginationPage(1);
}
