import { Injector, Injectable } from '@furystack/inject'
import { debounce, ObservableValue } from '@furystack/utils'
import { CommandProvider, SuggestionResult } from './command-provider'

@Injectable({ lifetime: 'singleton' })
export class CommandPaletteManager {
  public isOpened = new ObservableValue(false)
  public isLoading = new ObservableValue(false)
  public term = new ObservableValue('')
  public selectedIndex = new ObservableValue(0)
  public currentSuggestions = new ObservableValue<SuggestionResult[]>([])

  public keyPressListener = ((ev: KeyboardEvent) => {
    if (ev.key && ev.key.toLowerCase() === 'p' && ev.ctrlKey) {
      this.isOpened.setValue(true)
      this.currentSuggestions.setValue([])
    }
    if (ev.key === 'Escape') {
      this.isOpened.setValue(false)
    }
  }).bind(this)

  public element?: HTMLElement
  public clickOutsideListener = ((ev: MouseEvent) => {
    if (
      this.element &&
      this.isOpened.getValue() &&
      (ev.target as HTMLElement).closest(this.element.tagName) !== this.element
    ) {
      this.isOpened.setValue(false)
    }
  }).bind(this)

  public dispose() {
    window.removeEventListener('keyup', this.keyPressListener)
    window.removeEventListener('click', this.clickOutsideListener)
  }

  public selectSuggestion(injector: Injector, index: number = this.selectedIndex.getValue()) {
    const selectedSuggestion = this.currentSuggestions.getValue()[index]
    this.isOpened.setValue(false)
    selectedSuggestion.onSelected({ injector })
  }

  private lastGetSuggestionOptions?: { injector: Injector; term: string }
  public getSuggestion = debounce(async (options: { injector: Injector; term: string }) => {
    try {
      if (this.lastGetSuggestionOptions?.term === options.term) {
        return
      }
      this.isLoading.setValue(true)
      this.lastGetSuggestionOptions = options
      this.currentSuggestions.setValue([])
      this.selectedIndex.setValue(0)
      await Promise.all(
        this.commandProviders.map(async (cp) => {
          const value = await cp(options)
          if (this.lastGetSuggestionOptions === options) {
            this.currentSuggestions.setValue([...this.currentSuggestions.getValue(), ...value].sortBy('score'))
          }
        }),
      )
    } finally {
      this.isLoading.setValue(false)
    }
  }, 250)

  constructor(private readonly commandProviders: CommandProvider[]) {
    window.addEventListener('keyup', this.keyPressListener, true)
    window.addEventListener('click', this.clickOutsideListener, true)
  }
}
