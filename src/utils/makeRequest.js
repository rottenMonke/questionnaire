module.exports = function (url) {
    return new Promise((resolve, reject) =>{
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
              resolve(JSON.parse(xhr.response));
            } else {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            }
          };

          xhr.onerror = function () {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          };

          xhr.send();
    });
};
