//jshint esversion: 6

// Display Form Input Data on Button Click for Selection List
var i = 0;

function findVal(name, id) {
  var element = document.getElementById(name + id);
  if (element) {
    return element.value;
  }
  return ' ';
}

function classSize(name, id, label) {
  var element = document.getElementById(name + id);
  var content = document.getElementById(name + label);
  if (element) {
    if (element.checked) {
      if (content) {
        return "(" + document.getElementById(name + label).textContent + ")";
      } else {
        return ' ';
      }
    } else {
      return ' ';
    }
  }
  return ' ';
}

function selectionList(name) {
  var school, semseter, year, result, studentno, detail;
  var c1, c2, c3, c4, c5, c6, c7, c8, c9;

  school = findVal(name, "-school");
  semester = findVal(name, "-semester");
  year = findVal(name, "-year");
  studentno = findVal(name, "-student");

  if (detail) {
    detail = document.getElementById(name + "-detail").checked;
  }


  c1 = classSize(name, "-c1", "-l1");
  c2 = classSize(name, "-c2", "-l2");
  c3 = classSize(name, "-c3", "-l3");
  c4 = classSize(name, "-c4", "-l4");
  c5 = classSize(name, "-c5", "-l5");
  c6 = classSize(name, "-c6", "-l6");
  c7 = classSize(name, "-c7", "-l7");
  c8 = classSize(name, "-c8", "-l8");
  c9 = classSize(name, "-c9", "-l9");

  if (detail == true) {
    detail = '(Detailed)'
  } else if (detail == false) {
    detail = ' ';
  }

  if (studentno != ' ') {
    result = semester + ' ' + year + ' Students < ' + studentno + ' ' + detail;
  } else if (classSize != ' ') {
    result = semester + ' ' + year + ' ' + c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' +
      c5 + ' ' + c6 + ' ' + c7 + ' ' + c8 + ' ' + c9;
  } else {
    result = school + ' ' + semester + ' ' + year;
  }

  if (i == 0) {
    document.getElementById(name + "_li1").textContent = result;
  } else if (i == 1) {
    document.getElementById(name + "_li2").textContent = result;
  } else {
    document.getElementById(name + "_li3").textContent = result;
  }
  if (i <= 2) {
    i++;
  }
}

function clearList(name) {
  document.getElementById(name + "_li1").textContent = "";
  document.getElementById(name + "_li2").textContent = "";
  document.getElementById(name + "_li3").textContent = "";
  i = 0;
}
