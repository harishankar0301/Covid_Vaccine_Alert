module.exports = async function (context, myTimer) {

    require('dotenv').config()
    let date = new Date();
    dateformatted = String(date.getDate()).padStart(2, '0') + "-0" + (date.getMonth() + 1) + "-" + date.getUTCFullYear();
    var request = require('request');
    var options = {
      'method': 'GET',
     'url': `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=571&date=${dateformatted}`,
        //'url': 'http://localhost:3000',

      'headers': {
      }
    };
    request(options, function (error, response) {
        if (error) {
            throw new Error(error);
        }
        else {
           
            console.log(date.toLocaleString());
        
            let resjson;
            try {
                 resjson = JSON.parse(response.body);
            }
            catch(ex) {
                console.log(ex); 
            }
            let message = "Vaccines for 18-44:\n";
            let flag = 0;
            resjson['centers'].forEach(center => {
                let tmpsession = "";
                center['sessions'].forEach(session => {
                
                    if ((session["available_capacity_dose1"] > 5 || session["available_capacity_dose2"] > 5) && session["min_age_limit"] == 18) {
                    flag = 1;
                    tmpsession+=`${session["date"]}   `
                    tmpsession += `${session["vaccine"]}`
                        tmpsession += `  Slots: (Dose1: ${session["available_capacity_dose1"]}, Dose2: ${session["available_capacity_dose2"]}`
                    tmpsession += '\n';

                }
                })
                if (tmpsession.length > 2) {
                    message += "\n";
                    message += center["name"] + " " + center["block_name"] + "  " + "("+ center["fee_type"] + ")";
                    message += '\n';
                    message += tmpsession;
                 
                }
            });
            

            if (flag) {
                message += "\n";
                message += "Please use CoWin site to book: https://selfregistration.cowin.gov.in";
                console.log(message);
                request({
                    'method': 'GET',
                    'url': `https://api.telegram.org/bot${process.env.BOT}/sendMessage?chat_id=${process.env.CHAT}&text=${message}
         `,
                    'headers': {
                    }
                }, function (error, response) {
            
                });
                console.log("*****************************************************************************")
        console.log('\n')
            
            }
            else {
                console.log("*****************************************************************************")
        console.log('\n')

            }
          
            
        }
    });
    
    
};