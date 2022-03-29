function copyAllFiles(inputFolder, templateResponseFolder) {
  folder = DriveApp.getFolderById(inputFolder);
  files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    fileName = file.getName();
    copy = file.makeCopy(fileName, templateResponseFolder);
  }
}