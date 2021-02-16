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

let strToCheck
try {
  strToCheck = document.querySelector('.sentenceOuter').textContent.trim()
} catch (e) {
  strToCheck = window.getSelection().toString()
}
// let strToCheck = window.getSelection().toString()
reverso
  .getSpellCheck(strToCheck, 'French')
  .then(response => {
    console.clear()
    if (response.length === 0) {
      console.log("Pas d'erreur détectée")
    } else {
      for (const fault of response) {
        const word = fault.explanation.extract('#!', '#$')
        console.table({
          error: word,
          correction: fault.full_corrected,
          explication: fault.explanation
        })
      }
    }

    return
    // return alert(JSON.stringify(response))
  })
  .catch(err => {
    return console.warn(err)
  })
/*
let explicationElement = document.querySelector('.ext-explication')
    if (!explicationElement) {
      explicationElement = document.createElement('p')
      explicationElement.className = 'ext-explication'
      document
        .querySelector('.sentenceOuter')
        .parentElement.appendChild(explicationElement)
    }

    explicationElement.innerHTML = result

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
