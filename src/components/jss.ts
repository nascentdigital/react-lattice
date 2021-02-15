import { create as createJss } from 'jss'
import preset from 'jss-preset-default'


// create isolated JSS instance without random id generation
export const jss = createJss({
    createGenerateId: () => (rule) => rule.key
})
jss.setup(preset())
