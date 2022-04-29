const buildResultTemplate = (info, index) => {
    let _res=`
    <div class="card">
  <div class="card-body">
    <b>Seq</b>: ${index}    ** <b>Host</b>: ${info.hopsIpAdress}   ** <b>Time1(ms)</b>: ${info.packetTime[0]}    ** <b>Time2(ms)</b>: ${info.packetTime[1]}  ** <b>Time1(ms)</b>: ${info.packetTime[2]} 
  </div>
</div>
    `
    return _res
}

const buildPinResult = (data) => {
    let index = 1;
    let content=''
    for(var info of data){
        index++
        content+=buildResultTemplate(info, index - 1)
    }
    return content
}

const getTracerouteInfo = async (e) => {
    e.preventDefault();

    const { ip, nbHoublon, protocol, timeOut} = e.target;

    const requestQueryString = `host=${ip.value}&hopsMaxNumber=${nbHoublon.value}&timeOut=${timeOut.value}&protocol=${protocol.value.toLowerCase()}`

    let res = await fetch(`http://34.229.230.190:8080/traceroute?${requestQueryString}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let data = await res.json()
    
    document.querySelector('.traceroute-result').innerHTML = buildPinResult([...data.data])
}


const tracerouteForm = document.querySelector('.tracerouteForm')




tracerouteForm.addEventListener('submit', getTracerouteInfo)
