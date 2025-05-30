

function doGet(e) {
  try {
    
    const params = e.parameter;
    const callback = params.callback;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Name',
        'Phone',
        'Email',
        'Problem',
        'Date',
        'Time'
      ]);
    }
    
    
    const name = params.name || '';
    const phone = params.phone || '';
    const email = params.email || '';
    const problem = params.problem || '';
    const date = params.date || '';
    const time = params.time || '';
    
    
    const timestamp = new Date();
    const formattedDate = Utilities.formatDate(timestamp, "IST", "MM/dd/yyyy HH:mm:ss");
    
    
    sheet.appendRow([
      formattedDate,  // Timestamp
      name,           // Name
      phone,          // Phone
      email,          // Email
      problem,        // Dental Concern
      date,           // Preferred Date
      time            // Preferred Time Slot
    ]);
    
    
    sheet.autoResizeColumns(1, 7);
    
    
    const response = {
      result: 'success',
      message: 'Form data saved successfully'
    };
    
    
    return ContentService.createTextOutput(
      params.callback ? 
      params.callback + "(" + JSON.stringify(response) + ")" : 
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
    
  } catch (error) {
    
    const errorResponse = {
      result: 'error',
      message: error.toString()
    };
    
    
    return ContentService.createTextOutput(
      params.callback ? 
      params.callback + "(" + JSON.stringify(errorResponse) + ")" : 
      JSON.stringify(errorResponse)
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
} 