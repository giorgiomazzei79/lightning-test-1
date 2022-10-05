import { Lightning, Router } from '@lightningjs/sdk'
import { getCountry } from '../api/country'
import { Item } from '../components/CountryCard'
import styles from '../styles'

interface BackButtonTemplateSpec extends Lightning.Component.TemplateSpec {
  Label: Record<string, unknown>
}

interface CountryInfoTemplateSpec extends Lightning.Component.TemplateSpec {
  Flag: Record<string, unknown>
  Info: {
    Name: Record<string, unknown>
    Population: {
      Label: Record<string, unknown>
      Content: Record<string, unknown>
    }
    Region: {
      Label: Record<string, unknown>
      Content: Record<string, unknown>
    }
    Capital: {
      Label: Record<string, unknown>
      Content: Record<string, unknown>
    }
    Languages: {
      Label: Record<string, unknown>
      Content: Record<string, unknown>
    }

  }
}

interface CountryPageTemplateSpec extends Lightning.Component.TemplateSpec {
  _country: Item

  BackButton: BackButtonTemplateSpec
  CountryInfo: CountryInfoTemplateSpec
}

interface CountryPageTypeConfig extends Lightning.Component.TypeConfig {
  IsPage: true
}

export default class CountryPage
  extends Lightning.Component<CountryPageTemplateSpec, CountryPageTypeConfig>
  implements Lightning.Component.ImplementTemplateSpec<CountryPageTemplateSpec>
{
  static override _template(): Lightning.Component.Template<CountryPageTemplateSpec> {
    return {
      w: (w) => w,
      flex: {
        direction: 'column',
        padding: styles.spacing.large,
        paddingTop: styles.spacing.large,
      },
      BackButton: {
        texture: Lightning.Tools.getRoundRect(
          200,
          styles.fontSizes.large.height + styles.spacing.xsmall * 2,
          8
        ),
        flex: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: styles.spacing.xsmall,
          paddingRight: styles.spacing.medium,
          paddingBottom: styles.spacing.xsmall,
          paddingLeft: styles.spacing.medium,
        },
        Label: {
          text: {
            text: '←   Back',
            verticalAlign: 'middle',
            fontSize: styles.fontSizes.large.size,
            lineHeight: styles.fontSizes.large.height,
            textColor: 0xff333333,
            fontStyle: '700',
          },
        },
      },

      CountryInfo: {
        flex: {
          justifyContent: 'space-between',
        },
        flexItem: {
          marginTop: styles.spacing.large,
        },
        Flag: {
          w: this.flagWidth,
          h: this.flagHeight,
        },
        Info: {
          flexItem: {
            marginLeft: styles.spacing.large,
          },
          flex: {
            direction: 'column',
            padding: styles.spacing.small,
          },
          Name: {
            text: {
              fontSize: styles.fontSizes.xxxlarge.size,
              lineHeight: styles.fontSizes.xxxlarge.height,
              textColor: 0xff333333,
              fontStyle: '700',
              verticalAlign: 'middle',
            },
          },

          Population: {
            flex: {},
            Label: {
              text: {
                text: 'Population: ',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: '600',
              },
            },
            Content: {
              text: {
                text: '81,770,900',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Region: {
            flex: {},
            Label: {
              text: {
                text: 'Region: ',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: '600',
              },
            },
            Content: {
              text: {
                text: '',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Capital: {
            flex: {},
            Label: {
              text: {
                text: 'Capital: ',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: '600',
              },
            },
            Content: {
              text: {
                text: '',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },

          Languages: {
            flex: {},
            Label: {
              text: {
                text: 'Languages: ',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
                fontStyle: '600',
              },
            },
            Content: {
              text: {
                text: '',
                textColor: 0xff333333,
                fontSize: styles.fontSizes.large.size,
                lineHeight: styles.fontSizes.large.height,
              },
            },
          },
        },
      },
    }
  }

  _country: Item = {
    flags: { png: '' },
    name: { common: '' },
    population: '',
    region: '',
    capital: '',
    cioc: '',
    languages: ''
  }


  /** Class constant */
  static flagWidth = styles.spacing.xxxlarge * 1.5
  static flagHeight = this.flagWidth * 0.64

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Flag = this.tag('CountryInfo.Flag')!

  get Flag() {
    return this._Flag
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Name = this.tag('CountryInfo.Info.Name')!

  get Name() {
    return this._Name
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Population = this.tag('CountryInfo.Info.Population')!

  get Population() {
    return this._Population
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Region = this.tag('CountryInfo.Info.Region')!

  get Region() {
    return this._Region
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Capital = this.tag('CountryInfo.Info.Capital')!

  get Capital() {
    return this._Capital
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _Languages = this.tag('CountryInfo.Info.Languages')!

  get Languages() {
    return this._Languages
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private _BackButton = this.tag('BackButton')!

  get BackButton() {
    return this._BackButton
  }

  /** API */
  async getCountryData(code: string): void {
    this._country = await getCountry(code)

    const { flags, name, population, region, capital, languages } =
      this._country

    if (flags) {
      this.Flag.patch({
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

    this.Languages.patch({
      Content: {
        text: {
          text: Object.values(languages).join(', '),
        },
      },
    })
  }

  override _enable(): void {
    console.log('this[Router.symbols.hash]:', this[Router.symbols.hash])
    const hash: string = this[Router.symbols.hash] || ''
    const regex = /(.+)\//i
    const cioc: string = hash.replace(regex, '')
    this.getCountryData(cioc)
  }

  override _handleEnter(): void {
    this.Flag.patch({
      src: '',
    })

    this.Name.patch({
      text: {
        text: 'Loading...',
      },
    })

    this.Population.patch({
      Content: {
        text: {
          text: '',
        },
      },
    })

    this.Region.patch({
      Content: {
        text: {
          text: '',
        },
      },
    })

    this.Capital.patch({
      Content: {
        text: {
          text: '',
        },
      },
    })

    this.Languages.patch({
      Content: {
        text: {
          text: '',
        },
      },
    })

    Router.navigate('home')
  }

  override _focus(): void {
    this.BackButton.patch({
      texture: Lightning.Tools.getRoundRect(
        200,
        styles.fontSizes.large.height + styles.spacing.xsmall * 2,
        8,
        4,
        0xffc09d7b,
        false,
        0
      ),
    })
  }

  override _unfocus(): void {
    this.BackButton.patch({
      texture: Lightning.Tools.getRoundRect(
        200,
        styles.fontSizes.large.height + styles.spacing.xsmall * 2,
        8,
        4,
        0x00c09d7b,
        false,
        0
      ),
    })
  }
}
