closeModal();
$("#success-alert").css("display", "none");
$("#error-alert").css("display", "none");
$(".delete-anime").css("display", "none");

$("#top-rated-anime").on("click", ".add-anime-btn", function () {
  openModal();
  var title = $(this).attr("data-name");
  var animeId = $(this).attr("data-add");

  $("#anime-to-add").html(title);
  checkAnimeExists(animeId);
});

$("#top-popularity-anime").on("click", ".add-anime-btn", function () {
  openModal();
  var title = $(this).attr("data-name");
  var animeId = $(this).attr("data-add");

  $("#anime-to-add").html(title);
  checkAnimeExists(animeId);
});

$("#anime-table").on("click", ".update-btn", function () {
  openModal();
  var title = $(this).attr("data-name");
  var animeId = $(this).attr("data-add");

  $("#anime-to-add").html(title);
  checkAnimeExists(animeId);
});

$(".cancel-add-anime").click(function () {
  closeModal();
});

function openModal() {
  $("#modal-back").css("display", "block");
  $("#modal-front").css("display", "block");
}

function closeModal() {
  $("#modal-back").css("display", "none");
  $("#modal-front").css("display", "none");
}

function addAnime(animeId, status, progress, score) {
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
      query: `mutation ($mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float) {
            SaveMediaListEntry (mediaId: $mediaId, status: $status, progress: $progress, score: $score) {
                id
                status
                progress
                score
            }
        }`,
      variables: {
        mediaId: animeId,
        status: status,
        progress: progress,
        score: score,
      },
    }),
    success: function (result) {
      setTimeout(function () {
        closeModal();
        $("#success-alert").html("Succesfully added to list!");
        $("#success-alert").css("display", "block");
        $("#success-alert").delay(2000).fadeOut("slow");
      }, 2000);
    },
    error: function (error) {
      closeModal();
      $("#error-alert").html("Error while adding to list!");
      $("#error-alert").css("display", "block");
      $("#error-alert").delay(2000).fadeOut("slow");
    },
  });
}

function updateAnime(listId, status, progress, score) {
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
      query: `mutation ($id:Int, $mediaId: Int, $status: MediaListStatus, $progress: Int, $score: Float) {
                      SaveMediaListEntry (id:$id, mediaId: $mediaId, status: $status, progress: $progress, score: $score) {
                          id
                          status
                          progress
                          score
                      }
                  }`,
      variables: {
        id: listId,
        status: status,
        progress: progress,
        score: score,
      },
    }),
    success: function (result) {
      setTimeout(function () {
        closeModal();
        $("#success-alert").html("Succesfully updated the list entry!");
        $("#success-alert").css("display", "block");
        $("#success-alert").delay(2000).fadeOut("slow");
      }, 2000);
    },
    error: function (error) {
      closeModal();
      $("#error-alert").html("Error while updating the list entry!");
      $("#error-alert").css("display", "block");
      $("#error-alert").delay(2000).fadeOut("slow");
    },
  });
}

function deleteAnime(listId) {
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
      query: `mutation ($id: Int) {
        DeleteMediaListEntry (id: $id) {
                deleted
            }
        }`,
      variables: {
        id: listId,
      },
    }),
    success: function (result) {
      setTimeout(function () {
        closeModal();
        $("#success-alert").html("Succesfully deleted from list!");
        $("#success-alert").css("display", "block");
        $("#success-alert").delay(2000).fadeOut("slow");
      }, 2000);
    },
    error: function (error) {
      closeModal();
      $("#error-alert").html("Error while deleting from list!");
      $("#error-alert").css("display", "block");
      $("#error-alert").delay(2000).fadeOut("slow");
    },
  });
}

function checkAnimeExists(animeId) {
  $("#add-anime-confirm").off();
  $(".delete-anime").off();

  $.ajax({
    method: "POST",
    url: "https://graphql.anilist.co",
    contentType: "application/json",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: `query {
            MediaList(userName:"${window.localStorage.getItem(
              "username"
            )}",mediaId:${animeId}) {
                                id
                                status
                                progress
                                score(format:POINT_100)
                                    media{
                                            id
                                            title {
                                            english
                                            }
              }
          }
        }`,
    }),
    success: function (result) {
      var listId = result.data.MediaList.id;
      var prevStatus = result.data.MediaList.status;
      var prevProgress = result.data.MediaList.progress;
      var prevScore = result.data.MediaList.score;

      $(`select[id=anime-status] option`).removeAttr("selected");
      $(`select[id=anime-status] option[value=${prevStatus}]`).attr(
        "selected",
        "selected"
      );
      $("#anime-progress").val(prevProgress);
      $("#anime-score-modal").val(prevScore);

      $("#add-anime-confirm").html("Update list");
      $("#add-anime-confirm").on("click", function () {
        var status = $("#anime-status").val();
        var progress = $("#anime-progress").val();
        var score = $("#anime-score-modal").val();

        updateAnime(listId, status, progress, score);
      });

      $(".delete-anime").css("display", "block");
      $(".delete-anime").on("click", function () {
        deleteAnime(listId);
      });
    },
    error: function (error) {
      $(`select[id=anime-status] option`).removeAttr("selected");
      $(`select[id=anime-status] option[value='CURRENT']`).attr(
        "selected",
        "selected"
      );
      $("#anime-progress").val("0");
      $("#anime-score-modal").val("0");

      $("#add-anime-confirm").html("Add to list");
      $("#add-anime-confirm").on("click", function () {
        var status = $("#anime-status").val();
        var progress = $("#anime-progress").val();
        var score = $("#anime-score-modal").val();

        addAnime(animeId, status, progress, score);
      });

      $(".delete-anime").css("display", "none");
    },
  });
}
