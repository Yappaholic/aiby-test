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

// Ищет ячейку и меняет внутренний текст через id с помощью xpath
// https://developer.mozilla.org/en-US/docs/Web/XML/XPath/Guides/Introduction_to_using_XPath_in_JavaScript
async function setLanguage(key, value) {
  const xpathExpression = `//*[@id="${key}"]`;
  const xpathResult = document.evaluate(
    xpathExpression,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  );
  let node = xpathResult.singleNodeValue;
  if (node != null) {
    node.innerHTML = value;
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

if (preferedLanguage !== "en") {
  // Получение объекта с текстом сайта в зависимости от выбранного языка
  let lang = languagesMap.get(preferedLanguage);

  // Для каждого текста внутри сайта делается замена на выбранный язык
  for (let key in lang) {
    setLanguage(key, lang[key]);
  }
}
