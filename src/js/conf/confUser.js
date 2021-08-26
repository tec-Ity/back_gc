const  confUser  = {
	"role_Arrs": [ 1, 3, 5, 101, 105 ],
	"role": {
		"1": {path: 'ower',
			route: [ 
				{icon:"bx bx-user", 			     label: "users", to: "/ower/users"}, 
				{icon:"bx bx-building-house", 	 label: "shops", to: "/ower/shops"}, 
				{icon:"bx bx-package", 			label: "pds", to: "/ower/pds"}, 
				{icon:"bx bxs-package", 		label: "prods", to: "/ower/prods"},
				{icon:"bx bx-category",			 label: "categs", to: "/ower/categs"},
				{icon:"bx bx-purchase-tag-alt", label: "brands", to: "/ower/brands"},
				{icon:"bx bx-cog", 				label: "setting", to: "/ower/setting"},
			]
		},
		"3": {path: 'mger',
			route: [ 
				{icon:"bx bx-user", 				label: "users",		  to: "/mger/users"}, 
				{icon:"bx bx-building-house", 	   label: "shops", 		to: "/mger/shops"},
				{icon:"bx bx-package", 			   label: "pds",		 to: "/mger/pds"}, 
				{icon:"bx bxs-package", 		   label: "prods", 	to: "/mger/prods"},
				{icon:"bx bx-category", 		   label: "categs", 	   to: "/mger/categs"},
				{icon:"bx bx-purchase-tag-alt",     label: "brands", 		to: "/mger/brands"},
				{icon:"bx bx-cog", 				label: "setting", 	    to: "/mger/setting"},
			]
		},
		"5": {path: 'sfer', 
			route: [
				{icon:"bx bxs-package", label: "prods", to: "/sfer/prods"},
				{icon:"bx bx-category", label: "categs", to: "/sfer/categs"},
				{icon:"bx bx-purchase-tag-alt", label: "brands", to: "/sfer/brands"},
			]
		},
		"101": {path: 'bser', 
			route: [
				{icon:"bx bx-user", label: "users", to: "/bser/users"}, 
				{icon:"bx bxs-package", label: "prods", to: "/bser/prods"},
				{icon:"bx bx-cog", label: "setting", to: "/bser/setting"},
			]
		},
		"105": {path: 'wker', 
			route: [ 
				{icon:"bx bxs-package", label: "prods", to: "/bser/prods"},
			]
		},
	},
}

export const getRole = (role = parseInt(localStorage.getItem('role'))) => {
	return  confUser.role[role];
}

export const getRolePath = (role = parseInt(localStorage.getItem('role'))) => {
	if(!confUser.role_Arrs.includes(role)) return 'home';
	return  confUser.role[role].path;
}

export const getRoleRoute = (role = parseInt(localStorage.getItem('role'))) => {
	if(!confUser.role_Arrs.includes(role)) return [];
	return  confUser.role[role].route;
}
export const role_Arrs = confUser.role_Arrs;

export default confUser