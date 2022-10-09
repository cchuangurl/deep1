var router = require('@koa/router')();

const userrightController = require('../controllers/index').userright;
//列出清單
router.get('/', async (ctx, next)=> {
	await userrightController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await userrightController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await userrightController.editpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await userrightController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', (ctx, next)=> {
	await userrightController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', (ctx, next)=> {
	await userrightController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await userrightController.create(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await userrightController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await userrightController.update(ctx)
});

module.exports = router;
