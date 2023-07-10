index_button = -2;

let deleter = 0

window.onorientationchange = function() {
    location.reload();
}

let checking = 0

let second_referencePoints = []

let center = [53.90566019, 27.55391815]

let left_menu = [];

// let left_markers = {}

let first_coord;

let last_coord;

let openMarker = 0;

// markers_object = [];


// массив с адресами или координатами, по которым уже строится маршрут. 
referencePoints = []
 

function placer_add(one_place){
    doc.images["mini"].src = one_place[3];
    doc.getElementById("place_tittle_down_image").innerHTML = one_place[0];
    doc.getElementById("description_text").innerHTML = one_place[1];
}

let regions_dict = {
    'Беларусь': '0',
    'Минск': '1',
    'Минская область': '1',
    'Брестская область': '2',
    'Могилевская область': '3',
    'Гродненская область': '4',
    'Гомельская область': '5',
    'Витебская область': '6',
}

// главня функция
function init(){

    objectManager_Points = new ymaps.ObjectManager({});

    objectManager = new ymaps.ObjectManager({
        // Чтобы метки начали кластеризоваться, выставляем опцию.
        clusterize: true,
        gridSize: 100,
        geoObjectOpenBalloonOnClick: false,
        // ObjectManager принимает те же опции, что и кластеризатор.
    });

    objectManager.objects.options.set({
        iconImageSize: [10, 10],

        iconLayout: 'default#image',
        iconImageHref: 'static/create_images/free-icon-gas-station-1000437.png',
    })

    objectManager.clusters.options.set({
        clusterIcons: [
            {
                href: 'static/create_images/free-icon-gas-station-1000437.png',
                size: [10, 10],
                offset: [-20, -20]
            }
        ],  
        clusterIconContentLayout: null
    });

    let objectManagers = new ymaps.ObjectManager();

    function create_map(){
        if (document.documentElement.clientWidth > 480) {
            id_map = 'map'
        } else {
            document.getElementById('div_map_mobile').classList.remove('nons')
            id_map = 'map_mobile'
        }
        // создание переменной самой карты с обращением к диву в html 'map
        let map = new ymaps.Map(id_map, {
            center: center,
            zoom: 1,
            behaviors: ['default', 'scrollZoom'],
            controls: [],
        }, {
    
        minZoom: 7,
        maxZoom: 20,
        maxAnimationZoomDifference: 50,
        restrictMapArea: [
            [49.39656021, 21.97756175],
            [57.59224209, 34.94142894]
        ],
        })
        return map
    }

    let map = create_map()

    function rePlace_1(i){
        if (i == 'first'){
            document.getElementById('place_tittle_down_image').innerHTML = user_info[0]
            doc.getElementById('mini').classList.add('nons')
            doc.getElementById('description_text_main').classList.add('nons')
            doc.getElementById('description_text').classList.add('nons')
            
        }
        else if (i == 'last'){
            if (index_button != -1){
                if (city){
                    doc.getElementById('mini').classList.add('nons')
                    doc.getElementById("description_text").innerHTML = '';
    
                    doc.getElementById("place_tittle_down_image").innerHTML = city;
                } else {
                    doc.getElementById('mini').classList.remove('nons')
                    doc.getElementById('description_text_main').classList.remove('nons')
                    doc.getElementById('description_text').classList.remove('nons')
    
                    placer_add(places[place])
                }
            }
            index_button = -1;
        }
        else {
            doc.getElementById('images').classList.remove('nons')
            doc.getElementById('mini').classList.remove('nons')
            doc.getElementById('description_text').classList.remove('nons')

            index_button = i;
            let placer = places[second_referencePoints[i-1]]

            objectManager_Points.objects.balloon.open(second_referencePoints[i-1]);

            doc.getElementById('image_'+i).classList.toggle('nons')
    
            placer_add(placer)

        }

        doc.getElementById('destroyButton').classList.add('nons');
    }
    
    
    function get_Place(){
    
        doc.getElementById('info_last_place').classList.toggle('none');
    
        doc.getElementById('get_user_place').classList.toggle('none');
    
        let arr_EN = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
         doc.getElementById("nubmers_buttons").innerHTML = `
         <div id='first' class="number_button">
            <p>${arr_EN[0]}</p>
        </div>
        <div class="sctrelka">></div>
         `;
    
         for (i = 1; i <= second_referencePoints.length; i++){
            doc.getElementById("nubmers_buttons").innerHTML += `
                <div id='num_${i}' class="number_button">
                    <p>${arr_EN[i]}</p>
                    <img class='ima nons' id='image_${i}' src="static/create_images/musor.png" height=50px> 
                </div>
                <div class="sctrelka">></div>
                 `;
         }
    
         if (!city){
            p_title = arr_EN[i-1]
         } else {
            p_title = city;
         }
         doc.getElementById("nubmers_buttons").innerHTML += `
            <div id='last' class="number_button">
            <p>${arr_EN[i]}</p>
            </div>
         `;
    
         listening_click_on_point(doc)
     }
    
    let place;

    // Определение текущего местоположения в координатах
    function PlaceNow(){
        let placeNow = sessionStorage.getItem('placeNow');
        if (placeNow != null){
            placeNow = placeNow.split(":")
            let bad_coord = placeNow[1].split(',')
            let coordX = parseFloat(bad_coord[0])
            let coordY = parseFloat(bad_coord[1])
            referencePoints.unshift([coordX, coordY])
            user_info[0][0] = placeNow[0]
            main()

        } else{
            let location = ymaps.geolocation.get();
            // Определение адреса в виде готового красивого текста
            location.then(function(res) {
                let locationText = res.geoObjects.get(0).properties.get("text");
                var userCoodinates = res.geoObjects.get(0).geometry.getCoordinates();

                user_info[0][0] = locationText

                referencePoints.unshift(userCoodinates)

                main()


                sessionStorage.setItem('placeNow', (locationText+":"+userCoodinates))

            });
        }
    }

    PlaceNow();

    function main() {
        CheckLastPlace()
        try{
            create()
        }
        catch{
            alert('Error!')
        }
    }


    function length_calculate(oneX, twoX, oneY, twoY){
        let length = Math.sqrt((twoX - oneX)**2 + (twoY - oneY)**2)
        return length
    }

    function sorted_places_to_map(ready_route){
        let last_coord = referencePoints[0]

        let sorted_mas = []

        while (ready_route.length != 1) {
            let len_mas = []
            let slow = {}
            
            for (let i in ready_route) {
                let key = ready_route[i]
                let place_coord = places[key][2]

                let len = length_calculate(last_coord[0], place_coord[0], last_coord[1], place_coord[1])
                len_mas.push(len)
                slow[len] = key

            }

            let first_key = Math.min(...len_mas)

            sorted_mas.push(slow[first_key])

            for (let i in ready_route) {
                if (ready_route[i] == slow[first_key]) {
                    ready_route.splice(i, 1)
                    break
                }
            }

            last_coord = places[slow[first_key]][2]

            console.log('haha')

        }

        for (let i in sorted_mas) {
            referencePoints.push(places[sorted_mas[i]][2])
        }

        second_referencePoints = sorted_mas

        place = ready_route[0]

        referencePoints.push(places[ready_route[0]][2])

    }

    
    // проверяем, какой пункт выбрал пользователь на главной странице
    function CheckLastPlace(){
        // смотрим, что содержится в памяти браузера
        place = sessionStorage.getItem('lastPlace');
        // если коордианты есть, добавляем в маршрут
        if (place != "None" && place){
            let main_coord = places[place][2]
            referencePoints.push(main_coord)
        }
        else if (ready_route[0] != ''){
            sorted_places_to_map(ready_route)
        }
        else if (city){
            referencePoints.push('Беларусь, '+city)
            city_geocode = ymaps.geocode(city, {
                results: 1,
                boundedBy: map.getBounds(),
                strictBounds: true,
            }).then(function(res) {
                let founder = res.metaData.geocoder.found
                if (founder == 0 && !founder){
                    alert('Такое место не найдето!')
                    window.location.href = "Places";
                } else {

                    var firstGeoObject = res.geoObjects.get(0),
                    // Координаты геообъекта.
                    coorder = firstGeoObject.geometry.getCoordinates()

                }
            });
        }

        else if (user_place){
            return place
        }

        else {

            listening_unput('title_new_user_place')
            listening_unput('locale_input')

            document.getElementById('on_map').addEventListener('click', function(){
                listening_click_on_map()
            }, {once:true})

            doc.getElementById('info_last_place').classList.add('nons')

            doc.getElementById('get_user_place').classList.remove('nons')
            unlock_interesting_place(doc)
        }
        check()
    }

    function only_belarus() {
        // Загрузим регионы.
        ymaps.borders.load('001', {
            lang: 'ru',
            quality: 2
        }).then(function (result) {

            // Создадим многоугольник, который будет скрывать весь мир, кроме заданной страны.
            var background = new ymaps.Polygon([
                [
                    [85, -179.99],
                    [85, 179.99],
                    [-85, 179.99],
                    [-85, -179.99],
                    [85, -179.99]
                ]
            ], {}, {
                fillColor: '#ffffff',
                strokeWidth: 1,
                strokeColor: "#00AA00",
                // Для того чтобы полигон отобразился на весь мир, нам нужно поменять
                // алгоритм пересчета координат геометрии в пиксельные координаты.
                coordRendering: 'straightPath'
            });

            // Найдём страну по её iso коду.
            var region = result.features.filter(function (feature) { return feature.properties.iso3166 == 'BY'; })[0];

            // Добавим координаты этой страны в полигон, который накрывает весь мир.
            // В полигоне образуется полость, через которую будет видно заданную страну.
            var masks = region.geometry.coordinates;
            masks.forEach(function(mask){
                background.geometry.insert(1, mask);
            });

            // Добавим многоугольник на карту.
            map.geoObjects.add(background);
        })
    }

    only_belarus()

    function createMarker(id, title, nameImage, description, adress){
        document.getElementById('upper').classList.add('biggers')
        setTimeout(
            function(){
                document.getElementById('upper').classList.remove('biggers')
            }, 1000
            )
        
        if (place_delet == 0){
            if (place == 'None'){
                doc.getElementById('get_user_place').classList.add('nons');
                doc.getElementById('info_last_place').classList.remove('nons');
                if (referencePoints.length < 2) {
                    doc.getElementById('info_buttons').classList.add('nons');
                }

                doc.getElementById('info_last_place').classList.remove('nons');
                doc.getElementById('get_user_place').classList.add('nons');
                doc.getElementById('place_tittle_down_image').classList.remove('nons');
            }
            if (referencePoints.includes(adress)) {
                return 0;
            }

            openMarker = id;

            // doc.getElementById('description_text').classList.remove('nons');

            newMarker(title, nameImage, description)
        }
    }


    function markers(){
        // вызов всех жлементов на карту
        for (let index_place in places){
            let place = places[index_place];
    
            objectManager_Points.add({
                type: 'Feature',
                id: index_place,
                geometry: {
                    type: 'Point',
                    coordinates: place[2],
                },
                properties: {
                    balloonContent: place[0]
                },
                options: {
                    id: index_place,
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: "static/create_images/gps.png",
                    iconImageSize: [30, 30],
                    iconImageOffset: [-15, -24],
                    iconContentOffset: [15, 15],
                    preset: 'twirl#nightStretchyIcon'
                }
            });

    }

        objectManager_Points.objects.events.add('click', function (e) {    
            var objectId = e.get('objectId')
            objectManager_Points.objects.balloon.open(objectId);
            createMarker(objectId, places[objectId][0], places[objectId][3], places[objectId][1], places[objectId][2])
        });

        map.geoObjects.add(objectManager_Points);
    }

    markers()


    function zapravki() {
        map.geoObjects.add(objectManager);
        $.ajax({
            url: "static/scripts/data.json"
        }).done(function(data) {
            objectManager.add(data);
        });
    }

    function remove_create_zapravki(){
        document.getElementById('gray_claster').classList.toggle('active_claster')

        if (objectManager.objects.getLength()){
            objectManager.objects.removeAll();
        } else {
            zapravki()
        }
    }

    $('#remove_benz').bind('click', remove_create_zapravki);





    

    function listening_unput(id) {
        document.getElementById(id).addEventListener('change', function(){
            let title = document.getElementById(id).value;
            if (title) {
                var myGeocoder = ymaps.geocode(title);
                myGeocoder.then(
                    function (res) {
                        let coord = res.geoObjects.get(0).geometry.getCoordinates()
                        listening_click_on_map(coord)
                    },
                    function (err) {
                        alert('Ошибка');
                    }
                );
            }
        })
    }

    function unlock_interesting_place(doc){
        doc.getElementById('title_insteresting_place').innerHTML = 'Интересные места';
        doc.getElementById("places").innerHTML = '';
        
        time = 100
        for (let i in places){
            intrestingPlace(i, doc)
        }
        
        listening_click_on_places()
    }


    function listening_click_on_places(){
        setTimeout(function(){
            let all_elements = doc.querySelectorAll(".place_click")
            all_elements.forEach(function(elem) {
                elem.addEventListener('click', function(event){
                    let index = this.id
                    objectManager_Points.objects.balloon.open(index);
                    createMarker(index, places[index][0], places[index][3], places[index][1], places[index][2])
                    // left_markers[index].balloon.open();
                })
            })
        }, time)
    }


    // находит каждую точку маршрута и добавляет их в массив left_menu
    function getSovpad(activeRoute){
        // let activeRoute = multiRoute.getActiveRoute();
        let activeRoutePaths = activeRoute.getPaths(); 

        let insider_places = {}

        activeRoutePaths.each(function(path) {
            // Получение коллекции сегментов для каждого пути.
            var segments = path.getSegments();
            // Проход по коллекции сегментов и вывод информации о каждом сегменте.
            let p = []
            segments.each(function(segment) {
                let route_coords = segment.geometry.getCoordinates();
                for (let i in route_coords){
                    p.push(route_coords[i])
                }
                p.push(place[1])
            })

            let step = 1000;

            first_coord = p[0]

            for (var i = 300; i < p.length; i+=step){
                    var circle = new ymaps.Circle(
                        [p[i], 50000], 
                    {
                    },{})

                map.geoObjects.add(circle);

                var result = ymaps.geoQuery(objectManager_Points.objects).searchInside(circle);
                result.each(function(pm) {
                    let coor = pm.geometry.options._parent._options.id
                    insider_places[coor] = true
                })
                map.geoObjects.remove(circle)

            }

            delete insider_places[place]

            for (let i in second_referencePoints) {
                delete insider_places[second_referencePoints[i]]
            }

            objectManagers.objects.events.add('click', function (e) {    
                var objectId = e.get('objectId')
            });
        }); 
        

        doc.getElementById("places").innerHTML = '';
        
        time = 100
        for (let i in insider_places){
            intrestingPlace(i)
        }
        
        listening_click_on_places()
    }


    function screen_cycle(doc){
        let screen_width = document.getElementById('frame_one').offsetWidth
        let need_width = 0
        let all_cycle_width = (referencePoints.length)*65
        if (all_cycle_width > screen_width-100){
            need_width = screen_width * 0.8
        } else {
            need_width = all_cycle_width
        }
        doc.getElementById('div_nubmers_buttons').style.setProperty('width', `calc(${need_width}px`);
    }

     // Функция которая создаёт маршрут на карту
     function create(){
        if ((place != 'None' || city || ready_route[0]) && place){
            let viaIndexes = []
            for (let i=1; i < referencePoints.length-1; i++){
                viaIndexes.push(i)
            }
            multiRoute = new ymaps.multiRouter.MultiRoute({

                referencePoints,
                params: {
                    viaIndexes,
                    // routingMode: "masstransit"
                  }
            }, {
                wayPointStartIconLayout: "default#image",
                wayPointStartIconImageHref: "static/create_images/home.png",
                wayPointStartIconImageSize: [50, 50],
                wayPointStartIconImageOffset: [-15, -15],

                wayPointFinishIconLayout: "default#image",
                wayPointFinishIconImageHref: "static/create_images/place.png",
                wayPointFinishIconImageSize: [40, 40],
                wayPointFinishIconImageOffset: [-20, -25],

                routeActiveStrokeWidth: 3,
                routeStrokeWidth: 2,
                routeActiveStrokeStyle: 'solid',
                routeActiveStrokeColor: "#317433",

                // Внешний вид транзитных точек.
                viaPointIconRadius: 10,
                viaPointIconFillColor: "white",
                viaPointActiveIconFillColor: "#317433",

                iconLayout: 'default#image',
                iconImageSize: [30, 30],
                iconImageOffset: [-15, -20],

                boundsAutoApply: true,

            });

            // добыча информации о маршруте и добавлние её в меню справа 
            multiRoute.model.events.add('requestsuccess', function() {
                let activeRoute = multiRoute.getActiveRoute();

                let distance = activeRoute.properties.get("distance").text;
                let duration = activeRoute.properties.get("duration").text;
            

                get_Place()

                // let int_place = doc.getElementById('unwrap')

                // int_place.addEventListener('click', getSovpad, {once:true})
                ToRightMenu(place, distance, duration, doc)
                doc.getElementById('places').innerHTML = ''
                // doc.getElementById('unwrap').classList.remove('nons')

                getSovpad(activeRoute)

                screen_cycle(doc)

            });

            map.geoObjects.add(multiRoute);
        } 



        if (checking == 1){
            doc.getElementById('save_itinerary').innerHTML = "Сохранить маршрут"
            save_itenerary_func(doc)
        }

    }

    let place_delet = 0;

    function between_places(){
        let one = objectManager_Points.objects.getById(openMarker).geometry.coordinates
        let sum = Math.sqrt((one[0] - first_coord[0])**2 + (one[1] - first_coord[1])**2)
        let num = 1
        let min = sum

        for (let i = 1; i < referencePoints.length; i++){
            sum = Math.sqrt((one[0] - referencePoints[i][0])**2 + (one[1] - referencePoints[i][1])**2)
            if (min > sum){
                min = sum
                num = i
            }
        }
        return num
    }

    function AddToMas(){
        if (referencePoints.includes(places[openMarker][2])){
            return;
        }


        let i = 0;
        let num = referencePoints.length-1

        if (referencePoints.length == 1){
            i=1;
            doc.getElementById('info_last_place').classList.remove('nons');
            doc.getElementById('info_buttons').classList.remove('nons');
            doc.getElementById('distance').classList.remove('nons');
            doc.getElementById('duration').classList.remove('nons');

            referencePoints.push(places[openMarker][2])
            place = openMarker
        } else {

            num = between_places()

            referencePoints.splice(num, 0, places[openMarker][2])
            multiRoute.destroy();
        }

        if (i == 0){

            second_referencePoints.splice(num-1, 0, openMarker)
        } else {
            second_referencePoints.length = 0
        }
        
        create();
    }

    function save_itenerary_func(doc) {
        if (user_name != 'AnonymousUser'){
            let element = doc.getElementById('save_itinerary')
            element.addEventListener('click', function (event) {
                checking = 1
                let coder_data = user_info[0][0] + ';' + second_referencePoints.join(';') + ";" + place + ';' + user_info[1].join(';')
                zapros(coder_data)
                doc.getElementById(this.id).innerHTML = "Маршрут сохранен"
            }, {once:true})
        }

    }

    function chekcing_send(doc) {
        save_itenerary_func(doc)

        if (id_map == 'map_mobile') {
            doc.getElementById('destroy_button_map').addEventListener('click', function(event){
                AddToMas()

                document.getElementById('mobile_map_menu').classList.toggle('nons')
            
            })
        } else {
            doc.getElementById('destroyButton').addEventListener('click', function(event){
                AddToMas()
            })
        }


        doc.getElementById('clearMap').addEventListener('click', function(event){
            this.classList.add('nons')
            multiRoute.destroy();

            second_referencePoints.length = 0

            referencePoints = [referencePoints[0], referencePoints[referencePoints.length-1]]
            create()
      })
    }


    function check(){
        chekcing_send(document)
    }


    let myPlacemark

    function createPlacemark(coords) {
        return new ymaps.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#greenDotIconWithCaption',
            draggable: true
        });
    }

    function getAddress(coords) {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        ymaps.geocode(coords).then(function (res) {
            var firstGeoObject = res.geoObjects.get(0);
            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });
            user_map_place = regions_dict[firstGeoObject.getAdministrativeAreas()[0]]
        });
    }

    let user_map_place

    function create_grag_point(coords) {
        // map.setZoom(15)
        doc.getElementById('locale_input').value = coords;
        // Если метка уже создана – просто передвигаем ее.
        if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
        }
        // Если нет – создаем.
        else {
            myPlacemark = createPlacemark(coords);
            map.geoObjects.add(myPlacemark);
            doc.getElementById('locale_input').value = coords;
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add('dragend', function () {
                doc.getElementById('locale_input').value = coords;
                getAddress(myPlacemark.geometry.getCoordinates());
                document.getElementById('region_input').value = user_map_place
            });
        }
        getAddress(coords);
        document.getElementById('region_input').value = user_map_place
    }

    function listening_click_on_map(coord=false){
        if (coord != false) {
            create_grag_point(coord)
        } 
        map.events.add('click', function (e) {
            document.getElementById('get_user_place').classList.remove('nons')
            document.getElementById('destroyButton').classList.add('nons')
            document.getElementById('info_last_place').classList.add('nons')
            create_grag_point(e.get('coords'))
        });


    }
    


    function listening_click_on_point(doc){
        let all_elements = doc.querySelectorAll(".number_button")
        all_elements.forEach(function(elem) {
           elem.onmouseout = function(event) {
               let id = this.id.slice(4)
               if (index_button == id){
                    doc.getElementById('image_'+id).classList.add('nons')
                }
            }
           elem.onmouseover = function(event) {
               let id = this.id.slice(4)
               if (index_button == id){
                    doc.getElementById('image_'+id).classList.remove('nons')
               }
             };
           elem.addEventListener('click', function(event){
                let id = this.id
                let width_points = document.getElementById('nubmers_buttons').offsetWidth;
                let width_point = document.getElementById('first').offsetWidth;

                if (['last', 'first'].includes(id)){
                    if (id == 'last'){
                        $('#nubmers_buttons').animate({ scrollLeft: width_points+width_point}, 'slow')
                    } else {
                        $('#nubmers_buttons').animate({ scrollLeft: 0}, 'slow')
                    }
                    
                    deleter = 0
                } else {
                    id = id.slice(4)

                    $('#nubmers_buttons').animate({ scrollLeft: width_point*(id.slice(-1)-2) }, 'slow')

                    if (deleter == id){
                        
                        second_referencePoints.splice(id-1, 1)
                        multiRoute.destroy();
                    
                        referencePoints.splice(id, 1)
                        create()
                        deleter = 0
                        return
                    } else{
                        deleter = id
                    }

                }
    
                rePlace_1(id)
           })
    
        })
    }
    
 {

}
}

let orientations
let doc = document; 

ymaps.ready(init);


