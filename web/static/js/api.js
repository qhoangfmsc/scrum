api = {
    // domainServer: "http://localhost:8080",
    domainServer: "http://localhost:5000",
    request: function (url, param, callback, options) {
        let object = this;
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let data = JSON.parse(xhttp.responseText);
                if (!options ||
                    (options && !options.hasOwnProperty("responseHandleFunction"))
                ) {
                    if (data.result === "success") {
                        callback(data.content);
                    } else {
                        callback();
                    }
                } else {
                    if (typeof options.responseHandleFunction == "function") {
                        options.responseHandleFunction({
                            data: data,
                            url: url,
                            request: param,
                            callback: callback,
                            options: options,
                        });
                    }
                }
            } else {
                if (this.readyState == 4) {
                    if (options && options.errorCallback) {
                        options.errorCallback(this.status);
                    } else {
                        console.log('response api code', this.status, url);
                    }
                }

            }
        };
        if (param) {
            xhttp.open("POST", object.domainServer + url, true);
        } else {
            xhttp.open("GET", object.domainServer + url, true);
        }
        xhttp.setRequestHeader(
            "Content-Type",
            // "application/x-www-form-urlencoded",
            // "application/json;charset=UTF-8", 
            "application/json",
        );
        xhttp.send(param);
    },
};