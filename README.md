# Covid Vaccine availability alert
Node.js API to find vaccination slots.
This API sends a notification to the specified telegram channel whenever a vaccine is available in the specified district.

This is a timer-triggered Azure function. It needs Azure functions runtime to run locally (https://docs.microsoft.com/en-us/azure/azure-functions/functions-develop-local).

The data is sourced from CoWin public APIs (https://apisetu.gov.in/public/marketplace/api/cowin).

# Preview
<img height="500" src="https://github.com/harishankar0301/Covid_Vaccine_Alert/blob/master/vaccine_alerter.jpg"></img>
# Configurations
<ul>
<li>The district id in the API call can be changed to the desired district.</li>
<li>The function by default is invoked every minute automatically to check vaccine slots. It can be changed in the function.json to the required CRON expression.</li>

<li>Telegram chat ID and Telegram bot ID need to be given in the .env file. They can also be given as Application settings in Azure.</li>

