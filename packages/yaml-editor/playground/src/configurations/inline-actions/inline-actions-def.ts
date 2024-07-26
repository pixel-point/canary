import { YamlEditorProps } from '../../../../src/components/YamlEditor'
import { SelectorType } from '../../../../src/types/selectors'

export const inlineActionExample: YamlEditorProps['inlineActions'] = [
  {
    selectors: [{ type: SelectorType.AbsolutePath, absolutePaths: ['inputs'] }],
    actions: [
      {
        title: 'Manage inputs',
        onClick: data => {
          console.log(data)
        }
      }
    ]
  },
  {
    selectors: [{ type: SelectorType.AbsolutePath, absolutePaths: ['pipeline.stages'] }],
    actions: [
      {
        title: 'Add stage',
        onClick: data => {
          console.log(data)
        }
      }
    ]
  }
]

// import { YamlEditorProps } from "../components/YamlEditor";
// import { SelectorType } from "../types/selectors";

// export const inlineActionExample: YamlEditorProps["inlineActions"] = [
//   {
//     selectors: [
//       { type: SelectorType.AbsolutePath, absolutePaths: [/^inputs/] },
//     ],
//     actions: [
//       {
//         title: "Manage inputs",
//         onClick: (data) => {
//           console.log(data);
//         },
//       },
//     ],
//   },
//   {
//     selectors: [
//       {
//         type: SelectorType.AbsolutePath,
//         absolutePaths: [/^pipeline.stages.\d+/],
//       },
//     ],
//     actions: [
//       {
//         title: "Add stage",
//         onClick: (data) => {
//           console.log(data);
//         },
//       },
//     ],
//   },
// ];
