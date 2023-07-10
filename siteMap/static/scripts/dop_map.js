function zapros(data){
    $.ajax({
      url : url,
      type : "POST", 
      data : {
        data: data,
        // headers:{"X-CSRFToken": $crf_token},
        csrfmiddlewaretoken: token,
      }, 
      success : function(response){
        return response
      },
      error : function() {
      }
  });
}


function benz() {
    result = prompt("Введите расход топлива (в литрах) на 1 км", ['0.15'])
    if (result){
        sessionStorage.setItem('currency_benz', result);
        get_currency_1()
    }
}




function get_filter(id){
    let p = ['one', 'two', 'three', 'four']
    for (let i in p){
        if (p[i] == id){
            doc.getElementById('categories').value = String(i);
            let style_doc = doc.getElementById(id).style;
            style_doc.width = '90%';
        } else {
            let style_element_p = doc.getElementById(p[i]).style;
            style_element_p.width = '100%';
        }
    }
}

// добавляем инфу о маркере в меню
function newMarker(title, nameImage, description){
    console.log(id_map)
    if (id_map == 'map_mobile') {
        document.getElementById('place_map').classList.remove('nons')
        document.getElementById('mobile_map_menu').classList.remove('nons')
        document.getElementById('mobile_map_menu').classList.add('active_map_place')
        document.images["img_close_menu_map"].src = nameImage;
        document.getElementById("title_close_menu").innerHTML = title;
        document.getElementById("desc_close_menu").innerHTML = description;
        // document.getElementById('destroy_button_map').classList.remove('nons');
    } else {
        document.getElementById('mini').classList.remove('nons');
        document.images["mini"].src = nameImage;
        document.getElementById("place_tittle_down_image").innerHTML = title;
        document.getElementById("description_text").innerHTML = description;
        document.getElementById('destroyButton').classList.remove('nons');
    }
}

function get_currency_1(){
    let cur_expenditure = sessionStorage.getItem('currency_benz');
    let expenditure;
    if (cur_expenditure){
        expenditure = cur_expenditure;
    } else {
        expenditure = 0.15;
    }
    let new_lenght = document.getElementById('distance').innerHTML.replace(/\D/g,'');
    let value = (currency_benz * expenditure * new_lenght).toFixed(2);
    
    document.getElementById("currency").innerHTML = "Плата за бензин - " + value + " рублей";
}




function get_currency(lenght_road){
    let cur_expenditure = sessionStorage.getItem('currency_benz');
    let expenditure;
    let text;
    if (cur_expenditure){
        expenditure = cur_expenditure;
        text = "Плата за бензин - "
    } else {
        expenditure = 0.15;
        text = "Средняя плата за бензин - "
    }
    let new_lenght = parseFloat(lenght_road.replace(/,/g,'.').replace(/ км/g, ''));

    let value = (currency_benz * expenditure * new_lenght).toFixed(2);
    user_info[1][2] = value

    document.getElementById("currency").innerHTML = text + value + " рублей";
}



function delet_all_places(doc){
    if (referencePoints.length > 2){
        document.getElementById('clearMap').classList.remove('nons')
    } else {
        document.getElementById('clearMap').classList.add('nons')
    }
}

// добавляем инфу в правый фрейм (меню)
function ToRightMenu(place, distance, duration, doc){

    delet_all_places(doc)

    document.getElementById('info_last_place').style.display = 'block';
    document.getElementById('get_user_place').style.display = 'none';
    document.getElementById('distance').style.display = 'block';
    document.getElementById('duration').style.display = 'block';
    document.getElementById('place_tittle_down_image').style.display = 'block';

    let i = 0;
    let title;
    if (referencePoints.length >= 2){
        if (!city){
            let need_place = places[place]
            title = need_place[0];
            document.getElementById('description_text').classList.remove('nons')
            document.getElementById('images').classList.remove('nons')
            document.images["mini"].src = `${need_place[3]}`;
            document.getElementById("description_text").innerHTML = need_place[1];
        
        } 
        else {
            title = city;
            document.getElementById('description_text').innerHTML = ''
            document.getElementById('mini').classList.add('nons')
        }

    }

    // let places_mobile = [places[i], distance, duration];
    // last_place = places[i]
    
    user_info[1][0] = distance
    user_info[1][1] = duration

    document.getElementById("distance").innerHTML = "Расстояние = " + distance;
    document.getElementById("duration").innerHTML = "Примерное время = " + duration;
    

    document.getElementById("place_tittle_down_image").innerHTML = title;

    get_currency(distance, doc)
} 

// href="#up"
// добавляем инфу о маркере в меню
function intrestingPlace(index){
    setTimeout(function(){
        let place = places[index]
        document.getElementById("places").innerHTML += 
        `
        <div class="place">
            <center>
                <a class="place_click" id="${index}" value=15>
                    <p id="title" class="title-example">${place[0]}</p>
                    <div class="hover-image-scale">
                        <img src='${place[3]}' class="hover-image-scale" width="100%">
                    </div>
                    <button class="dkm"> 
                        <p class="dis4">"${place[1]}</p>
                    </button>
                </a>
            </center>
        </div>
        `;
    }, time)
    time += 100
    
}


function delet_add_places(){
        if (second_referencePoints.length == 0){
            document.getElementById('nubmers_buttons').classList.add('nons');
        }
        else {
            document.getElementById('nubmers_buttons').classList.remove('nons');
        }
    }

function Delete_place(i){
    i -= 1;
    index_button = -2
    let pas = [];
    // let to_message = [];
    for (let a in second_referencePoints){
        if (second_referencePoints[i] != second_referencePoints[a]){
            pas.push(second_referencePoints[a]);
            // to_message.push(second_referencePoints[a][2]);
        } 
    }
    second_referencePoints = pas;
    get_Place(document);

    delet_add_places(document);

    // message = [3, to_message];
    // sendMessageToMain(message, document);
}

function aa(){
    scrollBy({ left: 50, behavior: 'smooth' });
}

input_index = 1

function change_input(){
    document.getElementById('input_add_images')?.addEventListener('change', function(event){
        let index = event.target.id.slice(-1)
        let value = document.getElementById('user_input'+index).value
        if( value ){
            document.getElementById('add_images'+index).title = value.slice(12)
            document.getElementById('title_input_block'+index).innerHTML = 'Фотография выбрана'

            document.getElementById('input_image_block'+index).classList.remove('active_input_image')
            document.getElementById('delet_image_block'+index).classList.add('active_input_image')

        } else {
            document.getElementById('title_input_block'+index).innerHTML = 'Фотография не выбрана'

            document.getElementById('input_image_block'+index).classList.add('active_input_image')
            document.getElementById('delet_image_block'+index).classList.remove('active_input_image')
            return
        }

        index++
        input_index++

        if (input_index <= 5){
            document.getElementById('one_input_blocks'+index).classList.remove('nons')
        }
    })
}

change_input()

function href_to_login(place_name) {
    sessionStorage.setItem('new_place', `${place_name}`);
    window.location.href = "login";
}

function close_mobile_map() {
    console.log('click')
    document.getElementById("map_mobile").scrollIntoView({behavior: 'smooth'});
    document.getElementById('mobile_map_menu').classList.toggle('nons')

    document.getElementById('place_map').classList.add('nons')
    document.getElementById('mobile_map_menu').classList.remove('active_map_place')
}