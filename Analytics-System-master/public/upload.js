//jshint esversion: 6

var mfTableName, mfSchoolTitle, mfCourseName, mfCourseID, mfCredit, mfSection, mfSectionCapacity, mfEnrolled;
var mfClassID, mfClassCapacity, mfFaculty, mfStartTime, mfEndTime, mfClassDays;

function findVal(name, id) {
  var element = document.getElementById(name + id);
  if (element) {
    if (element.value == '' || element.value == undefined) {
      return null;
    } else {
      return element.value;
    }
  }
  return null;
}

async function getManualFormData(name) {
  mfTableName = findVal(name, "-tableName");
  mfSchoolTitle = findVal(name, "-schoolTitle"); //
  mfCourseName = findVal(name, "-courseName");
  mfCourseID = findVal(name, "-courseID");
  mfCredit = findVal(name, "-credit");
  mfSection = findVal(name, "-section");
  mfSectionCapacity = findVal(name, "-sectionCapacity");
  mfEnrolled = findVal(name, "-enrolled");
  mfClassID = findVal(name, "-classID");
  mfClassCapacity = findVal(name, "-classCapacity");
  mfFaculty = findVal(name, "-faculty");
  mfStartTime = findVal(name, "-startTime");
  mfEndTime = findVal(name, "-endTime");
  mfClassDays = findVal(name, "-classDay"); //

  resultTextSelect = document.getElementById("mf-resultText");

  if (mfTableName == null) {
    resultTextSelect.textContent = "Table Name is missing.";
    return;
  } else if (mfCourseName == null) {
    resultTextSelect.textContent = "Course Name is missing.";
    return;
  } else if (mfCourseID == null) {
    resultTextSelect.textContent = "Course ID is missing.";
    return;
  } else if (mfCredit == null) {
    resultTextSelect.textContent = "Number of Credits is missing.";
    return;
  } else if (mfSection == null) {
    resultTextSelect.textContent = "Section Number is missing.";
    return;
  } else if (mfSectionCapacity == null) {
    resultTextSelect.textContent = "Section Capacity is missing.";
    return;
  } else if (mfEnrolled == null) {
    resultTextSelect.textContent = "Number of Students Enrolled is missing.";
    return;
  } else if (mfClassID == null) {
    resultTextSelect.textContent = "Class ID is missing.";
    return;
  } else if (mfClassCapacity == null) {
    resultTextSelect.textContent = "Class Capacity is missing.";
    return;
  } else if (mfFaculty == null) {
    resultTextSelect.textContent = "Faculty Name & ID is missing.";
    return;
  } else if (mfStartTime == null) {
    resultTextSelect.textContent = "Class Start Time is missing.";
    return;
  } else if (mfEndTime == null) {
    resultTextSelect.textContent = "Class End Time is missing.";
    return;
  } else if (mfClassDays == null) {
    resultTextSelect.textContent = "Class Days timing is missing.";
    return;
  }

  console.log(mfTableName);
  console.log(mfSchoolTitle);
  console.log(mfCourseName);
  console.log(mfCourseID);
  console.log(mfCredit);
  console.log(mfSection);
  console.log(mfSectionCapacity);
  console.log(mfEnrolled);
  console.log(mfClassID);
  console.log(mfClassCapacity);
  console.log(mfFaculty);
  console.log(mfStartTime);
  console.log(mfEndTime);
  console.log(mfClassDays);

  var displayText = await renderFormData(mfTableName, mfSchoolTitle, mfCourseName, mfCourseID, mfCredit, mfSection, mfSectionCapacity, mfEnrolled, mfClassID, mfClassCapacity, mfFaculty, mfStartTime, mfEndTime, mfClassDays);
  console.log(displayText);

  resultTextSelect.textContent = displayText;
  resultTextSelect.style.color = "green";
}

function showResult() {
  var result = document.getElementById("uploadedText")
  result.textContent = "You file has been uploaded successfully!"
}
