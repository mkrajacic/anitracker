function login() {
  if (navigator.userAgent.match(/Android/i)) {
    var iab = window.open(
      "https://anilist.co/api/v2/oauth/authorize?client_id=6851&response_type=token",
      "_blank",
      "location=yes"
    );
    iab.addEventListener("exit", iabClose);
    return false;
  } else {
    location.href =
      "https://anilist.co/api/v2/oauth/authorize?client_id=6851&response_type=token";
    window.localStorage.setItem("copied", 1);
  }
}

if (window.localStorage.getItem("copied") == 1) {
  iabClose();
  localStorage.removeItem("copied");
}

$("#token").on("paste", function (e) {
  var clipboardData =
    e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;

  var access_token = clipboardData.getData("text");

  setTimeout(function () {
    authenticate(access_token);
  }, 500);
});

function send() {
  setTimeout(function () {
    var access_token = $("#token").val();
    authenticate(access_token);
  }, 1000);
}

function iabClose() {
  $("#login-button").toggleClass("hidden");
  $("#login-outer").toggleClass("hidden");
  $("#login-send").toggleClass("hidden");
  $("#token").toggleClass("hidden");
}

function redirect(uri) {
  if (navigator.userAgent.match(/Android/i)) {
    document.location = uri;
  } else {
    window.location.replace(uri);
  }
}

if (window.localStorage.getItem("username")) {
  redirect("index.html");
}

function authenticate(access_token) {
  if (access_token) {
    $.ajax({
      method: "POST",
      url: "https://graphql.anilist.co",
      contentType: "application/json",
      headers: {
        Authorization: "Bearer " + access_token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        query: `query  {
                Viewer {
                  name
                  avatar{
                    medium
                    large
                  }
                  about
                  bannerImage
                }
              }`,
      }),
      success: function (result) {
        window.localStorage.setItem("username", result.data.Viewer.name);
        window.localStorage.setItem("avatar", result.data.Viewer.avatar.medium);
        window.localStorage.setItem(
          "avatar_large",
          result.data.Viewer.avatar.large
        );
        if (result.data.Viewer.about == null) {
          window.localStorage.setItem("description", "No description yet...");
        } else {
          window.localStorage.setItem("description", result.data.Viewer.about);
        }
        window.localStorage.setItem("banner", result.data.Viewer.bannerImage);
        window.localStorage.setItem("access_token", access_token);
        redirect("index.html");
      },
      error: function (error) {
        alert("The access token seems to be wrong.");
      },
    });
  } else {
    alert("The access token seems to be wrong.");
  }
}
