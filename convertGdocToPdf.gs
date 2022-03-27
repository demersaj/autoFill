function convertGdocToPdf(folder) {
  var files = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  
  while (files.hasNext()) {
    var file = files.next();
    var pdfBlob = file.getAs('application/pdf');
    folder.createFile(pdfBlob);
  }

  // delete original Google Doc file
  //file.setTrashed(true);
}