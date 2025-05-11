// This is the code that should go in your Google Apps Script

function doGet(e) {
  try {
    // Get the parameters from the request
    const params = e.parameter;
    
    // Get the callback function name
    const callback = params.callback;
    
    // Open the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Extract data from parameters (excluding the callback)
    const name = params.name || '';
    const phone = params.phone || '';
    const email = params.email || '';
    const date = params.date || '';
    const time = params.time || '';
    const service = params.service || '';
    
    // Append data to the sheet
    sheet.appendRow([
      name,
      phone,
      email,
      date,
      time,
      service,
      new Date() // timestamp
    ]);
    
    // Create response
    const response = {
      result: 'success',
      message: 'Form data saved successfully'
    };
    
    // Return JSONP response
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(response) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch (error) {
    // Handle errors
    const errorResponse = {
      result: 'error',
      message: error.toString()
    };
    
    // Return error as JSONP
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(errorResponse) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
} 