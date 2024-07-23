// the layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom, ...)
export type Direction = 'TB' | 'LR' | 'RL' | 'BT'

export type LayoutAlgorithmOptions = {
  direction: Direction
  spacing: [number, number]
}
