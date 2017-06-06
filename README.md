# Fastoot
A Chrome Extension that posts quickly your status to Mastodon.

![Fastoot](https://raw.githubusercontent.com/noraworld/fastoot/master/img/fastoot_screenshot.png)

## Install
[Fastoot - Chrome Web Store](https://chrome.google.com/webstore/detail/fastoot/hnmnnhfeigiogjagmmpnhelpnhnchaoj)

## Developer install

```sh
$ git clone https://github.com/noraworld/fastoot
$ cd fastoot
$ npm install
$ npm install -g gulp
```

Run a task:

```sh
$ gulp
```

## Dependencies

* node v6.10.3
* npm 3.10.10
* gulp v3.9.1
* bootstrap v4.0.0-alpha.6
* wdt-emoji-bundle

[Download Bootstrap](https://github.com/twbs/bootstrap/releases/download/v4.0.0-alpha.6/bootstrap-4.0.0-alpha.6-dist.zip) and put `bootstrap.min.css` under `src/lib`. You need to make `src/lib` directory before putting the file.

Download wdt-emoji-bundle by entering the following commands.

```sh
$ cd fastoot
$ curl https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css > src/lib/normalize.min.css
$ curl https://cdn.rawgit.com/needim/wdt-emoji-bundle/master/wdt-emoji-bundle.css > src/lib/wdt-emoji-bundle.css
$ curl https://cdn.rawgit.com/needim/wdt-emoji-bundle/master/emoji.min.js > src/lib/emoji.min.js
$ curl https://cdn.rawgit.com/needim/wdt-emoji-bundle/master/wdt-emoji-bundle.min.js > src/lib/wdt-emoji-bundle.min.js
```

## License
All codes of this repository are available under the MIT License. See the [LICENSE](https://github.com/noraworld/fastoot/blob/master/LICENSE) for more information.
