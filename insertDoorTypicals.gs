function insertDoorTypicals(doorArray, templateResponseFolder) {
  const array = doorArray;

  for (let i = 0; i < array.length; i++) {
    if (array[i] == 'Full Kiosk w/ Door Pre-Kiosk') {
      copyAllFiles('1y8Fnc5pwo1ZfQ93mhcZKE39UwKY6n-eY', templateResponseFolder);
    }
    if (array[i] == 'Full Kiosk w/ Door Post-Barrier') {
      copyAllFiles('1v1E9tF8tbjFf9dKacp2Q9w-_7DKWXQb3', templateResponseFolder);
    }
  }
}