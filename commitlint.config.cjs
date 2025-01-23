// .commitlintrc.js
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
  },
  prompt: {
    alias: { fd: 'docs: fix typos' },
    messages: {
      type: '选择你要提交的类型 :',
      subject: '填写简短精炼的变更描述 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: '特性', name: '特性:     新增功能' },
      { value: '文档', name: '文档:     文档变更' },
      { value: '格式', name: '格式:     代码格式' },
    ],
    useEmoji: false,
    emojiAlign: 'center',
    themeColorCode: '',
    upperCaseSubject: false,
    skipQuestions: [
      'scope', 'body', 'breaking', 'footerPrefix', 'footer'
    ],
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    defaultSubject: ''
  }
}
