(() => {

  "use strict";

  let defaults = {
    domain: "",
    client: {},
    token: {},
    visibility: "public",
  };

  load();

  function load() {
    chrome.storage.sync.get(defaults, function(storage) {
      document.querySelector("#domain").value = storage.domain;

      toggleAuthAndRevoke();

      document.querySelector("#visibility").value = storage.visibility;
    });

    document.querySelector("#auth").addEventListener("submit", function(event) {
      selectOperationAuthOrRevoke();
      toggleAuthAndRevoke();
    });

    document.querySelector("#domain").addEventListener("keydown", function(event) {
      document.querySelector("#instance-url-msg").textContent = "";
    });

    document.querySelector("#save").addEventListener("click", save);
  }

  function save() {
    chrome.storage.sync.set({
      domain: document.querySelector("#domain").value,
      visibility: document.querySelector("#visibility").value
    }, function() {
      let status = document.querySelector("#status");
      status.classList.add("text-success");
      status.textContent = "Saved successfully!";
      setTimeout(function() {
        status.textContent = "";
        status.classList.remove("text-success");
      }, 1500);
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
        let msg = document.querySelector("#instance-url-msg");
        msg.textContent = "";

        let response = JSON.parse(xhr.response);
        chrome.storage.sync.set({
          domain: document.querySelector("#domain").value,
          client: response
        }, function() {
          window.location.href = domain + "/oauth/authorize?client_id=" + response.client_id + "&response_type=code&redirect_uri=" + response.redirect_uri + "&scope=" + scope;
        });
      }
      else {
        let msg = document.querySelector("#instance-url-msg");
        msg.classList.remove("text-success");
        msg.classList.add("text-danger");
        msg.textContent = "An error occurred. Please check an instance URL.";
      }

    }
  }

  function revokeAuthorizationCode() {
    chrome.storage.sync.set({
      token: {}
    }, function() {
      let msg = document.querySelector("#instance-url-msg");
      msg.classList.remove("text-danger");
      msg.classList.add("text-success");
      msg.textContent = "Revoke successfully";

      setTimeout(function() {
        msg.classList.remove("text-success");
        msg.textContent = "";
      }, 1500);
    });
  }

  function selectOperationAuthOrRevoke() {
    let button = document.querySelector("#button");

    if (button.textContent === "Auth") {
      event.preventDefault();
      getAuthorizationCode();
    }
    else if (button.textContent === "Revoke") {
      event.preventDefault();
      revokeAuthorizationCode();
    }
  }

  function toggleAuthAndRevoke() {
    chrome.storage.sync.get(defaults, function(storage) {
      if (storage.token.access_token) {
        let button = document.querySelector("#button");

        button.classList.remove("btn-primary");
        button.classList.add("btn-danger");
        button.textContent = "Revoke";
      }
      else {
        let button = document.querySelector("#button");

        button.classList.remove("btn-danger");
        button.classList.add("btn-primary");
        button.textContent = "Auth";
      }
    });
  }

})();
