function getSortedAnime(sort) {
  $.ajax({
    method: "POST",
    url: "https://graphql.anilist.co",
    contentType: "application/json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: `query ($page: Int, $perPage: Int) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
            media (type: ANIME,sort:${sort}) {
              id
              title{
                english
              }
              averageScore
              coverImage{
                large
              }
              season
              seasonYear
            }
          }
        }`,
      variables: {
        page: 1,
        perPage: 20,
      },
    }),
    success: function (result) {
      if (sort == "SCORE_DESC") {
        showSortedAnime(result, "top-rated-anime");
      } else {
        showSortedAnime(result, "top-popularity-anime");
      }
    },
    error: function (error) {
      // console.log(error);
    },
  });
}
getSortedAnime("SCORE_DESC");
getSortedAnime("POPULARITY_DESC");
function showSortedAnime(result, appendTo) {
  var media = result.data.Page.media;
  for (var anime of media) {
    $(`#${appendTo}`)
      .append(`<div style="width: 350px; background-color: white">
        <img
      src="${anime.coverImage.large}" class="m-auto"
    />
    <div class="p-4">
      <h5 class="text-xl font-semibold mb-6 text-center">${
        anime.title.english
      }</h5>
      <span
        class="
        whitespace-nowrap
          text-xs
          px-3
          font-medium
          text-base
          bg-purple-400
          text-white
          rounded-full
          py-1.5
          m-auto block w-28
          mb-4 mt-2
          text-center
        " id="anime-score"
      >
      ${anime.season + " " + anime.seasonYear}
      </span>
      <h5 class="text-base font-medium mb-2 text-center text-purple-500">
        Score: ${anime.averageScore}
      </h5>
      <button
        class="
          block
          m-auto mt-4
          bg-purple-500
          text-white
          active:bg-purple-600
          font-bold
          uppercase
          text-xs
          px-4
          py-2
          rounded
          shadow
          hover:shadow-md
          outline-none
          focus:outline-none
          ease-linear
          transition-all
          duration-150
          add-anime-btn
        "
        type="button"
        data-add="${anime.id}"
        data-name="${anime.title.english}"
      >
        Add to list
      </button>
    </div>
  </div>
        `);
  }
}

function sliceWords(str, max = 10) {
  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";

  return array.slice(0, max).join(" ") + ellipsis;
}
