/**登录信息 */
export type LoginResult = {
  /**账号 */
  account: string
  /**头像 */
  avatar: string
  /**用户id */
  id: number
  /**手机号 */
  mobile: string
  /**昵称 */
  nickname?: string
  /**登录凭证 */
  token: string
}

/**用户信息 */
export type ProfileDetail = Omit<LoginResult, 'token' | 'mobile'> & {
  //复用LoginResult的属性，排除token
  /**生日 */
  birthday?: string
  /**地址 */
  fullLocation?: string
  /**性别 */
  gender?: Gender
  /**职业 */
  profession?: string
}
/**性别 */
export type Gender = '男' | '女'
/**个人信息修改的请求参数 */
export type ProfileParams = Pick<
  ProfileDetail,
  'nickname' | 'gender' | 'birthday' | 'profession'
> & {
  /**省份编码 */
  provenceCode?: string
  /**城市编码 */
  cityCode?: string
  /**区编码 */
  countyCode?: string
}
