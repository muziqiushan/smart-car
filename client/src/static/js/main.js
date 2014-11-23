!function(WIN, io) {

    // Init & Share socket
    window.socket = io()

    // Start joystick monitor
    joystick.start(socket, "#joystick", 300)

    // Render audio wave
    ;(new audioWave).init({
        selector: "#audioPanel"
/*        ,
        onUpdate: function(buffer) {
            // console.log(buffer)
            socket.emit("audio", {
                data: buffer
            })
        }*/
    })

    document.querySelector("#testShout").addEventListener("submit", function(e) {
        e.preventDefault()
        var data
/*
        try{
            data = JSON.parse(document.querySelector("#testShoutInput").value)
        }
*/
        data = document.querySelector("#testShoutInput").value.trim()
        //catch(e){}
        data && socket.emit("shout", {type: "t", content: data})
    })

    document.querySelector("#testShoutBtn").addEventListener("click", function(e) {
        
    })
}(window, io)


