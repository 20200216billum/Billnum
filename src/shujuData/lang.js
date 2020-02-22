import store from "../store/index.js";
import VueCookies from 'vue-cookies'

let langArr = store.state.langArr;
let text = "";

let showLang = (name, locale) => {
    let locale2 = VueCookies.get("language");
    // console.log(locale2)
    if (langArr.length == 0) {
        text = name;
    } else {
        langArr.forEach((val) => {
            if (name == val['zh']) {
                text = val[locale2]
            } else {
                val.child.forEach((cld) => {
                    if (name == cld['zh']) {
                        text = cld[locale2]
                    } else {
                        text = name;
                    }
                })
            }
        })
    }

    return text
}

export default showLang