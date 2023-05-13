single = {
    build: function () {
        let object = this;
        object.renderData();
    },

    getData: function (callback) {
        let object = this;
        let url = "/companies/get-all";
        let request = "";
        api.request(url, request, function (res) {
            callback(res);
        });
    },

    renderData: function () {
        let object = this;
        object.getData(function (data) {
            let postList = document.getElementById("postList");
            data.forEach(res => {
                let div = document.createElement("div");
                div.classList.add("single-post", "d-flex", "flex-row");
                div.innerHTML = `
                <div class="thumb">
                    <div class="mx-auto" style="object-fit: cover; width: 5rem;"><img src="${res.avatar}" style="width: 5rem;"></div>
                    <ul class="tags">
                        <li>
                            <b>Art</b>
                        </li>
                        <li>
                            <b>Media</b>
                        </li>
                        <li>
                            <b>Design</b>
                        </li>
                    </ul>
                </div>
                <div class="details pl-4">
                    <div class="title d-flex flex-row justify-content-between mb-4">
                        <div class="titles" style="margin-block: auto;">
                            <a href="single.html?id=${res.id}">
                                <h4 class="mb-0">${res.name}</h4>
                            </a>
                        </div>
                        <ul class="btns">
                            <li><a href="single.html?id=${res.id}">Apply</a></li>
                        </ul>
                    </div>
                    <div>
                        <p>${res.description}</p>
                        <p class="address"><span class="lnr lnr-map"></span> &nbsp; ${res.address}</p>
                        <p class="address"><span class="lnr lnr-database"></span> &nbsp; ${res.requirement}</p>
                    </div>
                </div>
                `;
                postList.appendChild(div);
            });
        });
    },
};