(function () {
  const capital_input = document.getElementById('capital-input')
  const capital_send = document.getElementById('capital-send')
  const capital_table = document.getElementById('capital-table')
  const capital_table_body = document.getElementById('capital-table-body')
  
  const answer = document.getElementById('answer')
  const table_error_message = document.getElementById('table-error-message')



  capital_send.addEventListener("click", function () {
    event.preventDefault();

    let capital_value = capital_input.value;

    fetch(`https://api.restcountries.com/countries/v5/capitals/${capital_value}?pretty=1`,
      { 
        method: "GET",
        // API_KEY is stored locally in a file ignored by git
        headers: { "Authorization": `Bearer ${API_KEY}`,
                    "Accept": "application/json"
                } 
      }
    )
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (!data.data.objects || data.data.objects.length === 0)
        {
          capital_table.style.display = "none";
          table_error_message.style.display = "flex";
        }
        else
        {
          capital_table_body.innerHTML = "";
          capital_table.style.display = "table";
          table_error_message.style.display = "none";
          data.data.objects.forEach(function (country) {
          capital_table_body.innerHTML += `
            <tr>
              <td>${country.names.common}</td>
              <td>${country.capitals[0].name || "N/A"}</td>
              <td>${country.population}</td>
              <td>${country.region}</td>
              <td>${country.subregion || "N/A"}</td>
            </tr>
            `;
          });
        }

      })
      .catch(error => answer.innerHTML = error);
  })
})();
