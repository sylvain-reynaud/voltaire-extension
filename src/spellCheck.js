const Reverso = require('reverso-api')
const reverso = new Reverso()

reverso
  .getSpellCheck('helo', 'English')
  .then(response => {
    return alert(JSON.stringify(response))
  })
  .catch(err => {
    return alert(JSON.stringify(err))
  })
/*

  ![
    'Connection',
    'Origin',
    'Sec-Fetch-Dest',
    'Sec-Fetch-Mode',
    'Sec-Fetch-Site'
  ].includes(key)
) {
  // Otherwise add header to the request
  request.setRequestHeader(key, val)
}
*/
