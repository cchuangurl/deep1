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
//到對外免費服務-依管理類別
async bycate(ctx, next){
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
    await ctx.render("outerweb/share/bycate" ,{
        termcategory,
        statusreport
    });
},
//到對外免費服務-依知識領域
async bydomain(ctx, next){
    let statusreport="歡迎到參用免費提供的服務！!";
    console.log("going in method share!!")
    var termdomain;
    await Term.find({a20field:"a05domain",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termdomain=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termdomain));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a05domain) failed !!");
        console.log(err)
    })  
    await ctx.render("outerweb/share/bydomain" ,{
        termdomain,
        statusreport
    });
},
//到對外免費服務-依課程類型
async bycourse(ctx, next){
    let statusreport="歡迎到參用免費提供的服務！!";
    console.log("going in method share!!")
    var termcourse;
    await Term.find({a20field:"a33course",})
    .then(async terms=>{
        console.log("type of terms:"+typeof(terms));
        console.log("type of 1st term:"+typeof(terms[0]));
        console.log("1st term:"+terms[0])
        console.log("No. of term:"+terms.length)
        termcourse=encodeURIComponent(JSON.stringify(terms));
        console.log("type of termcategory"+typeof(termcourse));    
        if(statusreport===undefined){
            statusreport="status未傳成功!"
        }
    })
    .catch(err=>{
        console.log("Term.find({a33course) failed !!");
        console.log(err)
    })  
    await ctx.render("outerweb/share/bycourse" ,{
        termcourse,
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
//到對外認識本企業-服務理念
async ideal(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus ideal!!")
    await ctx.render("outerweb/aboutus/ideal" ,{
        statusreport
    });
},
//到對外認識本企業-本社優勢
async adventage(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus adventage!!")
    await ctx.render("outerweb/aboutus/adventage" ,{
        statusreport
    });
},
//到對外認識本企業-組織架構
async organize(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus organize!!")
    await ctx.render("outerweb/aboutus/organize" ,{
        statusreport
    });
},
//到對外認識本企業-服務實績
async perform(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus perform!!")
    await ctx.render("outerweb/aboutus/perform" ,{
        statusreport
    });
},
//到對外認識本企業-企業社會責任
async CSR(ctx, next){
    let statusreport="歡迎來多瞭解本社的種種！!";
    console.log("going in method aboutus CSR!!")
    await ctx.render("outerweb/aboutus/CSR" ,{
        statusreport
    });
},
}//EOF export