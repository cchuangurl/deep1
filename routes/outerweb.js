var router = require('@koa/router')();
var views=require("koa-views");
const outerwebController = require('../controllers/index').outerweb;

//到對外首頁
router.get('/', async (ctx, next)=> {
	await outerwebController.homepage(ctx, next)
});
//到對外簡介
router.get('/outerweb/brief', async (ctx, next)=> {
	await outerwebController.brief(ctx, next)
});
//到對外服務交付說明
router.get('/outerweb/deliver', async (ctx, next)=> {
	await outerwebController.deliver(ctx, next)
});
//到對外免費服務
router.get('/outerweb/share', async (ctx, next)=> {
    console.log("going in router share!!")
	await outerwebController.share(ctx, next)
});
//到對外認識本企業
router.get('/outerweb/aboutus', async (ctx, next)=> {
    console.log("going in router aboutus!!")
	await outerwebController.aboutus(ctx, next)
});
module.exports = router;
