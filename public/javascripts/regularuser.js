(function () {

    const ERR_GENERAL = "Some error occurred, please try again later.";
    document.addEventListener('DOMContentLoaded', function () {
        fetchAndDisplayApprovedAds();
    });

    function fetchAndDisplayApprovedAds() {
        let innerAds = document.getElementById("data");
        show("spin");
        fetch('./api/ads/approved')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                innerAds.innerHTML = data.map((item) =>showApprovedAdsHTML(item)).join('');
            })
            .catch((err) => {
                innerAds.innerHTML = `${ERR_GENERAL} ${err.message}`;
            }).finally(() => {
            hide("spin");
        });
    }
    let hide = (idName) => {
        document.getElementById(idName).classList.add('d-none');
    }
    let show = (idName) => {
        document.getElementById(idName).classList.remove('d-none');
    }

    let showApprovedAdsHTML=(item)=> {
        let res = "<div class=\"col-12 col-md-3 border bg-light bg-body-secondary text-break\">";
        res += "<div class = \"row\">";
        res += "<h3>"+ item.title + "<br></h3>";
        res += "<h6>" + item.description + "<br>";
        res += "<br><p>" + item.price + "</p>";
        res += "<p>" + item.phone + "</p>";
        res += "<p>" + item.email + "</p></h6>";
        res += "</div></div><div class=\"col-md-1\"></div><br><br>";
        return res;
    }

})();