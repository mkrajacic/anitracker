if (!(window.localStorage.getItem("username"))) {
  if (navigator.userAgent.match(/Android/i)) {
    document.location = "login.html";
  } else {
    window.location.replace("login.html");
  }
}

$("#avi-circle").attr("src", window.localStorage.getItem("avatar"));
$("#user-menu-button").css("cursor","pointer");
$("#burger").css("cursor","pointer");

$("#user-menu-button").click(function () {
  $("#user-menu").toggleClass("hidden");
});

$("#burger").click(function () {
  $("#mobile-menu").toggleClass("hidden");
});
