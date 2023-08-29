function see_for_you(num){
    document.getElementById('point_itinerary1').classList.add('nons')
    document.getElementById('point_itinerary2').classList.add('nons')

    document.getElementById('point_itinerary'+num).classList.remove('nons')
}


let index_images = []

function new_route(first, route, description){
    document.getElementById('points').innerHTML = `
        <div class="point">
            <div class="letter_point">Точка маршрута - 1</div>
            <div class="info_point">
                <div class="desk_poit">
                    <div class="title_desk_point">${first}</div>
                </div>
            </div>
        </div>
    `

    if (!description){
        
        description = 'Описания пока нет. Вы можете добавить его в любой момент.'
    }
    document.getElementById('opotunity').value = description
    document.getElementById('opotunity').innerHTML = description

    
    for (let i in route){
        if (route[i][1].includes('siteMap')){
            route[i][1] = route[i][1].slice(7)
        }
        
        document.getElementById('points').innerHTML += `
            <div class="point">
                <div class="div_point">
                    <div class="letter_point">Точка маршрута - ${parseInt(i)+2}</div>
                    <div class="info_point">
                        <div class="desk_poit">
                            <div class="title_desk_point">${route[i][0]}</div>
                        </div>
                        <div class="image_point">
                            <img src="${route[i][1]}" alt="">
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

function new_place(route){
    document.getElementById('kol_points').innerHTML = `${route.len}) Маршрут "${route.first_point} - ${route.last_index}"`
    document.getElementById('tochka').innerHTML = route.len
    document.getElementById('kilometers').innerHTML = route.distance
    document.getElementById('time').innerHTML = route.time
    document.getElementById('currency').innerHTML = route.currency
    document.getElementById('id_routes').value = route.id


    new_route(route.first_point, route.routes_points, route.description)
}

function red_desc(){
    let desc = document.getElementById('opotunity').value
    itinerary[num].description = desc

    $.ajax({
        url : url,
        type : "POST", 
        data : {
          data: itinerary[num].id + "%%%" + desc,
          csrfmiddlewaretoken: token,
        }, 
        success : function(response){
        },
        error : function() {
        }
    });
}

let filters = {
    0: "Достопримечательности Беларуси",
    1: "Красивые места белорусской природы",
    2: "Санатории и парки семейного отдыха",
    3: "Места для кемпинга"
}

let regions_dict = {
    1: 'Минская область',
    2: 'Брестская область',
    3: 'Могилевская область',
    4: 'Гродненская область',
    5: 'Гомельская область',
    6: 'Витебская область',
}

function click_image(id, i){
    document.getElementById('user_img').src = user_places[id].images[i]

    for (let index=0; index <= 4; index++){
        document.getElementById('gray_block'+parseInt(index))?.classList.remove('active_gray')
        document.getElementById('musorka'+index)?.classList.remove('active_musorka')
    }
    document.getElementById('gray_block'+i).classList.add('active_gray')
    document.getElementById('musorka'+i)?.classList.add('active_musorka')
}

function plus_add(i){
    document.getElementById('one_image'+i).innerHTML = `
        <div class="one_block_image" id="one_block_image${i}">
            <div title="Добавить фотографию" class="plus" id="plus${i}">
                <label for="upload_image${i}">+</label>
                <input type="file" class="user_input" accept=".jpg, .png, .psd, .jfif" id="upload_image${i}" name="user_image${i}">
            </div>
        </div>
        <div class="input_text" id="input_text${i}"></div>
    `
}

function click_musorka(i) {
    index_images.push(i)

    document.getElementById('delete_photos').value = index_images.join(', ')

    plus_add(i)
    document.getElementById('input_text'+i).innerHTML = 'Удалено!'
    
}

let reason_error = {
    1: 'В данный момент добавленное вами место находится на модерации после ваших изменений, а потому оно не будет отображаться для всех пользователей.',
    2: 'Место успешно отображается для всех пользователей!'
}

function user_place(id) {
    let place = user_places[id]
    document.getElementById('input_title').value = place.name
    document.getElementById('filter_title').innerHTML = filters[place.filter]
    document.getElementById('filter').value = place.filter
    document.getElementById('region_title').innerHTML = regions_dict[place.region]
    document.getElementById('region').value = place.region
    document.getElementById('description_user_place').value = place.description

    document.getElementById('delete_place_gray').classList.remove('nons')
    
    if (place.opacity == 'True'){
        document.getElementById('slider').classList.add('active_slider')
        document.getElementById('reason_opacity').innerHTML = reason_error[2]
    } else {
        document.getElementById('slider').classList.remove('active_slider')

        document.getElementById('reason_opacity').innerHTML = reason_error[1]
    }

    document.getElementById('delete_photos').value = ''

    let num_image = 0
    let images = place.images
    for (let i in images){
        if (images[i].includes('siteMap')){
            images[i] = images[i].slice(7)
        }
        if (images[i] != 0){
            document.getElementById('one_image'+i).innerHTML = `
                <div class="image_user_block" onclick="click_image('${id}', '${i}')">
                    <img id="user_one_img${i}" src="${images[i]}">
                </div>
                <div class="musorka" id='musorka${i}' onclick='click_musorka(${i})'>
                    <img src="static/create_images/trash.png" alt="">
                </div>
                <div class="gray_block" id='gray_block${i}' onclick="click_image('${id}', '${i}')"></div>
            `
            if (i == num_image){
                document.getElementById('user_img').src = images[i]
                document.getElementById('gray_block'+i).classList.add('active_gray')
                document.getElementById('musorka'+i).classList.add('active_musorka')
                num_image = -10
            } 
        } else {
            plus_add(i)
        }
        num_image++
    }
}

let num = 1;
function zapros(data){
    if (num == data[1]){
        return
    }

    index = data[0]

    document.getElementById('start_page').classList.add('nons')

    document.getElementById('main_block_routes').classList.add('nons')
    document.getElementById('div_main_places').classList.add('nons')
    
    num = data[1]

    if (index == 0){
        document.getElementById('main_block_routes').classList.remove('nons')

        document.getElementById('main_h1').innerHTML = 'Сохраненный маршрут'
        new_place(itinerary[data[1]])
    } else{
        document.getElementById('div_main_places').classList.remove('nons')

        document.getElementById('main_h1').innerHTML = 'Добавленная точка'

        document.getElementById('id').value = data[1]

        user_place(num)
    }

    for (let i = 1; i <= document.getElementsByClassName('get_p').length; i++){
        // if (num == i){
        //     document.getElementById('get_p_'+i).classList.add('active')
        // } else {
            document.getElementById('get_p_'+i)?.classList.remove('active')
        // }
    }


  }

let list_region_num = 0;
let list_filter_num = 0;

function info_in_list(id, list_id, p){
    if (list_filter_num > 1){
        list_filter_num = 0
    } 
    else if (list_region_num > 1){
        list_region_num = 0
    }
    else {
        let time = 100
        let num = 1;
        for (let i in p){
            setTimeout(function() {
                document.getElementById(id).innerHTML += `
                    <div class="${list_id}" onclick="new_filter_region('${id}', '${i}')">${num++}) ${p[i]}</div>
                `
            }, time)
            time += 100
        }
    }
}

function new_filter_region(id, index){
    if (id == 'filters'){
        document.getElementById('filter').value = index
        document.getElementById('filter_title').innerHTML = filters[index]
    } else {
        document.getElementById('region').value = index
        document.getElementById('region_title').innerHTML = regions_dict[index]
    }
}


function get_list(index){
    let p;
    let id;
    let list_id;

    if (index == 1){
        list_filter_num += 1
        p = filters
        id = 'filters'
        list_id = 'list_filter'
    } else {
        list_region_num += 1
        p = regions_dict
        id = 'regions'
        list_id = 'list_region'
    }

    document.getElementById(id).innerHTML = ''

    document.getElementById(id).classList.toggle('nons')

    document.getElementById('down'+index).classList.toggle('downs')

    info_in_list(id, list_id, p)
}

function onload_image() {
    document.getElementById('place_all_images').addEventListener('change', function(event){
        let index = event.target.id.slice(-1)
        let value = document.getElementById('upload_image'+index).value
        if( value ){
            if (index in index_images){
                for (let i in index_images){
                    if (index_images[i] == index)
                       index_images.splice(i, 1);
                }
                document.getElementById('delete_photos').value = index_images.join(', ')
            }
            document.getElementById('one_block_image'+index).classList.toggle('rotate_45')
            document.getElementById('input_text'+index).innerHTML = 'Файл выбран!'
            document.getElementById('plus'+index).title = 'Нажмите для удаления или замены'

        } else {
            document.getElementById('plus'+index).title = 'Добавить фотографию'

            document.getElementById('input_text'+index).innerHTML = 'Файл удалён!'
            document.getElementById('one_block_image'+index).classList.toggle('rotate_45')

        }
    });
}

onload_image()


function change_slider() {
    document.getElementById('slider').classList.toggle('active_slider')
}

function delete_place_error() {
    alert('При повторном нажатии место будет удалено!')
    document.getElementById('delete_place_gray').classList.add('nons')
}

function check_cashe() {
    let place_name = sessionStorage.getItem('new_place');
    if (place_name) {
        $.ajax({
            url : url,
            type : "POST", 
            data : {
              data: '15&'+place_name,
              csrfmiddlewaretoken: token,
            }, 
            success : function(response){
            },
            error : function() {
            }
        });
    } 
    sessionStorage.setItem('new_place', '');

}

check_cashe()