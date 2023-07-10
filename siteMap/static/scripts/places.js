let new_big_massiv = {}


function slow_print(need_elements){
    // document.getElementById('places').innerHTML = ''
    // let time = 100
    // setTimeout(function(){
    //   Object.entries(big_massiv).forEach(([title, value]) => {
    //     if (need_elements.includes(value[0])){
    //       document.getElementById('places').innerHTML += `
    //       <div class="place region${value[2]}">
    //         <div class="about_place">
    //           <div class="name_place">
    //             <a href='Places/${value[6]}'>
    //               <h1>${title}</h1>
    //             <a/>
    //           </div>
      
    //         <div class="btn-group">
    //           <a id="login" class="button_map" onclick="to_Map('${value[6]}')" href="Map" class="href_map">
    //             <span>К карте</span>
    //           </a>
    //           <a id="${value[6]}" class="poster" onmouseover="open_desc('${value[6]}', 1)" onmouseout="open_desc('${value[6]}', 0)" >
    //           <span>Описание</span>
    //           </a>
    //         </div>
    //       </div>
      
    //       <div class="slider" id="slider">
    //         <div class="buttons">
    //           <div class="button left" onclick="scroller(${value[6]}, -1, ${value[5].length})">
    //             <div class="but"><</div>
    //           </div>
    //           <div class="free"></div>
    //           <div class="button right" id='right' onclick="scroller(${value[6]}, 1, ${value[5].length})">
    //             <div class="but">></div>
    //           </div>
    //         </div>
              
    //         <div id='desc${value[6]}' class="descriptions opaces">
    //           <div class="description">
    //             ${value[1]}
    //           </div>
    //         </div>
        
    //         <div class="images" id="images${value[6]}">
    //         <div id='image' class="image">
    //           <img src="${value[5][0]}"></div>
    //         </div>
    //       </div>
    //         `
    //         num = 0
    //         if (check == 0){
    //           setTimeout(
    //             function(){
    //               for (let i = 1; i < value[5].length; i++){
    //                 document.getElementById('images'+value[6]).innerHTML += `
    //                 <div id='image' class="image">
    //                   <img src="${value[5][i]}"></div>
    //                 </div>
    //                 `
    //               }
    //             }, 2000 + time
    //             )
    //             time += 100
    //           }
    //         }
    // })
    // }, time)

  }

function open_desc(id, i){
	document.getElementById('desc'+id).classList.toggle('opaces');
}

function cleaning(){
	if (p.length == 1){
		$('#${title.slice(0, 5)}1').css({
		'display': 'none',
		})
	}
}


 filter_mas = {'one': 1, 'two': 1, 'three': 1, 'four': 1}


// let mas = []
  


function create_places(){
	document.getElementById('div_places') = ''
}

let regions_dict = {
  '1': 'Минская обл',
  '2': 'Брестская обл',
  '3': 'Могилевская обл',
  '4': 'Гродненская обл',
  '5': 'Гомельская обл',
  '6': 'Витебская обл',
  'Беларусь' : 'Беларусь'
}


function get_Region(name){
    document.getElementById('search_places').innerHTML = regions_dict[name]
    if (name == "Беларусь"){
      $('.place').css('display','block');
    }
    else{
      // name = name.slice(0, 5);
      $('.place').css('display','none');
      $('.region'+name).css('display','block');
    }
    
  }

let currentImage = 0;
let mas_1 = {}


function scroller(id, value){
  let max = document.querySelectorAll(`#images${id} > div`).length;
  let doc = document.getElementById('image').clientWidth
  if (id in mas_1){
  } else {
      mas_1[id] = 0
  }
  let num = mas_1[id]


  num += value
  if (num == max) {
      num = 0
  } 
  else if (num == -1){
      num = max-1
  }
  $('#images'+id).animate({ scrollLeft: doc*num }, 'slow')
  mas_1[id] = num
}

function myFunction() {
  	document.getElementById("myDropdown").classList.toggle("show");
}
  


function to_Map(name){
	sessionStorage.setItem('lastPlace', `${name}`);
}

let check = 0
function get_filter(id){
  let mas = []
  let mas1 = document.getElementById(`need_value`).value
  if (mas1) {
    mas = mas1.split(', ')
  }

  $('body').css('overflow', 'auto')
  if (mas.includes(id)){
    
    let index = mas.indexOf(id)
    mas.splice(index, 1)
    document.getElementById(`gray${id}`).style.transition = '1s'
    document.getElementById(`gray${id}`).classList.toggle('not_active_gray')
    // $('#gray'+id).css('height', '100%')
  } 
  else {
    document.getElementById(`gray${id}`).style.transition = '1s'

    mas.push(id)
    document.getElementById(`gray${id}`).classList.toggle('not_active_gray')

    // $('#gray'+id).css('height', '0px')
  }

  document.getElementById(`need_value`).value = mas.join(", ")

  console.log(mas)

  setTimeout(function(){
    document.getElementById('need_value_click').click();

  }, 600)
}

$('.frame_images').hover(function(){
    $('body').css('overflow', 'hidden');
    $('body').css('padding-right', '14px');
    $('.menu').css('margin-right', '14.5px');
    $('.hamb').css('margin-right', '40px');
  }, function(){
    $('body').css('overflow', 'auto');
    $('body').css('padding-right', '0px');
    $('.menu').css('margin-right', '0px');
    $('.hamb').css('margin-right', '25px');

  })