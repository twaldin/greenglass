function guess_word(grid){  
  document.getElementById('answer').style.backgroundColor='white'
  document.getElementById('spelling').innerHTML = ''
  let x = document.getElementById("guess").value.toLowerCase();
  var dictionary = new Typo("en_GB", false, false, { dictionaryPath: "dictionaries" });
  var is_spelled_correctly = dictionary.check(x);
  

  

  if (is_spelled_correctly){

    document.getElementById('spelling').innerHTML = ''
    window.setTimeout(spelt_right, 400);

    if(x.startsWith('s')){
      window.setTimeout(correct(x, grid), 400);
    }else{window.setTimeout(wrong, 400)}
    
  }else{spelt_wrong()}
}

function correct(guess, grid){
  let width = guess.length;
  document.getElementById('answer').style.backgroundColor='green';
  draw_line(width);
}
  
function draw_line(len){
  dots_h(len)
  // document.getElementById('answer').innerHTML = String(new_len);

  // document.getElementById('a1c').style.width = String(draw_width) + 'px'
}

function wrong(){
  document.getElementById('answer').style.backgroundColor='red';
}

function spelt_wrong(){
  document.getElementById('spelling').innerHTML = 'invalid word';
}


function spelt_right(){
  document.getElementById('spelling').innerHTML = 'valid word';
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function dots_h(len) { //finds a dot with space for a word horizontally
  let row = getRandomInt(9)
  console.log(row)
  // let row = 0
  // let column = getRandomInt(10-parseInt(len))
  let column = getRandomInt(10-parseInt(len))
  // console.log(row)
  // console.log(column)
  let dot = dot_grid[row][column]
  // console.log(dot)

  document.getElementById(dot).style.backgroundColor = 'red'

  for(let current_column = column; current_column < column+parseInt(len); current_column++){

    let saved_row = dot_grid[row]
    let dot = saved_row[current_column]
    console.log(dot)
    document.getElementById(String(dot)).style.backgroundColor = 'red'

  }
  
  

  // connect_dots_h(len, row, column)
}

// function connect_dots_h(len, row, column){
//   let new_len = parseInt(len);
//   let draw_width = (new_len - 1) * 34;
//   let stored_row = con_grid_h[row]
//   console.log(row)
//   console.log(column)
//   console.log(stored_row[column])
//   let start_con = stored_row[column]
//   document.getElementById(String(start_con)).style.left = String(15 + (35*column)) + 'px'
//   document.getElementById(String(start_con)).style.width = String(draw_width) + 'px'
  
  
  
// }

var con_grid_h = [
  ['a1c', 'a2c', 'a3c', 'a4c', 'a5c','a6c', 'a7c', 'a8c'], //r1
  ['b1c', 'b2c', 'b3c', 'b4c', 'b5c','b6c', 'b7c', 'b8c'], //r2
  ['c1c', 'c2c', 'c3c', 'c4c', 'c5c','c6c', 'c7c', 'c8c'], //r3
  ['d1c', 'd2c', 'd3c', 'd4c', 'd5c','d6c', 'd7c', 'd8c'], //r4
  ['e1c', 'e2c', 'e3c', 'e4c', 'e5c','e6c', 'e7c', 'e8c'], //r5
  ['f1c', 'f2c', 'f3c', 'f4c', 'f5c','f6c', 'f7c', 'f8c'], //r6
  ['g1c', 'g2c', 'g3c', 'g4c', 'g5c','g6c', 'g7c', 'g8c'], //r7
  ['h1c', 'h2c', 'h3c', 'h4c', 'h5c','h6c', 'h7c', 'h8c'], //r8
  ['i1c', 'i2c', 'i3c', 'i4c', 'i5c','i6c', 'i7c', 'i8c'] //r9
];


var dot_grid = [
  ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'], //r1
  ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'], //r2
  ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', '7c', 'c8', 'c9'], //r3
  ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'], //r4
  ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'], //r5
  ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'], //r6
  ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'], //r7
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'], //r8
  ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9'] //r9
];

var used_dots = [];
