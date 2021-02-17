const Reverso = require('reverso-api')
const reverso = new Reverso()
const FuzzySet = require('fuzzyset')

const USE_EXTERNAL_API = true

const strToCorrect = "Nous n'aurions pas aimé être a sa place !"

console.clear()
main()

async function main () {
  const resp = await fetch(
    'http://localhost:46127/WolLearningContentWebService.txt'
  )
  const text = await resp.text()
  const data = JSON.parse(hexaConverter(text.slice(4).replaceAll("'", '"')))

  const anwserList = await getAnwserFuzzySet(data)
  const anwser = anwserList.get(strToCorrect)[0][1]
  const errorPosition = anwser.indexOf('*')
  console.log(anwser)

  console.log(errorPosition, '^')
  showHTMLAnwser(anwser)
}

async function getAnwserFuzzySet (data) {
  const dataStringList = data.filter(e => Array.isArray(e)).flat()
  const anwserFilteredList = dataStringList
    .filter(e => e.includes('<B>'))
    .filter(e => !e.includes('«'))
    .map(e => e.replaceAll(/<\/?B>/g, '*'))
  return FuzzySet(anwserFilteredList)
}

// let strToCheck = getSentenceToCorrect()
// showAnwser()
function showHTMLAnwser (anwser) {
  const $sentenceOuter = document.querySelector('.sentenceOuter')
  let $anwser = document.querySelector('.ext-explication')
  if (!$anwser) {
    $anwser = document.createElement('p')
    $anwser.className = 'ext-explication'
    $sentenceOuter.parentElement.appendChild($anwser)
  }

  $anwser.innerHTML = anwser
}

function CheckOnReverso (strToCheck) {
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
    })
    .catch(err => {
      return console.warn(err)
    })
}

function getSentenceToCorrect () {
  try {
    return document.querySelector('.sentenceOuter').textContent.trim()
  } catch (e) {
    return window.getSelection().toString()
  }
}

function hexaConverter (str) {
  return str.replace(/\\x([0-9a-f]{1,2})/gi, function (m, c0) {
    return '\\u' + ('0000' + c0).slice(-4)
  })
}

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
