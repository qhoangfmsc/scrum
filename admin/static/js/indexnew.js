indexnew = {
    build: function () {
        let object = this;
        object.renderData();
        object.renderFunctionModal();
        object.renderAddButton();
    },

    renderAddButton: function () {
        let object = this;
        let addCompany = document.getElementById("addCompany");
        let myModal = document.getElementById("myModal");

        addCompany.onclick = function () {
            const modal = new bootstrap.Modal(myModal);
            modal.show();
            object.renderAllDataToModal(null);

            let createCompanyButton = document.getElementById("createCompanyButton");
            let modifyCompanyButton = document.getElementById("modifyCompanyButton");
            if (createCompanyButton.classList.contains("d-none")) {
                createCompanyButton.classList.remove("d-none");
            }
            if (!modifyCompanyButton.classList.contains("d-none")) {
                modifyCompanyButton.classList.add("d-none");
            }
        };
    },

    getData: function (callback) {
        let object = this;
        let url = "/companies/get-all";
        let request = null;
        api.request(url, request, function (res) {
            callback(res);
        });
    },

    renderFunctionModal: function () {
        let object = this;

        let createCompanyButton = document.getElementById("createCompanyButton");
        let modifyCompanyButton = document.getElementById("modifyCompanyButton");
        let inputLinkModal = document.getElementById("linkLogo");

        object.initInputLinkModal(inputLinkModal);

        createCompanyButton.onclick = function () {
            object.callCompanyApi("/companies/create", "Create");
        };

        modifyCompanyButton.onclick = function () {
            object.callCompanyApi("/companies/update", "Update");
        };
    },

    callCompanyApi: function (urlCompany, textCompany) {
        let object = this;

        let url = urlCompany;
        let request = object.getValueCompany();;

        api.request(url, JSON.stringify(request), function (res) {
            if (res.includes("successfully")) {
                alert(`${textCompany} successfully!`);
                object.renderData();
            } else {
                alert(`${textCompany} failed!`);
            }
        });
    },

    initInputLinkModal: function (input) {
        let logo = document.getElementById("logoModal");
        input.addEventListener('input', (event) => {
            const text = event.target.value;
            logo.setAttribute("src", text);
        });

        input.addEventListener('paste', (event) => {
            const text = event.clipboardData.getData('text');
            logo.setAttribute("src", text);
        });
    },

    getValueCompany: function () {
        let object = this;

        let id = object.getInputValueById("getId");
        let name = object.getInputValueById("getCompany");
        let address = object.getInputValueById("getAddress");
        let link = object.getInputValueById("getWebsite");
        let description = object.getInputValueById("getDescription");
        let requirement = object.getInputValueById("getRequirement");
        let career1 = object.getInputValueById("getCareer1");
        let career2 = object.getInputValueById("getCareer2");
        let career3 = object.getInputValueById("getCareer3");
        let avatar = document.getElementById("logoModal").getAttribute("src");

        let career = `
            ${(career1) ? career1 + "," : ""}
            ${(career2) ? career2 + "," : ""}
            ${(career3) ? career3 + "," : ""}
        `;

        career = career.trim().slice(0, -1).replaceAll("\n", "").replaceAll(" ", "");

        returnJson = {
            "name": name,
            "address": address,
            "link": link,
            "career": career,
            "description": description,
            "requirement": requirement,
            "avatar": avatar,
        }

        if (id) {
            returnJson["id"] = id;
        };

        return returnJson;
    },

    getInputValueById: function (selector) {
        let elem = document.getElementById(selector);
        return elem.value;
    },

    renderData: function () {
        let object = this;
        object.getData(function (data) {
            let companyTable = document.getElementById("companyTable");
            let tbody = companyTable.querySelector("tbody");

            tbody.innerHTML = ``;

            data.forEach(res => {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><img src=${res.avatar} class="product-img"></td>
                    <td>${res.name}</td>
                    <td>
                        <div style="width: 10rem;display: flex;">
                            <span style="width: 20rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                ${res.address}
                            <span>
                        </div>
                    </td>
                    <td>
                        <div style="width: 10rem;display: flex;">
                            <span style="width: 20rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                ${res.description}
                            <span>
                        </div>
                    </td>
                    <td>
                        <div style="width: 10rem;display: flex;">
                            <span style="width: 20rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                ${res.career}
                            <span>
                        </div>
                    </td>
                    <td>
                        <div style="width: 10rem;display: flex;">
                            <span style="width: 20rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                                ${res.requirement}
                            <span>
                        </div>
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
                editButton.onclick = function () {
                    let getId = document.getElementById("getId");
                    getId.value = res.id;
                    object.renderAllDataToModal(res);

                    const modal = new bootstrap.Modal(myModal);
                    modal.show();

                    let createCompanyButton = document.getElementById("createCompanyButton");
                    let modifyCompanyButton = document.getElementById("modifyCompanyButton");
                    if (modifyCompanyButton.classList.contains("d-none")) {
                        modifyCompanyButton.classList.remove("d-none");
                    }
                    if (!createCompanyButton.classList.contains("d-none")) {
                        createCompanyButton.classList.add("d-none");
                    }
                };

                let deleteButton = tr.querySelector(".delete-button");
                deleteButton.onclick = function () {
                    console.log("data clicked", res)
                };

                tbody.appendChild(tr);
            });
        });
    },

    renderAllDataToModal: function (res) {
        document.getElementById("getId").value = (res) ? res.id : "";
        document.getElementById("getCompany").value = (res) ? res.name : "";
        document.getElementById("getAddress").value = (res) ? res.address : "";
        document.getElementById("getWebsite").value = (res) ? res.link : "";
        document.getElementById("getDescription").value = (res) ? res.description : "";
        document.getElementById("getRequirement").value = (res) ? res.requirement : "";
        document.getElementById("getCareer1").value = (res) ? res.career[0] : "";
        document.getElementById("getCareer2").value = (res) ? res.career[1] : "";
        document.getElementById("getCareer3").value = (res) ? res.career[2] : "";
        document.getElementById("logoModal").setAttribute("src", (res) ? res.avatar : "");
    },
};