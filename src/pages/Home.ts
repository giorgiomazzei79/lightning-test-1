import { Lightning, Router } from '@lightningjs/sdk'
import { getAll } from '../api/country'
import CountryCard, { Item, CountryCardTemplateSpec, CountryCardTypeConfig } from '../components/CountryCard'
import styles from '../styles'
import Navbar from '../widgets/Navbar'

interface HomePageTemplateSpec extends Lightning.Component.TemplateSpec {
  _index: number
  _columns: number
  _countries: Array<unknown>

  Items: Record<string, unknown>
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
        y: Navbar.totalHeight,
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

  _countries: unknown[] = []

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Items = this.tag('Items')!

  get Items() {
    return this._Items
  }

  async getAllCountries(): Promise<void> {
    this._countries = await getAll()

    this.Items.children = this._countries.map((country: unknown, index: number) => ({
      type: CountryCard,
      flexItem: {
        marginLeft: index % this._columns !== 0 ? CountryCard.cardHorizontalOffset : 0,
        marginBottom: CountryCard.cardVerticalOffset,
      },
      item: country,
      signals: {
        _cardEnterHandler: '_cardEnterHandler',
      },
    }))

    this._refocus()
  }

  override _setup() {
    this.getAllCountries()
  }

  get focusedItem() {
    return (this.Items.children[this._index] as Lightning.Component<CountryCardTemplateSpec, CountryCardTypeConfig>)
  }

  override _getFocused() {
    return this.focusedItem
  }

  override _handleUp() {
    if (this._index <= 5) {
      Router.focusWidget('Navbar')
    } else if (this._index - this._columns >= 0) {
      this._index -= this._columns
      this.animateToSelected()
    }
    return true
  }

  override _handleRight() {
    if (this._index + 1 < this._countries.length) {
      this._index += 1
      this.animateToSelected()
    }
    return true
  }

  override _handleDown() {
    if (this._index + this._columns < this._countries.length - 1) {
      this._index += this._columns
      this.animateToSelected()
    }
    return true
  }

  override _handleLeft() {
    if (this._index > 0) {
      this._index -= 1
      this.animateToSelected()
    }
    return true
  }

  override _active() {
    if (this.focusedItem) {
      this.patch({
        y: -this.focusedItem.finalY || 0,
      })
    }
  }

  animateToSelected() {
    if (this.focusedItem) {
      this.patch({
        smooth: {
          y: -this.focusedItem.finalY,
        },
      })
    }
  }

  _cardEnterHandler(item: Item) {
    const { cioc } = item

    Router.navigate(`country/${cioc}`)
  }
}
