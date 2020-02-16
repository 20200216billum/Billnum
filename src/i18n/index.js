import Vue from 'vue'
import VueI18n from 'vue-i18n';

import zhlocale from './lang/Chinese.js'
import enlocale from './lang/English.js'
import Twlocale from './lang/TwChinese.js'


import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import twlocale from 'element-ui/lib/locale/lang/zh-TW'


Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: "Chinese",    // 语言标识
    messages: {
        // 'Chinese': require('./lang/Chinese.js'),   // 中文语言包
        // 'English': require('./lang/English.js')    // 英文语言包
        'Chinese':Object.assign(zhlocale,zhLocale),
        'English':Object.assign(enlocale,enLocale),
        'TwChinese':Object.assign(Twlocale,twlocale),
    },
});


export default  i18n