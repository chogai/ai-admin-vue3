interface CounterState {
  setting: any;
}

// @ts-ignore
export const useCounter = defineStore("counter", {
  state: (): CounterState => ({
    setting: {},
  }),

  actions: {
    increment() {
      this.setting;
    },
  },
  getters: {
    doubleCount() {
      return this.setting;
    },
  },
  // persist: {
  //     storage: persistedState.cookiesWithOptions({
  //         sameSite: 'strict',
  //     }),
  //     paths: ['setting']
  // }
});
