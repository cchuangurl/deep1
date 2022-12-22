var router = require('@koa/router')();

const guestinfoController = require('../controllers/index').guestinfo;
//列出清單
router.get('/', async (ctx, next)=> {
	await guestinfoController.list(ctx)
});
//到新增資料頁
router.get('/inputpage', async (ctx, next)=> {
    await guestinfoController.inputpage(ctx,next)
});
//到修正單筆資料頁
router.get('/editpage/:id', async (ctx, next)=> {
    console.log("get id:"+ctx.params.id)
    await guestinfoController.editpage(ctx,next)
});
//到訪客自己輸入資料頁
router.get('/register', async (ctx, next)=> {
    await guestinfoController.register(ctx,next)
});
//寫入一筆資料
router.post('/add', async (ctx, next)=> {
	console.log(ctx.request.body);
	await guestinfoController.create(ctx)
});
//寫入guest註冊資料
router.post('/addbyguest', async (ctx, next)=> {
	console.log(ctx.request.body);
	await guestinfoController.createguest(ctx)
});
//寫入設定註冊帳號
router.post('/trans2user', async (ctx, next)=> {
	console.log(ctx.request.body);
	await guestinfoController.trans2user(ctx)
});

//批次新增資料
router.get('/inputbatch', async (ctx, next)=> {
    await guestinfoController.batchinput(ctx,next)
});

//依參數id取得資料
router.get('/:id', async(ctx, next)=> {
	await guestinfoController.retrieve(ctx)
});
//依參數no取得一筆資料
router.get('/find/:no', async(ctx, next)=> {
	await guestinfoController.findByNo(ctx)
});


//寫入guest註冊資料並轉換為user
router.post('/trans2user', async (ctx, next)=> {
	await guestinfoController.createuser(ctx)
});
//依參數id刪除資料
router.get('/delete/:id', async (ctx, next)=> {
	await guestinfoController.destroy(ctx)
});
//依參數id更新資料
router.post('/update', async (ctx, next)=> {
	await guestinfoController.update(ctx)
});

module.exports = router;
