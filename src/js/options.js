(() => {

  "use strict";

  let defaults = {
    baseurl: "",
    accessToken: "",
  };

  load();

  function load() {
    chrome.storage.sync.get(defaults, function(storage) {
      document.querySelector("#baseurl").value = storage.baseurl;
      document.querySelector("#access-token").value = storage.accessToken;
    });

    document.querySelector("#save").addEventListener("click", save);
  }

  function save() {
    let baseurl = document.querySelector("#baseurl").value;
    let accessToken = document.querySelector("#access-token").value;

    chrome.storage.sync.set({
      baseurl: baseurl,
      accessToken: accessToken
    }, function() {
      let status = document.querySelector("#status");
      status.textContent = "Saved!";
      setTimeout(function() {
        status.textContent = "";
      }, 1500);
    });
  }

})();
