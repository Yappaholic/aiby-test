import "./reset.css";
import "./index.css";
import { languagesMap } from "./i18n/index";

let preferedLanguage;

const idMap = new Map([
  ["access", "Get Unlimited <br>Access"],
  ["art", "Unlimited Art <br>Creation"],
  ["styles", "Exclusive <br>Styles"],
  ["avatars", "Magic Avatars <br>With 20% Off"],
  ["yearly-access", "YEARLY ACCESS"],
  ["best-offer", "BEST OFFER"],
  ["per-year", "Just {{price}} per year"],
  ["weekly-access", "WEEKLY ACCESS"],
  ["per-week", "{{price}} <br>per week"],
  ["per-week2", "{{price}} <br>per week"],
  ["terms-of-use", "Terms of Use"],
  ["privacy-policy", "Privacy Policy"],
  ["restore", "Restore"],
  ["continue", "Continue"],
]);

// Ищет ячейку и меняет внутренний текст через id с помощью xpath
// https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Guides/Introduction_to_using_XPath_in_JavaScript
async function setLanguage(key, value) {
  const xpathExpression = `//*[@id="${key}"]`;
  const text = languagesMap.get(preferedLanguage)[value];
  console.log(text);
  const xpathResult = document.evaluate(
    xpathExpression,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  const node = xpathResult.singleNodeValue;
  if (node != null) {
    node.innerHTML = text;
  }
}

// Поиск нужной опции в URL
const searchParams = new URLSearchParams(window.location.search);
const queryLang = searchParams.get("lang");

// Если опция отсутствует в URL/не находится в списке доступных языков,
// основным языком становится английский
if (
  searchParams.size < 1 ||
  queryLang === undefined ||
  !languagesMap.has(queryLang)
) {
  preferedLanguage = "en";
} else {
  preferedLanguage = queryLang;
}

// Меняет lang аттрибут в html элементе
document.documentElement.setAttribute("lang", preferedLanguage);

if (preferedLanguage !== "en") {
  // Для каждого текста внутри сайта делается замена на выбранный язык
  for (const [key, value] of idMap) {
    setLanguage(key, value);
  }
}

const yearlyButton = document.querySelector("#yearly-button");
const weeklyButton = document.querySelector("#weekly-button");

function changeActive(e) {
  const target = e.currentTarget;
  const anotherButton =
    e.currentTarget.id === "yearly-button" ? weeklyButton : yearlyButton;
  if (target.classList.contains("active")) {
    return;
  } else {
    target.classList.toggle("active");
    target.classList.toggle("inactive");
    anotherButton.classList.toggle("inactive");
    anotherButton.classList.toggle("active");
  }
}

yearlyButton.addEventListener("click", (e) => changeActive(e));
weeklyButton.addEventListener("click", (e) => changeActive(e));
