//jshint esversion: 6

//Global Variables for revenue-form
var rf_x1, rf_x2, rf_x3, rf_t1;
var rf_sem1, rf_sem2, rf_sem3, rf_year1, rf_year2, rf_year3;

//Global Variables for details Form
var df_x1, df_x2, df_x3, df_n1, df_d1, df_d2, df_d3;
var df_sem1, df_sem2, df_sem3, df_year1, df_year2, df_year3;

//Global variables for unused resources Form
var ur_x1, ur_x2, ur_x3;
var ur_sem1, ur_sem2, ur_sem3, ur_year1, ur_year2, ur_year3;

//Global variables for section analysis Form
var sf_x1, sf_x2, sf_x3;
var sf_sem1, sf_sem2, sf_sem3, sf_year1, sf_year2, sf_year3;
var [cv1,cv2,cv3,cv4,cv5,cv6,cv7,cv8,cv9,cv10,cv11,cv12,cv13,cv14,cv15,cv16,cv17,cv18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var [c2v1,c2v2,c2v3,c2v4,c2v5,c2v6,c2v7,c2v8,c2v9,c2v10,c2v11,c2v12,c2v13,c2v14,c2v15,c2v16,c2v17,c2v18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var [c3v1,c3v2,c3v3,c3v4,c3v5,c3v6,c3v7,c3v8,c3v9,c3v10,c3v11,c3v12,c3v13,c3v14,c3v15,c3v16,c3v17,c3v18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//Global variables for classroom requirement Form
var cr_x1, cr_x2, cr_x3;
var cr_sem1, cr_sem2, cr_sem3, cr_year1, cr_year2, cr_year3;
var [r1v1,r1v2,r1v3,r1v4,r1v5,r1v6,r1v7,r1v8,r1v9,r1v10,r1v11,r1v12,r1v13,r1v14,r1v15,r1v16,r1v17,r1v18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var [r2v1,r2v2,r2v3,r2v4,r2v5,r2v6,r2v7,r2v8,r2v9,r2v10,r2v11,r2v12,r2v13,r2v14,r2v15,r2v16,r2v17,r2v18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var [r3v1,r3v2,r3v3,r3v4,r3v5,r3v6,r3v7,r3v8,r3v9,r3v10,r3v11,r3v12,r3v13,r3v14,r3v15,r3v16,r3v17,r3v18] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//Counter Variables
var i = 0;
var j = 0;

// Display Form Input Data on Button Click for Selection List
function findVal(name, id) {
  var element = document.getElementById(name + id);
  if (element) {
    return element.value;
  }
  return ' ';
}

//Get Class Size
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
  return null;
}

function assignValueRF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("rf-school")) {
    if (j == 0) {
      rf_x1 = semester + ' ' + year;
      rf_t1 = school;
      rf_year1 = year;
      rf_sem1 = semester;
      document.getElementById("rf-school").setAttribute("disabled", "");
      j++;
    } else if (j == 1) {
      rf_x2 = semester + ' ' + year;
      rf_year2 = year;
      rf_sem2 = semester;
      j++;
    } else if (j == 2) {
      rf_x3 = semester + ' ' + year;
      rf_year3 = year;
      rf_sem3 = semester;
      j = 0;
    }
  }
}

function assignValueDF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("df-semester")) {
    if (j == 0) {
      df_x1 = semester + ' ' + year;
      df_year1 = year;
      df_sem1 = semester;
      df_n1 = studentno;
      df_d1 = detail;
      document.getElementById("df-student").setAttribute("disabled", "");
      j++;
    } else if (j == 1) {
      df_x2 = semester + ' ' + year;
      df_year2 = year;
      df_sem2 = semester;
      df_d2 = detail;
      j++;
    } else if (j == 2) {
      df_x3 = semester + ' ' + year;
      df_year3 = year;
      df_sem3 = semester;
      df_d3 = detail;
      j = 0;
    }
  }
}

