function word_check(x){
  var dictionary = new Typo("en_GB", false, false, { dictionaryPath: "dictionaries" });
  var is_spelled_correctly = dictionary.check(x);
  
  if (is_spelled_correctly){

    // document.getElementById('spelling').innerHTML = ''
    // window.setTimeout(spelt_right, 400);

    if(x.startsWith('r') || x.startsWith('R')){
      return true
    }else{
      // window.setTimeout(wrong(x), 400)
      return false
    }
    
  }else{
    return null
  }
}

let userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
let current_dot = ''
let row_guess=0
let column_guess = 0
let start_row = 0
let start_column = 0
let offset = 0
let typed_dots = []
let vertical = false
let trash = []
let dark = false


// window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='textarea'){e.preventDefault();return false;}}},true);

function onTestChange() {
  offset = 0
  var key = window.event.keyCode;
  
  // If the user has pressed enter
  let current_typed_word=document.getElementById('txt').value
  if((key > 64 && key < 91 || key === 13 || key === 8) === false){
    event.preventDefault()
  }
    if (key === 13) {
      
      // document.getElementById('txt').maxLength = String(9-(row_guess)+1)
      event.preventDefault()
      console.log(current_typed_word[0])
      if(word_check(current_typed_word)){
        typed_dots = []
        document.getElementById("txt").value = ''
        document.getElementById("txt").placeholder = 'Guess Again...'
        if(vertical){
          dots_v(current_typed_word.length, current_typed_word, true, start_row, start_column,offset)
          vertical = false
          column_guess = start_column+1
          row_guess = start_row
          if(dot_grid[row_guess].includes(dot_grid[row_guess][column_guess]) === false){
            row_guess+=1
            column_guess = find_in_row(row_guess)
          }
          if(used_dots.includes(dot_grid[row_guess][column_guess])){
            console.log('detects')
            column_guess = find_next(row_guess, column_guess)
          }
        }else{
          dots_h(current_typed_word.length, current_typed_word, true, start_row, start_column,offset)
          if(dot_grid[row_guess].includes(dot_grid[row_guess][column_guess]) === false){
            row_guess+=1
            column_guess = find_in_row(row_guess)
          }
          if(used_dots.includes(dot_grid[row_guess][column_guess])){
            column_guess = find_next(row_guess, column_guess)
          }
        }
        start_column = column_guess
        start_row = row_guess
        document.getElementById('points').innerHTML=String(used_dots.length)
        return false;
      }else if(word_check(current_typed_word) === false){
        typed_dots = []
        document.getElementById("txt").value = ''
        document.getElementById("txt").placeholder = 'Guess Again...'
        if(vertical){
          
          dots_v(current_typed_word.length, current_typed_word, false, start_row, start_column,offset)
          vertical = false
          column_guess = start_column+1
          row_guess = start_row 

          if(dot_grid[row_guess].includes(dot_grid[row_guess][column_guess]) === false){
            row_guess+=1
            column_guess = find_in_row(row_guess)
          }
          if(used_dots.includes(dot_grid[row_guess][column_guess])){
            column_guess = find_next(row_guess, column_guess)
          }
        }else{
          dots_h(current_typed_word.length, current_typed_word, false, start_row, start_column,offset)
          if(dot_grid[row_guess].includes(dot_grid[row_guess][column_guess]) === false){
            row_guess+=1
            column_guess = find_in_row(row_guess)
          }
          if(used_dots.includes(dot_grid[row_guess][column_guess])){
            column_guess = find_next(row_guess, column_guess)
          }
        }
        
        start_column = column_guess
        start_row = row_guess
        document.getElementById('points').innerHTML=String(used_dots.length)
        return false;
      }else if(word_check(current_typed_word)===null){
        document.getElementById("txt").value = ''
        document.getElementById("txt").placeholder = 'Invalid Word'
        for(let count=0; count<typed_dots.length;count++){
          if(count===0){
            column_guess = dot_grid[row_guess].indexOf(typed_dots[count])
          }
          console.log(typed_dots)
          document.getElementById(typed_dots[count]).innerHTML = ''
          document.getElementById(typed_dots[count]).style.backgroundColor = 'transparent'
        }
        typed_dots = []
      }
      
      
    
    }if(key === 8){
        console.log(typed_dots)
        if(vertical && typed_dots.length > 0){
          console.log('hello')
          row_guess--
        }else if(typed_dots.length > 0){
          console.log('hello')
          column_guess--
        }
        current_dot = typed_dots[typed_dots.indexOf(dot_grid[row_guess][column_guess])]
        typed_dots.pop(typed_dots.indexOf(dot_grid[row_guess][column_guess]))
        document.getElementById(current_dot).style.backgroundColor='transparent'
        document.getElementById(current_dot).innerHTML=''
      // }
      
      
      

    }else{
      if(current_typed_word.length===9){
        event.preventDefault()
        return
      }
        if(key in translator){
          let letter = translator[key]
          current_dot = dot_grid[row_guess][column_guess]
          if(dot_grid[row_guess].includes(current_dot) === false || used_dots.includes(current_dot)){
            row_guess = start_row+1
            column_guess = start_column
            vertical = true
          
            document.getElementById(dot_grid[row_guess][column_guess]).style.backgroundColor='transparent'
            document.getElementById(dot_grid[row_guess][column_guess]).innerHTML=''
            for(let tick = 1; tick<typed_dots.length;tick++){
              current_dot = dot_grid[row_guess][column_guess]
              document.getElementById(current_dot).innerHTML =  document.getElementById(typed_dots[tick]).innerHTML
              document.getElementById(current_dot).style.backgroundColor = document.getElementById(typed_dots[tick]).style.backgroundColor
              document.getElementById(current_dot).style.top= String(49.5*row_guess)+'px'  
              document.getElementById(current_dot).style.left= String(49.5*dot_grid[row_guess].indexOf(current_dot))+'px' 
              document.getElementById(typed_dots[tick]).style.backgroundColor='transparent'
              document.getElementById(typed_dots[tick]).innerHTML=''
              
              
              row_guess++
              

            }
          }
          
          current_dot = dot_grid[row_guess][column_guess]
          if(dark){
            document.getElementById(current_dot).style.backgroundColor='#6D6E71'
            document.getElementById(current_dot).style.color = 'black'
          }else{
            document.getElementById(current_dot).style.backgroundColor='#e0e1e2'
            document.getElementById(current_dot).style.color = 'black'
          }
          document.getElementById(current_dot).style.left= String(49.5*dot_grid[row_guess].indexOf(current_dot))+'px'
          document.getElementById(current_dot).style.top= String(49.5*row_guess)+'px'  
          document.getElementById(current_dot).innerHTML=letter.toUpperCase()
          typed_dots.push(current_dot)
          
            
          if(vertical){
            row_guess++
          }else{
            column_guess++
          }
          return true;
      }
    }
  
  
}

