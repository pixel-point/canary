import React, { useEffect, useState } from 'react'
import { RouteDestinations } from './RouteDestinations'
import { Color, Theme, ThemeProperties } from './utils/Constants'
import { CanvasStoreProvider } from './framework/CanvasStore/CanvasStoreContext'

import css from './App.module.scss'

export const App: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(true)
  const theme = Theme.DARK

  useEffect(() => {
    setChecked(theme === Theme.DARK)
  }, [theme])

  useEffect(() => {
    /* Sets css root variables */
    document.documentElement.style.setProperty(
      ThemeProperties.PRIMARY_COLOR.valueOf(),
      checked ? Color.BLACK.valueOf() : Color.WHITE.valueOf()
    )
    document.documentElement.style.setProperty(
      ThemeProperties.SECONDARY_COLOR.valueOf(),
      checked ? Color.WHITE.valueOf() : Color.BLACK.valueOf()
    )
    document.documentElement.style.setProperty(
      ThemeProperties.PRIMARY_HOVER_BG_COLOR.valueOf(),
      checked ? Color.BLUE500.valueOf() : Color.GREY200.valueOf()
    )
    document.documentElement.style.setProperty(
      ThemeProperties.SECONDARY_HOVER_BG_COLOR.valueOf(),
      checked ? Color.BLUE200.valueOf() : Color.GREY100.valueOf()
    )
  }, [checked])

  return (
    <div className={css.main}>
      <CanvasStoreProvider>
        <RouteDestinations />
      </CanvasStoreProvider>
    </div>
  )
}
