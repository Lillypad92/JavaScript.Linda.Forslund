 async function fetchSignleMusicGroup(id) {
    let url = `https://appmusicwebapinet8.azurewebsites.net/api/csMusicGroups/ReadItem?id=${id}&flat=false`;
    let response = await fetch(url);
    if(response.ok) {
      let json = await response.json();
      document.getElementById("musicBandTitle").innerText = json.name;
      let genre = document.getElementById("genre");
      setBadgeTheme(json.genre, genre);
      genre.innerText = json.strGenre;
      document.getElementById(
        "establishedYear"
      ).innerText = `Established year: ${json.establishedYear}`;
  
      if (json.albums.length === undefined || json.albums.length === 0) {
        document.getElementById("albumsAccordion").style.display = "none";
      } else {
        document.getElementById(
          "albums"
        ).innerText = `${json.albums.length} Albums`;
  
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
  
      if (json.artists.length === undefined || json.artists.length === 0) {
        document.getElementById("artistsAccordion").style.display = "none";
      } else {
        document.getElementById(
          "artists"
        ).innerText = `${json.artists.length} Artists`;
  
        for (const artist of json.artists) {
          let div = document.createElement("div");
          div.classList.add("accordion-body");
          let h3 = document.createElement("h3");
          h3.innerText = `${artist.firstName} ${artist.lastName}`;
          let pBirthday = document.createElement("p");
          pBirthday.innerText = `Birthday: ${
            artist.birthDay === null ? "?" : artist.birthDay
          }`;
  
          div.appendChild(h3);
          div.appendChild(pBirthday);
  
          document.getElementById("flush-collapseTwo").appendChild(div);
        }
      }
      return json.response;
    }
    else {
      console.log("Could not fetch!");
    }
   
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((json) => {
    //     document.getElementById("musicBandTitle").innerText = json.name;
    //     let genre = document.getElementById("genre");
    //     setBadgeTheme(json.genre, genre);
    //     genre.innerText = json.strGenre;
    //     document.getElementById(
    //       "establishedYear"
    //     ).innerText = `Established year: ${json.establishedYear}`;
  
    //     if (json.albums.length === undefined || json.albums.length === 0) {
    //       document.getElementById("albumsAccordion").style.display = "none";
    //     } else {
    //       document.getElementById(
    //         "albums"
    //       ).innerText = `${json.albums.length} Albums`;
  
    //       for (const album of json.albums) {
    //         let div = document.createElement("div");
    //         div.classList.add("accordion-body");
    //         let h3 = document.createElement("h3");
    //         h3.innerText = album.name;
    //         let pReleaseYear = document.createElement("p");
    //         pReleaseYear.innerText = `Release year: ${album.releaseYear}`;
    //         let pCopiesSold = document.createElement("p");
    //         pCopiesSold.innerText = `Copies sold: ${album.copiesSold}`;
  
    //         div.appendChild(h3);
    //         div.appendChild(pReleaseYear);
    //         div.appendChild(pCopiesSold);
  
    //         document.getElementById("flush-collapseOne").appendChild(div);
    //       }
    //     }
  
    //     if (json.artists.length === undefined || json.artists.length === 0) {
    //       document.getElementById("artistsAccordion").style.display = "none";
    //     } else {
    //       document.getElementById(
    //         "artists"
    //       ).innerText = `${json.artists.length} Artists`;
  
    //       for (const artist of json.artists) {
    //         let div = document.createElement("div");
    //         div.classList.add("accordion-body");
    //         let h3 = document.createElement("h3");
    //         h3.innerText = `${artist.firstName} ${artist.lastName}`;
    //         let pBirthday = document.createElement("p");
    //         pBirthday.innerText = `Birthday: ${
    //           artist.birthDay === null ? "?" : artist.birthDay
    //         }`;
  
    //         div.appendChild(h3);
    //         div.appendChild(pBirthday);
  
    //         document.getElementById("flush-collapseTwo").appendChild(div);
    //       }
    //     }
    //   });
  }