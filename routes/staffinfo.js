var router = require('@koa/router')();

const staffinfoController = require('../controllers/index').staffinfo;
//列出清單
router.get('/', async (ctx, next)=> {
	await staffinfoController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await staffinfoController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await staffinfoController.editpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await staffinfoController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', (ctx, next)=> {
	await staffinfoController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', (ctx, next)=> {
	await staffinfoController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await staffinfoController.create(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await staffinfoController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await staffinfoController.update(ctx)
});

module.exports = router;
