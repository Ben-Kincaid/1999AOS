jQuery(document).ready(function() {

    $('area.ajax').live('click', function() {
        var url = $(this).attr('href');
        $('.page-right-header2').html('<img src="images/ajax-loader.gif" alt="" id="loader" style="margin: 200px 300px;" />');
        $.ajax({
            url: 'ajax.php?floor='+ url,
            type: "GET",
            success: function(data) {
                $('.page-right-header2').html(data);
            }
        });
        return false;
    });
			
    jQuery("#map-container AREA").mouseover(function(){
        var regionMap = '.'+$(this).attr('id')+'-map';
        var regionList = '.'+$(this).attr('id')+'-list';
        jQuery(regionMap).css('display', 'inline');

        // Check if a click event has occured and only change the Region hover state accodringly
        if (! jQuery('#practice-container ul').hasClass('selected')) {
            jQuery(regionList).css('display', 'inline');
        }
    }).mouseout(function(){
        var regionMap = '.'+$(this).attr('id')+'-map';
        var regionList = '.'+$(this).attr('id')+'-list';

        // Check if a click event has occured and only change the Region hover state accodringly
        if (! jQuery(regionMap).hasClass('selected')) {
            jQuery(regionMap).css('display', 'none');
        }

        // Check if a click event has occured and only change the Region hover state accodringly
        if (! jQuery('#practice-container ul').hasClass('selected')) {
            jQuery(regionList).css('display', 'none');
        }
    });

    jQuery("#map-container AREA").click(function(){
        jQuery('#map-container img.region').removeClass('selected').css('display', 'none');
        jQuery('#practice-container ul').removeClass('selected').css('display', 'none');
        
        var regionMap = '.'+$(this).attr('id')+'-map';
        jQuery(regionMap).addClass('selected').css('display', 'inline');
    });

});