function find_in_row(row){
  for(let count=0; count < dot_grid[row].length; count++){
    if(used_dots.includes(dot_grid[row][count])===false){
      return count
    }
  }
}

function find_next(row, column){
  for(let count=column; count < dot_grid[row].length; count++){
    if(used_dots.includes(dot_grid[row][count])===false){
      return count
    }
  }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}





function dots_h(len, word, status, row, column, offset) { //finds a dot with space for a word horizontally
  // if(invalid_count > 2500){
  //   no_space(len);

  // }
  let color = '#54b948'

  // let row = getRandomInt(9)
  // console.log(row)
  // let row = 0
  // let column = getRandomInt(10-parseInt(len))
  // let column = 0
  // console.log(row)
  // console.log(column)
  let dot = dot_grid[row][column]
  // console.log(dot)
  
  
  
  var current_dots = [];
  for(let current_column = column; current_column < column+parseInt(len); current_column++){

    let saved_row = dot_grid[row];
    let dot = saved_row[current_column];
    if(used_dots.includes(dot)){
      console.log('invalid '+String(invalid_count))
      invalid_count++
      document.getElementById(dot)
      dots_h(len, word, status, row, column, offset)
      var current_dots = [];
      break
      
    }
    
    current_dots.push(dot);
    
    // console.log(current_dots);
    
  }

  

  // console.log(used_dots)
  for(let draw_column = 0; draw_column < current_dots.length; draw_column++ ){
    if(status){

      if(draw_column===0){
        document.getElementById(current_dots[draw_column]).style.backgroundColor = color
        document.getElementById(current_dots[draw_column]).innerHTML = word[draw_column].toUpperCase()
        document.getElementById(current_dots[draw_column]).style.color = 'white'
      
        used_dots.push(current_dots[draw_column])
        continue
      }


      document.getElementById(current_dots[draw_column]).style.backgroundColor = 'transparent'

      document.getElementById(current_dots[draw_column]).innerHTML = word[draw_column].toUpperCase()

      document.getElementById(current_dots[draw_column]).style.color = 'white'
      
      used_dots.push(current_dots[draw_column])
      
      if(draw_column===(current_dots.length -1)){
        connect_dots_h(len, row, column, color, offset)
        document.getElementById(current_dots[draw_column]).style.backgroundColor = color
      }

    }else{
      if(dark){
        color='#6D6E71'
        document.getElementById(current_dots[draw_column]).style.color = 'rgba(0, 0, 0, 0.45)'
      }else{
        color='#e0e1e2'
        document.getElementById(current_dots[draw_column]).style.color = 'rgba(0, 0, 0, 0.11)'

      }
      
      document.getElementById(current_dots[draw_column]).style.backgroundColor = color
      document.getElementById(current_dots[draw_column]).innerHTML = word[draw_column].toUpperCase()
      used_dots.push(current_dots[draw_column])
      
    } 
  }
}

