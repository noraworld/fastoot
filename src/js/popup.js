(() => {

  "use strict";

  let settings = {
    domain: "",
    token: {},
    draft: "",
    visibility: "public",
  };

  chrome.storage.sync.get(settings, function(storage) {
    settings.domain = storage.domain;
    settings.token = storage.token;
    settings.draft = storage.draft;
    settings.visibility = storage.visibility;

    document.querySelector("#content").value = settings.draft;
    document.querySelector("#visibility").value = settings.visibility;
    init();
  });

  function init() {
    count();
    validateCount();

    document.querySelector("#toot").addEventListener("click", toot);
    document.querySelector("#cw").addEventListener("change", toggleSpoilerField);
    document.addEventListener("keyup", function(event) {
      count();
      validateCount();
      saveDraft();
    });
    document.addEventListener("keydown", function(event) {
      if (((event.ctrlKey && !event.metaKey) || (event.metaKey && !event.ctrlKey)) && event.key === 'Enter' && validateCount() && validateFocus()) {
        toot();
      }
      refleshStatus();
    });
  }

  function count() {
    let content = document.querySelector("#content").value;
    let spoiler = document.querySelector("#spoiler-text").value;
    let left = 500 - (content.length + spoiler.length);

    document.querySelector("#words").textContent = left;
  }

  function validateCount() {
    let content = document.querySelector("#content");
    let spoiler = document.querySelector("#spoiler-text");
    let count = content.value.length + spoiler.value.length;

    if (count <= 0 || count > 500) {
      disableTootButton();
      return false;
    }
    else {
      enableTootButton();
      return true;
    }
  }

  function toot() {
    let xhr = new XMLHttpRequest();
    let url = settings.domain + "/api/v1/statuses";
    let token = settings.token;
    let content = document.querySelector("#content").value;
    let visibility = document.querySelector("#visibility").value;
    let spoiler = document.querySelector("#spoiler-text").value;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Bearer " + token.access_token);

    xhr.onreadystatechange = function(event) {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        document.querySelector("#content").value = "";
        saveDraft();
        document.querySelector("#spoiler-text").value = "";
        document.querySelector("#cw").checked = false;
        hideSpoiler();

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
        if (settings.token.access_token) {
          status.textContent = "Toot failed";
        }
        else {
          status.innerHTML = 'Auth this app from <a href="/options.html" target="_blank">options page</a>';
        }
      }
    }

    let isChecked = document.querySelector("#cw").checked;
    if (isChecked && spoiler === "") {
      document.querySelector("#spoiler-text").style.border = "1px solid #d9534f";
      return false;
    }
    else if (isChecked && spoiler !== "") {
      xhr.send("status=" + encodeURIComponent(content) + "&visibility=" + visibility + "&spoiler_text=" + encodeURIComponent(spoiler));
    }
    else {
      xhr.send("status=" + encodeURIComponent(content) + "&visibility=" + visibility);
    }

  }

  function saveDraft() {
    let content = document.querySelector("#content").value;
    chrome.storage.sync.set({
      draft: content
    });
  }

  function validateFocus() {
    let active = document.activeElement;
    let content = document.querySelector("#content");
    let spoiler = document.querySelector("#spoiler-text");

    if (active === content || active === spoiler) {
      return true;
    }
    else {
      return false;
    }
  }

  function toggleSpoilerField() {
    let isChecked = document.querySelector("#cw").checked;
    if (isChecked) {
      showSpoiler();
      document.querySelector("#cw-hide-area").style.height = "0";
    }
    else {
      hideSpoiler();
      document.querySelector("#spoiler-text").style.border = "";
      document.querySelector("#cw-hide-area").style.height = "48px";
    }
  }

  function showSpoiler() {
    document.querySelector("#spoiler-text").style.display = "block";
  }

  function hideSpoiler() {
    document.querySelector("#spoiler-text").value = "";
    count();
    validateCount();
    document.querySelector("#spoiler-text").style.display = "none";
  }

  function disableTootButton() {
    let tootButton = document.querySelector("#toot");
    tootButton.setAttribute("disabled", "");
    let words = document.querySelector("#words");

    if (words.textContent !== "500") {
      words.style.color = "#d9534f";
    }
  }

  function enableTootButton() {
    let tootButton = document.querySelector("#toot");
    tootButton.removeAttribute("disabled");
    let words = document.querySelector("#words");
    words.style.color = "";
  }

  function refleshStatus() {
    let status = document.querySelector("#status");
    status.textContent = "";
    status.classList.remove("text-success");
    status.classList.remove("text-danger");
  }

})();
