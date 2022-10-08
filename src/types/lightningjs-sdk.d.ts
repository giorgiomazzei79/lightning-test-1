import '@lightningjs/sdk'
// import Navbar from '../widgets/Navbar'

declare module '@lightningjs/sdk' {
  namespace Lightning {
    namespace Component {
      interface FireAncestorsMap {
        $toggleNegative(): void;
      }
    }
  }
  // TODO fix this
  // namespace Router {
  //   interface CustomWidgets {
  //     Navbar: typeof Navbar
  //   }
  // }
}
