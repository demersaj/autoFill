function copyAllFiles(inputFolder, templateResponseFolder) {
  folder = DriveApp.getFolderById(inputFolder);
  files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    console.log(file.getName());
    fileName = file.getName();
    copy = file.makeCopy(fileName, templateResponseFolder);
  }
}