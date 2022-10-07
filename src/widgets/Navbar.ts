import { Lightning, Router } from '@lightningjs/sdk'
import styles from '../styles'

export interface NavBarTemplateSpec extends Lightning.Component.TemplateSpec {
  HomeLink: Record<string, unknown>
  NegativeToggler: Record<string, unknown>
}

export default class Navbar extends Lightning.Component<NavBarTemplateSpec> {
  static selectedTextHighlightStyles = {
    highlight: true,
    highlightOffset: 2,
    highlightColor: 0xffc09d7b,
  }

  static override _template(): Lightning.Component.Template {
    return {
      w: 1920,
      h: Navbar.height,
      rect: true,
      color: 0xfffafafa,
      flex: {
        alignItems: 'center',
        paddingTop: styles.spacing.small,
        paddingRight: styles.spacing.large,
        paddingBottom: styles.spacing.small,
        paddingLeft: styles.spacing.large,
      },

      HomeLink: {
        text: {
          textColor: 0xff333333,
          text: 'Home',
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.height,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false,
        },
      },
      NegativeToggler: {
        shader: null,
        flexItem: {
          marginLeft: styles.spacing.small,
        },
        text: {
          textColor: 0xff333333,
          text: '☀️',
          fontSize: styles.fontSizes.large.size,
          lineHeight: styles.fontSizes.large.height,
          ...Navbar.selectedTextHighlightStyles,
          highlight: false,
        },
      },
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _NegativeToggler = this.tag('NegativeToggler')!

  get NegativeToggler() {
    return this._NegativeToggler
  }

  static height = 60
  static totalHeight = Navbar.height + styles.spacing.small * 2

  focusedChild = 'HomeLink'

  _handleChildFocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: this.focusedChild === 'HomeLink',
        },
      },
      NegativeToggler: {
        text: {
          highlight: this.focusedChild === 'NegativeToggler',
        },
      },
    })
  }

  override _focus() {
    this._handleChildFocus()
  }

  override _unfocus() {
    this.patch({
      HomeLink: {
        text: {
          highlight: false,
        },
      },
      NegativeToggler: {
        text: {
          highlight: false,
        },
      },
    })
  }

  override _handleEnter() {
    if (this.focusedChild === 'HomeLink') {
      Router.navigate('home')
    } else {
      const negativeToggler = this.tag('NegativeToggler')
      const negativeTogglerText = negativeToggler?.text?.text
      negativeToggler?.patch({
        text: {
          text: negativeTogglerText === '☀️' ? '🌙' : '☀️',
        },
      })
      this.fireAncestors('$toggleNegative')
    }
  }

  override _handleRight() {
    if (this.focusedChild === 'HomeLink') {
      this.focusedChild = 'NegativeToggler'
    }
    this._handleChildFocus()
  }

  override _handleLeft() {
    if (this.focusedChild === 'NegativeToggler') {
      this.focusedChild = 'HomeLink'
    }
    this._handleChildFocus()
  }

  override _handleDown() {
    Router.focusPage()
  }
}
