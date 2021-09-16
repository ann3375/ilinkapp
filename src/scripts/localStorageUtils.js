export function getLocalStorageValue(selector) {
  if (localStorage.getItem(selector.id)) {
    selector.value = localStorage.getItem(selector.id);
  }
  return;
}
