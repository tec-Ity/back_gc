
export const nav_replace = (curRole) => {
        curRole = Number(curRole);
        if(curRole === 1) {
                return { navLinks: [ {labal: "Users", to: "/ower/Users"}, {labal: "Shops", to: "/ower/Shops"}, ], role_path: '/ower' }
        } else if(curRole === 3) {
                return { navLinks: [ {labal: "Users", to: "/mger/Users"}, {labal: "Shops", to: "/mger/Shops"}, ], role_path: '/mger' }
        }  else if(curRole === 5) {
                return { navLinks: [ {labal: "Pds", to: "/sfer/Pds"}, {labal: "Brands", to: "/sfer/Brands"}, {labal: "Categs", to: "/sfer/Categs"}, ], role_path: '/sfer' }
        }  else if(curRole === 101) {
                return { navLinks: [ {labal: "Users", to: "/bser/Users"}, {labal: "Prods", to: "/bser/Prods"}, ], role_path: '/bser' }
        }  else if(curRole === 105) {
                return { navLinks: [ {labal: "Prods", to: "/wker/Prods"}, ], role_path: '/wker' }
        } else {
                return { navLinks: [ ], role_path: '/home' }
         }
}
