function getPDFFilesFromCurFolder(folder) {

  var files = folder.getFiles();

  var allFileUrls = [];
  var commaSeperatedURLs = '';

  while (files.hasNext()) {
    var file = files.next();

    var fileName = file.getName();
    if(fileName.endsWith(".pdf")){
      // make file public accessible with URL so that it can be accessible with external API
      var resource = {role: "reader", type: "anyone"};
      Drive.Permissions.insert(resource, file.getId());

      // add Url
      allFileUrls.push(file.getDownloadUrl());
    }


    commaSeperatedURLs = (allFileUrls.join(","));
  }   
  return commaSeperatedURLs;
}


function mergePDFDocuments(folder) {

  // get PDF.co API key
  let pdfCoAPIKey = 'andrew.demers91@gmail.com_e08dd4ce92d9d6179e669d6a102dd3ba2d977e94122a8e2edc0e7015df6eb6386d869dea';

  // input/output
  let pdfUrl = getPDFFilesFromCurFolder(folder);
  let resultUrl =  '';

  // prepare payload
  var data = {
    "async": false,
    "encrypt": false,
    "inline": true,
    "name": "result",
    "url": pdfUrl
  };

  // request options
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'headers': {
      "x-api-key": pdfCoAPIKey
    },
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  
  // get response
  // https://developers.google.com/apps-script/reference/url-fetch
  var pdfCoResponse = UrlFetchApp.fetch('https://api.pdf.co/v1/pdf/merge', options);

  var pdfCoRespContent = pdfCoResponse.getContentText();
  var pdfCoRespJson = JSON.parse(pdfCoRespContent);

  // display result
  if(!pdfCoRespJson.error){
    uploadFile(folder, pdfCoRespJson.url);  // upload file to Google Drive
    resultUrl = pdfCoRespJson;    // update URL
  }
  else{
    resultUrl = pdfCoRespJson.message;    
  }

  console.log(resultUrl);
}


function uploadFile(folder, fileUrl) {
  var fileContent = UrlFetchApp.fetch(fileUrl).getBlob();
  folder.createFile(fileContent);
}