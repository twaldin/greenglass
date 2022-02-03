function guess_word(){  
  document.getElementById('answer').style.backgroundColor='white'
  document.getElementById('spelling').innerHTML = ''
  let x = document.getElementById("guess").value;
  var dictionary = new Typo("en_US", false, false, { dictionaryPath: "dictionaries" }),
  var is_spelled_correctly = dictionary.check(x);
  if (is_spelled_correctly){
    if(x.startsWith('s')){
      window.setTimeout(correct, 400)
    }else{window.setTimeout(wrong, 400)}
    
  }else{spelt_wrong()}
}

function correct(){
  document.getElementById('answer').style.backgroundColor='green'
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
