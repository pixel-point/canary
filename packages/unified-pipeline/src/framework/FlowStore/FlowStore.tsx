// store.ts
import { create } from 'zustand'
import { Node, Edge } from 'reactflow'
import { getNodeById } from '../../components/Canvas/utils/NodeUtils'
import { set as _set } from 'lodash-es'
import { DefaultNodeProps } from 'components/Canvas/types'

interface FlowState {
  nodes: Node[]
  edges: Edge[]
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  addEdge: (edge: Edge) => void
  addEdges: (edges: Edge[]) => void
  deleteElements: (elementIds: string[]) => void
  updateNodes: (updatedNodes: Node[], notifyParent?: boolean) => void
  notifyParentNode: (childNode: Node) => void
  updateEdges: (updatedEdges: Edge[]) => void
}

const useFlowStore = create<FlowState>((set, get) => ({
  /* Nodes */
  nodes: [],
  setNodes: nodes => set({ nodes }),
  addNode: node => set(state => ({ nodes: [...state.nodes, node] })),
  updateNodes: (updatedNodes, notifyParent) => {
    set(state => ({
      nodes: state.nodes.map(node => updatedNodes.find(updatedNode => updatedNode.id === node.id) || node)
    }))
    if (notifyParent) {
      updatedNodes.forEach(node => get().notifyParentNode(node))
    }
  },
  /* Edges */
  edges: [],
  addEdge: edge => set(state => ({ edges: [...state.edges, edge] })),
  addEdges: edges => set(state => ({ edges: [...state.edges, ...edges] })),
  setEdges: edges => set({ edges }),
  updateEdges: updatedEdges => {
    set(state => ({
      edges: state.edges.map(edge => updatedEdges.find(updatedEdge => updatedEdge.id === edge.id) || edge)
    }))
  },
  /* Common */
  deleteElements: elementIds => {
    set(state => ({
      nodes: state.nodes.filter(node => !elementIds.includes(node.id)),
      edges: state.edges.filter(edge => !elementIds.includes(edge.id))
    }))
  },
  /* Notify Parent Node */
  notifyParentNode: updatedChildNode => {
    const state = get()
    if (updatedChildNode && updatedChildNode.parentNode) {
      const parentNode = getNodeById(state.nodes, updatedChildNode.parentNode)
      if (parentNode) {
        const updatedParentNode = _set(
          parentNode,
          'data.hasChanged',
          !(parentNode.data as DefaultNodeProps)?.hasChanged
        )
        set(state => ({
          nodes: state.nodes.map(node => (node.id === parentNode.id ? updatedParentNode : node))
        }))
      }
    }
  }
}))

export default useFlowStore
