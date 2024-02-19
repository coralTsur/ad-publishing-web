(function () {

    const ERR_GENERAL = "Some error occurred, please try again later.";
    document.addEventListener('DOMContentLoaded', function () {
        fetchAndDisplayContactsThen();
    });


    function fetchAndDisplayContactsThen() {
        fetch('./api/ads')
            .then((response) => {
                if (response.status !== 200)
                    throw new Error(response.statusText);
                return response.json();
            })
            .then((data) => {
                document.getElementById("data").innerHTML = data.map((item) => `<li> title: ${item.title} , Description:${item.description}, Email: ${item.email}, Phone: ${item.phone}</li>`).join('');
            })
            .catch((err) => {
                document.getElementById("data").innerHTML = `${ERR_GENERAL} ${err.message}`;
            });
    }
})();