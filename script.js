const lineHeight = 3.625;
const lineHeightUnits = 'rem';
const MAX_HOVERABLE_SIZE = 200
const MAX_SMALL_HOVERABLE_SIZE = 120
// main text animation
anime({
  targets: "#animated-products > span",
  duration: 8000,
  easing: "easeInOutQuint",
  loop: true,
  keyframes: [
    { translateY: -lineHeight + lineHeightUnits, delay: 400 },
    { translateY: -lineHeight * 2 + lineHeightUnits, delay: 400 },
    { translateY: -lineHeight * 3 + lineHeightUnits, delay: 400 },
    { translateY: -lineHeight * 4 + lineHeightUnits, delay: 400 },
    { translateY: -lineHeight * 5 + lineHeightUnits, delay: 400 },
  ]
})

function getOffsetToHoverCard(elem) {
  if (elem == null) {
    console.log('null')
  }
  const classList = elem.classList
  if (classList.contains('card') && classList.contains('hoverable')) {
    return [0, 0]
  }

  let x = elem.offsetLeft
  let y = elem.offsetTop
  if (elem.offsetParent == null)
    console.log("abouttobenull")

  const [offsetX, offsetY] = getOffsetToHoverCard(elem.offsetParent)

  return [x + offsetX, y + offsetY]
}

function identifyParamsOfTheGradient(elem) {
  let targetSize

  if (elem.classList.contains("small")) {
    targetSize = MAX_SMALL_HOVERABLE_SIZE
  } else {
    targetSize = MAX_HOVERABLE_SIZE
  }

  let ballColor, backgroundColor
  if (elem.classList.contains("white-ball")) {
    ballColor = "var(--super-white-color)"
    backgroundColor = "var(--primary-color)"
  } else {
    backgroundColor = "var(--super-white-color)"
    ballColor = "var(--primary-color)"
  }
  return [targetSize, ballColor, backgroundColor]
}

function makeCardsHighlightable() {
  const cards = document.querySelectorAll('.card.hoverable')
  cards.forEach(elem => {
    let currentAnimation = undefined
    let size = 0
    let x = 0
    let y = 0
    let startTime = 0
    const duration = 100//milliseonds
    let speed = 0

    const [targetSize, ballColor, backgroundColor] = identifyParamsOfTheGradient(elem)

    const sizeChangeCB = () => {
      const elapsed = (Date.now() - startTime) % duration
      startTime = Date.now()

      if (speed > 0) {
        if (size >= targetSize) {
          currentAnimation = window.requestAnimationFrame(() => sizeChangeCB())
          return
        }
      }
      if (speed <= 0) {
        if (size <= 0) {
          elem.style.background = null
          currentAnimation = window.requestAnimationFrame(() => sizeChangeCB())
          return
        }
      }

      const sizeChange = targetSize * elapsed / duration * speed
      size = size + sizeChange
      if (size > targetSize) {
        size = targetSize
      }
      elem.style.background = `radial-gradient(circle at ${x}px ${y}px,  ${ballColor} 0%, ${backgroundColor} calc(0% + ${size}px))`;
      currentAnimation = window.requestAnimationFrame(() => sizeChangeCB())
    }
    sizeChangeCB()
    elem.addEventListener('mouseleave', (event) => {
      speed = -1
    })

    elem.addEventListener("mousemove", (event) => {
      const [offsetX, offsetY] = getOffsetToHoverCard(event.target)
      x = offsetX + parseInt(event.offsetX)
      y = offsetY + parseInt(event.offsetY)
      elem.style.background = `radial-gradient(circle at ${x}px ${y}px, ${ballColor} 0%, ${backgroundColor} calc(0% + ${size}px))`;

      speed = 1
    })
  })

}

makeCardsHighlightable()

// Inputs highlighting
function ensureEmptyInputHighLight() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='email']")
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      checkInputs()
    })
  })
}
ensureEmptyInputHighLight()

function checkInputs() {
  const inputs = document.querySelectorAll("input[type='text'], input[type='email']")
  inputs.forEach(input => {
    if (input.value == '') {
      input.classList.remove('filled-input')
    } else {
      input.classList.add('filled-input')
    }
  })
}

document.querySelector('#reset-button').addEventListener('click', () => {
  setTimeout(checkInputs, 1)
})


// Animate entrance
function animateEntranceServiceCards() {
  const options = {
    threshold: 0.75
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const shouldAddClass = entry.isIntersecting || entry.isVisible
      if (shouldAddClass) {
        switch (entry.target.id) {
          case 'main-service':
            entry.target.classList.add('animate__backInUp', 'visible');
            break
          case 'left-service':
            entry.target.classList.add('animate__backInLeft', 'visible');
            break
          case 'right-service':
            entry.target.classList.add('animate__backInRight', 'visible');
            break
        }
      }
    })
  }, options)

  const elemsToObserve = document.querySelectorAll('.service-card.animatable')
  elemsToObserve.forEach(elem => {
    observer.observe(elem)
  })
}

animateEntranceServiceCards()

// Animate entrance
function animateDoubleSidedBlock() {
  const options = {
    threshold: 0.5,

  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const shouldAddClass = entry.isIntersecting || entry.isVisible
      if (shouldAddClass) {
        if (entry.target.classList.contains('left')) {
          entry.target.classList.add('animate__fadeInLeftBig');
        } else {
          entry.target.classList.add('animate__fadeInRightBig');
        }
      }
    })
  }, options)

  const elemsToObserve = document.querySelectorAll('#prototyping > * ')
  elemsToObserve.forEach(elem => {
    observer.observe(elem)
  })
}

animateDoubleSidedBlock()

// Animate techstack entrance
function animateStackCards() {
  const options = {
    threshold: 0.98,
    margin: '10px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(entry)
      const shouldAddClass = entry.isIntersecting || entry.isVisible
      if (shouldAddClass) {
        entry.target.classList.add('animate__zoomIn', 'visible');
      }
    })
  }, options)

  const elemsToObserve = document.querySelectorAll('.stack-item')
  elemsToObserve.forEach(elem => {
    observer.observe(elem)
  })
}

animateStackCards()

// Animate tags enter
function animateTagsEnter() {
  const options = {
    margin: "100px 0"
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(entry)
      const shouldAddClass = entry.isIntersecting
      if (shouldAddClass) {
        entry.target.classList.add('animate__zoomIn');
      }
    })
  }, options)

  const elemsToObserve = document.querySelectorAll('.team-quality')
  elemsToObserve.forEach(elem => {
    observer.observe(elem)
  })
}

animateTagsEnter()

