(() => {

  "use strict";

  let defaults = {
    domain: "",
    client: {},
  }

  if (window.location.search !== "") {
    getAccessToken();
  }
  else {
    document.querySelector("#error").innerHTML = 'If you see this page, something went wrong. Please go back to <a href="./options.html">options page</a>, and try again.';
  }

  function getAccessToken() {
    chrome.storage.local.get(defaults, function(storage) {
      let xhr = new XMLHttpRequest();
      let domain = storage.domain;
      let redirectURI = storage.client.redirect_uri;
      let clientID = storage.client.client_id;
      let clientSecret = storage.client.client_secret;
      let authorizationCode = window.location.search.substring(1).split("=")[1];

      xhr.open("POST", domain + "/oauth/token", true);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send("grant_type=authorization_code&redirect_uri=" + redirectURI + "&client_id=" + clientID + "&client_secret=" + clientSecret + "&code=" + authorizationCode);

      xhr.onreadystatechange = function(event) {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          chrome.storage.local.set({
            token: JSON.parse(xhr.response)
          }, function() {
            window.location.href = chrome.extension.getURL("./options.html");
          });
        }
        else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status >= 400 && xhr.status < 600) {
          document.querySelector("#error").innerHTML = 'If you see this page, something went wrong. Please go back to <a href="./options.html">options page</a>, and try again.';
        }
        else {
          // this may be OPTIONS method
        }
      }

    });
  }

})();
