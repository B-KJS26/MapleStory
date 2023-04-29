const soap = require('soap');

// Define the SOAP request payload
const soapRequest = {
    GetDataRequest: {
        inputParameter: '123'
    }
};

// Set the SOAP API endpoint URL
const url = 'https://api.maplestory.nexon.com/soap/';

// Create a SOAP client
soap.createClient(url, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }

    // Call the SOAP API operation
    client.GetData(soapRequest, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }

        // Extract the output parameter from the SOAP response
        const outputData = result.outputParameter;
        console.log(outputData);
    });
});
