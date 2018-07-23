function factGenerator() {

  var json = new XMLHttpRequest();
  json.open("GET", "https://api.chucknorris.io/jokes/random", true);

  json.onreadystatechange = function () {

    var factContainer = document.getElementById("fun-fact");

    if (factContainer) {

      if (json.readyState != 4 || json.status != 200) return;

      var result = JSON.parse(json.responseText);
      var fact = document.getElementById("fun-fact");
      fact.textContent = result.value;
    }

  };
  json.send();
}

window.onload = factGenerator;
