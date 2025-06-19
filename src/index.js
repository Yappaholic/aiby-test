import "./reset.css";
import "./index.css";
import { en, ja, de, fr, pt } from "./i18n/index";

let preferedLanguage = undefined;

// Каждый язык в опциях поиска соответствует своему json файлу
let languagesMap = new Map([
  ["en", en],
  ["ja", ja],
  ["de", de],
  ["fr", fr],
  ["pt", pt],
]);

let idMap = new Map([
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
  let node = xpathResult.singleNodeValue;
  if (node != null) {
    node.innerHTML = text;
  }
}

// Поиск нужной опции в URL
const searchParams = new URLSearchParams(window.location.search);
let queryLang = searchParams.get("lang");

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
  for (let [key, value] of idMap) {
    setLanguage(key, value);
  }
}
