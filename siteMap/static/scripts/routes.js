let name_cycle = 'Главная'

function rename(index, name_){
    if (index == 2){
        document.getElementById('cycle_text').innerHTML = '| ' + name_cycle
    }
    else {
        // name_cycle = name_
        // document.getElementById('cycle_text').style.width = '10px'
        // setTimeout(function(){
            document.getElementById('cycle_text').innerHTML = '| ' + name_
        //     document.getElementById('cycle_text').style.width = '100%'
        // }, 000)
    }
    // document.getElementById('cycle_text').innerHTML = name_cycle
}

function next_place(index){
    let plus_one = now+index
    if (plus_one < 0 || all == plus_one) {
        let doc_width = document.getElementById('block_main').offsetWidth
        already_on_place(doc_width, now)
    } else {
        reroute(plus_one)
    }
    name_cycle = 'Главная'

}

let now = 0;

function already_on_place(doc_width, index) {
    document.getElementById('block_scroll_main').style.transform = "translateX(" + (-doc_width*index+100) + "px" + ")";
    setTimeout(function(){
        document.getElementById('block_scroll_main').style.transform = "translateX(" + (-doc_width*index-100) + "px" + ")";
    }, 200)

    setTimeout(function(){
        document.getElementById('block_scroll_main').style.transform = "translateX(" + (-doc_width*index) + "px" + ")";
    }, 500)
}

function reroute(index, title){

    name_cycle = title
    // var offsetHeight = document.querySelector('.gray_line').offsetHeight;

    window.scroll({
        top: 20,
        behavior: 'auto'
    });

    if (index == 0){
        document.querySelector('html').classList.remove('nons_scroll')
        document.getElementById("myBar").style.width = 0 + "%";
    } else{
        document.querySelector('html').classList.add('nons_scroll')
        document.getElementById("myBar").style.width = mas_scrooleds[index] + "%";
    }
    let doc_width = document.getElementById('block_main').offsetWidth
    // let dop_width = 50*(now-index)
    if (now == index){
        already_on_place(doc_width, index)
    }else{
        // document.getElementById('block_scroll_main').style.transform = "translateX(" + (-doc_width*index+dop_width) + "px" + ")";
        // setTimeout(function(){
            document.getElementById('block_scroll_main').style.transform = "translateX(" + (-doc_width*index) + "px" + ")";
        // }, 800)
    }

    
    document.getElementById(`active_cycle_${index}`).classList.toggle('big_cycle')
    document.getElementById(`active_cycle_${now}`).classList.toggle('big_cycle')
    now = index
}

let mas_scrooleds = {1: 0, 2: 0, 3: 0, 4: 0}

document.getElementById('route1').onscroll = function() {myFunction(1)};
document.getElementById('route2').onscroll = function() {myFunction(2)};
document.getElementById('route3').onscroll = function() {myFunction(3)};
document.getElementById('route4').onscroll = function() {myFunction(4)};

function myFunction(id) {
    let doc = document.getElementById('route'+id)
    let winScroll = doc.scrollTop
    let height = doc.scrollHeight - doc.clientHeight;
    let scrolled = (winScroll / height) * 100;
    mas_scrooleds[id] = scrolled
    document.getElementById("myBar").style.width = scrolled + "%";
}

function scroll_top(id) {
    document.getElementById('route'+id).scroll({
        top: 0, 
        behavior: 'auto'
    });
}