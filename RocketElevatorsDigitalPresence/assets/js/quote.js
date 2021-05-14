var optionSelected = 0 ;  // egal the default value of UL
var typeClient = "residential" ;

var button_prices = new Array();
button_prices[0] = 7565;    // standard
button_prices[1] = 12345;   // Premium
button_prices[2] = 15400;   // Excelium

$(document).ready(function () {

    $('#number-input').hide();
    console.log("nimporte");

    $('#building_type li').click(function () {
        //alert($(this).attr('data-filter'));                // this will alert data-input value.
        
        if ($(this).attr('data-filter') == "commercial") {
            typeClient = "commercial" ;
            console.log("dans commercial " + $("#n-of-elevators").val());
        } else if ($(this).attr('data-filter') == "residential") {
            typeClient = "residential" ;
            console.log("dans residential");
        } else if ($(this).attr('data-filter') == "corporate") {
            typeClient = "corporate" ;
        } else if ($(this).attr('data-filter') == "hybrid") {
            typeClient = "hybrid" ;

        }

        initialize();

        $('#number-input').show();

    });

    /*getCommercialInputFields().on('change', funtion () {
      $('#elevator-amount').number(getCommercialEstimate());
    })*/

});


jQuery("#n-of-floors, #n-of-apartments, #n-of-basements, #n-of-companies, #n-of-parking-spots, #n-of-elevators, #max-occupancy, #n-of-corporations, #b-hours").keyup(function () {
    _mcalc();
    console.log("calcule");
});

// Recalculate on change
jQuery("#n-of-floors, #n-of-apartments, #n-of-basements, #n-of-companies, #n-of-parking-spots, #n-of-elevators, #max-occupancy, #n-of-corporations, #b-hours")
.change(function () {
    _mcalc();
});



