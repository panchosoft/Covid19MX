// Vue 3 removed the $on/$off/$emit instance API, so this replaces the
// previous this.$root.$emit/$on pattern used to pass data between
// MexicoMap and StatesList.
const listeners = new Map();

export const eventBus = {
  on(event, handler) {
    const handlers = listeners.get(event) ?? [];
    handlers.push(handler);
    listeners.set(event, handlers);
  },
  emit(event, payload) {
    (listeners.get(event) ?? []).forEach((handler) => handler(payload));
  },
};
