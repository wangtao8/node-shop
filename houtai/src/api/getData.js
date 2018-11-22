import fetch from '../config/fetch'

/**
 * 登陆
 * */

export const login = data => fetch('/api/login', data, 'POST');

/**
 * 新增用户
 * */

export const regiester2 = data => fetch('/api/regiester', data, 'POST');

/**
 * 删除用户
 * */

export const deletUser = data => fetch('/api/deletUser', data, 'POST');

/**
 * 更改用户
 * */

export const editUser = data => fetch('/api/editUser', data, 'POST');

/**
 * 获得用户信息
 * */

export const getUsers = data => fetch('/api/getUsers', data, 'POST');

/**
 * 获得商品列表
 * */

export const getGoodsList = data => fetch('/api/getGoodsList', data, 'POST');