const API_MUSICGROUPS_PAGENUMBER = 0

function fetchMusicGroups(number) {

  let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/Read?flat=true&pageNr=${number}&pageSize=10`

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let container = document.getElementById("list-of-items");

      for (const item of json.pageItems) {
        let div = document.createElement("div");
        div.classList.add("col-md-10", "themed-grid-col");

        let p = document.createElement("p");
        p.innerText =
          item.name +
          ' ' +
          ' was established year' +
          ' ' +
          item.establishedYear +
          '. ' +
          'The genre is' +
          ' ' +
          item.strGenre + 
          '. ';
        div.appendChild(p);
        container.appendChild(div);
      }
    });
}

function pageClick(number) {
  //Clear the list of music groups
  document.getElementById("list-of-items").innerHTML = '';

  // let number = 0

  //Fetch new music groups
  fetchMusicGroups(number)

}
