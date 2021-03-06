// collapsible QA section
var collapsibleList = document.getElementsByClassName('collapsible')

function hideOtherCollapse(exceptElement) {
  for (let index = 0; index < collapsibleList.length; index++) {
    let collapseItem = collapsibleList[index]
    let content = collapseItem.nextElementSibling
    let parent = collapseItem.parentElement
    if (exceptElement !== collapsibleList[index]) {
      collapseItem.firstElementChild.classList.remove('active')
      content.style.maxHeight = null
      collapseItem.style.background = null
      parent.style.color = null
    }
  }
}

for (let index = 0; index < collapsibleList.length; index++) {
  collapsibleList[index].addEventListener('click', function() {
    this.firstElementChild.classList.toggle('active')
    let content = this.nextElementSibling
    let parent = this.parentElement
    if (content.style.maxHeight) {
      content.style.maxHeight = null
      this.style.background = null
      parent.style.color = null
    } else {
      content.style.maxHeight = content.scrollHeight + 'px'
      this.style.background = '#E0E0E0'
      parent.style.color = '#0B667E'
      hideOtherCollapse(this)
    }
  })
}

setTimeout(function() {
  collapsibleList[0].click()
}, 500)

// carousel branch
var current = 0

var positions = {
  front: 'rotateY(0deg) translateZ(250px)',
  right: 'rotateY(77deg) translateZ(140px)',
  back: 'rotateY(0deg) translateZ(100px)',
  left: 'rotateY(-77deg) translateZ(140px)',
}

function carousel(prevButton, nextButton) {
  let cards = Array.from(document.querySelectorAll('.major-card'))

  let positionList = [
    positions.front,
    positions.right,
    positions.back,
    positions.left,
  ]

  function changeStyle() {
    cards.map((each, index) => {
      each.style.transform = positionList[index]
      if (positions.front === positionList[index]) {
        each.style.zIndex = '10'
      } else {
        each.style.zIndex = null
      }
    })
  }

  function next() {
    current = (current + 1) % 4
    current = current === -1 ? 3 : current
    positionList.splice(0, 0, positionList.pop())
    changeStyle()
  }

  function prev() {
    current = (current - 1) % 4
    current = current === -1 ? 3 : current
    positionList.push(positionList.shift())
    changeStyle()
  }
  function addSwipe() {
    const sw = document.getElementById('swipeable')
    let status = {
      onMove: false,
    }
    sw.addEventListener('touchstart', e => {
      status.onMove = true
      status.x = e.changedTouches[0].pageX
      status.timeStamp = e.timeStamp
    })
    sw.addEventListener('touchend', e => {
      if (status.onMove) {
        status.onMove = false
        const distanceX = e.changedTouches[0].pageX - status.x
        status.x = 0
        const isMobileSize = window.innerWidth <= 576
        const isSwipeIn100MilliSeconds = e.timeStamp - status.timeStamp > 100
        const isDistanceMorethan40px = Math.abs(distanceX) > 40
        if (isMobileSize && isSwipeIn100MilliSeconds && isDistanceMorethan40px) {
          if (distanceX > 0) {
            prev()
          } else {
            next()
          }
        }
        status.timeStamp = 0
      }
    })
  }
  this.init = function() {
    document.querySelector('.major-card.is-1').style.zIndex = '10'
    prevElement = document.querySelector(prevButton)
    nextElement = document.querySelector(nextButton)
    prevElement.addEventListener('click', prev)
    nextElement.addEventListener('click', next)
    addSwipe()
  }
}

let branchCarousel = new carousel('#major-left', '#major-right')
branchCarousel.init()

// flip card

function getViewport() {
  var viewPortWidth
  var viewPortHeight

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    ;(viewPortWidth = window.innerWidth), (viewPortHeight = window.innerHeight)
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement != 'undefined' &&
    typeof document.documentElement.clientWidth != 'undefined' &&
    document.documentElement.clientWidth != 0
  ) {
    ;(viewPortWidth = document.documentElement.clientWidth),
      (viewPortHeight = document.documentElement.clientHeight)
  }

  // older versions of IE
  else {
    ;(viewPortWidth = document.getElementsByTagName('body')[0].clientWidth),
      (viewPortHeight = document.getElementsByTagName('body')[0].clientHeight)
  }
  return [viewPortWidth, viewPortHeight]
}

