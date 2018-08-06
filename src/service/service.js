export default {
  getQuestions: function() {
    return new Promise((resolve, reject) =>{
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://opentdb.com/api.php?amount=7', true);

      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function() {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };

      xhr.send();
    });
  }
};
