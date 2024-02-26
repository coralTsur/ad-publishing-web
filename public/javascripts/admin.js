(function () {

    const ERR_GENERAL = "Some error occurred, please try again later.";
    const ERR_GENERAL_ALREADY_DONE = "This ad was handled by some other admin, please <a href='/admin-area' >reload</a>";
    document.addEventListener('DOMContentLoaded', function () {
        fetchAndDisplayAllAds();
        listenDeleteButton();
        listenApproveButton();

    });

    /**
     * use fetch to req all ads
     * insert to the DOM all received data
     */
    function fetchAndDisplayAllAds() {
        const innerAds = document.getElementById("ads");
        show("spin");
        fetch('./api-admin/ads/')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                innerAds.innerHTML = data.map((item) =>showAdsHTML(item)).join('');
            })
            .catch((err) => {
                innerAds.innerHTML = `${ERR_GENERAL} ${err.message}`;
            }).finally(() => {
            hide("spin");
        });
    }


    /**
     * return html ad.
     * @param item
     * @returns {string}
     */
    let showAdsHTML=(item)=> {
        let res = "<div class=\"col-12 col-md-5 col-lg-3 border bg-light bg-body-secondary text-break\">";
        res += "<div class = \"row\">";
        res += "<h3>"+ item.title + "<br></h3>";
        res += "<h6>" + item.description + "<br>";
        res += "<br><p>" + item.price + "$ </p>";
        res += "<p>" + item.phone + "</p>";
        res += "<p>" + item.email + "</p></h6>";
        res += "<div class=\"button-container text-center \">";
        if (!item.approved)
            res += "<button class=\"approveClass btn btn-secondary\" data-id=\"" + item.id + "\">Approve Ad</button>";

        res += "<button class=\"delClass btn btn-danger\" data-id=\"" + item.id + "\">Delete Ad</button><br>";
        res += "</div></div></div><div class=\"col-md-1\"></div><br><br>";

        return res;
    }

    /**
     * listen to delete button, and using fetch delete ads
     */
    let listenDeleteButton=()=>{
        document.getElementById("ads").addEventListener("click", function(event) {
            if (event.target.classList.contains("delClass")) {
                show("spin");
                let idAdDelete = event.target.dataset.id;
                fetch('./api-admin/ads/' + idAdDelete, {method:"DELETE"})
                    .then((response) => {
                        if (response.status < 200 || response.status > 300)
                            throw new Error(response.statusText);
                        return response.json();
                    })
                    .then(() => {
                        fetchAndDisplayAllAds();
                    })
                    .catch((err) => {
                        document.getElementById("adsError").innerHTML = `<h5 class="text-center">${ERR_GENERAL_ALREADY_DONE} </h5>`;

                    }).finally(() => {
                    hide("spin");
                });

            }
        });
    }

    /*
    listen to approved button, and using fetch update ads
     */
    let listenApproveButton=()=>{
        document.getElementById("ads").addEventListener("click", function(event) {
            if (event.target.classList.contains("approveClass")) {
                show("spin");
                let idAdClickApprove = event.target.dataset.id;
                fetch('./api-admin/ads/' + idAdClickApprove, {method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ approved: true })})
                    .then((response) => {
                        if (response.status < 200 || response.status > 300)
                            throw new Error(response.statusText);
                        return response.json();
                    })
                    .then(() => {
                        // Fetch and display ads after successful deletion
                        fetchAndDisplayAllAds();
                    })
                    .catch((err) => {
                        document.getElementById("adsError").innerHTML = `<h5 class="text-center">${ERR_GENERAL_ALREADY_DONE} </h5>`;

                    }).finally(() => {
                    hide("spin");
                });
            }
        });
    }

    let hide = (idName) => {
        document.getElementById(idName).classList.add('d-none');
    }
    let show = (idName) => {
        document.getElementById(idName).classList.remove('d-none');
    }

})();