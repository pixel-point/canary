import { InputFactory } from '@harnessio/forms'
import { ArrayInput } from '../ArrayInput'
import { BooleanInput } from '../BooleanInput'
import { ListInput } from '../ListInput'
import { NumberInput } from '../NumberInput'
import { TextInput } from '../TextInput'

const inputComponentFactory = new InputFactory()
inputComponentFactory.registerComponent(new TextInput())
inputComponentFactory.registerComponent(new BooleanInput())
inputComponentFactory.registerComponent(new NumberInput())
inputComponentFactory.registerComponent(new ArrayInput())
inputComponentFactory.registerComponent(new ListInput())

export default inputComponentFactory
