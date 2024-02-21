(function () {

    const ERR_GENERAL = "Some error occurred, please try again later.";
    document.addEventListener('DOMContentLoaded', function () {
        fetchAndDisplayAllAds();
    });
    function fetchAndDisplayAllAds() {
        fetch('./api/ads/')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
              //  document.getElementById("ads").innerHTML = data.map((item) => `<li> title: ${item.title} , Description:${item.description}, Email: ${item.email}, Phone: ${item.phone}, Approved: ${item.approved}</li>`).join('');
                document.getElementById("ads").innerHTML = data.map((item) =>showAdsHTML(item)).join('');

            })
            .catch((err) => {
                document.getElementById("ads").innerHTML = `${ERR_GENERAL} ${err.message}`;
            });
    }


    let showAdsHTML=(item)=> {
        let res = " <div class=\"col-12 col-md-3 border bg-body-secondary\">"
        res += "<h5>" + item.title + "<br>";
        res += item.description + "<br>";
        res += item.price+ "<br>";
        res += item.phone+ "<br>";
        res += item.email +"</h5>";
        if(!item.approved)
            res += "<div class=\"button-container\"> <button class =\"saveClass btn btn-secondary\"" +
                " data-id=\"" +item.id + "\" >Approve Ad</button>";

        res += "<button class=\"delClass btn btn-danger\" data-id=\"" + item.id + "\">Delete Ad</button><br>";
        res += "</div></div><div class =\"col-md-1 \"></\div><br>";
        return res;
    }

})();