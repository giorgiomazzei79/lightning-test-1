import '@lightningjs/sdk'

declare module '@lightningjs/sdk' {
  namespace Lightning {
    namespace Component {
      interface FireAncestorsMap {
        $toggleNegative(): void;
      }
    }
  }
}
