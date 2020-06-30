const net = require('net')
const addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/
const addr = {
    from: addrRegex.exec(process.argv[2]),
    to: addrRegex.exec(process.argv[3])
}

process.on('uncaughtException', err => {
    console.log('Caught exception: ' + err.message)
})

if (!addr.from || !addr.to) {
    console.log('Usage: <from> <to>')
    return
}

net.createServer(from => {
    const to = net.createConnection({ host: addr.to[2], port: addr.to[3] })
    from.on('error', err => console.log('from error', err.message)).pipe(to)
    to.on('error', err => console.log('to error', err.message)).pipe(from)
}).listen(addr.from[3], addr.from[2])

console.log('Proxy from', addr.from['input'], 'to', addr.to['input'])
