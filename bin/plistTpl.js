module.exports = function (widget) {
  // check if we have a package name
  if (!widget.name) throw new Error('package name not found in package.json!!!')

  // we have a version ?
  if (!widget.$.version) throw new Error('package name not found in package.json!!!')

  // we have an author
  if (!widget.author) throw new Error('author is missing ?')

  if (!widget.url) throw new Error('url is missing, specify it in `homepage` field in your package.json or use -u flag! This is the place where you\'ll place your .ipa')

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>${widget.url}${widget.name[0]}.${widget.$.version}.ipa</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>${widget.$.id}</string>
        <key>kind</key>
        <string>software</string>
        <key>bundle-version</key>
        <string>${widget.$.version}</string>
        <key>title</key>
        <string>${widget.name[0]}</string>
        <key>subtitle</key>
        <string>${widget.description}</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>`
}
