# Fastoot
A Chrome Extension that posts quickly your status to Mastodon.

![Fastoot](https://raw.githubusercontent.com/noraworld/fastoot/master/screenshot.png)

[noraworld/wdt-emoji-bundle](https://github.com/noraworld/wdt-emoji-bundle) is used in this project, forked from [needim/wdt-emoji-bundle](https://github.com/needim/wdt-emoji-bundle):pray:

## Installation
[Fastoot - Chrome Web Store](https://chrome.google.com/webstore/detail/fastoot/hnmnnhfeigiogjagmmpnhelpnhnchaoj)

## For developer dependencies

* bootstrap v4.0.0-alpha.6
* wdt-emoji-bundle

[Download Bootstrap](https://github.com/twbs/bootstrap/releases/download/v4.0.0-alpha.6/bootstrap-4.0.0-alpha.6-dist.zip) and put `bootstrap.min.css` under `src/lib`.

Download wdt-emoji-bundle by entering the following commands.

```sh
$ cd fastoot
$ curl https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css > src/lib/normalize.min.css
$ curl https://raw.githubusercontent.com/noraworld/wdt-emoji-bundle/unicode/wdt-emoji-bundle.css > src/lib/wdt-emoji-bundle.css
$ curl https://raw.githubusercontent.com/noraworld/wdt-emoji-bundle/unicode/emoji.min.js > src/lib/emoji.min.js
$ curl https://raw.githubusercontent.com/noraworld/wdt-emoji-bundle/unicode/wdt-emoji-bundle.min.js > src/lib/wdt-emoji-bundle.min.js
```

## License
All codes of this repository are available under the MIT License. See the [LICENSE](https://github.com/noraworld/fastoot/blob/master/LICENSE) for more information.
