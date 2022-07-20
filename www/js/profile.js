$("#avi").attr("src", window.localStorage.getItem("avatar"));
$("#username").html(window.localStorage.getItem("username"));

$("#description").html(window.localStorage.getItem("description"));

$("#banner").attr("src", window.localStorage.getItem("banner"));

$("#anime-list").click(function () {
  if (navigator.userAgent.match(/Android/i)) {
    document.location = "my_anime.html";
  } else {
    window.location.replace("my_anime.html");
  }
});
