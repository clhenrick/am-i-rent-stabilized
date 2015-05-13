var app = app || {};

app.address = (function(w,d) {
  /*
  ** User address related functions
   */

   var el = app.el;
   var f = app.fns;
   var state = app.s;
   var parsed_address;

   function address() {
     return {
       // form validation for when user enters address and selects boro
      checkAddressInput : function(address, borough) {        
        if (address !== "" && borough !== undefined) {  
          app.events.publish('state-change', {
            formFilled : true
          });
          
          app.f.goToNextSlide();
          parsed_address = app.a.parseAddressInput(address);      
          
          // delay API calls so user sees loading gif
          setTimeout(function(){    
            // console.log('form filled, parsed address: ', parsed_address);
            app.map.fns.geoclient(parsed_address[0], parsed_address[1], borough); 
          }, 1000);              

        } else if (address === "" && borough === undefined) {      
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true && app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true){
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (borough === undefined) {
          // alert('Please select your borough.');
          if (app.f.hasClass(app.el.valErrorBoro, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorBoro, 'vis-hidden');
          }

        } else if (address === '') {
          // alert('Please enter your house number and street.');
          if (app.f.hasClass(app.el.valErrorAddress, 'vis-hidden')===true) {
            app.f.toggleClass(app.el.valErrorAddress, 'vis-hidden');
          }

        } else {
          app.f.goToPrevSlide();
        } 
      },

      // separate the building number and street name from the address input
      parseAddressInput : function(input) {
        var input_split = input.split(' '),
              len = input_split.length,
              num = input_split[0],
              input_last = input_split.splice(1, len),
              street = input_last.join(' ');
        return [num, street];
      },

      // create the mailto content for requesting rent history from dhcr
      createMailTo : function() {
        var email = "rentinfo@nyshcr.org",
              subject = "request for rent history",
              body = "Hello, \n\n" +
                          "I, YOUR NAME HERE, am currently renting " + 
                          "YOUR ADDRESS, APARTMENT NUMBER, BOROUGH, ZIPCODE" +
                          " and would like to request the rent history for this apartment." +
                          " Any information you can provide me would be greatly appreciated. \n\n" +
                          "thank you,\n\n" +
                          "- YOUR NAME HERE",
              msg = 'mailto:' + encodeURIComponent(email) +
                         '?subject=' + encodeURIComponent(subject) +
                         '&body=' + encodeURIComponent(body); 
        app.el.mailTo.setAttribute('href', msg);
      }   
    };
   }

   return {
    address : address
   };

})(window, document);