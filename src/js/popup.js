(() => {

  "use strict";

  let settings = {
    domain: "",
    token: {},
    draft: "",
  };

  chrome.storage.sync.get(settings, function(storage) {
    settings.domain = storage.domain;
    settings.token = storage.token;
    settings.draft = storage.draft;

    document.querySelector("#content").value = settings.draft;
    init();
  });

  function init() {
    validateCount();
    count();

    document.querySelector("#toot").addEventListener("click", toot);
    document.addEventListener("keyup", function(event) {
      count();

      validateCount();
    });
    document.addEventListener("keydown", function(event) {
      if (((event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)) && event.key === 'Enter' && validateCount()) {
        toot();
      }

      saveDraft();
    });
  }

  function count() {
    let content = document.querySelector("#content").value;
    let left = 500 - content.length;

    document.querySelector("#words").textContent = left;
  }

  function toot() {
    let xhr = new XMLHttpRequest();
    let url = settings.domain + "/api/v1/statuses";
    let token = settings.token;
    let content = document.querySelector("#content").value;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);

    xhr.onreadystatechange = function(event) {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        document.querySelector("#content").value = "";
        saveDraft();

        let status = document.querySelector("#status");
        status.classList.remove("text-danger");
        status.classList.add("text-success");
        status.textContent = "Tootted successfully!";
        setTimeout(function() {
          status.textContent = "";
          status.classList.remove("text-success");
        }, 1500);
      }
      else {
        let status = document.querySelector("#status");
        status.classList.remove("text-success");
        status.classList.add("text-danger");
        status.textContent = "Toot failed.";
        setTimeout(function() {
          status.textContent = "";
          status.classList.remove("text-danger");
        }, 1500);
      }
    }

    xhr.send("status=" + encodeURIComponent(content));
  }

  function saveDraft() {
    let content = document.querySelector("#content").value;
    chrome.storage.sync.set({
      draft: content
    });
  }

  function validateCount() {
    let content = document.querySelector("#content")
    if (content.value.length <= 0 || content.value.length > 500) {
      disableTootButton();
      return false;
    }
    else {
      enableTootButton();
      return true;
    }
  }

  function disableTootButton() {
    let tootButton = document.querySelector("#toot");
    tootButton.setAttribute("disabled", "");
  }

  function enableTootButton() {
    let tootButton = document.querySelector("#toot");
    tootButton.removeAttribute("disabled");
  }

})();
