/**
 * Copyright 2022 Dream team. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Return the first element that matches the given selector.
 * @param {string} selector Element selector
 * @returns {Element}
 */
const elt = (selector) => document.querySelector(selector);

/**
 * Return all elements that match the given selector.
 * @param {string} selector Elements selector
 * @returns {Element[]}
 */
const elts = (selector) => document.querySelectorAll(selector);

/**
 * Return a random number between min and max (both included).
 * @param {number} min The minimum value
 * @param {number} max The maximum value
 * @returns
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Removes the given event from the given element.
 * @param {HTMLElement} elem The element to add the event to.
 * @param {string} type The event type.
 * @param {Function} handler The function to call when the event is triggered.
 */
const removeEvent = (elem, type, handler) => {
  if (elem.detachEvent) {
    elem.detachEvent(`on${type}`, handler);
  } else {
    elem.removeEventListener(type, handler);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  elts(".current-year").forEach(el => {
    el.textContent = (new Date()).getFullYear();
  });
});
