var net = require('net')

// process.on('uncaughtException', function(err) {
//     console.log('Caught exception: ' + err)
// })

var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/

var addr = {
    from: addrRegex.exec(process.argv[2]),
    to: addrRegex.exec(process.argv[3])
};

if (!addr.from || !addr.to) {
    console.log('Usage: <from> <to>')
    return
}

net.createServer(function(from) {
    var to = net.createConnection({ host: addr.to[2], port: addr.to[3] })
    from.on('error', err => console.log('from error', err.message)).pipe(to)
    to.on('error', err => console.log('from error', err.message)).pipe(from)
}).listen(addr.from[3], addr.from[2]);
