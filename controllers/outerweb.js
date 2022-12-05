//載入相對應的model
const User = require('../models/index').user;
const Post = require('../models/index').post;
const Knowledge = require('../models/index').knowledge;
const Project = require('../models/index').project;
const Term = require('../models/index').term;
module.exports = {
//判定登入人群組


//到對外首頁
async homepage(ctx,next){
    let statusreport="歡迎到Deep服務系統！!";
    var postlist;
    console.log("gotten query:"+statusreport);
    await Post.find({})    
    .then(async posts=>{;
        console.log("1st post:"+posts[0])
        console.log("No. of post:"+posts.length)
        let postchosen=new Array();
        for(let post of posts){
            if(post.a35reader=="guest"||post.a35reader=="all"){
                postchosen.push(post)
            }
        }
        console.log("No. of postchosen:"+postchosen.length);
        postlist=encodeURIComponent(JSON.stringify(postchosen));
        console.log("type of postlist:"+typeof(postlist));
    })
    .catch(err=>{
        console.log("Post.find({}) failed !!");
        console.log(err)
    })
    await Knowledge.find({})
    .then(async knowledges=>{;
        console.log("1st knowledge:"+knowledges[0])
        console.log("No. of knowledge:"+knowledges.length)
        let knowledgelist=encodeURIComponent(JSON.stringify(knowledges));
        console.log("type of knowledgelist:"+typeof(knowledgelist));
        if(statusreport===undefined){
            statusreport="未截到status";
            console.log("未截到status!!");
        }
        await ctx.render("outerweb/homepage",{
            postlist:postlist,
            knowledgelist:knowledgelist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Knowledge.find({}) failed !!");
        console.log(err)
    })
},
//到對外簡介
async brief(ctx, next){
    let statusreport="歡迎到服務項目介紹！!";
    console.log("有執行到brief controller!");    
    await ctx.render("outerweb/product" ,{
        statusreport
    });
},
//到對外服務交付說明
async deliver(ctx, next){
    let statusreport="歡迎到服務提供流程說明！!";
    await ctx.render("outerweb/delivery" ,{
        statusreport
    });
},
//到對外免費服務
async share(ctx, next){
    let statusreport="歡迎到參用免費提供的服務！!";
    console.log("going in method share!!")
    var termcategory;
    await Term.find({a20field:"a30category",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termcategory=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termcategory));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a30category) failed !!");
        console.log(err)
    })  
    await ctx.render("outerweb/share" ,{
        termcategory,
        statusreport
    });
},
//到對外認識本企業
async aboutus(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus!!")
    await ctx.render("outerweb/aboutus" ,{
        statusreport
    });
},
}//EOF export