function assignValueUR() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("ur-semester")) {
    if (j == 0) {
      ur_x1 = semester + ' ' + year;
      ur_year1 = year;
      ur_sem1 = semester;
      j++;
    } else if (j == 1) {
      ur_x2 = semester + ' ' + year;
      ur_year2 = year;
      ur_sem2 = semester;
      j++;
    } else if (j == 2) {
      ur_x3 = semester + ' ' + year;
      ur_year3 = year;
      ur_sem3 = semester;
      j = 0;
    }
  }
}

function assignSF() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("sf-semester")) {
    if (j == 0) {
      sf_x1 = semester + ' ' + year;
      sf_year1 = year;
      sf_sem1 = semester;
      j++;
    } else if (j == 1) {
      sf_x2 = semester + ' ' + year;
      sf_year2 = year;
      sf_sem2 = semester;
      j++;
    } else if (j == 2) {
      sf_x3 = semester + ' ' + year;
      sf_year3 = year;
      sf_sem3 = semester;
      j = 0;
    }
  }
}

function assignValueSF(name, id, label) {
  var element = document.getElementById(name + id);
  var content = document.getElementById(name + label);
  if (element) {
    if (element.checked) {
      if (content) {
        if (j == 0) {
          if (content.textContent == '1-10') {
            cv1 = 1;
            cv2 = 10;
          } else if (content.textContent == '11-20') {
            cv3 = 11;
            cv4 = 20;
          } else if (content.textContent == '21-30') {
            cv5 = 21;
            cv6 = 30;
          } else if (content.textContent == '31-35') {
            cv7 = 31;
            cv8 = 35;
          } else if (content.textContent == '36-40') {
            cv9 = 36;
            cv10 = 40;
          } else if (content.textContent == '41-50') {
            cv11 = 41;
            cv12 = 50;
          } else if (content.textContent == '51-55') {
            cv13 = 51;
            cv14 = 55;
          } else if (content.textContent == '56-60') {
            cv15 = 56;
            cv16 = 60;
          } else if (content.textContent == '60+') {
            cv17 = 60;
            cv18 = 120;
          }
          //console.log(cv1);
        } else if (j == 1) {
          if (content.textContent == '1-10') {
            c2v1 = 1;
            c2v2 = 10;
          } else if (content.textContent == '11-20') {
            c2v3 = 11;
            c2v4 = 20;
          } else if (content.textContent == '21-30') {
            c2v5 = 21;
            c2v6 = 30;
          } else if (content.textContent == '31-35') {
            c2v7 = 31;
            c2v8 = 35;
          } else if (content.textContent == '36-40') {
            c2v9 = 36;
            c2v10 = 40;
          } else if (content.textContent == '41-50') {
            c2v11 = 41;
            c2v12 = 50;
          } else if (content.textContent == '51-55') {
            c2v13 = 51;
            c2v14 = 55;
          } else if (content.textContent == '56-60') {
            c2v15 = 56;
            c2v16 = 60;
          } else if (content.textContent == '60+') {
            c2v17 = 60;
            c2v18 = 120;
          }
          //console.log(cv2);
        } else if (j == 2) {
          if (content.textContent == '1-10') {
            c3v1 = 1;
            c3v2 = 10;
          } else if (content.textContent == '11-20') {
            c3v3 = 11;
            c3v4 = 20;
          } else if (content.textContent == '21-30') {
            c3v5 = 21;
            c3v6 = 30;
          } else if (content.textContent == '31-35') {
            c3v7 = 31;
            c3v8 = 35;
          } else if (content.textContent == '36-40') {
            c3v9 = 36;
            c3v10 = 40;
          } else if (content.textContent == '41-50') {
            c3v11 = 41;
            c3v12 = 50;
          } else if (content.textContent == '51-55') {
            c3v13 = 51;
            c3v14 = 55;
          } else if (content.textContent == '56-60') {
            c3v15 = 56;
            c3v16 = 60;
          } else if (content.textContent == '60+') {
            c3v17 = 60;
            c3v18 = 120;
          }
          //console.log(cv3);
        }
      }
    }
  }
}

