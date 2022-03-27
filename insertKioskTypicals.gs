function insertKioskTypicals(kioskArray, templateResponseFolder) {
  const array = kioskArray;

  for (let i = 0; i < array.length; i++) {
    if (array[i] == 'Full Kiosk - Standard') {
      copyAllFiles('1Lw-Q2qcRRbjgl45peu8oqkgheuJ6MlnU', templateResponseFolder);
    }
    if (array[i] == 'Full Kiosk - 1 in 1 Out') {
      copyAllFiles('1xuW--DSc9pgPbN3bktoSD4NvvuTXCPeG', templateResponseFolder);
    }
    if (array[i] == 'Full Kiosk - Reversible') {
      copyAllFiles('1OLoQEbZDeeQkCwhGJ6IIVdz1L9T-wQxE', templateResponseFolder);
    }
    if (array[i] == 'Mini Kiosk - Standard') {
      copyAllFiles('1YRG_yBZERUWVXghaz0P0H7UeB6XiY551', templateResponseFolder);
    }
    if (array[i] == 'Mini Kiosk - 1 in 1 Out') {
      copyAllFiles('1nywI4RmwQ4d-nywoCQ3wxAGMyGgEEQcR', templateResponseFolder);
    }
    if (array[i] == 'Mini Kiosk Reversible') {
      copyAllFiles('1NbkXGNxUc5sPIjOwNiVFifKewOtJb18r', templateResponseFolder);
    }
  }
  return;
}
