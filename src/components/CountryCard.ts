import { Lightning } from '@lightningjs/sdk'
import styles from '../styles'

interface Item {
  flags: { png: string }
  name: { common: string }
  population: string
  region: string
  capital: string
}

interface CountryCardTemplateSpec extends Lightning.Component.TemplateSpec {
  item: Item
}

export default class CountryCard
  extends Lightning.Component<CountryCardTemplateSpec>
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
      w: CountryCard.cardWidth,
      h: CountryCard.cardHeight,
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

  override _init() {
    const { flags, name, population, region, capital } = this.item

    console.log(flags)
    console.log(name)
    console.log(population)
    console.log(region)
    console.log(capital)
    // if (flags) {
    //   this.tag('Image').patch({
    //     src: flags.png,
    //   })
    // }
    //   this.tag('Name').patch({
    //     text: {
    //       text: name.common,
    //     },
    //   })
    //   this.tag('Population').patch({
    //     Content: {
    //       text: {
    //         text: population,
    //       },
    //     },
    //   })
    //   this.tag('Region').patch({
    //     Content: {
    //       text: {
    //         text: region,
    //       },
    //     },
    //   })
    //   this.tag('Capital').patch({
    //     Content: {
    //       text: {
    //         text: capital && capital.length > 0 ? capital[0] : '',
    //       },
    //     },
    //   })
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
  // override _handleEnter() {
  //   this.signal('_cardEnterHandler', this.item)
  // }
}
