
export const nav_replace = (curRole) => {
	curRole = Number(curRole);
	if(curRole === 1) {
		return { navLinks: [ 
			{icon:"bx bx-user", labal: "Users", to: "/ower/Users"}, 
			{icon:"bx bx-building-house", labal: "Shops", to: "/ower/Shops"}, 
			{icon:"bx bx-package", labal: "Products", to: "/ower/Pds"}, 
			{icon:"bx bxs-package", labal: "Goods", to: "/ower/Prods"},
			{icon:"bx bx-category", labal: "Category", to: "/ower/Categs"},
			{icon:"bx bx-purchase-tag-alt", labal: "Brand", to: "/ower/Brands"},
			{icon:"bx bx-cog", labal: "Setting", to: "/ower/firm"},
		], role_path: '/ower' }
	} else if(curRole === 3) {
		return { navLinks: [ 
			{icon:"bx bx-user", labal: "Users", to: "/mger/Users"}, 
			{icon:"bx bx-building-house", labal: "Shops", to: "/mger/Shops"},
			{icon:"bx bx-package", labal: "Products", to: "/mger/Pds"}, 
			{icon:"bx bxs-package", labal: "Products", to: "/mger/Prods"},
			{icon:"bx bx-category", labal: "Category", to: "/mger/Categs"},
			{icon:"bx bx-purchase-tag-alt", labal: "Brand", to: "/mger/Brands"},
			{icon:"bx bx-cog", labal: "Setting", to: "/mger/firm"},
		], role_path: '/mger' }
	}  else if(curRole === 5) {
		return { navLinks: [
			{icon:"bx bxs-package", labal: "Products", to: "/sfer/Prods"},
			{icon:"bx bx-category", labal: "Category", to: "/sfer/Categs"},
			{icon:"bx bx-purchase-tag-alt", labal: "Brand", to: "/sfer/Brands"},
		], role_path: '/sfer' }
	}  else if(curRole === 101) {
		return { navLinks: [
			{icon:"bx bx-user", labal: "Users", to: "/bser/Users"}, 
			{icon:"bx bxs-package", labal: "Goods", to: "/bser/Prods"},
			{icon:"bx bx-cog", labal: "Setting", to: "/bser/shop"},
		], role_path: '/bser' }
	}  else if(curRole === 105) {
		return { navLinks: [ 
			{icon:"bx bxs-package", labal: "Goods", to: "/bser/Prods"},
		], role_path: '/wker' }
	} else {
		return { navLinks: [ ], role_path: '/home' }
	}
}