function assignCR() {
  //Get values for chart x-axis label for revenue-form
  if (document.getElementById("cr-semester")) {
    if (j == 0) {
      cr_x1 = semester + ' ' + year;
      cr_year1 = year;
      cr_sem1 = semester;
      j++;
    } else if (j == 1) {
      cr_x2 = semester + ' ' + year;
      cr_year2 = year;
      cr_sem2 = semester;
      j++;
    } else if (j == 2) {
      cr_x3 = semester + ' ' + year;
      cr_year3 = year;
      cr_sem3 = semester;
      j = 0;
    }
  }
}

function assignValueCR(name, id, label) {
  var element = document.getElementById(name + id);
  var content = document.getElementById(name + label);
  if (element) {
    if (element.checked) {
      if (content) {
        if (j == 0) {
          if (content.textContent == '1-20') {
            r1v1 = 1;
            r1v2 = 20;
          } else if (content.textContent == '21-30') {
            r1v3 = 21;
            r1v4 = 30;
          } else if (content.textContent == '31-35') {
            r1v5 = 31;
            r1v6 = 35;
          } else if (content.textContent == '36-40') {
            r1v7 = 36;
            r1v8 = 40;
          } else if (content.textContent == '41-50') {
            r1v9 = 41;
            r1v10 = 50;
          } else if (content.textContent == '51-54') {
            r1v11 = 51;
            r1v12 = 54;
          } else if (content.textContent == '55-64') {
            r1v13 = 55;
            r1v14 = 64;
          } else if (content.textContent == '65-124') {
            r1v15 = 65;
            r1v16 = 124;
          } else if (content.textContent == '125-168') {
            r1v17 = 125;
            r1v18 = 168;
          }
        } else if (j == 1) {
          if (content.textContent == '1-20') {
            r2v1 = 1;
            r2v2 = 20;
          } else if (content.textContent == '21-30') {
            r2v3 = 21;
            r2v4 = 30;
          } else if (content.textContent == '31-35') {
            r2v5 = 31;
            r2v6 = 35;
          } else if (content.textContent == '36-40') {
            r2v7 = 36;
            r2v8 = 40;
          } else if (content.textContent == '41-50') {
            r2v9 = 41;
            r2v10 = 50;
          } else if (content.textContent == '51-54') {
            r2v11 = 51;
            r2v12 = 54;
          } else if (content.textContent == '55-64') {
            r2v13 = 55;
            r2v14 = 64;
          } else if (content.textContent == '65-124') {
            r2v15 = 65;
            r2v16 = 124;
          } else if (content.textContent == '125-168') {
            r2v17 = 125;
            r2v18 = 168;
          }
        } else if (j == 2) {
          if (content.textContent == '1-20') {
            r3v1 = 1;
            r3v2 = 20;
          } else if (content.textContent == '21-30') {
            r3v3 = 21;
            r3v4 = 30;
          } else if (content.textContent == '31-35') {
            r3v5 = 31;
            r3v6 = 35;
          } else if (content.textContent == '36-40') {
            r3v7 = 36;
            r3v8 = 40;
          } else if (content.textContent == '41-50') {
            r3v9 = 41;
            r3v10 = 50;
          } else if (content.textContent == '51-54') {
            r3v11 = 51;
            r3v12 = 54;
          } else if (content.textContent == '55-64') {
            r3v13 = 55;
            r3v14 = 64;
          } else if (content.textContent == '65-124') {
            r3v15 = 65;
            r3v16 = 124;
          } else if (content.textContent == '125-168') {
            r3v17 = 125;
            r3v18 = 168;
          }
        }
      }
    }
  }
}

