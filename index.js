"use strict"

/** @type {{search: string; lucky?: boolean;}} */
const query = window.location.search
  .substr(1)
  .split("&")
  .map(keyValue => keyValue.split("="))
  .map(([key, value]) => ({
    [decodeURIComponent(key)]: decodeURIComponent(
      value?.replaceAll("+", "%20")
    ),
  }))
  .reduce((previous, current) => ({ ...previous, ...current }), {})

/** @type {HTMLInputElement} */
let input

window.addEventListener("load", async () => {
  input = document.getElementById("input")
  input.value = ""

  setBrightness(JSON.parse(localStorage.getItem("dark") ?? "false"))

  if (!query.search) return

  await setMessage("Step 1", "Type in your question")
  const cursor = makeCursor()
  await move(cursor, input)
  input.focus()
  await write()
  await new Promise(resolve => setTimeout(resolve, 1000))
  input.blur()

  await setMessage("Step 2", "Click on the search button")
  const button = query.lucky
    ? document.getElementById("lucky")
    : document.getElementById("search")
  await move(cursor, button)
  button.focus()
  await new Promise(resolve => setTimeout(resolve, 1000))

  await setMessage("Come on", "Was it really that hard?", "alert-success")
  await new Promise(resolve => setTimeout(resolve, 3000))

  window.location.href = `https://www.google.com/search?${
    query.lucky ? "btnI&" : ""
  }q=${query.search}`
})

function makeCursor() {
  const dark = JSON.parse(localStorage.getItem("dark") ?? "false")

  const cursor = document.createElement("span")
  cursor.className = `bi-cursor-fill text-${dark ? "light" : "dark"}`
  cursor.id = "cursor"
  document.body.appendChild(cursor)
  return cursor
}

/**
 * Move the cursor to the targeted element
 * @param {HTMLSpanElement} cursor
 * @param {HTMLButtonElement} target
 */
async function move(cursor, target) {
  return new Promise(resolve => {
    const diffX =
      target.getBoundingClientRect().left +
      target.clientWidth / 2 -
      cursor.getBoundingClientRect().left
    const diffY =
      target.getBoundingClientRect().top +
      target.clientHeight / 2 -
      cursor.getBoundingClientRect().top

    const steps = 60
    const stepX = diffX / steps
    const stepY = diffY / steps

    let step = 0
    const interval = setInterval(frame, 1000 / 60)

    function frame() {
      if (step >= steps) {
        clearInterval(interval)
        resolve()
      } else {
        step++
        cursor.style.top = (parseFloat(cursor.style.top) || 0) + stepY + "px"
        cursor.style.left = (parseFloat(cursor.style.left) || 0) + stepX + "px"
      }
    }
  })
}

async function write() {
  for (const letter of query.search) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100))
    input.value += letter
    input.scrollLeft = input.scrollWidth
  }
}

/**
 * Set the message box under the search buttons.
 * @param {string} heading
 * @param {string} content
 * @param {string} type
 */
async function setMessage(heading, content, type = "alert-primary") {
  const message = document.getElementById("message")

  message.classList.add("opacity-0")
  await new Promise(resolve => setTimeout(resolve, 300))

  message.classList.remove("alert-primary")
  message.classList.remove("alert-success")
  message.classList.add(type)
  document.getElementById("message-heading").innerText = heading
  document.getElementById("message-content").innerText = content

  message.classList.remove("opacity-0")
  await new Promise(resolve => setTimeout(resolve, 300))
}

function toggleBrightness() {
  const dark = JSON.parse(localStorage.getItem("dark") ?? "false")
  localStorage.setItem("dark", !dark)
  setBrightness(!dark)
}

/**
 * Apply brightness on the page.
 * @param {boolean} dark
 */
function setBrightness(dark) {
  const newbrightness = dark ? "dark" : "light"
  const oldBrightness = dark ? "light" : "dark"

  for (const oldClass of [
    `bg-${oldBrightness}`,
    `navbar-${oldBrightness}`,
    `btn-${oldBrightness}`,
    `border-${oldBrightness}`,
  ]) {
    const newClass = oldClass.replace(oldBrightness, newbrightness)
    for (const element of document.querySelectorAll(`.${oldClass}`)) {
      element.classList.remove(oldClass)
      element.classList.add(newClass)
    }
  }

  for (const oldClass of [`text-${newbrightness}`]) {
    const newClass = oldClass.replace(newbrightness, oldBrightness)
    for (const element of document.querySelectorAll(`.${oldClass}`)) {
      element.classList.remove(oldClass)
      element.classList.add(newClass)
    }
  }
}
