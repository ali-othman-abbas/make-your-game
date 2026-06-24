type Key =
  | "KeyA" | "KeyB" | "KeyC" | "KeyD" | "KeyE" | "KeyF" | "KeyG" | "KeyH" | "KeyI"
  | "KeyJ" | "KeyK" | "KeyL" | "KeyM" | "KeyN" | "KeyO" | "KeyP" | "KeyQ" | "KeyR"
  | "KeyS" | "KeyT" | "KeyU" | "KeyV" | "KeyW" | "KeyX" | "KeyY" | "KeyZ"
  | "Digit0" | "Digit1" | "Digit2" | "Digit3" | "Digit4"
  | "Digit5" | "Digit6" | "Digit7" | "Digit8" | "Digit9"
  | "Backquote" | "Minus" | "Equal" | "BracketLeft" | "BracketRight"
  | "Backslash" | "Semicolon" | "Quote" | "Comma" | "Period" | "Slash"
  | "Space" | "Enter" | "Tab" | "Backspace" | "Escape" | "Delete" | "Insert"
  | "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  | "Home" | "End" | "PageUp" | "PageDown"
  | "ShiftLeft" | "ShiftRight" | "ControlLeft" | "ControlRight"
  | "AltLeft" | "AltRight" | "MetaLeft" | "MetaRight" | "CapsLock"
  | "F1" | "F2" | "F3" | "F4" | "F5" | "F6"
  | "F7" | "F8" | "F9" | "F10" | "F11" | "F12";
const keyPressed = new Set<Key>();
const keyConsumed = new Set<Key>();

window.addEventListener('keydown', e => {
  keyPressed.add(e.code as Key);
})
window.addEventListener('keyup', e => {
  keyPressed.delete(e.code as Key);
  keyConsumed.delete(e.code as Key)
})
export function isKeyDown(k: Key): boolean {
  return keyPressed.has(k)
}

export function wasKeyPressed(k: Key): boolean {
  if (keyPressed.has(k) && !keyConsumed.has(k)) {
    keyConsumed.add(k);
    return true;
  }
  return false;
}

