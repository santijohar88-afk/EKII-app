(function () {
  if (window.__ekAndroidPatched || !window.AndroidBridge) return;
  window.__ekAndroidPatched = true;

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onerror = function () { reject(r.error); };
      r.onloadend = function () { var s = String(r.result); resolve(s.slice(s.indexOf(',') + 1)); };
      r.readAsDataURL(blob);
    });
  }

  async function saveViaAndroid(href, name) {
    try {
      var blob = await (await fetch(href)).blob();
      AndroidBridge.saveFile(name, blob.type || 'application/octet-stream', await blobToBase64(blob));
    } catch (e) {
      AndroidBridge.toast('Could not save file');
    }
  }

  // <a download> clicks (blob: and data: URLs) do nothing in a WebView -> route to Android "Save as".
  var nativeClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    if (this.hasAttribute('download')) {
      saveViaAndroid(this.href, this.getAttribute('download') || 'download');
      return;
    }
    return nativeClick.apply(this, arguments);
  };
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[download]') : null;
    if (a) { e.preventDefault(); saveViaAndroid(a.href, a.getAttribute('download') || 'download'); }
  }, true);

  // WebView has no Web Share API -> use the Android share sheet.
  if (!navigator.share) {
    navigator.share = function (d) {
      AndroidBridge.share((d && d.title) || '', (d && (d.text || d.url)) || '');
      return Promise.resolve();
    };
  }
})();
