$("#anime-table").addClass("hidden");

function searchAnime() {
  var searchTerm = $("#search").val();

  $.ajax({
    method: "POST",
    url: "https://graphql.anilist.co",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("access_token"),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: `query($page: Int, $perPage: Int){
        Page (page: $page, perPage: $perPage) {
                      pageInfo {
                      total
                      currentPage
                      lastPage
                      hasNextPage
                      perPage
                    }
          
            media(search:"${searchTerm}",type:ANIME){
              id
              title{
                english
                romaji
              }
              coverImage{
                medium
              }
              season
              seasonYear
              episodes
              averageScore
            }
        }
      }`,
      variables: {
        page: 1,
        perPage: 20,
      },
    }),
    success: function (result) {
      showSearchResults(result);
    },
    error: function (error) {
      noResults();
    },
  });
}

function showSearchResults(result) {
  $("#anime-table").removeClass("hidden");
  $("#no-results").addClass("hidden");
  $("#appended").empty();

  if (result.data.Page.pageInfo.total == 0) {
    noResults();
  }

  var media = result.data.Page.media;

  for (var anime of media) {
    var onList = anime.onList;

    var button_label = "Add";

    if (onList) {
      button_label = "Update";
    } else {
      button_label = "Add";
    }

    var english = anime.title.english;

    if (english == null) {
      english = anime.title.romaji;
    }

    var season = anime.season + " " + anime.seasonYear;
    if (anime.season == null || anime.seasonYear == null) {
      season = "Unknown";
    }

    var score = anime.averageScore;

    if (anime.averageScore == null) {
      score = "N/A";
    }

    var episodes = anime.episodes;

    if (anime.episodes == null) {
      episodes = "N/A";
    }

    $(`#appended`).append(`
        <tr>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
                <img
                  class="h-10 w-10 rounded-full"
                  src="${anime.coverImage.medium}"
                />
              </div>
              <div class="ml-4">
                <div
                  class="text-sm font-medium text-gray-900"
                >${english}</div>
                <div
                  class="text-sm text-gray-500"
                >${anime.title.romaji}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
          <div
          class="text-sm text-gray-900 anime-season"
        >
        ${season}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div
              class="text-sm text-gray-900"
            >
            ${episodes}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div
              class="text-sm text-gray-900"
            >
            ${score}</div>
          </td>
          <td
            class="
              px-6
              py-4
              whitespace-nowrap
              text-right text-sm
              font-medium
            "
          >
            <button
              data-name="${english}"
              data-add="${anime.id}"
              class="text-purple-600 hover:text-purple-900 font-bold update-btn"
              >${button_label}</button
            >
          </td>
        </tr>
     `);
  }
}

function noResults() {
  $("#anime-table").addClass("hidden");
  $("#no-results").removeClass("hidden");
}

$("#search-btn").on("click", function () {
  searchAnime();
});
