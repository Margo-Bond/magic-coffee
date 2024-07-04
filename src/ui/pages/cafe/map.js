import Pin from "../../../assets/images/pin-cafe.svg"

document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.container');
    container.setAttribute("id", "map");

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.top = "0";
    container.style.left = "0";
    container.style.position = "absolute";

    console.log(container)

    console.log("Yandex Maps API loading...");
    ymaps.ready(() => {
        try {
            console.log("Yandex Maps API loaded successfully.");
            const map = new ymaps.Map(document.getElementById('map'), {
                center: [53.76276163364722, -1.7446288889196655],
                zoom: 13
            });
            console.log("Map initialized:", map);
            let createPlacemark = function (markerId, coord1, coord2, markerImage) {
                let placemark = new ymaps.GeoObject({ geometry: { type: "Point", coordinates: [+coord1, +coord2] } }, {
                    iconLayout: 'default#image',
                    iconImageHref: markerImage,
                    iconImageSize: [35, 46],
                    iconImageOffset: [-5, -38]
                });

                console.log('OK', placemark)

                map.geoObjects.add(placemark);
            }

            // Вызов функции для создания метки
            createPlacemark('marker1', 53.79418191555254, -1.7527547668503962, '${Pin}');
            createPlacemark('marker2', 53.77187768361212, -1.7307664992830152, '${Pin}');
            createPlacemark('marker3', 53.80100601337673, -1.755208439810188, '${Pin}');
        } catch (error) {
            console.error("Error initializing the map:", error);
        }
    });
});

