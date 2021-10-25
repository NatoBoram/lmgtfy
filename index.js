"use strict"

/** @type {{search?: string; lucky?: boolean;}} */
// @ts-ignore
const query = window.location.search
  .substr(1)
  .split("&")
  .map(keyValue => keyValue.split("="))
  .map(([key, value]) => ({
    [decodeURIComponent(key)]: decodeURIComponent(value?.replace("+", "%20")),
  }))
  .reduce((previous, current) => ({ ...previous, ...current }), {})

/** @type {HTMLInputElement} */
let input

window.addEventListener("load", async () => {
  // @ts-ignore
  input = document.getElementById("input")
  input.value = ""

  if (!query.search) return

  await setMessage("Step 1", "Type in your search")
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

  await setMessage("Come on", "Was it that hard?", "alert-success")
  await new Promise(resolve => setTimeout(resolve, 3000))

  window.location.href = encodeURI(
    `https://www.google.com/search?q=${query.search}${
      query.lucky ? "&btnI" : ""
    }`
  )
})

function makeCursor() {
  const cursor = document.createElement("span")
  cursor.className = "bi-cursor-fill"
  cursor.id = "cursor"
  document.body.appendChild(cursor)
  return cursor
}

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
  }
}

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

// eslint-disable-next-line no-unused-vars
function onClickSearch() {
  onClickButton(false)
}

// eslint-disable-next-line no-unused-vars
function onClickLucky() {
  onClickButton(true)
}

function onClickButton(lucky = false) {
  if (!input.validity.valid) return
  const url = new URL(window.location.href)
  url.searchParams.set("search", input.value.trim())
  if (lucky) url.searchParams.set("lucky", "true")
  window.location.href = url.href
}
