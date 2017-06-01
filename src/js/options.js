(() => {

  "use strict";

  let defaults = {
    domain: "",
    client: {},
    token: {},
  };

  load();

  function load() {
    chrome.storage.sync.get(defaults, function(storage) {
      document.querySelector("#domain").value = storage.domain;
      if (storage.token.access_token) {
        document.querySelector("#button").textContent = "Reauth";
      }
    });

    document.querySelector("#auth").addEventListener("submit", function(event) {
      event.preventDefault();
      getAuthorizationCode();
    });

    document.querySelector("#domain").addEventListener("keydown", function(event) {
      document.querySelector("#status").textContent = "";
    });
  }

  function getAuthorizationCode() {
    let xhr = new XMLHttpRequest();
    const clientName = "Fastoot";
    const redirectURI = chrome.extension.getURL("auth.html");
    const scope = "write";
    let domain = document.querySelector("#domain").value;

    if (domain !== "") {
      // TODO: remove trailing slash
    }
    else {
      alert("Please set an instance");
      return false;
    }

    xhr.open("POST", domain + "/api/v1/apps", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("client_name=" + clientName + "&redirect_uris=" + redirectURI + "&scopes=" + scope);

    xhr.onreadystatechange = function(event) {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let status = document.querySelector("#status");
        status.textContent = "";

        let response = JSON.parse(xhr.response);
        chrome.storage.sync.set({
          domain: document.querySelector("#domain").value,
          client: response
        }, function() {
          window.location.href = domain + "/oauth/authorize?client_id=" + response.client_id + "&response_type=code&redirect_uri=" + response.redirect_uri + "&scope=" + scope;
        });
      }
      else {
        let status = document.querySelector("#status");
        status.classList.remove("text-success");
        status.classList.add("text-danger");
        status.textContent = "An error occurred. Please check an instance URL.";
      }

    }
  }

})();
