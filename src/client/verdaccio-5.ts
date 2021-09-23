import { copyToClipboard, formatUsageInfo, init, isLoggedIn } from "./gitlab-oauth"

const usageInfoSelector = "#help-card .MuiCardContent-root span, .MuiDialogContent-root .MuiTypography-root span"
const markerClass = "gitlab-oauth4"

function markUsageInfoNodes() {
  document.querySelectorAll(usageInfoSelector).forEach(node => {
    const infoEl = node as HTMLSpanElement

    if (infoEl.innerText.includes("adduser")) {
      infoEl.classList.add(markerClass)
    }
  })
}

function modifyUsageInfoNodes() {
  const usageInfo = formatUsageInfo()
  const loggedIn = isLoggedIn()

  document.querySelectorAll("." + markerClass).forEach(node => {
    const infoEl = node as HTMLSpanElement
    const parentEl = infoEl.parentElement as HTMLDivElement
    const copyEl = parentEl.querySelector("button") as HTMLButtonElement

    infoEl.innerText = usageInfo

    copyEl.style.visibility = loggedIn ? "visible" : "hidden"
    copyEl.onclick = e => {
      e.preventDefault()
      e.stopPropagation()
      copyToClipboard(usageInfo)
    }
  })
}

function updateUsageInfo() {
  markUsageInfoNodes()
  modifyUsageInfoNodes()
  console.info("verdaccio-gitlab-oauth4 initated!")
}

init({
  loginButton: "#header--button-login, [data-testid='header--button-login']",
  logoutButton: "#header--button-logout, [data-testid='header--button-logout']",
  updateUsageInfo,
})
