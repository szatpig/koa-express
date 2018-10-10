// Created by szatpig at 2018/9/17.
const errorTypes = {};

errorTypes.UNKNOW_ERROR = "unknowError";
errorTypes.USER_NOT_EXIST = "userNotExist";

/**
 * API错误名称对应的错误信息
 */
const errorMap = new Map();

errorMap.set(errorTypes.UNKNOW_ERROR, { code: -1, msg: '未知错误' });
errorMap.set(errorTypes.USER_NOT_EXIST, { code: 101, msg: '用户不存在' });

//根据错误名称获取错误信息
errorTypes.getError = (type) => {

    let errorInfo;

    if (type) {
        errorInfo = errorMap.get(type);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!errorInfo) {
        type = 'UNKNOW_ERROR';
        errorInfo = errorMap.get(type);
    }

    return errorInfo;
}

module.exports = errorTypes;
