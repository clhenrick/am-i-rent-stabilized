var app = app || {};

app.events = (function(w, d, $) {

    var publish = function (name, o) {
       
       // console.log("EVENT [" + name + "]", o);
        $(document).trigger(name, [o]);
    
    };

    var subscribe = function (name, callback) {
        
        $(document).on(name, function(event, o){            
            callback(o);
        });

    };

    return {
        publish : publish,
        subscribe : subscribe
    }; 

})(window, document, jQuery);