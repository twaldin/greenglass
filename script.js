function guess_word(){  
  document.getElementById('answer').style.backgroundColor='white'
  document.getElementById('spelling').innerHTML = ''
  let x = document.getElementById("guess").value.toLowerCase();
  var dictionary = new Typo("en_GB", false, false, { dictionaryPath: "dictionaries" });
  var is_spelled_correctly = dictionary.check(x);
  
  

  if (is_spelled_correctly){

    document.getElementById('spelling').innerHTML = ''
    window.setTimeout(spelt_right, 400)

    if(x.startsWith('s')){
      window.setTimeout(correct(x), 400)
    }else{window.setTimeout(wrong, 400)}
    
  }else{spelt_wrong()}
}

function correct(guess){
  let width = guess.length
  document.getElementById('answer').style.backgroundColor='green'
  draw_line(width)
}
  
function draw_line(len){
  let new_len = parseInt(len)
  let draw_width = new_len * 27.5
  document.getElementById('answer').innerHTML = String(draw_width)

  document.getElementById('a1c').style.width = String(draw_width) + 'px'
}

function wrong(){
  document.getElementById('answer').style.backgroundColor='red'
}

function spelt_wrong(){
  document.getElementById('spelling').innerHTML = 'invalid word'
}

function spelt_right(){
  document.getElementById('spelling').innerHTML = 'valid word'
}
