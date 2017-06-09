(function() {

  let defaults = {
    emoji: "unicode",
  };

  wdtEmojiBundle.defaults.emojiSheets = {
    "apple": "/img/emoji_apple64.png"
  };

  chrome.storage.local.get(defaults, function(storage) {
    switch (storage.emoji) {
      case "unicode":    wdtEmojiBundle.defaults.outputUnicode = true;  break;
      case "shortnames": wdtEmojiBundle.defaults.outputUnicode = false; break;
      default:           wdtEmojiBundle.defaults.outputUnicode = true;  break;
    }
  });

  wdtEmojiBundle.init(".wdt-emoji-bundle-enabled");

})();