function dots_v(len, word, status, row, column, offset) { //finds a dot with space for a word horizontally
  // if(invalid_count > 2500){
  //   no_space(len);

  // }
  let color = '#54b948'

  // let row = getRandomInt(9)
  // console.log(row)
  // let row = 0
  // let column = getRandomInt(10-parseInt(len))
  // let column = 0
  // console.log(row)
  // console.log(column)
  let dot = dot_grid[row][column]
  // console.log(dot)
  
  
  
  var current_dots = [];
  for(let current_row = row; current_row < row+parseInt(len); current_row++){

    
    let dot = dot_grid[current_row][column];
    if(used_dots.includes(dot)){
      console.log('invalid '+String(invalid_count))
      invalid_count++
      document.getElementById(dot)
      dots_v(len, word, status, row, column, offset)
      var current_dots = [];
      break
      
    }
    
    current_dots.push(dot);
    
    // console.log(current_dots);
    
  }

  

  // console.log(used_dots)
  for(let draw_row = 0; draw_row < current_dots.length; draw_row++ ){
    if(status){

      if(draw_row===0){
        document.getElementById(current_dots[draw_row]).style.backgroundColor = color
        document.getElementById(current_dots[draw_row]).innerHTML = word[draw_row].toUpperCase()
        document.getElementById(current_dots[draw_row]).style.color = 'white'
      
        used_dots.push(current_dots[draw_row])
       
        continue
      }


      document.getElementById(current_dots[draw_row]).style.backgroundColor = 'transparent'

      document.getElementById(current_dots[draw_row]).innerHTML = word[draw_row].toUpperCase()
      document.getElementById(current_dots[draw_row]).style.color = 'white'
      
      used_dots.push(current_dots[draw_row])
      
      if(draw_row===(current_dots.length -1)){
        connect_dots_v(len, row, column, color, offset)   
        document.getElementById(current_dots[draw_row]).style.backgroundColor = color
      }

    }else{
      if(dark){
        color='#6D6E71'
        document.getElementById(current_dots[draw_row]).style.color = 'rgba(0, 0, 0, 0.45)'
      }else{
        color='#eoe1e2'
        document.getElementById(current_dots[draw_row]).style.color = 'rgba(0, 0, 0, 0.11)'
      }
      
      document.getElementById(current_dots[draw_row]).style.backgroundColor = color
      document.getElementById(current_dots[draw_row]).innerHTML = word[draw_row].toUpperCase()
      used_dots.push(current_dots[draw_row])
      
    }
  }
}

