/**
 * map
 */
var mapOpts = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 10,
    scaleControl: true,
    scrollwheel: false
}

var map = new google.maps.Map(document.getElementById("map"), mapOpts);

//  We set zoom and center later by fitBounds()

/**
 * makeMarker() ver 0.2
 * creates Marker and InfoWindow on a Map() named 'map'
 * creates sidebar row in a DIV 'sidebar'
 * saves marker to markerArray and markerBounds
 * @param options object for Marker, InfoWindow and SidebarItem
 * @author Esa 2009
 */
var infoWindow = new google.maps.InfoWindow();
var markerBounds = new google.maps.LatLngBounds();
var markerArray = [];

function makeMarker(options){
    var image = new google.maps.MarkerImage(options.icon,
        // This marker is 20 pixels wide by 32 pixels tall.
        new google.maps.Size(20, 32),
        // The origin for this image is 0,0.
        new google.maps.Point(0,0),
        // The anchor for this image is the base of the flagpole at 0,32.
        new google.maps.Point(0, 32));

    var pushPin = new google.maps.Marker({
        map:map
    });

    pushPin.setOptions(options);

    google.maps.event.addListener(pushPin, "click", function(){
        infoWindow.setOptions(options);
        infoWindow.open(map, pushPin);
        if(this.sidebarButton)this.sidebarButton.button.focus();
    });

    var idleIcon = pushPin.getIcon();

    if(options.sidebarItem){
        pushPin.sidebarButton = new SidebarItem(pushPin, options);
        pushPin.sidebarButton.addIn("sidebarMap_"+options.block);
    }
    markerBounds.extend(options.position);
    markerArray.push(pushPin);
    return pushPin;
}

google.maps.event.addListener(map, "click", function(){
    infoWindow.close();
});

/**
 * Creates an sidebar item 
 * @constructor
 * @author Esa 2009
 * @param marker
 * @param options object Supported properties: sidebarItem, sidebarItemClassName, sidebarItemWidth,
 */
function SidebarItem(marker, opts){
    var tag = opts.sidebarItemType || "a";
    var row = document.createElement(tag);
    row.innerHTML = opts.sidebarItem;
    row.className = opts.sidebarItemClassName || "sidebar_item";  
    row.style.display = "block";
    row.style.background = "url('"+opts.icon+"') no-repeat";
//    row.style.width = opts.sidebarItemWidth || "120px";
    row.onclick = function(){
        google.maps.event.trigger(marker, 'click');
    }
    row.onmouseover = function(){
        google.maps.event.trigger(marker, 'mouseover');
    }
    row.onmouseout = function(){
        google.maps.event.trigger(marker, 'mouseout');
    }
    this.button = row;
    this.sidebarBlock = opts.block;
}

// adds a sidebar item to a <div>
SidebarItem.prototype.addIn = function(block){
    if(block && block.nodeType == 1)this.div = block;
    else
        this.div = document.getElementById(block)
        || document.getElementById("sidebarMap_"+this.sidebarBlock)
        || document.getElementsByTagName("body")[0];
    this.div.appendChild(this.button);
}

// deletes a sidebar item
SidebarItem.prototype.remove = function(){
    if(!this.div) return false;
    this.div.removeChild(this.button);
    return true;
}