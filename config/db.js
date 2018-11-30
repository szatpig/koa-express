// Created by szatpig at 2018/9/28.
const mongoose = require("mongoose");

const config = require('./');

mongoose.Promise = global.Promise;

// 连接MongoDB数据库
mongoose.connect(config.db,{
    useCreateIndex:true,
    useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
    console.info('MongoDB connected success.')
})

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connected fail.');
    console.error(err);
    process.exit(-1)
})

mongoose.connection.on('disconnected', () => {
    console.error('MongoDB connected disconnected.')
});