//Fill up selection list and get data for chart
function selectionList(name) {
  school = findVal(name, "-school");
  semester = findVal(name, "-semester");
  year = findVal(name, "-year");
  studentno = findVal(name, "-student");

  detail = document.getElementById(name + "-detail");
  if (detail) {
    detail = detail.checked;
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

  //Output Result based on conditions
  if (studentno != ' ') {
    result = semester + ' ' + year + ' Students < ' + studentno + ' ' + detail;
    console.log('Condition 1 executed.');
  } else if (c1 != null) {
    result = semester + ' ' + year + ' ' + c1 + ' ' + c2 + ' ' + c3 + ' ' + c4 + ' ' +
      c5 + ' ' + c6 + ' ' + c7 + ' ' + c8 + ' ' + c9;
    console.log('Condition 2 executed.');
  } else {
    result = school + ' ' + semester + ' ' + year;
    console.log('Condition 3 executed.');
  }

  //Assign values to global variables
  assignValueRF();
  assignValueDF();
  assignValueUR();
  assignSF();
  assignValueSF(name, "-c1", "-l1");
  assignValueSF(name, "-c2", "-l2");
  assignValueSF(name, "-c3", "-l3");
  assignValueSF(name, "-c4", "-l4");
  assignValueSF(name, "-c5", "-l5");
  assignValueSF(name, "-c6", "-l6");
  assignValueSF(name, "-c7", "-l7");
  assignValueSF(name, "-c8", "-l8");
  assignValueSF(name, "-c9", "-l9");
  assignCR();
  assignValueCR(name, "-c1", "-l1");
  assignValueCR(name, "-c2", "-l2");
  assignValueCR(name, "-c3", "-l3");
  assignValueCR(name, "-c4", "-l4");
  assignValueCR(name, "-c5", "-l5");
  assignValueCR(name, "-c6", "-l6");
  assignValueCR(name, "-c7", "-l7");
  assignValueCR(name, "-c8", "-l8");
  assignValueCR(name, "-c9", "-l9");

  //Get text for slection list items
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

//Reinitialize variables and clear selection list
function clearList(name) {
  document.getElementById(name + "_li1").textContent = "";
  document.getElementById(name + "_li2").textContent = "";
  document.getElementById(name + "_li3").textContent = "";
  i = 0;
  j = 0;
  if (document.getElementById("rf-school")) {
    document.getElementById("rf-school").removeAttribute("disabled");
    revenueChart.destroy();
  }
  if (document.getElementById("df-student")) {
    document.getElementById("df-student").removeAttribute("disabled");
    detailsChart.destroy();
    detailsChart2.destroy();
    detailsChart3.destroy();
  }
  rf_x1 = "";
  rf_x2 = "";
  rf_x3 = "";
  df_x1 = "";
  df_x2 = "";
  df_x3 = "";
  df_xValues = [];
  df_yValues1 = [];
  df_yValues2 = [];
  df_yValues3 = [];
  df_yValues4 = [];
  df_yValues5 = [];
  df_yValues6 = [];
  var chartTitle = document.getElementById("Chart-Title");
  var dfchartTitle = document.getElementById("DF-Chart-Title");
  var dfchartTitle2 = document.getElementById("DF-Chart-Title2");
  var dfchartTitle3 = document.getElementById("DF-Chart-Title3");
  var urchartTitle = document.getElementById("UR-Chart-Title");
  var urchartTitle2 = document.getElementById("UR-Chart-Title2");
  var urchartTitle3 = document.getElementById("UR-Chart-Title3");
  var crTitle1 = document.getElementById("cr-Chart-Title-1");
  var crTitle2 = document.getElementById("cr-Chart-Title-2");
  var crTitle3 = document.getElementById("cr-Chart-Title-3");
  if (chartTitle) {
    chartTitle.innerHTML = "";
  }
  if (dfchartTitle) {
    dfchartTitle.innerHTML = "";
    dfchartTitle2.innerHTML = "";
    dfchartTitle3.innerHTML = "";
  }
  if (urchartTitle) {
    urchartTitle.innerHTML = "";
    urchartTitle2.innerHTML = "";
    urchartTitle3.innerHTML = "";
  }
  if (crTitle1){
    crTitle1.innerHTML = "";
    crTitle2.innerHTML = "";
    crTitle3.innerHTML = "";
  }
  var table = document.querySelectorAll("#tableDiv");
  if (table) {
    table[0].innerHTML = "";
  }
  var table = document.querySelectorAll("#tableDiv");
  if (table) {
    table[1].innerHTML = "";
  }
  var table = document.querySelectorAll("#tableDiv");
  if (table) {
    table[2].innerHTML = "";
  }
}
