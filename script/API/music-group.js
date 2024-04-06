let API_MUSICGROUPS_PAGENUMBER = 0
let musicGroupItems = [];

function fetchSignleMusicGroup(id){
  let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/ReadItem?id=${id}&flat=false`

  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((json) => {

    document.getElementById("musicBandTitle").innerText = json.name;
    let genre = document.getElementById("genre")
    setBadgeTheme(json.genre, genre);
    genre.innerText = json.strGenre
    document.getElementById("establishedYear").innerText = `Established year: ${json.establishedYear}`;

    if(json.albums.length === undefined || json.albums.length === 0){
      document.getElementById("albumsAccordion").style.display = "none";
    }else{
      document.getElementById("albums").innerText= `${json.albums.length} Albums`;

      for (const album of json.albums) {

        let div = document.createElement("div");
        div.classList.add("accordion-body");
        let h3 = document.createElement("h3");
        h3.innerText = album.name;
        let pReleaseYear = document.createElement("p");
        pReleaseYear.innerText = `Release year: ${album.releaseYear}`;
        let pCopiesSold = document.createElement("p");
        pCopiesSold.innerText = `Copies sold: ${album.copiesSold}`;

        div.appendChild(h3);
        div.appendChild(pReleaseYear);
        div.appendChild(pCopiesSold);

        document.getElementById("flush-collapseOne").appendChild(div);
      }
    }

    if(json.artists.length === undefined || json.artists.length === 0){
      document.getElementById("artistsAccordion").style.display = "none";
    }else{
      document.getElementById("artists").innerText= `${json.artists.length} Artists`;

      for (const artist of json.artists) {

        let div = document.createElement("div");
        div.classList.add("accordion-body");
        let h3 = document.createElement("h3")
        h3.innerText = `${artist.firstName} ${artist.lastName}`;
        let pBirthday = document.createElement("p");
        pBirthday.innerText = `Birthday: ${artist.birthDay === null ? "?" : artist.birthDay}`;

        div.appendChild(h3);
        div.appendChild(pBirthday);

        document.getElementById("flush-collapseTwo").appendChild(div);
      } 
    }  
  })
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
    setBadgeTheme(item.genre, spanGenre);
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

function setBadgeTheme(genre, span){
  switch(genre){
    case 1: span.classList.add("badge", "bg-primary"); break; 
    case 2: span.classList.add("badge", "bg-success"); break;
    case 3: span.classList.add("badge", "bg-danger"); break;
    default: span.classList.add("badge", "bg-warning", "text-dark"); break;
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


