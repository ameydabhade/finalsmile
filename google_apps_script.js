function doGet(e) {
  try {
    const params = e.parameter;
    const callback = params.callback;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Don't Touch");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Name',
        'Email',
        'Phone',
        'Response',
        'Platform',
        'Date',
        'Time',
        'Timestamp'
      ]);
    }

    const name = params.name || '';
    const email = params.email || '';
    const phone = params.phone || '';
    const problem = params.problem || '';
    const platform = '';
    const date = params.date || '';
    const time = params.time || '';
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(timestamp, "IST", "MM/dd/yyyy HH:mm:ss");

    sheet.appendRow([
      name,
      email,
      phone,
      problem,
      platform,
      date,
      time,
      formattedTimestamp
    ]);

    sheet.autoResizeColumns(1, 8);

    const response = {
      result: 'success',
      message: 'Form data saved successfully'
    };

    return ContentService.createTextOutput(
      callback ? 
      callback + "(" + JSON.stringify(response) + ")" : 
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);

  } catch (error) {
    const errorResponse = {
      result: 'error',
      message: error.toString()
    };

    return ContentService.createTextOutput(
      e.parameter.callback ? 
      e.parameter.callback + "(" + JSON.stringify(errorResponse) + ")" : 
      JSON.stringify(errorResponse)
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}