function getUserAnime(sort) {
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
              mediaList(userName:"${window.localStorage.getItem("username")}"){
                media{
                  id
                  title{
                    english
                    romaji
                  }
                       coverImage{
                          medium
                        }
                }
                status
                score
                progress
              }
            }
          }`,
      variables: {
        page: 1,
        perPage: 20,
      },
    }),
    success: function (result) {
      showUserAnime(result);
    },
    error: function (error) {
      // console.log(error);
    },
  });
}

getUserAnime();

function showUserAnime(result) {
  var media = result.data.Page.mediaList;

  for (var anime of media) {
    var status = anime.status;
    var color = "purple";

    switch (status) {
      case "CURRENT":
        color = "green";
        break;
      case "PLANNING":
        color = "gray";
        break;
      case "COMPLETED":
        color = "purple";
        break;
      case "DROPPED":
        color = "red";
        break;
      case "PAUSED":
        color = "yellow";
        break;
      case "REPEATING":
        color = "indigo";
        break;
      default:
        color = "gray";
        break;
    }

    var english = anime.media.title.english;

    if (english == null) {
      english = anime.media.title.romaji;
    }

    $(`#anime-table`).append(`<tbody class="bg-white divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img
                class="h-10 w-10 rounded-full"
                src="${anime.media.coverImage.medium}"
              />
            </div>
            <div class="ml-4">
              <div
                class="text-sm font-medium text-gray-900"
              >${english}</div>
              <div
                class="text-sm text-gray-500"
              >${anime.media.title.romaji}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="
              px-2
              inline-flex
              text-xs
              leading-5
              font-semibold
              rounded-full
              bg-${color}-100
              text-green-800
            "
          >
          ${anime.status}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div
            class="text-sm text-gray-900"
          >
          ${anime.progress}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div
            class="text-sm text-gray-900"
          >
          ${anime.score}</div>
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
            data-add="${anime.media.id}"
            class="text-purple-600 hover:text-purple-900 font-bold update-btn"
            >Update</button
          >
        </td>
      </tr>
    </tbody>`);
  }
}
