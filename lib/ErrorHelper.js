// Created by szatpig at 2018/9/17.

const errorTypes = require('./errorTypes');

class InterfaceError extends Error{
    constructor(type){
        super();
        let typeInfo = errorTypes[type];
        this.code = typeInfo.code;
        this.msg = typeInfo.msg;
    }
}

module.exports = InterfaceError;