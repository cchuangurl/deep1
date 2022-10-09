var router = require('@koa/router')();

const messageController = require('../controllers/index').message;
//列出清單
router.get('/', async (ctx, next)=> {
	await messageController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await messageController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await messageController.editpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await messageController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', (ctx, next)=> {
	await messageController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', (ctx, next)=> {
	await messageController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await messageController.create(ctx)
});
//寫入一筆客戶留言
router.post('/add1', async (ctx, next)=> {
	console.log(ctx.request.body);
	await messageController.create1(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await messageController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await messageController.update(ctx)
});

module.exports = router;