// Morgage Calculator
function _mcalc() {
    var _mcalc_floor = jQuery("#n-of-floors").val(),		// price
        _mcalc_apartments = jQuery("#n-of-apartments").val(),			// term
        _mcalc_basements = jQuery("#n-of-basements").val(),			// % down payment
        _mcalc_companies = jQuery("#n-of-companies").val(),			// rate
        _mcalc_parking = jQuery("#n-of-parking-spots").val(),			// monthyl charges
        _mcalc_elevator = jQuery("#n-of-elevators").val(),
        _mcalc_occupancy = jQuery("#max-occupancy").val(),
        _mcalc_hours = jQuery("#b-hours").val(),
        _mcalc_corporations = jQuery("#n-of-corporations").val();

    if (typeClient == "commercial") {    
        var _elevatorAmount = _mcalc_elevator ;
        var _elevatorTotalAmount = (_mcalc_elevator * button_prices[optionSelected]) ;
        var _unitPrice = button_prices[optionSelected] ;
        var _feesPrice =  _elevatorTotalAmount * calculFees() ; 
        var _finalPrice =  _elevatorTotalAmount + _feesPrice ;
       
        jQuery("#elevator-unit-price").html(_unitPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-amount").html(_elevatorAmount);
        jQuery("#installation-fees").html(_feesPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-total-price").html(_elevatorTotalAmount.formatMoney(2, '.', ','));
        jQuery("#final-price").html(_finalPrice.formatMoney(2, '.', ','));    
    } 
    if (typeClient == "residential") {

        var _elevatorAmount = button_prices[optionSelected] ;
        var _elevatorTotalAmount = (_mcalc_elevator * button_prices[optionSelected]) ;
        var _unitPrice = button_prices[optionSelected] ;
        var _feesPrice =  _elevatorTotalAmount * calculFees() ; 
        var _finalPrice =  _elevatorTotalAmount + _feesPrice ;
       
        jQuery("#elevator-unit-price").html(_unitPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-amount").html(_elevatorAmount.formatMoney(2, '.', ','));
        jQuery("#installation-fees").html(_feesPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-total-price").html(_elevatorTotalAmount.formatMoney(2, '.', ','));
        jQuery("#final-price").html(_finalPrice.formatMoney(2, '.', ','));    

    } 
    if (typeClient == "corporate") {
        var _totalOccupancy = (_mcalc_occupancy * (parseInt(_mcalc_floor) + parseInt(_mcalc_basements)));
        var _mcalc_elevator = _totalOccupancy / 1000 ;
        var _elevatorTotalAmount = (_mcalc_elevator * button_prices[optionSelected]) ;
        var _columsRequired = (parseInt(_mcalc_floor) + parseInt(_mcalc_basements)) / 20 ;
        var _elevatorPer = _mcalc_elevator / _columsRequired;
        var _nbTotalElevator = _mcalc_elevator * _columsRequired;
        var _elevatorAmount = _mcalc_elevator ;
        var _unitPrice = button_prices[optionSelected] ;
        var _feesPrice =  _elevatorTotalAmount * calculFees() ; 
        var _finalPrice =  parseInt(_elevatorTotalAmount) + parseInt(_feesPrice) ;
       
        console.log('------------------------------------');
        console.log('_mcalc_occupancy = ' + _mcalc_occupancy) ;
        console.log('_mcalc_floor = ' + _mcalc_floor) ;
        console.log('_mcalc_basements = ' + _mcalc_basements) ;
        console.log('total : ' + (_mcalc_occupancy * (_mcalc_floor + _mcalc_basements)));
        console.log('------------------------------------');

        console.log('_totalOccupancy = ' + _totalOccupancy) ;
        console.log('_columsRequired = ' + _columsRequired) ;
        console.log('_mcalc_elevator = ' + _mcalc_elevator) ;
        console.log('_elevatorPer =' + _elevatorPer) ;
        console.log('_nbTotalElevator =' + _nbTotalElevator) ;

        jQuery("#elevator-unit-price").html(_unitPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-amount").html(_mcalc_elevator);
        jQuery("#installation-fees").html(_feesPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-total-price").html(_elevatorTotalAmount.formatMoney(2, '.', ','));
        jQuery("#final-price").html(_finalPrice.formatMoney(2, '.', ','));    
        jQuery("").html(_totalOccupancy.formatMoney(2, '.', ','));
        jQuery("").html(_columsRequired.formatMoney(2, '.', ','));
        jQuery("").html(_elevatorPer.formatMoney(2, '.', ','));
        jQuery("").html(_nbTotalElevator.formatMoney(2, '.', ','));
    }
    if (typeClient == "hybrid") {

        var _elevatorAmount = button_prices[optionSelected] ;
        var _elevatorTotalAmount = (_mcalc_elevator * button_prices[optionSelected]) ;
        var _unitPrice = button_prices[optionSelected] ;
        var _feesPrice =  _elevatorTotalAmount * calculFees() ; 
        var _finalPrice =  _elevatorTotalAmount + _feesPrice ;
       
        jQuery("#elevator-unit-price").html(_unitPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-amount").html(_elevatorAmount.formatMoney(2, '.', ','));
        jQuery("#installation-fees").html(_feesPrice.formatMoney(2, '.', ','));
        jQuery("#elevator-total-price").html(_elevatorTotalAmount.formatMoney(2, '.', ','));
        jQuery("#final-price").html(_finalPrice.formatMoney(2, '.', ','));    

    }  
}



function calculFees() {
    var fees = 0.00 ;
    if (optionSelected == 0 ) {
        fees = 0.10 ;
    } else if (optionSelected == 1) {
        fees = 0.13 ;
    } else if (optionSelected == 2) {
        fees = 0.16 ;
    }
    return fees ;
}    

function onClickService(optionNumber) {
    optionSelected = optionNumber ;
    console.log(optionSelected);
}
function initialize() {
    var empty = 0 ;
    // Computed fields reinitialize
    jQuery("#elevator-unit-price").html(empty.formatMoney(2, '.', ','));
    jQuery("#elevator-amount").html(empty.formatMoney(2, '.', ','));
    jQuery("#installation-fees").html(empty.formatMoney(2, '.', ','));
    jQuery("#elevator-total-price").html(empty.formatMoney(2, '.', ','));
    jQuery("#final-price").html(empty.formatMoney(2, '.', ','));

    //document.getElementById("n-of-elevators").innerHTML = "0";
    //jQuery("#n-of-elevators").html(empty.formatMoney(2, '.', ','));
    $('#n-of-elevators').prop('value', '');
    $("#n-of-floors").prop('value', '');
    $("#n-of-apartments").prop('value', '');
    $("#n-of-basements").prop('value', '');
    $("#n-of-companies").prop('value', '');
    $("#n-of-parking-spots").prop('value', '');
    $("#max-occupancy").prop('value', '');
    $("#b-hours").prop('value', '');
    $("#n-of-corporations").prop('value', '');
}