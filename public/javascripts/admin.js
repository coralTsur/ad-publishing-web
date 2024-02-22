(function () {

    const ERR_GENERAL = "Some error occurred, please try again later.";
    document.addEventListener('DOMContentLoaded', function () {
        fetchAndDisplayAllAds();
        listenDeleteButton();
        listenApproveButton();
    });
    function fetchAndDisplayAllAds() {
        show("spin");
        fetch('./api-admin/ads/')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                //  document.getElementById("ads").innerHTML = data.map((item) => `<li> title: ${item.title} , Description:${item.description}, Email: ${item.email}, Phone: ${item.phone}, Approved: ${item.approved}</li>`).join('');
                document.getElementById("ads").innerHTML = data.map((item) =>showAdsHTML(item)).join('');
                hide("spin");
            })
            .catch((err) => {
                document.getElementById("ads").innerHTML = `${ERR_GENERAL} ${err.message}`;
            });
    }


    let showAdsHTML=(item)=> {
        let res = "<div class=\"col-12 col-md-3 border bg-body-secondary\">";
        res += "<h5>" + item.title + "<br>";
        res += item.description + "<br>";
        res += item.price + "<br>";
        res += item.phone + "<br>";
        res += item.email + "</h5>";
        if (!item.approved) {
            res += "<div class=\"button-container\">";
            res += "<button class=\"approveClass btn btn-secondary\" data-id=\"" + item.id + "\">Approve Ad</button>";
            res += "</div>";
        }

        res += "<div class=\"button-container\">";
        res += "<button class=\"delClass btn btn-danger\" data-id=\"" + item.id + "\">Delete Ad</button><br>";
        res += "</div></div><div class=\"col-md-1\"></div><br><br>";

        return res;

    }

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
                        // Fetch and display ads after successful deletion
                        hide("spin");
                        fetchAndDisplayAllAds();
                    })
                    .catch((err) => {
                        document.getElementById("ads").innerHTML = `${ERR_GENERAL} ${err.message}`;
                    });
            }
        });
    }

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
                        hide("spin");
                        fetchAndDisplayAllAds();
                    })
                    .catch((err) => {
                        document.getElementById("ads").innerHTML = `${ERR_GENERAL} ${err.message}`;
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