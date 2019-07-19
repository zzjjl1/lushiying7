var mysql = require('mysql');
var connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zzj741852963',
    database:'test1'
});
connection.connect();

//查

    var sql ='SELECT * FROM test_1';
connection.query(sql,function(err,result){
    if(err){
        console.log('错了！',err.message)
        return
    }
    console.log('---',result)
})


// //增
// var addSql='INSERT INTO test_1(id,name,age) VALUES(0,?,?)';
// var addSqlParams=['王五','22']
// connection.query(addSql,addSqlParams,function(err,result){
//     if(err){
//         console.log('增失败：',err.message)
//         return
//     }
//     console.log(result)
// })

// //改
// var modSql = 'UPDATE test_1 SET age = ? WHERE id=?';
// var modSqlParams=['40',1]
// connection.query(modSql,modSqlParams,function(err,result){
//     if(err){
//         console.log('xxx')
//         return
//     }
//     console.log(result)
    
// })

// //删
// var delSql = 'DELETE FROM test_1 WHERE id=5';
// connection.query(delSql,function(err,result){
//     if(err){
//         console.log(err.message)
//         return
//     }
//     console.log(result)
// })

//条件查询
// var searchSql ="SELECT * FROM test_1 WHERE age < 30 OR name = '张三' ";
// connection.query(searchSql,function(err,result){
//     if(err){
//         console.log(err.message)
//         return
//     }
//     console.log(result)
// })

connection.end()
