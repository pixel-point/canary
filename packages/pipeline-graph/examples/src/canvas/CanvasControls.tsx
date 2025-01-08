import { useCanvasContext } from '../../../src/context/canvas-provider'
import { CanvasButton } from './CanvasButton'

export function CanvasControls() {
  const { increase, decrease, fit } = useCanvasContext()

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        left: '10px',
        bottom: '10px',
        rowGap: '10px'
      }}
    >
      <CanvasButton onClick={() => increase()}>+</CanvasButton>
      <CanvasButton onClick={() => decrease()}>-</CanvasButton>
      <CanvasButton onClick={() => fit()}>[]</CanvasButton>
    </div>
  )
}