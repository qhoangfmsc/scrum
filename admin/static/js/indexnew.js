indexnew = {
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
            let companyTable = document.getElementById("companyTable");
            let tbody = companyTable.querySelector("tbody");

            data.forEach(res => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><img src=${res.avatar} class="product-img"></td>
                    <td>${res.name}</td>
                    <td>${res.address}</td>
                    <td style="
                      width: 15rem;
                      display: flex;">
                      <span style="
                      width: 20rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;">
                        ${res.description}
                    </td>
                    <td>${res.career}</td>
                    <td style="
                        width: 15rem;
                        display: flex;">
                        <span style="
                        width: 20rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;">
                        ${res.requirement}
                    </td>
                    <td>
                      <a type="button" class="dropdown-toggle dropdown-toggle-nocaret edit-button">
                        <i class="zmdi zmdi-edit"></i>
                      </a>
                    </td>
                    <td>
                      <a type="button" class="dropdown-toggle dropdown-toggle-nocaret delete-button">
                        <i class="zmdi zmdi-delete"></i>
                      </a>
                    </td>
                `;

                let editButton = tr.querySelector(".edit-button");
                editButton.onclick = function() {
                    console.log("data clicked", res)
                };

                let deleteButton = tr.querySelector(".delete-button");
                deleteButton.onclick = function() {
                    console.log("data clicked", res)
                };

                tbody.appendChild(tr);
            });
        });
    },
};