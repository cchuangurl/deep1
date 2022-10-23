var router = require('@koa/router')();
var views=require("koa-views");
const innerwebController = require('../controllers/index').innerweb;
//到本企業內部網頁-登入員工業務要覽
router.get('/', async (ctx, next)=> {
	await innerwebController.daily(ctx, next)
});
//到客服業務處理
router.get('/workzone', async (ctx, next)=> {
	await innerwebController.operate(ctx, next)
});
//客服業務處理-回應留言
router.get('/workzone/message', async (ctx, next)=> {
	await innerwebController.response(ctx, next)
});
//客服業務處理-回應需求
router.get('/workzone/bellcall', async (ctx, next)=> {
	await innerwebController.reception(ctx, next)
});
//客服業務處理-ocosa分析
router.get('/workzone/analysis', async (ctx, next)=> {
	await innerwebController.ocosa(ctx, next)
});
//客服業務處理-行動規劃及進度管控
router.get('/workzone/planning', async (ctx, next)=> {
	await innerwebController.actionplan(ctx, next)
});
//到知識整合
router.get('/KI', async (ctx, next)=> {
	innerwebController.integrate(ctx, next)
});
//到行政作業
router.get('/general', async (ctx, next)=> {
	innerwebController.affaire(ctx, next)
});
//行政作業-人力資源
router.get('/general/personnel', async (ctx, next)=>{
	innerwebController.personnel(ctx, next)
});
//行政作業-財務會計
router.get('/general/finance', async (ctx, next)=>{
	innerwebController.finance(ctx, next)
});
//行政作業-資訊通訊
router.get('/general/ICT', async (ctx, next)=>{
	innerwebController.ICT(ctx, next)
});
//到資料庫維管
router.get('/datamanage', async (ctx, next)=>{
	innerwebController.datamanage(ctx, next)
});
//判定資料庫維管群組
router.post("/datamanage/group", async (ctx, next)=> {
    //var {statusreport}=ctx.request.body;
    //var {account}=ctx.request.body;
    //console.log("gotten query:"+statusreport);
    //console.log("gotten account:"+account);
    await innerwebController.group(ctx, next)
});
//到各種model管理(0)
router.get('/datamanage/gomanage0', async (ctx, next)=> {
    await innerwebController.managepage0(ctx, next)
});
//到各種model管理(一)
router.get('/datamanage/gomanage1', async (ctx, next)=> {
	await innerwebController.managepage1(ctx, next)
});
//到各種model管理(二)
router.get('/datamanage/gomanage2', async (ctx, next)=> {
	await innerwebController.managepage2(ctx, next)
});
//到各種model管理(三)
router.get('/datamanage/gomanage3', async (ctx, next)=> {
	await innerwebController.managepage3(ctx, next)
});
//業績看板
router.get('/team/outcome', async (ctx, next)=>{
	innerwebController.outcome(ctx, next)
});
//到內部通訊
router.get('/team/interact', async (ctx, next)=> {
	innerwebController.communicate(ctx, next)
});
//到意見反映
router.get('/team/idea', async (ctx, next)=> {
	innerwebController.idea(ctx, next)
});
module.exports = router;
