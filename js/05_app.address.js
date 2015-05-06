var app = app || {};

app.a = (function(w,d) {
  /*
  ** User address related functions
   */

   var el = app.elem;
   var f = app.fns;
   var state = app.s;

   function address() {
     return {
       // form validation for when user enters address and selects boro
      checkAddressInput : function(address, borough) {        
        if (address !== "" && borough !== undefined) {  
          app.events.publish('state-change', {
            formFilled : true
          });
          
          f.goToNextSlide();
          var parsed_address = app.a.parseAddressInput(address);      
          // delay API calls so user sees loading gif
          setTimeout(function(){        
            app.map.geoclient(parsed_address[0], parsed_address[1], borough); 
          }, 1000);              

        } else if (address === "" && borough === undefined) {      
          if (f.hasClass(el.valErrorAddress, 'vis-hidden')===true && f.hasClass(el.valErrorBoro, 'vis-hidden')===true){
            f.toggleClass(el.valErrorAddress, 'vis-hidden');
            f.toggleClass(el.valErrorBoro, 'vis-hidden');
          }

        } else if (borough === undefined) {
          // alert('Please select your borough.');
          if (f.hasClass(el.valErrorBoro, 'vis-hidden')===true) {
            f.toggleClass(el.valErrorBoro, 'vis-hidden');
          }

        } else if (address === '') {
          // alert('Please enter your house number and street.');
          if (f.hasClass(el.valErrorAddress, 'vis-hidden')===true) {
            f.toggleClass(el.valErrorAddress, 'vis-hidden');
          }

        } else {
          f.goToPrevSlide();
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
        el.mailTo.setAttribute('href', msg);
      }   
    };
   }

   return {
    address : address
   };

})(window, document);