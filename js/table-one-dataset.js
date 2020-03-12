Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

fetch('https://www.datos.gov.co/resource/c34d-te98.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        generateTable(myJson);
    });

//funtions        


function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function generateTable(elementsJson) {
    var table = document.getElementById("dataTable");
    var html = `
    <thead>
        <tr>
            <th>Estado Instalacion</th>
            <th>Departamento</th>
            <th>Dane Municipio</th>
            <th>Dane Centro Poblado</th>
            <th>Centro Poblado</th>
            <th>Centro Poblado Confirmado</th>
            <th>Poblacion Beneficiada</th>
            <th>Estado Funcionamiento</th>
        </tr>
    </thead>
    <tfoot>
        <tr>
        <th>Estado Instalacion</th>
            <th>Departamento</th>
            <th>Dane Municipio</th>
            <th>Dane Centro Poblado</th>
            <th>Centro Poblado</th>
            <th>Centro Poblado Confirmado</th>
            <th>Poblacion Beneficiada</th>
            <th>Estado Funcionamiento</th>
        </tr>
    </tfoot>
    <tbody>
    `;
    for (let json of elementsJson) {
        html += `
        <tr>
            <td>${json.estado_instalaci_n}</td>
            <td>${json.departamento}</td>
            <td>${json.dane_municipio}</td>
            <td>${json.municipio}</td>
            <td>${json.dane_centro_poblado}</td>
            <td>${json.centro_poblado}</td>
            <td>${json.centro_poblado_confirmado}</td>
            <td>${json.poblaci_n_beneficiada_n_mero}</td>
            <td>${json.estado_funcionamiento}</td>
        </tr>
        `;
    }
    html += `
    </tbody>
        `;
    table.innerHTML = html;
}