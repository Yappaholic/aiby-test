import de from "./de.json";
import en from "./en.json";
import es from "./es.json";
import fr from "./fr.json";
import ja from "./ja.json";
import pt from "./pt.json";

// Каждый язык в опциях поиска соответствует своему json файлу
export const languagesMap = new Map([
  ["en", en],
  ["es", es],
  ["ja", ja],
  ["de", de],
  ["fr", fr],
  ["pt", pt],
]);
