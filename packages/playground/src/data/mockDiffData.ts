import { MockDiffString, mockDiffStringB } from './mockDiffString'

const fileTitle = 'scm/driver/azure/webhook.go'

export const mockDiffData = [
  {
    text: 'All checks have succeeded',
    numAdditions: 34,
    numDeletions: 36,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'New commit pushed',
    numAdditions: 17,
    numDeletions: 19,
    data: mockDiffStringB,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'Conflicts resolved',
    numAdditions: 9,
    numDeletions: 32,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'All checks have succeeded',
    numAdditions: 2,
    numDeletions: 0,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  { text: 'All checks have succeeded', numAdditions: 34, data: MockDiffString, title: fileTitle, lang: 'ts' },
  {
    text: 'New commit pushed',
    numAdditions: 99,
    numDeletions: 200,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'Conflicts resolved',
    numAdditions: 24,
    numDeletions: 30,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'All checks have succeeded',
    numAdditions: 34,
    numDeletions: 36,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'All checks have succeeded',
    numAdditions: 322,
    numDeletions: 400,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'New commit pushed',
    numAdditions: 29,
    numDeletions: 30,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  },
  {
    text: 'Conflicts resolved',
    numAdditions: 45,
    numDeletions: 76,
    data: MockDiffString,
    title: fileTitle,
    lang: 'ts'
  }
]
