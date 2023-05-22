index = {
    build: function () {
        let object = this;
        object.renderData();
    },

    getData: function (callback) {
        let object = this;
        let url = "/companies/get-all";
        let request = null;
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

                let ulTag = document.createElement("ul");
                ulTag.classList.add("tags");
                ulTag.style.width = "15rem";

                res.career.forEach(skill => {
                    let li = document.createElement("li");
                    li.innerHTML = `<b>${skill}</b>`;
                    ulTag.appendChild(li);
                });

                div.innerHTML = `
                <div class="thumb">
                    <div class="mx-auto" style="object-fit: cover; width: 5rem;"><img src="${res.avatar}" style="width: 5rem;"></div>
                </div>
                <div class="details pl-4 w-100">
                    <div class="title d-flex flex-row justify-content-between mb-4">
                        <div class="titles" style="margin-block: auto;">
                            <a href="single.html?id=${res.id}">
                                <h4 class="mb-0">${res.name}</h4>
                            </a>
                        </div>
                        <div class="btns">
                            <li><a href="single.html?id=${res.id}">View Details</a></li>
                        </div>
                    </div>
                    <div>
                        <p>${res.description}</p>
                        <p class="address"><span class="lnr lnr-map"></span> &nbsp; ${res.address}</p>
                        <p class="address"><span class="lnr lnr-database"></span> &nbsp; ${res.requirement}</p>
                    </div>
                </div>
                `;

                let thumb = div.querySelector(".thumb");
                thumb.appendChild(ulTag);

                postList.appendChild(div);
            });
        });
    },
};