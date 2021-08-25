const  confUser  = {
    "role_Arrs": [ 1, 3, 5, 101, 105 ],
    "role": {
        "1": {val: 'ower', en: 'owner', cn: "拥有者"},
        "3": {val: 'mger', en: 'manager', cn: "管理者"},
        "5": {val: 'sfer', en: 'staff', cn: "超级员工"},
        "101": {val: 'bser', en: 'boss', cn: "店铺老板"},
        "105": {val: 'wker', en: 'worker', cn: "店铺员工"},
    },
	"role_obj": {
		owner:		    {num: 1, 	val: "owner",   	en: 'owner',		cn: '拥有者', 	},
		manager:	{num: 3, 	val: "manager", en: 'manager',		cn: '管理者', 	},
		staff:		        {num: 5, 	val: "staff",   	    en: 'staff',		cn: '超级员工',	},
		boss:		      {num: 101, 	val: "boss", 	    en: 'boss',			cn: '店铺老板'	},
		worker:		    {num: 105, 	val: "worker", 	en: 'worker',		cn: '店铺员工'	},
	},

    "Lang": {
        "cn": { "num": 1, "val": "中文" },
        "en": { "num": 2, "val": "English" },
        "it": { "num": 3, "val": "Italiano" }
    }
}

export const getRole = (role = parseInt(localStorage.getItem('role'))) => {
    return  confUser.role[role];
}
export default confUser