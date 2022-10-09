//載入相對應的model
const Post = require('../models/index').post;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /deep0/post !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Post.find({}).then(async posts=>{
        //console.log("found posts:"+posts);
        console.log("type of posts:"+typeof(posts));
        console.log("type of 1st post:"+typeof(posts[0]));
        console.log("1st post:"+posts[0])
        console.log("No. of post:"+posts.length)
        let postlist=encodeURIComponent(JSON.stringify(posts));
        console.log("type of posts:"+typeof(postlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("post/listpage",{
        //ctx.response.send({
            postlist:postlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Post.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
inputpage(req, res) {
    //在router設定了
},

//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Post.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Post.findById(ctx.params.id)
        .then(async postx=>{
            console.log("postx:"+postx);
            let post=encodeURIComponent(JSON.stringify(postx));
            console.log("post:"+post);
            console.log("type of post:"+typeof(post));
            await ctx.render("post/editpage",{
                post,
                statusreport
            })
        })
        .catch(err=>{
            console.log("Post.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//到檢視單筆資料頁
async lookpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered Post.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Post.findById(ctx.params.id)
        .then(async postx=>{
            console.log("postx:"+postx);
            let post=encodeURIComponent(JSON.stringify(postx));
            console.log("post:"+post);
            console.log("type of post:"+typeof(post));
            await ctx.render("post/lookpage",{
                post:post,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Post.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//依參數id取得資料
retrieve(req,res){

},
//依參數no取得一筆資料
findByNo(req,res){

},

//寫入一筆資料
async create(ctx,next){
    var new_post = new Post(ctx.request.body);
    console.log(new_post);
    await new_post.save()
    .then(()=>{
        console.log("Saving new_post....");
    statusreport="儲存單筆布告資料後進入本頁";
    ctx.redirect("/deep0/post/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},
//批次新增資料
async batchinput(ctx, next){
    var statusreport=ctx.query.statusreport;
    var datafile=ctx.query.datafile;
    console.log("got the name of datafile:"+datafile)   
    // 引用需要的模組
    const fs = require('fs');
    const path=require("path");
    const readline = require('readline');
    // 逐行讀入檔案資料
    //定義輸出串流
    //var writeStream = fs.createWriteStream('out.csv');

    //定義讀入串流 (檔案置於/public目錄下)
    let filepath=path.join(__dirname,"../public/csv/");
    var lineReader = readline.createInterface({            
        input: fs.createReadStream(filepath+datafile+'.csv') 
    });
    var lineno=0;
    var postArray;
    var tempstore=new Array(10);
    for (let i=0;i<10;i++){
        tempstore[i]=new Array(); 
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{       
    //當讀入一行資料時
    lineReader.on('line', function(data) {            
        var values = data.split(',');
        tempstore[0][lineno]=values[0].trim();
        tempstore[1][lineno]=values[1].trim();
        tempstore[2][lineno]=values[2].trim();
        tempstore[3][lineno]=values[3].trim();
        tempstore[4][lineno]=values[4].trim();
        tempstore[5][lineno]=values[5].trim();
        tempstore[6][lineno]=values[6].trim();
        tempstore[7][lineno]=values[7].trim();
        tempstore[8][lineno]=values[8].trim();
        tempstore[9][lineno]=values[9].trim();        
        lineno++;
        console.log("read line:"+data)
    });//EOF lineReader.on
    resolve();
            })//EOF promise
    })//EOF readfile
    let savedata=(()=>{
        return new Promise((resolve, reject)=>{
        postArray=new Array(lineno);
        
        let saveone=(async new_post=>{ 
                await new_post.save()
                .then(()=>{
                    console.log("Saved document:"+new_post.a25posttitle)
                    })
                .catch((err)=>{
                    console.log("Post.save() failed !!")                    
                    console.log(err)
                })       
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            postArray[k]=new Array(10);
            for (let m=0;m<10;m++){
                postArray[k][m]=tempstore[m][k]
                //console.log(postArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of postArray:"+postArray[0][0]);
        console.log("read total lines:"+postArray.length);
        let sequence=Promise.resolve();
        postArray.forEach(function(postj){
            sequence=sequence.then(function(){
                var new_post = new Post({
                    a05postcode:postj[0],
                    a10posttype:postj[1],
                    a15poster:postj[2],
                    a20postdate:postj[3],
                    a25posttitle:postj[4],
                    a30postcontent:postj[5],
                    a35reader:postj[6],
                    a40showtype:postj[7],
                    a45datetodown:postj[8],
                    a99footnote:postj[9]
                });//EOF new post
                    saveone(new_post)
                    //await ctx.redirect("/deep0/post/?statusreport="+statusreport)
                .catch(err=>{
                    console.log(err)
                })
            })//EOF sequence
            })//EOF forEach
            resolve();
        })//EOF promise
        })//EOF savedata
    await readfile()
    .then(()=>{
        setTimeout(savedata,3000)
    })
    .then(async ()=>{
        //console.log("going to list prject....");
        //ctx.redirect("/deep0/project/?statusreport="+statusreport)
        console.log("go back to datamanage2.ejs");
        await ctx.render("datamanage2",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("ctx.redirect failed !!")
        console.log(err)
    })
},
//依參數id刪除資料
async destroy(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Post.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a post....");
    statusreport="刪除單筆布告資料後進入本頁";
    //ctx.res.end()
    ctx.redirect("/deep0/post/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await Post.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newpost)=>{
        console.log("Saving new_post....:"+newpost.a25posttitle);
    statusreport="更新單筆布告資料後進入本頁";
    ctx.redirect("/deep0/post/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log(err)
    })
}
}//EOF export