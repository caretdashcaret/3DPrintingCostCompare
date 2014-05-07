var chart = c3.generate({
    data: {
        columns: dataAsColumn
    },
    axis: {
        x: {
            label: 'Number of Prints',
            type: 'categorized',
            tick: {
                format: function (x) { return x * x_at_a_time; },
                culling: {
                    max: 5
                }
            }
        },
        y: {
            label: 'Cost ($)'
        }
    }
});