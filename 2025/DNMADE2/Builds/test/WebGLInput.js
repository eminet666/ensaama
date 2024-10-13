var enableDeviceMotion = function() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
        .then(function(permissionState) {
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', function(event) {
                    // L'accéléromètre est maintenant accessible
                    console.log("Accéléromètre activé");
                });
            } else {
                console.log("Permission refusée pour l'accéléromètre");
            }
        })
        .catch(console.error);
    } else {
        // Si l'autorisation n'est pas nécessaire (Android), écoute directement
        window.addEventListener('devicemotion', function(event) {
            console.log("Accéléromètre activé sans permission");
        });
    }
};

enableDeviceMotion(); // Appel immédiat
