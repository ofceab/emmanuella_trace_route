const buildResultTemplate = (info, index) => {
    let _res=`
    <div class="card">
  <div class="card-body">
    <b>Seq</b>: ${index}    ** <b>Bits</b>: ${info.bits}    ** <b>TTL</b>: ${info.ttl}  ** <b>Temps(s)</b>: ${info.time} 
  </div>
</div>
    `
    return _res
}

const buildPinResult = (data) => {
    let index = 1;
    let content=data!=undefined?`<h3>Host : ${data[0].host}</h3>`:'<h3>Host no trouvé</h3>'
    for(var info of data){
        index++
        content+=buildResultTemplate(info, index - 1)
    }
    return content
}

const getPingInfo = async (e) => {
    e.preventDefault();

    const { ip, nPacket, ttl, timeout, packetSize } = e.target;

    const requestQueryString = `host=${ip.value}&packetsNu=${nPacket.value}&packetSize=${packetSize.value}&ttl=${ttl.value}&timeOut=${timeout.value}`

    let res = await fetch(`http://34.229.230.190:8080/ping?${requestQueryString}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    let data = await res.json()
    document.querySelector('.ping-result').innerHTML = buildPinResult([...data.data])
}


const pingForm = document.querySelector('.pingForm')




pingForm.addEventListener('submit', getPingInfo)
