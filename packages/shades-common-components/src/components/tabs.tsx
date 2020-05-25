import { Shade, createComponent, PartialElement, LocationService } from '@furystack/shades'
import { promisifyAnimation } from '../utils/promisify-animation'

export interface Tab {
  header: JSX.Element
  component: JSX.Element
}

export const Tabs = Shade<
  {
    tabs: Tab[]
    containerStyle?: PartialElement<CSSStyleDeclaration>
    style?: PartialElement<CSSStyleDeclaration>
    activeTab?: number
    onChange?: (page: number) => void
  },
  { activeIndex: number }
>({
  shadowDomName: 'shade-tabs',
  getInitialState: ({ props }) => ({ activeIndex: props.activeTab || 0 }),
  constructed: ({ injector, updateState }) => {
    const locationSubscription = injector.getInstance(LocationService).onLocationChanged.subscribe((loc) => {
      if (loc.hash && loc.hash.startsWith('#tab-')) {
        const page = parseInt(loc.hash.replace('#tab-', ''), 10)
        page && updateState({ activeIndex: page })
      }
    }, true)
    return () => locationSubscription.dispose()
  },
  render: ({ props, getState, updateState }) => {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', ...props.containerStyle }}>
        <div
          className="shade-tabs-header-container"
          style={{ display: 'inline-flex', borderRadius: '5px 5px 0 0', overflow: 'hidden', flexShrink: '0' }}>
          {props.tabs.map((tab, index) => {
            const isActive = index === getState().activeIndex
            const jsxElement = (
              <div
                style={{
                  padding: '1em 2.5em',
                  cursor: 'pointer',
                  transition: 'box-shadow 1s linear',
                  fontWeight: isActive ? 'bolder' : 'inherit',
                  background: isActive ? '#2a2a2a' : '#222',
                }}
                onclick={() => {
                  props.onChange && props.onChange(index)
                  window.history.pushState({}, '', `#tab-${index}`)
                  updateState({ activeIndex: index })
                }}>
                {tab.header}
              </div>
            )

            if (isActive) {
              setTimeout(() =>
                promisifyAnimation(
                  jsxElement,
                  [{ boxShadow: 'none' }, { boxShadow: 'inset 0 -2px 0 rgba(128,128,192,0.9)' }],
                  { duration: 500, fill: 'forwards', easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)' },
                ),
              )
            }

            return jsxElement
          })}
        </div>
        <div className="shade-tabs-header-content" style={props.style}>
          {props.tabs[getState().activeIndex].component}
        </div>
      </div>
    )
  },
})
