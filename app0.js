var koa = require('koa')
  , logger = require('koa-logger')()
  , json = require('koa-json')()
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , path =require("path")
  , koastatic=require('koa-static')
  , cookieParser=require("cookie-parser")
  , bodyparser=require("koa-bodyparser")()
  , koarouter=require("@koa/router");

//var index = require('./routes/index');
//var users = require('./routes/users');
var app=new koa();
var router=new koarouter();

// error handler
onerror(app);

// global middlewares
//app.use(koastatic(__dirname + '/public'));
//app.use(views('views', {
  //root: __dirname + '/views',
  //default: 'ejs'
//}));
//app.use(bodyparser());
//app.use(json());
//app.use(logger());
//app.use(koa.urlencoded({ extended: false }));
//app.use(cookieParser());
const allRouters = require('./routes/index');

//home rouer
let indexRouter=new koarouter();
//const indexRouter=koa.Router.get('/', function(req, res) {
indexRouter.get('/', (ctx) =>{
res.render("entry");   
  });
//router.use('/', indexRouter.routes(), indexRouter.allowedMehtods());
router.use('/', indexRouter.routes());

// catch 404 and forward to error handler
let errpage=new koarouter();
errpage.get('/404', (ctx) =>{
res.render("error");   
  });
router.use('/404', errpage.routes());

//set all routers
for(let key in allRouters) {
	let temp=key+"temp";
    temp=new koarouter();
    //router.use('/deep/'+key, temp.routes(), temp.allowedMethods());
    router.use('/deep/'+key, temp.routes());
}
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx, next)=>{
  var start = new Date;
  await next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.use(async (err, req, res, next)=> {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });


module.exports = app
