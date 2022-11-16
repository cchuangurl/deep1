var router = require('@koa/router')();

const requestController = require('../controllers/index').request;
//列出清單
router.get('/', async (ctx, next)=> {
	await requestController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await requestController.inputpage(ctx,next)
});
//到客戶填寫資料頁
router.get('/bellcall', async (ctx, next)=> {
    await requestController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await requestController.editpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await requestController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', async(ctx, next)=> {
	await requestController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', async(ctx, next)=> {
	await requestController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await requestController.create(ctx)
});
//寫入一筆客戶填寫之資料
router.post('/add1', async (ctx, next)=> {
	console.log(ctx.request.body);
	await requestController.create1(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await requestController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await requestController.update(ctx)
});

module.exports = router;
