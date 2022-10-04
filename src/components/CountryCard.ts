import { Lightning } from '@lightningjs/sdk'
import styles from '../styles'

interface Item {
  flags: { png: string }
  name: { common: string }
  population: string
  region: string
  capital: string
}

interface DetailsTemplateSpec extends Lightning.Component.TemplateSpec {
  Content: Record<string, unknown>
}

interface CountryCardTemplateSpec extends Lightning.Component.TemplateSpec {
  item: Item

  Image: Record<string, unknown>
  Name: Record<string, unknown>
  Population: DetailsTemplateSpec
  Region: DetailsTemplateSpec
  Capital: DetailsTemplateSpec
}

interface CountryCardSignalMap extends Lightning.Component.SignalMap {
  // eslint-disable-next-line no-unused-vars
  _cardEnterHandler(item: Item): void;
}

interface CountryCardTypeConfig extends Lightning.Component.TypeConfig {
  SignalMapType: CountryCardSignalMap;
}

export default class CountryCard
  extends Lightning.Component<CountryCardTemplateSpec, CountryCardTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<CountryCardTemplateSpec>
{
  static cardWidth: number = styles.spacing.xxlarge
  static cardHeight = 360
  static cardHorizontalOffset = styles.spacing.medium
  static cardVerticalOffset = styles.spacing.large

  item: Item = {
    flags: { png: '' },
    name: { common: '' },
    population: '',
    region: '',
    capital: '',
  }

  static override _template(): Lightning.Component.Template {
    return {
      w: this.cardWidth,
      h: this.cardHeight,
      alpha: 0.7,
      color: 0xffffffff,
      rect: true,
      clipping: true,
      flex: {
        direction: 'column',
      },
      Image: {
        src: null,
        w: (w: number) => w,
        h: 160,
        shader: {
          type: Lightning.shaders.RoundedRectangle,
          radius: 8,
        },
      },
      Info: {
        flex: {
          direction: 'column',
          padding: styles.spacing.small,
        },
        Name: {
          text: {
            fontSize: styles.fontSizes.large.size,
            lineHeight: styles.fontSizes.large.height,
            textColor: 0xff333333,
            fontStyle: 700,
            verticalAlign: 'middle',
          },
        },

        Population: {
          flex: {},
          Label: {
            text: {
              text: 'Population: ',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: '81,770,900',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },

        Region: {
          flex: {},
          Label: {
            text: {
              text: 'Region: ',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: '',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },

        Capital: {
          flex: {},
          Label: {
            text: {
              text: 'Capital: ',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
              fontStyle: 600,
            },
          },
          Content: {
            text: {
              text: '',
              textColor: 0xff333333,
              fontSize: styles.fontSizes.medium.size,
              lineHeight: styles.fontSizes.medium.height,
            },
          },
        },
      },
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Image = this.tag('Image')!

  get Image() {
    return this._Image
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Name = this.tag('Name')!

  get Name() {
    return this._Name
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Population = this.tag('Population')!

  get Population() {
    return this._Population
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Region = this.tag('Region')!

  get Region() {
    return this._Region
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Capital = this.tag('Capital')!

  get Capital() {
    return this._Capital
  }

  override _init() {
    const { flags, name, population, region, capital } = this.item

    console.log(flags)
    console.log(name)
    console.log(population)
    console.log(region)
    console.log(capital)
    if (flags) {
      this.Image.patch({
        src: flags.png,
      })
    }

    this.Name.patch({
      text: {
        text: name.common,
      },
    })

    this.Population.patch({
      Content: {
        text: {
          text: population,
        },
      },
    })

    this.Region.patch({
      Content: {
        text: {
          text: region,
        },
      },
    })

    this.Capital.patch({
      Content: {
        text: {
          text: capital && capital.length > 0 ? capital[0] : '',
        },
      },
    })
  }

  /** Focus */
  override _focus() {
    this.patch({
      smooth: {
        scale: 1.1,
        alpha: 1,
      },
    })
  }

  override _unfocus() {
    this.patch({
      smooth: {
        scale: 1,
        alpha: 0.7,
      },
    })
  }

  /** Signals */
  override _handleEnter() {
    this.signal('_cardEnterHandler', this.item)
  }
}
