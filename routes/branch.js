var router = require('@koa/router')();
var views=require("koa-views");
const branchController = require('../controllers/index').branch;
const userController = require('../controllers/index').user;
const postController = require('../controllers/index').post;
const accountController = require('../controllers/index').account;
const User = require('../models/index').user;

//判定登入人群組
router.post("/", async (ctx, next)=> {
    var {statusreport}=ctx.request.body;
    var {account}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("gotten account:"+account);
    //ctx.request.query=statusreport;
    //await ctx.render("branch/account/account")
    await branchController.group(ctx, next)
    //await accountController.list(ctx, next)
});

//到各種model管理
router.get('/gomanage1', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage1" ,{
        statusreport
    })
});
//到各種model管理
router.get('/gomanage2', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage2" ,{
        statusreport
    })
});
//到各種model管理
router.get('/gomanage3', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage3" ,{
        statusreport
    })
});
//到企業管理
router.get('/affaire', async (ctx, next)=> {
	await branchController.affaire(ctx, next)
});
//到企業布告
router.get('/affaire/board', async (ctx, next)=> {
	branchController.board(ctx, next)
});
//到知識整合
router.get('/affaire/KI', async (ctx, next)=> {
	branchController.integrate(ctx, next)
});
//到業務專案管理
router.get('/affaire/PM', async (ctx, next)=> {
	branchController.project(ctx, next)
});
//到內部通訊
router.get('/affaire/interact', async (ctx, next)=> {
	branchController.communicate(ctx, next)
});
//到員工專區
router.get('/affaire/personnel', async (ctx, next)=>{
	branchController.personnel(ctx, next)
});
//到意見反映
router.get('/affaire/idea', async (ctx, next)=> {
	branchController.idea(ctx, next)
});
//到對外首頁
router.get('/customer', async (ctx, next)=> {
	await branchController.customer(ctx, next)
});
//到對外簡介
router.get('/customer/brief', async (ctx, next)=> {
	await branchController.brief(ctx, next)
});
//到對外服務交付說明
router.get('/customer/deliver', async (ctx, next)=> {
	await branchController.deliver(ctx, next)
});
//到對外免費服務
router.get('/customer/share', async (ctx, next)=> {
    console.log("going in router share!!")
	await branchController.share(ctx, next)
});
//到對外認識本企業
router.get('/customer/aboutus', async (ctx, next)=> {
    console.log("going in router aboutus!!")
	await branchController.aboutus(ctx, next)
});
module.exports = router;
