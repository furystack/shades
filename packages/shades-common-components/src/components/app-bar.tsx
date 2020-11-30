import { Shade, createComponent } from '@furystack/shades'
import { ThemeProviderService } from '../services/theme-provider-service'

export const AppBar = Shade({
  shadowDomName: 'shade-app-bar',
  constructed: ({ element }) => {
    const container = element.children[0] as HTMLElement
    requestAnimationFrame(() => {
      container.style.padding = '8px 8px'
      container.style.opacity = '1'
    })
  },
  render: ({ children, injector }) => {
    const themeProvider = injector.getInstance(ThemeProviderService)
    const background = themeProvider.theme.getValue().background.default
    return (
      <div
        style={{
          width: '100%',
          background,
          color: themeProvider.theme.getValue().text.secondary,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          boxShadow: '0 0 12px rgba(0,0,0,0.6)',
          transition:
            'opacity .35s cubic-bezier(0.550, 0.085, 0.680, 0.530), padding .2s cubic-bezier(0.550, 0.085, 0.680, 0.530)',
          padding: '6px 16px',
          opacity: '0',
          overflow: 'hidden',
        }}>
        {children}
      </div>
    )
  },
})
