

function change(index){
    let change_directive_left = document.getElementById('left_div').classList;

    let change_directive_right = document.getElementById('right_div').classList;

    if (index == 2){
        window.location.replace("/Registration");

        change_directive_left.remove('active_button')
        change_directive_right.add('active_button')
    } else {
        window.location.replace("/login");
        change_directive_right.background = 'rgb(233, 233, 233)'
        change_directive_left.background = 'white'
    }
}

