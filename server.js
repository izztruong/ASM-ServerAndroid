const express = require('express')
const app = express()
const port = 3000
const expressHbs = require('express-handlebars');
const User = require('./model/user');
const sp = require('./model/sanpham');
var bodyParser = require("body-parser");
const e = require('express');
const list = [];
let listUser = [];
let listsp = [];
listUser.push(new User(listUser.length, "nguyễn văn a", '123', 'A@gmail.com', 'https://iili.io/2A9V2V.jpg'));
listUser.push(new User(listUser.length, "nguyễn văn b", '123', 'B@gmail.com', 'https://iili.io/WwBiSp.jpg'));
listUser.push(new User(listUser.length, "nguyễn văn c", '123', 'C@gmail.com', 'https://iili.io/WwBiSp.jpg'));
listsp.push(new sp(listsp.length, 'sp1', 5000, 'https://iili.io/HwlBs0Q.png', 'white', 'áo', 'kh01', 'TenKH01'));
listsp.push(new sp(listsp.length, 'sp2', 6000, 'https://iili.io/HwlMjLb.png', 'balck', 'áo', 'kh02', 'TenKH02'));
listsp.push(new sp(listsp.length, 'sp3', 7000, 'https://iili.io/HwlWaUl.png', 'white', 'quần', 'kh03', 'TenKH03'));
listsp.push(new sp(listsp.length, 'sp4', 8000, 'https://iili.io/HwlWaUl.png', 'white', 'quần', 'kh04', 'TenKH04'));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', '.hbs');
//app.set('views', './views');

app.engine('.hbs', expressHbs.engine({
    extname: "hbs",
    // defaultLayout: 'page2',
    // layoutsDir: "views/layouts/",
}));
app.get('/sp/themsp', (req, res) => { 
    res.render('home', {
        layout:'themsp',
        
    })
})
app.get('/quantri', (req, res) => {
    res.render('home', {
        layout: 'user'
        
    })
});
app.get('/', (req, res) => {
    res.render('home', {
        layout: 'user'
        
    })
});
app.get('/sp/del/:idsp', (req, res) => { 
    const sp3 = req.body;
    console.log(req.params.idsp);
    const newsp1 = listsp.filter(sp => sp.idsp != req.params.idsp);
    
    // res.redirect('/user')
    res.render('home', {
        layout: 'sanpham',
        listsp: newsp1
    })
})

app.get('/user/del/:id', (req, res) => { 
    const user3 = req.body;
    console.log(req.params.id);
    const newList1 = listUser.filter(user => user.id != req.params.id);
    
    // res.redirect('/user')
    res.render('home', {
        layout: 'user',
        list: newList1
    })
})
app.post('/sp', (req, res) => { 
    const sp2 = req.body
    const newListsp = listsp.map(item => {
            if (item.idsp == sp2.idspedit) {
                item.tensp = sp2.tenspedit;
                item.dongia = sp2.dongiaedit;
                item.color = sp2.coloredit;
                item.imgsp = sp2.imgspedit;
                item.loaisp = sp2.loaispedit;
                item.makh = sp2.makhedit;
                item.tenkh = sp2.tenkhedit;
            
            }
            return item;
        })
    if (sp2.idspedit == null) {
        newListsp.push(new sp(listsp.length, sp2.tensp, sp2.dongia, sp2.imgsp, sp2.color, sp2.loaisp, sp2.makh, sp2.tenkh));
        res.render('home', {
        layout: 'sanpham',
            listsp: newListsp
    })
    } else {
        res.render('home', {
        layout: 'sanpham',
        listsp: newListsp
    })
    }
   
})
app.post('/user', (req, res) => { 
   
    const user2 = req.body
    console.log(user2.id+user2.name)
    const newList = listUser.map(item => {

        if (item.id == user2.id) {
            item.name = user2.name;
            item.email = user2.email;
            item.pass = user2.pass;
            item.img = user2.img;
            
        }
        return item;
})
    res.render('home', {
        layout: 'user',
        list: newList
    })
})
app.get('/sp', (req, res) => { 
    const sp2 = req.body
    const newListsp = listsp.map(item => {
        if (item.idsp == sp2.idsp) {
            item.tensp = sp2.tensp;
            item.dongia = sp2.dongia;
            item.color = sp2.color;
            item.imgsp = sp2.imgsp;
            item.loaisp = sp2.loaisp;
            item.makh = sp2.makh;
            item.tenkh = sp2.tenkh;
        }
        return item;
})
    res.render('home', {
        layout: 'sanpham',
        listsp: newListsp
    })
})
app.get('/user', (req, res) => { 
    const user2 = req.body
    const newList = listUser.map(item => {
        if (item.id == user2.id) {
            item.name = user2.name;
            item.email = user2.email;
            item.pass = user2.pass;
            item.img = user2.img;
            
        }
        return item;
})
    res.render('home', {
        layout: 'user',
        list: newList
    })
})
app.get('/sp/edit/:idsp', (req, res) => { 
    const itemsp = listsp.at(req.params.idsp)
    
    res.render('home', {
        layout: 'editsanpham',
        itemsp: itemsp
        
    })
})
app.get('/user/edit/:id', (req, res) => { 
    const item = listUser.at(req.params.id)
    
    res.render('home', {
        layout: 'edituser',
        item: item
        
    })
})
app.post('/', (req, res) => { 
   
    res.render('home', {
        layout: 'user'
        
    })
})
app.post('/quantri', (req, res) => {
    const users = req.body;
    console.log(users.email + users.pass)
    console.log(list.at(0).email + list.at(0).pass)
    console.log(users.email == list.at(0).email)
    console.log(users.pass==list.at(0).pass)
    if (users.email == list.at(0).email && users.pass == list.at(0).pass) {
        res.render('home', {
            layout: 'user'
        
        })
    }
    else {
        res.render('home', {
            layout: 'dangnhap'
        
        })
    }
});
app.get('/dangki', (req, res) => {
    
    res.render('home', {
        layout: 'dangki'
        
    })
});
app.post('/dangki', (req, res) => { 
   
    res.render('home', {
        layout: 'dangki'
        
    })
})
app.get('/dangnhap', (req, res) => {
    res.render('home', {
        layout: 'dangnhap'
        
    })
});
app.post('/dangnhap', (req, res) => { 
    const user1 = req.body;
    let user = new User(0,user1.name, user1.pass,user1.email,user1.img);
    list.push(user);
    console.log(user.name);
    res.render('home', {
        layout: 'dangnhap'
        
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
