const Reverso = require('reverso-api')
const reverso = new Reverso()

String.prototype.extract = function (prefix, suffix) {
  s = this
  var i = s.indexOf(prefix)
  if (i >= 0) {
    s = s.substring(i + prefix.length)
  } else {
    return ''
  }
  if (suffix) {
    i = s.indexOf(suffix)
    if (i >= 0) {
      s = s.substring(0, i)
    } else {
      return ''
    }
  }
  return s
}

reverso
  .getSpellCheck(window.getSelection().toString(), 'French')
  .then(response => {
    let result = ''
    for (const fault of response) {
      const word = fault.explanation.extract('#!', '#$')
      result += word + '\n'
    }
    return alert(result)
    // return alert(JSON.stringify(response))
  })
  .catch(err => {
    return alert('error : ' + err + '\n' + JSON.stringify(err))
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

[
   {
      "id":0,
      "text":"je fait des fautes pas bonnne",
      "type":"Grammar",
      "explanation":"#!fait#$ : dans ce contexte, la forme correcte est #!fais#$.",
      "corrected":"fais",
      "full_corrected":"je fais des fautes pas bonne"
   },
   {
      "id":1,
      "text":"je fait des fautes pas bonnne",
      "type":"Spelling",
      "explanation":"#!bonnne#$ : mot inconnu de nos dictionnaires automatiquement remplacé par #!bonne#$.",
      "corrected":"bonne",
      "full_corrected":"je fais des fautes pas bonne"
   }
]
*/
