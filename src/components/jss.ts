import { create as createJss, SheetsRegistry } from 'jss'
import preset from 'jss-preset-default'


// create isolated JSS instance without random id generation
export const jss = createJss({
    createGenerateId: () => (rule) => rule.key
})
jss.setup(preset())


// export style sheets for SSR support
export const sheets = new SheetsRegistry()