function connect_dots_v(len, row, column, color, offset){
  if(len === 1){
    document.getElementById(dot_grid[row][column]).style.backgroundColor=color
    console.log(dot_grid[row][column])
  }
  console.log(offset)
  let new_len = parseInt(len);
  let draw_height = ((new_len) * 47.25);
  // console.log(row)
  // console.log(column)
  // console.log(stored_row[column])
  let start_con = con_grid_v[row][column]
  console.log(row, column)
  document.getElementById(String(start_con)).style.backgroundColor = color
  
  document.getElementById(String(start_con)).style.left = String(49.5*dot_grid[row].indexOf(dot_grid[row][column])) + 'px'

  document.getElementById(String(start_con)).style.top = String((49.5*row)) + 'px'

  
  
  draw_height = draw_height
  window.setTimeout(tallen(draw_height, start_con), 3000)
  
  
  
}

function connect_dots_h(len, row, column, color, offset){
  console.log(len)
  if(len === 1){
    document.getElementById(dot_grid[row][column]).style.backgroundColor=color
    console.log(dot_grid[row][column])
  }
  console.log(offset)
  let new_len = parseInt(len);
  let draw_width = ((new_len) * 47.25);
  let stored_row = con_grid_h[row]
  // console.log(row)
  // console.log(column)
  // console.log(stored_row[column])
  let start_con = stored_row[column]

  document.getElementById(String(start_con)).style.backgroundColor = color
  
  document.getElementById(String(start_con)).style.left = String((49.5*column)) + 'px'

  
  document.getElementById(String(start_con)).style.top = String((49.5*dot_grid.indexOf(dot_grid[row]))) + 'px'
  
  draw_width = draw_width
  window.setTimeout(lengthen(draw_width, start_con), 3000)
  
  
  
}

function open_box(){
  document.getElementById('txt').style.visibility = 'visible'
  
  document.getElementById('green_glass').style.visibility = 'hidden'
  console.log('works')

  if(userPrefersDark){
    dark = true
    console.log(dark)
  }
}

var id = null;
function lengthen(len, tag) {
  var elem = document.getElementById(String(tag));   
  var current_len = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    if (current_len >= len) {
      clearInterval(id);
    } else {
      current_len++; 
      elem.style.width = current_len + 'px';
    }
  }
}

var id2 = null;
function tallen(len, tag) {
  var elem = document.getElementById(String(tag));   
  var current_len = 0;
  clearInterval(id2);
  id2 = setInterval(frame, 1);
  function frame() {
    if (current_len >= len) {
      clearInterval(id2);
    } else {
      current_len++; 
      elem.style.height = current_len + 'px';
    }
  }
}

var colors = ['red', 'orange', 'yellow', 'green', 'purple'];
var used_dots = [];
var invalid_count = 0

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

var con_grid_v = [
  ['a1v', 'a2v', 'a3v', 'a4v', 'a5v','a6v', 'a7v', 'a8v', 'a9v'], //r1
  ['b1v', 'b2v', 'b3v', 'b4v', 'b5v','b6v', 'b7v', 'b8v', 'b9v'], //r2
  ['c1v', 'c2v', 'c3v', 'c4v', 'c5v','c6v', 'c7v', 'c8v', 'c9v'], //r3
  ['d1v', 'd2v', 'd3v', 'd4v', 'd5v','d6v', 'd7v', 'd8v', 'd9v'], //r4
  ['e1v', 'e2v', 'e3v', 'e4v', 'e5v','e6v', 'e7v', 'e8v', 'e9v'], //r5
  ['f1v', 'f2v', 'f3v', 'f4v', 'f5v','f6v', 'f7v', 'f8v', 'f9v'], //r6
  ['g1v', 'g2v', 'g3v', 'g4v', 'g5v','g6v', 'g7v', 'g8v', 'g9v'], //r7
  ['h1v', 'h2v', 'h3v', 'h4v', 'h5v','h6v', 'h7v', 'h8v', 'h9v'] //r8
];


var dot_grid = [
  ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9'], //r1
  ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8', 'b9'], //r2
  ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9'], //r3
  ['d1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9'], //r4
  ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'], //r5
  ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9'], //r6
  ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9'], //r7
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9'], //r8
  ['i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i7', 'i8', 'i9'] //r9
];

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
