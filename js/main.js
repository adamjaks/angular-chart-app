document.addEventListener('DOMContentLoaded', function() {
    var canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');

    var chartObj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [{
                label:"My First dataset",
                backgroundColor:'#222',
                borderColor:'#222',
                fill:false,
                data: [
                    10,20,40,30,14,20
                ]
            }]
        },
        options: {
            //
        }
    });



});
