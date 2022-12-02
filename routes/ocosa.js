var router = require('@koa/router')();

const ocosaController = require('../controllers/index').ocosa;
//列出清單
router.get('/', async (ctx, next)=> {
	await ocosaController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await ocosaController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await ocosaController.editpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await ocosaController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', async(ctx, next)=> {
	await ocosaController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', async(ctx, next)=> {
	await ocosaController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await ocosaController.create(ctx)
});
//寫入guest註冊資料
router.post('/addbyguest', async (ctx, next)=> {
	console.log(ctx.request.body);
	await ocosaController.createuser(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await ocosaController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await ocosaController.update(ctx)
});

module.exports = router;
