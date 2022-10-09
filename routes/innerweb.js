var router = require('@koa/router')();
var views=require("koa-views");
const innerwebController = require('../controllers/index').innerweb;
const outerwebController = require('../controllers/index').outerweb;
//判定登入人群組
router.post("/", async (ctx, next)=> {
    var {statusreport}=ctx.request.body;
    var {account}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("gotten account:"+account);
    //ctx.request.query=statusreport;
    //await ctx.render("innerweb/account/account")
    await innerwebController.group(ctx, next)
    //await accountController.list(ctx, next)
});

//到各種model管理一
router.get('/gomanage1', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage1" ,{
        statusreport
    })
});
//到各種model管理二
router.get('/gomanage2', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage2" ,{
        statusreport
    })
});
//到各種model管理三
router.get('/gomanage3', async (ctx, next)=> {
	statusreport="由某類資料管理進入本頁";
    await ctx.render("datamanage3" ,{
        statusreport
    })
});
//到企業管理
router.get('/affaire', async (ctx, next)=> {
	await innerwebController.affaire(ctx, next)
});
//到企業布告
router.get('/affaire/board', async (ctx, next)=> {
	innerwebController.board(ctx, next)
});
//到知識整合
router.get('/affaire/KI', async (ctx, next)=> {
	innerwebController.integrate(ctx, next)
});
//到業務專案管理
router.get('/affaire/PM', async (ctx, next)=> {
	innerwebController.project(ctx, next)
});
//到內部通訊
router.get('/affaire/interact', async (ctx, next)=> {
	innerwebController.communicate(ctx, next)
});
//到員工專區
router.get('/affaire/personnel', async (ctx, next)=>{
	innerwebController.personnel(ctx, next)
});
//到意見反映
router.get('/affaire/idea', async (ctx, next)=> {
	innerwebController.idea(ctx, next)
});
//到對外首頁
router.get('/outerweb', async (ctx, next)=> {
	await outerwebController.homepage(ctx, next)
});
module.exports = router;
