function autoFillGoogleDoc(e) {
    // grab remaining variables
    const timestamp = e.values[0];
    const email = e.values[1];
    const projectName = e.values[2];
    const typePOF = e.values[15];
    const securityCam = e.values[17];
    const longRange = e.values[18];
    const kiosk = e.values[19];
    const kioskTypicals = e.values[20];
    const aviTypicals = e.values[21];
    const doorTypicals = e.values[23];
    const aviType = e.values[24];
    const lprType = e.values[25];
    var lprTypicals = '';
    var lprWithAviTypicals = ';'

    // use either FlashVision or HTS LPR typicals
    if (lprType == 'FlashVision') {
      lprTypicals = e.values[27];
      lprWithAviTypicals = e.values[28];
    } else {  // HTS 
      lprTypicals = e.values[22];
      lprWithAviTypicals = e.values[29];
    }

    // initialize equipment list
    var smartStation, laneTraffic, avi, lpr, lotFull, occupancy, commend, gate;
    smartStation = laneTraffic = avi = lpr = lotFull = occupancy = commend = gate = false;
    var kioskArray, kioskTypicalsArray, aviTypicalsArray, lprTypicalsArray, doorTypicalsArray;
    kioskArray = kioskTypicalsArray = aviTypicalsArray = lprTypicalsArray = doorTypicalsArray = [];

    // template file and folder variable
    const templateFile = DriveApp.getFileById('1HsCQ6wz_7w_CkXLS6O4MTamTaO5sThk3Vmtm9vb4Utc');
    const parentFolder = DriveApp.getFolderById('1PabjMAVDVG95IhHZiKwP7AR-XB1OJX8x');
    const templateResponseFolder = parentFolder.createFolder(projectName + ' Project Folder');

    // create copy of project submittal
    var copy = templateFile.makeCopy(projectName + ' Submittal', templateResponseFolder);
    const doc = DocumentApp.openById(copy.getId());

    // text formatting
    var bold = {};
    bold[DocumentApp.Attribute.BOLD] = true;
    var style = {};
    style[DocumentApp.Attribute.BOLD] = false;

    var body = doc.getBody();

    let file = '';
    let fileName = '';

    // equipment notes
    const siteReqs = '\nSite Requirements: Every smart station and barrier gate will need access to 120V of power and access to a hard data line, a minimum of 10 up 10 down MBPs. CAT6 conduit is preferred.';
    const siteReqsNote1 = 'Sample conduit runs for parking islands (attached)';
    const siteReqsNote2 = 'Equipment dimensions (attached) *The entry and exit kiosk all have the same dimension';
    const pofStand = '\nPay On Foot Stations (Free Standing)';
    const pofWall = '\nPay On Foot Stations (Wall Mounted)';
    const pofWallNote1 = 'The back side of the standard smart stations has a service door that will need to swing open.  The front of the kiosk should be mounted 24” from the wall.';
    const pofStandNote1 = 'Mount on the wall at a height where the area just below the screen meets ADA access height requirements';
    const pofWallNote2 = 'Power and CAT6 ethernet data can be pulled to boxes located just underneath the wall-mount location';
    const laneTrafficMain = '\nLane Traffic Control Signs -';
    const laneTrafficNote1 = 'Single pathway from the exit barrier gate to the desired location of the sign. The sign will draw power from the gate. 18/4 stranded wire should be pulled to the location of the sign.';
    const aviMain = 'AVI Reader - ';
    const aviNote1 = 'A single conduit pathway is needed from AVI reader mounting location back to the FlashParking controller for that particular lane. The conduit pathway will need to be sized for a single CAT6 and 18/10 wires.';
    const aviNote2 = 'The AVI reader will be mounted 6” above posted clearance height directly center of the lane.';
    const lprMain = '\nLicense Plate Recognition - ';
    const lprNote1 = 'The LPR cameras will be mounted at a minimum distance of  26’ back from the FlashParking Smart Station and at a height no lower than 8’ in direct line of sight of each lane. This will give the cameras enough range to process the credentials of the driver prior to their arrival to the smart station.\n\nLPR Server – Store license plates images (3rd party, not cloud based)\n\nIn total we will need access to (2 U’s) shelves in the MDF room';
    const securityCamMain = '\nSecurity Cameras -';
    const securityCamNote1 = 'Requires a conduit pathway from camera location back to network room where NVR will be installed.  Each camera will require a dedicated CAT6';
    const longRangeMain = '\nLong Range Readers - ';
    const longRangeNote1 = 'Recommend being installed on the left side of the FlashParking Smart Station.  This will require 18” between the kiosk protective bollard and the kiosk to allow room for the long-range reader';
    const lotFullMain = '\nLot Full Sign -';
    const lotFullNote1 = 'Single pathway from the exit FlashParking Smart Station to the desired location of the sign. The sign will draw power from the Smart Station.  18/4 stranded wire should be pulled to the location of the sign. ';
    const occupancyMain = '\nOccupancy Signage -';
    const occupancyNote1 = 'Sign will require 120V of power. Sign will also require a pathway from sign to network room for a CAT6 wire. ';
    const commendMain = '\nCommend Intercom -';
    const commendNote1 = 'Each Commend board will need a dedicated CAT6 pulled back to the network room';
    const mdfMain = '\nMDF "Communication Room" -';
    const mdfNote1 = 'Merchant Gateway - Gateway communication from the equipment to the internet. This unit is included in the base bid as part of the “Network Kit”';
    const mdfNote2 = '4G LTE Modem – Provides temporary back up to the cloud if location loses primary internet. This unit is included in base bid as part of the “Network Kit”';
    const mdfNote3 = 'ProSAFE® 8-port Gigabit Smart Managed Switch - Router for parking equipment.  This unit is included in base bid as part of the “Network Kit” \n\nIn total we will need access to (3U) shelves in the MDF room';
    const comMain = '\nCommunication Requirements -';
    const comNote1 = 'The industry standard for data to travel through an ethernet cable is 300’. Typically, this would be the desired distance between the parking equipment and the communication room. If the distance to any of the equipment exceeds 300’ then we will need to follow one of two options:';
    const comNote2 = 'Option 1 - Network extender – device used to extend an Ethernet or network segment beyond its inherent distance limitation which is approximately 300’';
    const comNote3 = 'Option 2 – Create a pathway from the parking equipment to the switch to extend the data connection. The switch can be mounted on the ceiling or hidden in an electrical room.';
    const signature = '\nCreated By: \n\nJose Morales\nDirector of Sales, New Construction\njose.morales@flashparking.com\nMobile | (602) - 790 - 1614';

    var equipment = getScopeOfWork(e);
    console.log(equipment);

    // fill in template
    body.replaceText('{{projectName}}', projectName);

    // scope statement
    for (let i = 0; i < equipment.length; i++) {
        body.appendListItem(equipment[i].name + ' (' + equipment[i].qty + ')')
            .setGlyphType(DocumentApp.GlyphType.BULLET);
        if (equipment[i].name == 'Entry Smart Station' || equipment[i].name == 'Exit Smart Staion' || equipment[i].name == 'Entry Station for tenants only' || equipment[i].name == 'Exit Station for tenants only') {
            smartStation = true;
        } else if (equipment[i].name == 'Lane Traffic Control Signs') {
            laneTraffic = true;
        } else if (equipment[i].name == 'AVI Readers') {
            avi = true;
        } else if (equipment[i].name == 'License Plate Recognition Per Lane') {
            lpr = true;
        } else if (equipment[i].name == 'Lot Full Sign') {
            lotFull = true;
        } else if (equipment[i].name == 'Occupancy Sign') {
            occupancy = true;
        } else if (equipment[i].name == 'Commend Intercom') {
            commend = true;
        } else if (equipment[i].name == 'Barrier Gate') {
            gate = true;
        }
    }

    // split kiosk types string into array
    kioskArray = kiosk.split(', ');

    // split typicals into arrays
    kioskTypicalsArray = kioskTypicals.split(', ');
    console.log('Kiosk typicals: ' + kioskTypicalsArray);
    console.log(kioskTypicalsArray);
    aviTypicalsArray = aviTypicals.split(', ');
    lprTypicalsArray = lprTypicals.split(', ');
    doorTypicalsArray = doorTypicals.split(', ');
    lprWithAviTypicalsArray = lprWithAviTypicals.split(', ');

    // add in notes and supporting documentation

    // site requirements
    if (smartStation) {
        let paragraph = body.appendParagraph(siteReqs);
        paragraph.editAsText()
            .setBold(0, 17, true); // set first part to bold - there has to be a better way
        body.appendListItem(siteReqsNote1)
            .setGlyphType(DocumentApp.GlyphType.BULLET);
        body.appendListItem(siteReqsNote2)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        // add sell sheets to folder depending on kiosk type(s) checked

        // smart station
        copyAllFiles('14tcOEQFw8THP89v6iF9MzaVLt7d-jbDv', templateResponseFolder);

        /*
        file = DriveApp.getFileById('1H8YR85rUfgj5gHxSAdYe59GEe2MZyxXY');
        fileName = file.getName();
        copy = file.makeCopy(fileName, templateResponseFolder);
        console.log(copy);  */
    }

    // check for minis and copy sell sheets if needed
    for (let i = 0; i < kioskArray.length; i++) {
        if (kioskArray[i] == 'L1 Mini') {
            copyAllFiles('12W9gYljlDWaVvfkgxD4LayJjt6nktDLs', templateResponseFolder);
        }
        if (kioskArray[i] == 'L2 Mini') {
            copyAllFiles('1aek8RvRQ-X-mB2L25IpkP62YDsqo4AQQ', templateResponseFolder);
        }
        if (kioskArray[i] == 'L3 Mini') {
            copyAllFiles('1lQoTxPfJ4uktqYRQ72uH0lA6PNzqjKcZ', templateResponseFolder);
        }
    }

    // barrier gates
    if (gate) {
        console.log('Gate!');
        copyAllFiles('1QuURxuq0AcK2G2vBZzd9nTBXlbsBj15M', templateResponseFolder); // copy sell sheet
    }

    // pay on foot notes
    if (typePOF == 'Free Standing') {
        console.log('Pof: ' + typePOF);
        body.appendParagraph(pofStand)
            .setAttributes(bold);
        body.appendListItem(pofStandNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1e9YSDTjubv3HJ4njmGo1-k_cvn8IvAPM', templateResponseFolder); // copy sell sheet
    } else if (typePOF == 'Wall Mounted') {
        console.log('POF: ' + typePOF);
        body.appendParagraph(pofWall)
            .setAttributes(bold);
        body.appendListItem(pofWallNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);
        body.appendListItem(pofWallNote2)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1e9YSDTjubv3HJ4njmGo1-k_cvn8IvAPM', templateResponseFolder); // copy sell sheet
    }

    // lane traffic control notes
    if (laneTraffic) {
        console.log('lane traffic control found');
        body.appendParagraph(laneTrafficMain)
            .setAttributes(bold);
        body.appendListItem(laneTrafficNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1RMIFY2IHRL_zIDpHaj4v-4vF38xiZD4y', templateResponseFolder); // copy 3rd party cut sheet
    }

    // avi notes
    if (avi) {
        console.log('AVI found');
        body.appendParagraph(aviMain)
            .setAttributes(bold);
        body.appendListItem(aviNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);
        body.appendListItem(aviNote2)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        // copy specific 3rd party cut sheets
        if (aviType == 'Tagmaster') {
            copyAllFiles('1Rd2K1JnDYpHnCBLDIt_zfPAL9ORKWCnb', templateResponseFolder);
        } else if (aviType == 'Transcore') {
            copyAllFiles('1J58yvxceRpW9jEFwgw__g0tiKVvjHoG1', templateResponseFolder);
        }
    }

    // lpr notes
    if (lpr) {
        console.log('LPR found');
        body.appendParagraph(lprMain)
            .setAttributes(bold);
        body.appendListItem(lprNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1Eyd1N6WXQO9N_mt2c41_U3oXEvMGAVqX', templateResponseFolder); // copy sell sheet

        /*
		// copy 3rd party cut sheet
		file = DriveApp.getFileById("1-jFKaGYYAxOFtndz1Mx5XVblz2gfBWoF");
		fileName = file.getName();
		copy = file.makeCopy(fileName, templateResponseFolder);*/
    }

    // security camera notes
    if (securityCam == 'Yes') {
        console.log('Security Cam');
        body.appendParagraph(securityCamMain)
            .setAttributes(bold);
        body.appendListItem(securityCamNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1bBIDOCwXb4z24cdaITa-RO1V_sxFFjLA', templateResponseFolder); // copy 3rd party cut sheet
    }

    // long range readers
    if (longRange == 'Yes') {
        console.log('Long Range Reader');
        body.appendParagraph(longRangeMain)
            .setAttributes(bold);
        body.appendListItem(longRangeNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        // copy 3rd party cut sheet
        file = DriveApp.getFileById('1lpUPAebwpRuFMPhbpH55sw4f1M_xTy-p');
        fileName = file.getName();
        copy = file.makeCopy(fileName, templateResponseFolder);
        console.log(copy);
    }

    // lot full sign
    if (lotFull) {
        console.log('Lot Full Sign');
        body.appendParagraph(lotFullMain)
            .setAttributes(bold);
        body.appendListItem(lotFullNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1dyznq_euTIHWRSw58x2t3PSl9PLFhJ7e', templateResponseFolder); // copy 3rd party cut sheet
    }

    // occupancy signage
    if (occupancy) {
        console.log('Occupancy Sign');
        body.appendParagraph(occupancyMain)
            .setAttributes(bold);
        body.appendListItem(occupancyNote1)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('181N7grnNH6PnDdomXZfd6SpBBgxzAWIq', templateResponseFolder); // copy 3rd party cut sheet
    }

    // commend
    if (commend) {
        body.appendParagraph(commendMain)
            .setAttributes(bold);
        body.appendListItem(commendNote1)
            .setAttributes(style)
            .setGlyphType(DocumentApp.GlyphType.BULLET);

        copyAllFiles('1WzubkQtFXitY7fR9d4TC6HZvk1ChRu0V', templateResponseFolder); // copy 3rd party cut sheet
    }

    // insert typicals
    insertKioskTypicals(kioskTypicalsArray, templateResponseFolder); // kiosk typicals
    insertAviTypicals(aviTypicalsArray, templateResponseFolder); // AVI typicals
    insertLprTypicals(lprTypicalsArray, templateResponseFolder); // LPR typicals
    insertLprWithAviTypicals(lprWithAviTypicalsArray,templateResponseFolder); // LPR with AVI typicals
    insertDoorTypicals(doorTypicalsArray, templateResponseFolder);  // OH door typicals

    // communication addendums
    body.appendParagraph(mdfMain)
        .setAttributes(bold);
    body.appendListItem(mdfNote1)
        .setAttributes(style)
        .setGlyphType(DocumentApp.GlyphType.BULLET);
    body.appendListItem(mdfNote2)
        .setGlyphType(DocumentApp.GlyphType.BULLET);
    body.appendListItem(mdfNote3)
        .setGlyphType(DocumentApp.GlyphType.BULLET);

    body.appendParagraph(comMain)
        .setAttributes(bold);
    body.appendParagraph(comNote1)
        .setAttributes(style);
    body.appendParagraph(comNote2)
        .setIndentFirstLine(28);
    body.appendParagraph(comNote3)
        .setIndentFirstLine(28);

    // signature and date
    body.appendParagraph(signature);
    body.appendParagraph('\nDate: ' + timestamp);

    body.appendParagraph('\n\nPay Andrew more $$$$');

    doc.saveAndClose();

    // convert .gdoc to PDF
    convertGdocToPdf(templateResponseFolder);

    // merge PDFs
    // mergePDFDocuments(templateResponseFolder);
}