let viewDetailButtons = Array.from(document.querySelectorAll('.side.front'))

let majorCards = Array.from(document.querySelectorAll('.major-card'))

majorCards.map(each => {
  each.addEventListener(
    'click',
    function(event) {
      if (event.target.name === 'view-question') return event.preventDefault()
      viewDetail(this)
    },
    false,
  )
})

function viewDetail(element) {
  const branches = {
    0: 'content',
    1: 'design',
    2: 'marketing',
    3: 'programming',
  }
  const [widthViewport, height] = getViewport()
  selectedBranch = element.getAttribute('data-branch')
  if (widthViewport < 576 && branches[current] !== selectedBranch) return

  element.classList.toggle('active')
}

// detect click outside card it will hide
document.addEventListener('click', function(event) {
  if (
    !event.target.closest('.major-card') &&
    !event.target.closest('.modal-container')
  ) {
    majorCards.map(each => {
      each.classList.remove('active')
    })
  }

  // handle click outside navbar
  if (!event.target.closest('nav')) {
    let navButton = document.querySelector('.navicon-button')
    let navList = document.querySelector('.nav-list')
    navButton.classList.remove('open')
    navList.classList.remove('show')
  }
})

// toggle button
document.querySelector('.navicon-button').addEventListener('click', function() {
  this.classList.toggle('open')
  document.querySelector('.nav-list').classList.toggle('show')
})

// major branch
var viewQuestionButtons = document.querySelectorAll('.view-question-button')
var modals = document.querySelectorAll('.modal-container')

for (let index = 0; index < viewQuestionButtons.length; index++) {
  viewQuestionButtons[index].addEventListener('click', function() {
    let target = this.getAttribute('data-target')
    document.getElementById(target).classList.toggle('show')
  })
}

var closeModalButtons = document.querySelectorAll('.close-modal')

for (let index = 0; index < closeModalButtons.length; index++) {
  closeModalButtons[index].addEventListener('click', function() {
    let target = this.getAttribute('data-target')
    document.getElementById(target).classList.remove('show')
  })
}

for (let index = 0; index < modals.length; index++) {
  modals[index].addEventListener('click', function() {
    if (!event.target.closest('.modal-body')) {
      this.classList.toggle('show')
    }
  })
}

// check timeline time
Date.prototype.isAfter = function(anotherDate) {
  return this.getTime() > anotherDate.getTime()
}

var registerStartDate = new Date('1 March 2019 GMT+0700')
var registerEndDate = new Date('20 March 2019 23:59:59 GMT+0700')

var announceStartDate = new Date('24 March 2019 GMT+0700')

var confirmStartDate = new Date('24 March 2019 GMT+0700')
var confirmEndDate = new Date('27 March 2019 23:59:59 GMT+0700')

var campStartDate = new Date('6 April 2019 GMT+0700')
var campEndDate = new Date('8 April 2019 23:59:59 GMT+0700')

var now = new Date()
checkOrders = [
  {
    start: campStartDate,
    end: campEndDate,
    element: 'timeline-camp',
  },
  {
    start: confirmStartDate,
    end: confirmEndDate,
    element: 'timeline-confirm',
  },
  {
    start: announceStartDate,
    end: announceStartDate,
    element: 'timeline-announce',
  },
  {
    start: registerStartDate,
    end: registerEndDate,
    element: 'timeline-register',
  },
]

let active = true
checkOrders.map(each => {
  if (now.isAfter(each.start)) {
    let element = document.getElementById(each.element)
    element.querySelector('.timeline-icon').classList.add('active')
    const isActiveEvent = !now.isAfter(each.end)
    if (active && isActiveEvent) {
      element.firstElementChild.classList.add('active')
      active = false
    }
  }
})

function updateRegisteredUser() {
  const content = document.getElementById('content-card')
  const marketing = document.getElementById('marketing-card')
  const design = document.getElementById('design-card')
  const programming = document.getElementById('programming-card')
  const getText = n => `สมัครแล้ว ${n} คน`
  $.get(
    'https://us-central1-jwcxi-registration.cloudfunctions.net/campers',
  ).then(e => {
    content.innerHTML = getText(e.content)
    marketing.innerHTML = getText(e.marketing)
    design.innerHTML = getText(e.design)
    programming.innerHTML = getText(e.programming)
  })
}

updateRegisteredUser()
