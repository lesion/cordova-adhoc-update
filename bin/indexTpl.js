module.exports = function (widget) {

  const path = require('path')

  // check if we have a package name
  if (!widget.name) throw new Error('package name not found in package.json!!!')

  // we have a version ?
  if (!widget.$.version) throw new Error('package name not found in package.json!!!')

  return `<!doctype html>
<html>
<head>
  <title>${widget.name}</title>
  <style>
    body {
      text-align: center;
    }

    h1 {
      font-size: 40px;
      font-family: Helvetica;
      font-weight: lighter;
      color: #575757;
    }

    img {
      border-radius: 30px;
    }

    a {
      transition: all 0.3s;
      display:inline-block;
      padding-top: 50px;
    }
  </style>
</head>
<body>
  <a href="itms-services://?action=download-manifest&url=${path.join(widget.url, 'app.plist')}">
    <img src='icon.png'></a>
    <h1>${widget.name} ${widget.$.version}</h1>
  </a>
</body>
</html>`
}
