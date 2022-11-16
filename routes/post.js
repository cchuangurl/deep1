var router = require('@koa/router')();

const postController = require('../controllers/index').post;
//列出清單
router.get('/', async (ctx, next)=> {
	await postController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await postController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await postController.editpage(ctx,next)
});
//到檢視單筆資料頁
router.get('/lookpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await postController.lookpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await postController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', async(ctx, next)=> {
	await postController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', async(ctx, next)=> {
	await postController.findByNo(ctx)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await postController.create(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await postController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await postController.update(ctx)
});

module.exports = router;
