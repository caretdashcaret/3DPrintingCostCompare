//MakerBot Replicator 2
//intially $48.00 for material, $2,008.00 for printer and mandatory insurance, $30.92 for shipping, $185.22 for tax
//recurring $48.00 for material, $10.59 for shipping, for $5.20 for tax
//material comes in 1kg of PLA, PLA density is ~1.25 g/cm3, so 800cm^3 for print volume with 100% infill
var makerbot = {
        "name": "MakerBot",
        "initial": 4328.14,
        "recurring": 63.79,
        "volume": 800
    }

//Form1
//initially $149.00 for material, $3,299.00 for printer, $49.72 for shipping
//recurring $149.00 for material, $10.62 for shipping
//material comes in 1 liter of resin, so 1000cm^3
var form1 = {
        "name": "Form1",
        "initial": 3497.72,
        "recurring": 159.62,
        "volume": 1000

}

//Sculpteo
//costs $8.25 in white plastic plus $6.5 in shipping
var sculpteo = {
        "name": "Sculpteo (individual shipping)",
        "cost": 14.75
}

//Sculpteo aggregate
var sculpteo_aggregate = {
        "name": "Sculpteo (aggregate shipping)",
        "cost": 8.25,
        "shipping": 6.5
}

var x_at_a_time = 40
var max_prints = 800 / x_at_a_time


function calculate_printer_costs(printer_info){
    var support_material = 1.5
    var print_volume = 3.8 * support_material

    var results = []
    var current_volume = printer_info["volume"]
    var current_price = printer_info["initial"]

    results.push(printer_info["name"])
    results.push(printer_info["initial"])

    for (var current_print=0;current_print<max_prints;current_print++){
        if (current_volume >= print_volume){
            current_volume = current_volume - print_volume * x_at_a_time
            results.push(current_price.toFixed(2))
        }
        else{
            current_volume = current_volume + printer_info["volume"]
            current_price = current_price + printer_info["recurring"]
            current_volume = current_volume - print_volume * x_at_a_time
            results.push(current_price.toFixed(2))
        }
    }
    return results
}

function calculate_service_costs(service_info){
    var results = []
    var current_price = 0

    results.push(service_info["name"])
    results.push(current_price)

    for (var current_print=0;current_print<max_prints;current_print++){
        current_price = current_price + service_info["cost"] * x_at_a_time
        results.push(current_price.toFixed(2))
    }

    return results
}

function calculate_aggregate_costs(service_info){
    var results = []

    results.push(service_info["name"])

    for (var current_print=0;current_print<=max_prints;current_print++){
        //Sculpteo has bulk discounts
        var discount = 0
        if (current_print * x_at_a_time >= 50){
            discount = 0.2
        }
        else if (current_print * x_at_a_time >= 10){
            discount = 0.1
        }
        current_price = current_print * service_info["cost"] * x_at_a_time * (1 - discount) + service_info["shipping"]
        results.push(current_price.toFixed(2))
    }

    return results
}

var makerbot_data = calculate_printer_costs(makerbot)
var form1_data = calculate_printer_costs(form1)

var sculpteo_data = calculate_service_costs(sculpteo)
var sculpteo_aggregate_data = calculate_aggregate_costs(sculpteo_aggregate)

var dataAsColumn = [makerbot_data, form1_data, sculpteo_data, sculpteo_aggregate_data]