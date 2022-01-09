const userAction = async ()  => {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const myJson = await response.json();
    hangman(myJson[0])
}
// Get the modal
var win_modal = document.getElementById("myWinModal");
var lost_modal = document.getElementById("myLostModal");
var span = document.getElementsByClassName("close");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");
userAction();

const hangman = (text) => {
    // alert(text)
    // console.log(text)
    const letters = document.querySelector('.letters');
    for (let i = 0 ; i < text.length; i++){
        letters.innerHTML += '<li class="char char'+i+'"> _ <li>'
    }
    var number_list = []
    let i = 0;
    let len_text = text.length;
    let no_of_pos = 0

    if(len_text < 6){
        no_of_pos = 3
    } else if(len_text <10){
        no_of_pos = 4
    } else{
        no_of_pos = 5
    }

    while(true){
       if (i == no_of_pos){
           break
       } else {
           var val = Math.floor(Math.random() * text.length)
           if(!(number_list.includes(val))){
               i += 1;
               number_list.push(val)
           }
       }
    }

    // console.log(number_list)

    for (let i = 0 ; i < no_of_pos; i++){
        var num = number_list[i];
        document.querySelector('.char'+num).innerText = ''+text.charAt(num);
    }

    let used_char = []
    let unused_char = []

    for(let i = 0; i < text.length;i++){
        if(number_list.includes(i)){
            used_char.push(text.charAt(i))
        } else {
            unused_char.push(text.charAt(i))
        }
    }
    // console.log(used_char);
    // console.log(unused_char);
    

    let health = 0;
    let correct_count = 0
    let len_of_unused_char = unused_char.length;
    document.addEventListener("keypress", (event) => {
        var name = event.key;

        if(unused_char.includes(name)){
            // console.log('true');
            correct_count += 1

            // if(correct_count == len_of_unused_char){
            //     won_game()
            // }
            for(let i=0; i<text.length; i++){
                if(text.charAt(i) == name){
                    document.querySelector('.char'+i).innerText = name;
                }
            }
            var pos = unused_char.indexOf(name)
            unused_char.splice(pos,1)

        } else {
            health += 1
            
            document.querySelector('.headline'+health).style.color='red';
            document.querySelector('.headline'+health).style.setProperty("text-decoration", "line-through")
            if(health == 7){
                lost_game(text)
            }
            // document.querySelector('.msg').innerText='You Lost A Life. Now You Have '+ (7-health) +' lives';
            // console.log('false');
        }
        if(convert_to_string(text) == text){
            won_game();
        }
       
    })


}

function convert_to_string(text){
    let s = '';
    for(let i = 0; i < text.length; i++){
        s = s+document.querySelector('.char'+i).innerText;
    }
    return s;
}


function won_game(){
    // console.log('You Won The Game');
    // alert('woohooo!!!! Your Gussed The Correct Answer');
    // setTimeout(function(){
    //     window.location.reload();
    // }, 2000)
    win_modal.style.display = "block";
    span[0].onclick = function() {
        win_modal.style.display = "none";
        window.location.reload();
    }

}

function lost_game(text){
    // console.log('You Lost the game');
    // alert('OOps....You Lost the Game... the Correct Answer was -> "'+text + '" - Better Luck Next Time!!');
    // setTimeout(function(){
    //     window.location.reload();
    // }, 1000)
    lost_modal.style.display = "block";
    let str = " <span class='correct_ans'>"+text + " </span>"
    document.querySelector('.lost_msg').innerText = "Correct Answer Was ->" + text + " Better Luck Next Time..";
    span[1].onclick = function() {
        lost_modal.style.display = "none";
        window.location.reload();
    }
}

