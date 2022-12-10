var router = require('@koa/router')();
var views=require("koa-views");
const outerwebController = require('../controllers/index').outerweb;

//到對外首頁
router.get('/', async (ctx, next)=> {
	await outerwebController.homepage(ctx, next)
});
//到對外簡介
router.get('/brief', async (ctx, next)=> {
    console.log("有執行到brief router!");  
	await outerwebController.brief(ctx, next)
});
//到對外服務交付說明
router.get('/deliver', async (ctx, next)=> {
	await outerwebController.deliver(ctx, next)
});
//到對外免費服務
router.get('/share', async (ctx, next)=> {
    console.log("going in router share!!")
	await outerwebController.share(ctx, next)
});
//到對外免費服務-依管理類別
router.get('/share/bycate', async (ctx, next)=> {
    console.log("going in router share by category!!")
	await outerwebController.bycate(ctx, next)
});
//到對外免費服務-依知識領域
router.get('/share/bydomain', async (ctx, next)=> {
    console.log("going in router share by domain!!")
	await outerwebController.bydomain(ctx, next)
});
//到對外免費服務-依課程類型
router.get('/share/bycourse', async (ctx, next)=> {
    console.log("going in router share by course!!")
	await outerwebController.bycourse(ctx, next)
});
//到對外認識本企業
router.get('/aboutus', async (ctx, next)=> {
    console.log("going in router aboutus!!")
	await outerwebController.aboutus(ctx, next)
});
//到對外認識本企業-服務理念
router.get('/aboutus/ideal', async (ctx, next)=> {
    console.log("going in router ideal!!")
	await outerwebController.ideal(ctx, next)
});
//到對外認識本企業-本社優勢
router.get('/aboutus/adventage', async (ctx, next)=> {
    console.log("going in router adventage!!")
	await outerwebController.adventage(ctx, next)
});
//到對外認識本企業-組織架構
router.get('/aboutus/organize', async (ctx, next)=> {
    console.log("going in router organize!!")
	await outerwebController.organize(ctx, next)
});
//到對外認識本企業-服務實績
router.get('/aboutus/perform', async (ctx, next)=> {
    console.log("going in router perform!!")
	await outerwebController.perform(ctx, next)
});
//到對外認識本企業-企業社會責任
router.get('/aboutus/CSR', async (ctx, next)=> {
    console.log("going in router CSR!!")
	await outerwebController.CSR(ctx, next)
});
module.exports = router;
