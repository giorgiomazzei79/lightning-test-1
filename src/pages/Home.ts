import { Lightning } from '@lightningjs/sdk'
import styles from '../styles'

interface HomePageTemplateSpec extends Lightning.Component.TemplateSpec {
  /*
    Properties
    ----------
    - Each key must begin with a lower-case letter

    - The value type defines the type of the property

    - Properties should never be marked optional (with `?`) so that TS can enforce that they are implemented in your Component.
   */

  // Simple properties
  // columns: number;
  _index: number
  _columns: number
  // myProperty3: boolean;

  // Content patch property
  // If your Component has a property that accepts a patch object that is sent to `patch()`
  // you can use the `PatchTemplate<ComponentTemplateSpecType>` type.
  // myContentProperty: Lightning.Element.PatchTemplate<Element.TemplateSpecLoose>;

  /*
    Children
    --------
    - Each key must begin with an upper-case letter

    - The value type defines what kind of child it is

    - Children should never be marked optional (with `?`) because it is already implied that any child
      defined in the Template Spec may not exist at any given point during the lifetime of the application.
   */

  // Child components are inserted with the Component class type preceeded by `typeof`
  // MyChildComponent: typeof MyChildComponent;

  // Child elements, which contain no children, are inserted with `object`
  // MyChildElementWithNoChildren: object;

  // Child elements, which have children of their own, are inserted with an inline-object type.
  // The same rules that apply to Template Spec children apply to these nested Children.
  Items: Record<string, unknown>
  // MyChildElementWithChildren: {
  //   GrandChild1: typeof MyCoolComponent;
  //   GrandChild2: object;
  //   GrandChild3: {
  //     GreatGrandChild1: object;
  //   };
  // };
}

interface HomePageTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true
}

export default class HomePage
  extends Lightning.Component<HomePageTemplateSpec, HomePageTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<HomePageTemplateSpec>
{
  static override _template(): Lightning.Component.Template<HomePageTemplateSpec> {
    return {
      w: (w) => w,
      flex: {
        direction: 'column',
        padding: styles.spacing.large,
      },
      Items: {
        w: 1920 - styles.spacing.large * 2,
        flex: {
          direction: 'row',
          justifyContent: 'space-between',
          wrap: true,
        },
      },
    }
  }

  _columns = 6

  _index = 0

  // get focusedItem() {
  //   return this.tag("Items").children[this._index];
  // }

  // override _getFocused() {
  //   return this.focusedItem;
  // }

  //   override _handleUp() {
  //  if (this._index - HomePage.columns >= 0) {
  //       this._index -= HomePage.columns;
  //       this.animateToSelected();
  //     }
  //     return true;
  //   }

  // override _handleRight() {
  //   if (this._index + 1 < this._countries.length) {
  //     this._index += 1;
  //     this.animateToSelected();
  //   }
  //   return true;
  // }

  // override _handleDown() {
  //   if (this._index + HomePage.columns < this._countries.length - 1) {
  //     this._index += HomePage.columns;
  //     this.animateToSelected();
  //   }
  //   return true;
  // }

  // override _handleLeft() {
  //   if (this._index > 0) {
  //     this._index -= 1;
  //     this.animateToSelected();
  //   }
  //   return true;
  // }

  // animateToSelected() {
  //   this.patch({
  //     smooth: {
  //       y: -this.focusedItem.finalY,
  //     },
  //   });
  // }
}
