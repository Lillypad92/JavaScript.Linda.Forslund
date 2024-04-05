let API_MUSICGROUPS_PAGENUMBER = 0
let musicGroupItems = [];

function fetchSignleMusicGroup(id){
  let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/ReadItem?id=${id}&flat=false`

  fetch(url)
  .then((response) => {
    return response.json();
  })
  // .then((json) => {

  // })
}

function fetchMusicGroups(number) {

  document.getElementById("spinner").style.display = ""

  let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/Read?flat=true&pageNr=${number}&pageSize=10`

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      
      createMusicList(json.pageItems);

      musicGroupItems = json.pageItems;

    });
}
function createMusicList(pageItems) {
  
  for (const item of pageItems) {
    let div = document.createElement("div");
    div.classList.add("col-md-10", "themed-grid-col");
    let container = document.getElementById("list-of-items");

    let pTitle = document.createElement("p");
    pTitle.innerText = item.name
    div.appendChild(pTitle);
    container.appendChild(div);
    
    let pEstablishedYear = document.createElement("p");
    pEstablishedYear.innerText = `Etablerades ${item.establishedYear}`;
    div.appendChild(pEstablishedYear);
    container.appendChild(div);

    let spanGenre = document.createElement("span");
    switch(item.genre){
      case 1: spanGenre.classList.add("badge", "bg-primary"); break;
      case 2: spanGenre.classList.add("badge", "bg-success"); break;
      case 3: spanGenre.classList.add("badge", "bg-danger"); break;
      default: spanGenre.classList.add("badge", "bg-warning", "text-dark"); break;
    }
    spanGenre.classList.add("badge", "bg-primary");
    spanGenre.innerText = item.strGenre;
    div.appendChild(spanGenre);
    container.appendChild(div);

    let a = document.createElement("a");
    a.href = `view-music-band.html?id=${item.musicGroupId}`;
    container.appendChild(a);
    a.appendChild(div);  

    document.getElementById("spinner").style.display = "none"; 
  }
}

function pageClick(number) {
  //Clear the list of music groups
  document.getElementById("list-of-items").innerHTML = "";

  //Fetch new music groups
  fetchMusicGroups(number)
}
function searchMusicGroup() {
  let inputField = document.getElementById("searchInput");
  let inputValue = inputField.value;

  let filteredMusicGroup = musicGroupItems.filter((x) => {
    if (x.name.includes(inputValue)) {
      return x
    }
    
  });
  document.getElementById("list-of-items").innerHTML = "";

  createMusicList(filteredMusicGroup)
}


