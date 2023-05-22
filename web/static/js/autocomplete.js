autocomplete = {
    build: function () {
        let object = this;

        object.autocomplete()
    },

    getData: function (input, callback) {
        let object = this;
        let url = "/companies/filter";

        let request = {
            "value": input.value,
        };

        api.request(url, JSON.stringify(request), function (arr) {
            callback(arr);
        });
    },

    autocomplete: function () {
        let object = this;

        var currentFocus;
        let inp = document.getElementById("filterInput");
        inp.addEventListener("input", function (e) {
            object.getData(inp, function (arr) {
                var a, b, i, val = inp.value;
                closeAllLists();
                if (!val) { return false; }
                currentFocus = -1;

                a = document.createElement("DIV");
                a.setAttribute("id", inp.id + "autocomplete-list");
                a.setAttribute("class", "autocomplete-items");
                a.style.position = "absolute";
                a.style.background = "#fff";
                a.style.width = "calc(100% - 30px)";
                a.style.zIndex = "2";

                for (i = 0; i < arr.length; i++) {
                    let idElem = arr[i].id;
                    let nameElem = arr[i].name;
                    b = document.createElement("DIV");
                    b.style.padding = "10px";
                    b.style.cursor = "pointer";
                    b.style.borderBottom = "1px solid #d4d4d45e";
                    b.innerHTML = `
                        <div>${arr[i].name} - ${arr[i].address}</div>
                    `;
                    b.addEventListener("click", function (e) {
                        window.open(`/web/page/single.html?id=${idElem}`);
                        inp.value = nameElem;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
                inp.parentNode.appendChild(a);
            })
        });

        inp.addEventListener("keydown", function (e) {
            var x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode == 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode == 38) { //up
                currentFocus--;
                addActive(x);
            } else if (e.keyCode == 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });
        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = (x.length - 1);
            x[currentFocus].classList.add("autocomplete-active");
        }
        function removeActive(x) {
            for (var i = 0; i < x.length; i++) {
                x[i].classList.remove("autocomplete-active");
            }
        }
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }

        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    },
};