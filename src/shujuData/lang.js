import store from "../store/index.js";

let langArr = store.state.langArr;
let text = "";

let showLang = (name, locale) => {
    langArr.forEach((val) => {
        if (name == val['zh']) {
            text = val[locale]
        } else {
            val.child.forEach((cld) => {
                if (name == cld['zh']) {
                    text = cld[locale]
                } else {
                    text = name;
                }
            })
        }
    })
    
    return text
}

export default showLang