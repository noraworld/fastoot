(() => {

  "use strict";

  let settings = {
    baseurl: "",
    accessToken: "",
    draft: "",
  };

  chrome.storage.sync.get(settings, function(storage) {
    settings.baseurl = storage.baseurl;
    settings.accessToken = storage.accessToken;
    settings.draft = storage.draft;

    document.querySelector("#content").value = settings.draft;
  });

  document.querySelector("#toot").addEventListener("click", toot);
  document.addEventListener("keydown", function(event) {
    if (((event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)) && event.key === 'Enter') {
      toot();
    }
    saveDraft();
  });
  document.addEventListener("keyup", count);

  function count() {
    let content = document.querySelector("#content").value;
    let left = 500 - content.length;

    document.querySelector("#words").textContent = left;
  }

  function toot() {
    let xhr = new XMLHttpRequest();
    let baseurl = settings.baseurl + "/api/v1/statuses";
    let accessToken = settings.accessToken;
    let content = document.querySelector("#content").value;

    xhr.open("POST", baseurl, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Bearer " + accessToken);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        document.querySelector("#content").value = "";
        let status = document.querySelector("#status");
        status.textContent = "Tootted successfully!";
        setTimeout(function() {
          status.textContent = "";
        }, 1500);
      }
      else {
        let status = document.querySelector("#status");
        status.textContent = "Toot failed.";
        setTimeout(function() {
          status.textContent = "";
        }, 1500);
      }
    }

    xhr.send("status=" + encodeURIComponent(content));
  }

  function saveDraft() {
    let content = document.querySelector("#content").value;
    console.log(content);
    chrome.storage.sync.set({
      draft: content
    });
  }

})();
