const defaultLang = "cn";
/* 系统语言列表 */
export const systemLangs =  ['cn', 'en', 'it'];

export const LangConf = { 'cn': '中文', 'en': 'English', 'it': 'Italiano', }

/* 获取语言名称 */
export const getLangName = (lang = localStorage.getItem('lang')) => {
        if(!systemLangs.includes(lang)) lang = defaultLang;
        return LangConf[lang];
}

export const filterLang = (lang) => {
        if(!lang || !systemLangs.includes(lang))  return defaultLang;
        return lang;
}

const  frontLang  = {
	'cn': {
                'role': {1: "拥有者", 3: "管理者", 5: "超级员工", 101: '店铺老板', 105: '店铺员工'},
                'navLabel': { 
                        users: '用户列表', user: '用户', 
                        shops: '店铺列表', shop: '店铺',
                        pds: '产品列表', pd: '产品', 
                        prods: '商品列表', prod: '商品', 
                        categs: '分类列表', categ: '分类', 
                        brands: '品牌列表', brand: '品牌', 
                        setting: '设置',
                },
		'NavBread': { home: '主页', },
                'LangUpdModal': { title: '语言变更', close: '关闭', },
                'UiVariety': { card: '卡片', list: '列表', },
	},
        'en': {
                'role': {1: "owner", 3: "manager", 5: "staff", 101: 'boss', 105: 'worker'},
                'navLabel': { users: 'Users', shops: 'Shops', pds: 'Products', prods: 'Goods', categs: 'Category', brands: 'Brands', setting: 'Setting', },
                'NavBread': { home: 'Home', },
                'LangUpdModal': { title: 'Change Langeuage', close: 'Close', },
                'UiVariety': { card: 'Card', list: 'List', },
        },
        'it': {
                'role': {1: "proprietario", 3: "manager", 5: "personale", 101: 'capo', 105: 'lavoratore'},
                'navLabel': { users: 'Utenti', shops: 'Negozio', pds: 'Prodotto', prods: 'Merce', categs: 'Categoria', brands: 'Marca', setting: 'Impostazioni', },
                'NavBread': { home: 'Home', },
                'LangUpdModal': { title: 'Combia Lingua', close: 'Chiudere', },
                'UiVariety': { card: 'Carta', list: 'Lista', },
        }
}

export const getLang = (langFile, lang = localStorage.getItem('lang')) => {
        lang = filterLang(lang);
        if(frontLang[lang][langFile]) return  frontLang[lang][langFile];
        return {};
}

