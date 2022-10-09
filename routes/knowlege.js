var router = require('@koa/router')();

const knowlegeController = require('../controllers/index').knowlege;
//列出清單
router.get('/', async (ctx, next)=> {
	await knowlegeController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await knowlegeController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await knowlegeController.editpage(ctx,next)
});
//到檢視單筆資料頁
router.get('/lookpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await knowlegeController.lookpage(ctx,next)
});
//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await knowlegeController.batchinput(ctx,next)
});
//依參數id取得資料
router.get('/:id', (ctx, next)=> {
	await knowlegeController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', (ctx, next)=> {
	await knowlegeController.findByNo(ctx)
});
//依檔名送出檔案供下載
router.get('/download/:filename', async (ctx, next)=> {
    console.log("going in router /download!!")
	await knowlegeController.sendfile(ctx, next)
});
//依參數category取得資料
router.post('/chosen', async (ctx, next)=> {
    console.log("going in router /chosen!!")
    await knowlegeController.getchosen(ctx, next)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await knowlegeController.create(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await knowlegeController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await knowlegeController.update(ctx)
});

module.exports = router;
