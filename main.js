/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let main = document.querySelector(".resultlist")
let search = document.querySelector(".searchBar")
let url = "https://itunes.apple.com/search?term="
search.addEventListener('keyup', function() {

  let term = search.value;
  fetch(`https://itunes.apple.com/search?term=${search.value}`)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log(response.status)
          return;
        }

        response.json().then(function(data) {
          let html = ``
          data.results.forEach(function(data) {
            html += `
					<div class="searchresult">
							<a href="${data.previewUrl}">
							<img class="image" src="${data.artworkUrl100}"><br>
							</a>
					        <p class="title">${data.trackName}</p><br>
        					<p class="name">${data.artistName}</p>
     				 </div>
					`
          })
          main.innerHTML = html
          let albums = document.querySelectorAll('.searchresult a')

          albums.forEach(function(listen) {
            listen.addEventListener('click', function(event) {
              event.preventDefault();
              let url = listen.getAttribute("href");
              document.querySelector('audio').setAttribute('src', url);
            })
          })
        })
      }
    )
})
