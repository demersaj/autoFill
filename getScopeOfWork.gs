function getScopeOfWork(e) {

  // declare each variable for the scope
  const equipment = [
    {
      name: 'Entry Smart Station',
      qty: e.values[3],
    },
    {
      name: 'Exit Smart Station',
      qty: e.values[4],
    },
    {
      name: 'Entry Station for tenants only',
      qty: e.values[5],
    },
    {
      name: 'Exit Station for tenants only',
      qty: e.values[6],
    },
    {
      name: 'Pay on Foot Smart Station *Credit Card Only',
      qty: e.values[7],
    },
    {
      name: 'Pay on Foot Smart Station *Credit Card w/ cash',
      qty: e.values[8],
    },
    {
      name: 'Barrier Gates',
      qty: e.values[9],
    },
    {
      name: 'Lane Traffic Control Signs',
      qty: e.values[10],
    },
    {
      name: 'Lot Full Sign',
      qty: e.values[11],
    },
    {
      name: 'Occupancy Sign',
      qty: e.values[12],
    },
    {
      name: 'License Plate Recognition Per Lane',
      qty: e.values[13],
    },
    {
      name: 'Commend Intercom',
      qty: e.values[14],
    },
  ];

  const equipmentList = [];

  for (let i = 0; i < equipment.length; i++) {
    if (equipment[i].qty > 0) {
      equipmentList.push(equipment[i]);
    }
  }

  return equipmentList;
}