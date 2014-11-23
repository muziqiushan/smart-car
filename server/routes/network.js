var http = require('http')

module.exports = function(io) {

  var hardwareConf = require('../config')('hardware')
  // var motors = require('../models/motors')
  
  // var audio = require('../models/audio')
  var shout = require('../models/shout')

  io.on('connection', function(socket) {

    socket.monitor('connected', Date.now())

    socket.on('shout', function(data) {


	var txt = encodeURIComponent(data.content)

	var url = 'http://api.mrtimo.com/Simsimi.ashx?parm=' + txt;

	http.get(url, function(res) {
    		var text = '';

    		res.on('data', function(chunk) {
        		text += chunk;
    		})
    		res.on('end', function() {
        		console.log(text)
			shout.play(text)
    		})
	})


	
      // shout.play(data)
    })

    // audio.on('data', function(data) {
    // })

    /**
     * On car driving control
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    socket.on('hardware:keypress', function(data) {
      var key = data.key
      console.log(key)
      // motors(key)
    })


/*    var session = global.session
    
    if(!session) return

    var roomid = session.roomid || 100

    socket.emit('connected', {
      roomid: roomid
    })*/

    /*var binaryServer = require('binaryjs').BinaryServer
    var wav = require('wav')
    var fileWriter = null

    client.on('stream', function(stream, meta) {
      var fileWriter = new wav.FileWriter('demo.wav', {
        channels: 1,
        sampleRate: 48000,
        bitDepth: 16
      })
      stream.pipe(fileWriter)
      stream.on('end', function() {
        fileWriter.end()
      })
    })

    client.on('close', function() {
      if (fileWriter != null) {
        fileWriter.end()
      }
    })
    */


/*    var fs = require('fs')
    var ws = fs.createWriteStream('audio.wav')

    var stop = false

    socket.on('audio', function(data) {
      !stop && ws.write(JSON.stringify(data.data))
    })

    setTimeout(function() {
      stop = true
      ws.end()
    }, 3000)*/
  })
}
