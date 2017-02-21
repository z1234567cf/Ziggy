/**
 * Created by Administrator on 2016/11/16.
 */
//ifid代表层级 唯一性 确定在功能页中是否显现
var YJ_main={
    "main":[
        {
            "name":"mian",
            "content":"企业有金号待审核",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad001",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad001001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"mian",
            "content":"实习头条待审核",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad002",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad002001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        // {
        //     "name":"mian",
        //     "content":"提现待审核",
        //     "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
        //     "url":"",
        //     "level":"1",
        //     "ifid":"ad003",
        //     "data":[
        //         {
        //             "name":"数据读取中。。",
        //             "url":"",
        //             "ifid":"ad003001",
        //             "data":[],//预留下级接口，
        //             "level":"2"//预留功能接口
        //         },
        //     ]
        // },
        {
            "name":"mian",
            "content":"取金待审核",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad004",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad004001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"mian",
            "content":"兑奖待寄送",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad005",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad005001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"mian",
            "content":"抽奖待寄送",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"add005",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"add005001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"mian",
            "content":"广告位空闲",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad006",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad006001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"mian",
            "content":"意见反馈待处理",
            "url_father":true,//专门给第一级的主页使用的参数，不要在除本处以外使用这个参数。
            "url":"",
            "level":"1",
            "ifid":"ad007",
            "data":[
                {
                    "name":"数据读取中。。",
                    "url":"",
                    "ifid":"ad007001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        }
    ],
    "service":[//跟页面中的headM下的ID相对应 ifid前缀a
        {
            "name":"userinfo",
            "content":"用户信息",
            "level":"1",//预留功能接口
            "ifid":"a001",
            "data":[
                {
                    "name":"用户列表",
                    "url":"url/usermanagement/informationManagement.html",
                    "ifid":"a001001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"活跃列表",
                    "url":"url/usermanagement/activeList.html",
                    "ifid":"a001002",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name": "sign",
            "content":"签到记录",
            "level":"1",//预留功能接口
            "ifid":"a002",
            "data": [
                {
                    "name":"官方签到",
                    "url":"url/usermanagement/officialAttendance.html",
                    "ifid":"a002001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到1",
                    "url":"url/usermanagement/readingSign.html",
                    "ifid":"a002002",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到2",
                    "url":"url/usermanagement/readingSign2.html",
                    "ifid":"a002003",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到3",
                    "url":"url/usermanagement/readingSign3.html",
                    "ifid":"a002004",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"阅读签到4",
                    "url":"url/usermanagement/readingSign4.html",
                    "ifid":"a002005",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"youjinNumber",
            "content":"企业有金号",
            "level":"1",
            "ifid":"a003",//预留功能接口
            "data":[
                {
                    "name":"关联列表",
                    "url":"url/usermanagement/associatedList.html",
                    "ifid":"a003001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"messageLog",
            "content":"消息日志",
            "level":"1",
            "ifid":"a004",//预留功能接口
            "data":[
                {
                    "name":"短信消息",
                    "url":"url/usermanagement/SMSmessage.html",
                    "ifid":"a004001",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
                {
                    "name":"系统消息",
                    "url":"url/usermanagement/systemMessage.html",
                    "ifid":"a004002",
                    "data":[],//预留下级接口，
                    "level":"2"//预留功能接口
                },
            ]
        },
        {
            "name":"APPManage",
            "content":"APP管理",
            "level":"1",
            "ifid":"a005",
            "data":[
                {
                    "name":"意见反馈",
                    "url":"url/usermanagement/feedBack.html",
                    "ifid":"a005001",
                    "data":[],
                    "level":"2",
                }
            ]
        },
        {
            "name":"loggingLog",
            "content":"登录日志",
            "level":"1",
            "ifid":"a006",
            "data":[
                {
                    "name":"登录列表",
                    "url":"url/usermanagement/logList.html",
                    "ifid":"a006001",
                    "data":[],
                    "level":"2",
                }
            ]
        }
    ],
    "model":[
        {
            "name":"bankSection",
            "content":"银行版块",
            "level":"1",
            "ifid":"b001",
            "data":[
                {
                    "name":"银行列表",
                    "url":"url/sectionmanagement/bankList.html",
                    "ifid":"b001001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"借记卡",
                    "url":"url/sectionmanagement/debitCard.html",
                    "ifid":"b001002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"信用卡",
                    "url":"",
                    "ifid":"b001003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"stockSection",
            "content":"股票版块",
            "level":"1",
            "ifid":"b002",
            "data":[
                {
                    "name":"股票列表",
                    "url":"url/sectionmanagement/stockList.html",
                    "ifid":"b002001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"证券公司",
                    "url":"url/sectionmanagement/securitiesCompy.html",
                    "ifid":"b002002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"炒股相关",
                    "url":"url/sectionmanagement/stockSoftware.html",
                    "ifid":"b003003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"fundSection",
            "content":"基金版块",
            "level":"1",
            "ifid":"b004",
            "data":[
                {
                    "name":"基金列表",
                    "url":"url/sectionmanagement/fund/fundList.html",
                    "ifid":"b004001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"基金公司",
                    "url":"url/sectionmanagement/fund/fundCompony.html",
                    "ifid":"b004002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"InsuranceSection",
            "content":"保险版块",
            "level":"1",
            "ifid":"b005",
            "data":[
                {
                    "name":"保险列表",
                    "url":"url/sectionmanagement/insurance/insuranceList.html",
                    "ifid":"b005001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"保险公司",
                    "url":"url/sectionmanagement/insurance/insuranceCompy.html",
                    "ifid":"b005002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"netLoanSection",
            "content":"网贷版块",
            "level":"1",
            "ifid":"b006",
            "data":[
                {
                    "name":"网贷平台",
                    "ifid":"b006001",
                    "level":"2",
                    "data":[
                        {
                            "name":"平台列表",
                            "url":"url/sectionmanagement/netLoan/platform.html",
                            "ifid":"b006001001",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"平台股东",
                            "url":"url/sectionmanagement/netLoan/platformBoss.html",
                            "ifid":"b006001002",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"平台团队",
                            "url":"url/sectionmanagement/netLoan/platformTeam.html",
                            "ifid":"b006001003",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"平台融资",
                            "url":"url/sectionmanagement/netLoan/platformMoney.html",
                            "ifid":"b006001004",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"详情活动",
                            "url":"url/sectionmanagement/netLoan/platformDetails.html",
                            "ifid":"b006001005",
                            "level":"3",
                            "data":[],
                        }
                    ],
                },
                {
                    "name":"示范基金",
                    "ifid":"b006002",
                    "data":[
                        {
                            "name":"示范平台",
                            "url":"url/sectionmanagement/netLoan/examplePlatfm.html",
                            "ifid":"b006002001",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"示范投资",
                            "url":"url/sectionmanagement/netLoan/exanpleInvestment.html",
                            "ifid":"b006002002",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"示范通知",
                            "url":"url/sectionmanagement/netLoan/notice.html",
                            "ifid":"b006002003",
                            "level":"3",
                            "data":[],
                        },

                    ],
                    "level":"2",
                },
                {
                    "name":"车贷",
                    "ifid":"b006003",
                    "data":[
                        {
                            "name":"排行榜",
                            "url":"url/sectionmanagement/netLoan/rankingList.html",
                            "ifid":"b006003001",
                            "level":"3",
                            "data":[],
                        },
                        {
                            "name":"同城",
                            "url":"url/sectionmanagement/netLoan/oneCity.html",
                            "ifid":"b006003002",
                            "level":"3",
                            "data":[],
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"关注平台",
                    "url":"url/sectionmanagement/netLoan/focusPlatform.html",
                    "ifid":"b006004",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"平台服务",
                    "ifid":"b006005",
                    "data":[
                        {
                            "name":"系统安全",
                            "url":"url/sectionmanagement/netLoan/systemSafe.html",
                            "ifid":"b006005001",
                            "level":"3",
                            "data":"",
                        },
                        {
                            "name":"短信服务",
                            "url":"url/sectionmanagement/netLoan/SMSservice.html",
                            "ifid":"b006005002",
                            "level":"3",
                            "data":"",
                        },
                        {
                            "name":"支付服务",
                            "url":"url/sectionmanagement/netLoan/pay.html",
                            "ifid":"b006005003",
                            "level":"3",
                            "data":"",
                        },
                        {
                            "name":"记账服务",
                            "url":"url/sectionmanagement/netLoan/count.html",
                            "ifid":"b006005004",
                            "level":"3",
                            "data":"",
                        },
                        {
                            "name":"综合服务",
                            "url":"url/sectionmanagement/netLoan/totalService.html",
                            "ifid":"b006005005",
                            "level":"3",
                            "data":"",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"网贷基金",
                    "ifid":"b006006",
                    "data":[
                        {
                            "name":"网基列表",
                            "url":"url/sectionmanagement/netLoan/netFundList.html",
                            "ifid":"b006006001",
                            "level":"3",
                            "data":"",
                        },
                        {
                            "name":"买方市场",
                            "url":"url/sectionmanagement/netLoan/buyerMarket.html",
                            "ifid":"b006006002",
                            "level":"3",
                            "data":"",
                        },
                    ],
                    "level":"2",
                }
            ]
        },
        {
            "name":"currentSection",
            "content":"活期版块",
            "level":"1",
            "ifid":"b007",
            "data":[
                {
                    "name":"货币基金",
                    "url":"url/sectionmanagement/current/currentFund.html",
                    "ifid":"b007001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"互金活期",
                    "url":"url/sectionmanagement/current/eachCurrent.html",
                    "ifid":"b007002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"leftSection",
            "content":"生活版块",
            "level":"1",
            "ifid":"b008",
            "data":[
                {
                    "name":"商品列表",
                    "url":"url/sectionmanagement/life/shopList.html",
                    "ifid":"b008001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"绑定列表",
                    "url":"url/sectionmanagement/life/bingingList.html",
                    "ifid":"b008002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"learnSection",
            "content":"学习版块",
            "level":"1",
            "ifid":"b009",
            "data":[
                {
                    "name":"学习列表",
                    "level":"2",
                    "ifid":"b009001",
                    "data":[
                        {
                            "name":"财富管理",
                            "url":"url/sectionmanagement/learn/moneyManage.html",
                            "ifid":"b009001001",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"想买保险",
                            "url":"url/sectionmanagement/learn/wantInsurance.html",
                            "ifid":"b009001002",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"玩转基金",
                            "url":"url/sectionmanagement/learn/playFund.html",
                            "ifid":"b009001003",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"小白炒股",
                            "url":"url/sectionmanagement/learn/foolStock.html",
                            "ifid":"b009001004",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"第一套房",
                            "url":"url/sectionmanagement/learn/firstRoom.html",
                            "ifid":"b009001005",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"闲钱投资",
                            "url":"url/sectionmanagement/learn/spareCashInInvestment.html",
                            "ifid":"b009001006",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"长期投资",
                            "url":"url/sectionmanagement/learn/longInvestment.html",
                            "ifid":"b009001007",
                            "data":[],
                            "level":"3",
                        },
                        {
                            "name":"家庭财务",
                            "url":"url/sectionmanagement/learn/homeMoney.html",
                            "ifid":"b009001008",
                            "data":[],
                            "level":"3",
                        },
                    ]
                }
            ]
        },
        {
            "name":"borrowSection",
            "content":"借钱版块",
            "level":"1",
            "ifid":"b010",
            "data":[
                {
                    "name":"借钱列表",
                    "url":"url/sectionmanagement/borrow/borrowList.html",
                    "ifid":"b010001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"sectionHotDegree",
            "content":"版块热门度",
            "level":"1",
            "ifid":"b011",
            "data":[
                {
                    "name":"热门度列表",
                    "url":"url/sectionmanagement/hot/hot.html",
                    "ifid":"b011001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"takeGoldSection",
            "content":"取金版块",
            "level":"1",
            "ifid":"b012",
            "data":[
                {
                    "name":"取金平台",
                    "url":"url/sectionmanagement/take/takePlatform.html",
                    "ifid":"b012001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"取金展示",
                    "url":"url/sectionmanagement/take/takeShow.html",
                    "ifid":"b012002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
    ],
    "check":[
        {
            "name":"companyChecked",
            "content":"企业审核",
            "level":"1",
            "ifid":"c001",
            "data":[
                {
                    "name":"企业列表",
                    "url":"url/check/companyList.html",
                    "ifid":"c001001",
                    "data":[],
                    "level":"2",
                }
            ]
        },
        {
            "name":"commentChecked",
            "content":"点评审核",
            "level":"1",
            "ifid":"c002",
            "data":[
                {
                    "name":"点评列表",
                    "url":"url/check/comment/commentList.html",
                    "ifid":"c002001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"点评评论",
                    "url":"url/check/comment/comment.html",
                    "ifid":"c002002",
                    "data":[],
                    "level":"2",
                }
            ]
        },
        {
            "name":"topChecked",
            "content":"头条审核",
            "level":"1",
            "ifid":"c003",
            "data":[
                {
                    "name":"头条列表",
                    "url":"url/check/top/topList.html",
                    "ifid":"c003001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"头条评论",
                    "url":"url/check/top/topComment.html",
                    "ifid":"c003002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"实习审核",
                    "url":"url/check/top/topCheck.html",
                    "ifid":"c003003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"dynamicChecked",
            "content":"动态审核",
            "level":"1",
            "ifid":"c004",
            "data":[
                {
                    "name":"动态列表",
                    "url":"url/check/dynamic/dynamicList.html",
                    "ifid":"c004001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"动态评论",
                    "url":"url/check/dynamic/dynamicComment.html",
                    "ifid":"c004002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"话题管理",
                    "url":"url/check/dynamic/topicControl.html",
                    "ifid":"c004003",
                    "data":[],
                    "level":"2",
                }
            ]
        },
        {
            "name":"newsChecked",
            "content":"新闻审核",
            "level":"1",
            "ifid":"c005",
            "data":[
                {
                    "name":"新闻列表",
                    "url":"url/check/news/newsList.html",
                    "ifid":"c005001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"learnComment",
            "content":"学习评论",
            "level":"1",
            "ifid":"c006",
            "data":[
                {
                    "name":"学评列表",
                    "url":"url/check/learn/learnComList.html",
                    "ifid":"c006001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"otherComment",
            "content":"其他评论",
            "level":"1",
            "ifid":"c007",
            "data":[
                {
                    "name":"股票列表",
                    "url":"url/check/other/stockList.html",
                    "ifid":"c007001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"基金列表",
                    "url":"url/check/other/fundList.html",
                    "ifid":"c007002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"保险列表",
                    "url":"url/check/other/stockList.html",
                    "ifid":"c007003",
                    "data":[],
                    "level":"2",
                },
            ]
        }
    ],
    "uCoin":[
        // {
        //     "name":"countStatic",
        //     "content":"数据统计",
        //     "level":"1",
        //     "ifid":"d001",
        //     "data":[
        //         {
        //             "name":"当月汇总",
        //             "url":"url/ucoin/countStatic/countStatic.html",
        //             "ifid":"d001001",
        //             "data":[],
        //             "level":"2",
        //         },
        //     ]
        // },
        {
            "name":"ucoinConsume",
            "content":"U币流水",
            "level":"1",
            "ifid":"d002",
            "data":[
                {
                    "name":"用户流水",
                    "url":"url/ucoin/ucoinConsume/userConsume.html",
                    "ifid":"d002001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"取金流水",
                    "url":"url/ucoin/ucoinConsume/exchangeConsume.html",
                    "ifid":"d002002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"提现流水",
                    "url":"url/ucoin/ucoinConsume/cashConsume.html",
                    "ifid":"d002003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"countStatic",
            "content":"提现管理",
            "level":"1",
            "ifid":"d003",
            "data":[
                {
                    "name":"提现申请",
                    "url":"url/ucoin/cashManage/cashApply.html",
                    "ifid":"d003001",
                    "data":[],
                    "level":"2",
                },
                // {
                //     "name":"支付宝清单",
                //     "url":"url/ucoin/cashManage/zhifubaoPayList.html",
                //     "ifid":"d003002",
                //     "data":[],
                //     "level":"2",
                // },
            ]
        },
        {
            "name":"exchangeManage",
            "content":"取金管理",
            "level":"1",
            "ifid":"d004",
            "data":[
                {
                    "name":"取金申请",
                    "url":"url/ucoin/exchangeManage/exchangeApply.html",
                    "ifid":"d004001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"取金任务",
                    "url":"url/ucoin/exchangeManage/exchangeActivity.html",
                    "ifid":"d004002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"shopManage",
            "content":"商城管理",
            "level":"1",
            "ifid":"d005",
            "data":[
                {
                    "name":"商品管理",
                    "url":"url/ucoin/shopManage/shoppingManage.html",
                    "ifid":"d005001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"实物兑奖",
                    "url":"url/ucoin/shopManage/awardApply.html",
                    "ifid":"d005002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"实物抽奖",
                    "url":"url/ucoin/shopManage/luckyDrawApply.html",
                    "ifid":"d005003",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"U币抽奖",
                    "url":"url/ucoin/shopManage/ubiDraw.html",
                    "ifid":"d005005",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"购买录入",
                    "url":"url/ucoin/shopManage/buyingList.html",
                    "ifid":"d005004",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"specialChange",
            "content":"特殊变动",
            "level":"1",
            "ifid":"d006",
            "data":[
                {
                    "name":"手工增加",
                    "url":"url/ucoin/specialChange/ucoinAdd.html",
                    "ifid":"d006001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"手工扣减",
                    "url":"url/ucoin/specialChange/ucoinReduce.html",
                    "ifid":"d006002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"U币冻结",
                    "url":"url/ucoin/specialChange/ucoinFrezee.html",
                    "ifid":"d006003",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"U币解冻",
                    "url":"url/ucoin/specialChange/ucoinUnFrezee.html",
                    "ifid":"d006004",
                    "data":[],
                    "level":"2",
                },
            ]
        },
    ],
    "ad":[
        {
            "name":"staticManage",
            "content":"统计管理",
            "level":"1",
            "ifid":"e001",
            "data":[
                {
                    "name":"位置收入",
                    "url":"url/aidivance/staticManage/positionIncome.html",
                    "ifid":"e001001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"结束列表",
                    "url":"url/aidivance/staticManage/endList.html",
                    "ifid":"e001002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"空闲列表",
                    "url":"url/aidivance/staticManage/freeList.html",
                    "ifid":"e001003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"homePage",
            "content":"首页",
            "level":"1",
            "ifid":"e002",
            "data":[
                {
                    "name":"闪屏图",
                    "url":"url/aidivance/homePage/flashePicture.html",
                    "ifid":"e002001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"有金头条",
                    "url":"url/aidivance/homePage/exchangeTop.html",
                    "ifid":"e002002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"图片",
                    "url":"url/aidivance/homePage/picture.html",
                    "ifid":"e002003",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"活动",
                    "url":"url/aidivance/homePage/activity.html",
                    "ifid":"e002004",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"工具",
                    "url":"url/aidivance/homePage/tool.html",
                    "ifid":"e002005",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"利率推荐",
                    "url":"url/aidivance/homePage/recommendRate.html",
                    "ifid":"ea002005",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"netLoan",
            "content":"网贷",
            "level":"1",
            "ifid":"e003",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/netLoan/picture.html",
                    "ifid":"e003001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"热门平台",
                    "url":"url/aidivance/netLoan/hotPlatform.html",
                    "ifid":"e003002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"平台新闻",
                    "url":"url/aidivance/netLoan/platformNews.html",
                    "ifid":"e003003",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"平台活动",
                    "url":"url/aidivance/netLoan/platformActivity.html",
                    "ifid":"e003004",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"平台导航",
                    "url":"url/aidivance/netLoan/platformNav.html",
                    "ifid":"e003005",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"详情活动",
                    "url":"url/aidivance/netLoan/detailActivity.html",
                    "ifid":"ea003005",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"红包专区",
                    "url":"url/aidivance/netLoan/redPacket.html",
                    "ifid":"ea003006",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"加息专区",
                    "url":"url/aidivance/netLoan/addRate.html",
                    "ifid":"ea003007",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"示范基金",
                    "ifid":"e003006",
                    "data":[
                        {
                            "name":"新增",
                            "url":"url/aidivance/netLoan/exampleFund.html",
                            "ifid":"e003006001",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"关注平台",
                    "ifid":"e003007",
                    "data":[
                        // {
                        //     "name":"平台列表",
                        //     "url":"url/aidivance/netLoan/focusPlatform/focusPlatform.html",
                        //     "ifid":"e003007001",
                        //     "data":[],
                        //     "level":"2",
                        // },
                        {
                            "name":"推荐",
                            "url":"url/aidivance/netLoan/focusPlatform/recommend.html",
                            "ifid":"e003007002",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"平台服务",
                    "ifid":"e003008",
                    "data":[
                        {
                            "name":"图片",
                            "url":"url/aidivance/netLoan/platformService/picture.html",
                            "ifid":"e003008001",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"活动",
                            "url":"url/aidivance/netLoan/platformService/activity.html",
                            "ifid":"e003008002",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"系统",
                            "url":"url/aidivance/netLoan/platformService/system.html",
                            "ifid":"e003008003",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"短信",
                            "url":"url/aidivance/netLoan/platformService/SMS.html",
                            "ifid":"e003008004",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"支付",
                            "url":"url/aidivance/netLoan/platformService/pay.html",
                            "ifid":"e003008005",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"记账",
                            "url":"url/aidivance/netLoan/platformService/count.html",
                            "ifid":"e003008006",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"有金评级",
                    "ifid":"e003009",
                    "data":[
                        // {
                        //     "name":"评级列表",
                        //     "url":"url/aidivance/netLoan/youjinRate/rating.html",
                        //     "ifid":"e003009001",
                        //     "data":[],
                        //     "level":"2",
                        // },
                        {
                            "name":"图片",
                            "url":"url/aidivance/netLoan/youjinRate/picture.html",
                            "ifid":"e003009002",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"网贷基金",
                    "ifid":"e003010",
                    "url":"url/aidivance/netLoan/netLoanFund.html",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"银行存管",
                    "ifid":"e003011",
                    "data":[
                        {
                            "name":"图片",
                            "url":"url/aidivance/netLoan/bankDepository/picture.html",
                            "ifid":"e003011001",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"系统",
                            "url":"url/aidivance/netLoan/bankDepository/system.html",
                            "ifid":"e003011002",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"展示",
                            "url":"url/aidivance/netLoan/bankDepository/show.html",
                            "ifid":"e003011003",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"车贷",
                    "ifid":"e003012",
                    "data":[
                        {
                            "name":"图片",
                            "url":"url/aidivance/netLoan/carLoan/picture.html",
                            "ifid":"e003012001",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"展示",
                            "url":"url/aidivance/netLoan/carLoan/show.html",
                            "ifid":"e003012002",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"新增",
                            "url":"url/aidivance/netLoan/carLoan/add.html",
                            "ifid":"e003012003",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
                {
                    "name":"消费金融",
                    "ifid":"e003013",
                    "data":[
                        {
                            "name":"图片",
                            "url":"url/aidivance/netLoan/consumerFinance/picture.html",
                            "ifid":"e003013001",
                            "data":[],
                            "level":"2",
                        },
                        {
                            "name":"展示",
                            "url":"url/aidivance/netLoan/consumerFinance/show.html",
                            "ifid":"e003013002",
                            "data":[],
                            "level":"2",
                        },
                    ],
                    "level":"2",
                },
            ]
        },
        {
            "name":"bank",
            "content":"银行",
            "level":"1",
            "ifid":"e004",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/bank/picture.html",
                    "ifid":"e004001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"stock",
            "content":"股票",
            "level":"1",
            "ifid":"e005",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/stock/picture.html",
                    "ifid":"e005001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"fund",
            "content":"基金",
            "level":"1",
            "ifid":"e006",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/fund/picture.html",
                    "ifid":"e006001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"insurance",
            "content":"保险",
            "level":"1",
            "ifid":"e007",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/insurance/picture.html",
                    "ifid":"e007001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"current",
            "content":"活期",
            "level":"1",
            "ifid":"e008",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/current/picture.html",
                    "ifid":"e008001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"展示",
                    "url":"url/aidivance/current/show.html",
                    "ifid":"e008002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"life",
            "content":"生活",
            "level":"1",
            "ifid":"e009",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/life/picture.html",
                    "ifid":"e009001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"borrow",
            "content":"借钱",
            "level":"1",
            "ifid":"e010",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/borrow/picture.html",
                    "ifid":"e010001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"展示",
                    "url":"url/aidivance/borrow/show.html",
                    "ifid":"e010002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"top",
            "content":"头条",
            "level":"1",
            "ifid":"e011",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/top/picture.html",
                    "ifid":"e011001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"展示",
                    "url":"url/aidivance/top/show.html",
                    "ifid":"e011002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"推荐",
                    "url":"url/aidivance/top/recommend.html",
                    "ifid":"e011003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"exchange",
            "content":"取金",
            "level":"1",
            "ifid":"e012",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/exchange/picture.html",
                    "ifid":"e012001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"展示",
                    "url":"url/aidivance/exchange/show.html",
                    "ifid":"e012002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"返利",
                    "url":"url/aidivance/exchange/rebate.html",
                    "ifid":"e012003",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"dynamic",
            "content":"动态",
            "level":"1",
            "ifid":"e013",
            "data":[
                {
                    "name":"图片",
                    "url":"url/aidivance/dynamic/picture.html",
                    "ifid":"e013001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"展示",
                    "url":"url/aidivance/dynamic/show.html",
                    "ifid":"e013002",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"mine",
            "content":"我的",
            "level":"1",
            "ifid":"e014",
            "data":[
                {
                    "name":"弹窗",
                    "url":"url/aidivance/mine/popup.html",
                    "ifid":"e014001",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"阅读签到",
                    "url":"url/aidivance/mine/readingSign.html",
                    "ifid":"e014002",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"签到活动",
                    "url":"url/aidivance/mine/signActivity.html",
                    "ifid":"e014003",
                    "data":[],
                    "level":"2",
                },
                {
                    "name":"商城图片",
                    "url":"url/aidivance/mine/marketBook.html",
                    "ifid":"e014004",
                    "data":[],
                    "level":"2",
                },
            ]
        },
    ],
    "bigDate":[
        {
            "name":"monthlySummaryReport",
            "content":"月汇总报表",
            "level":"1",
            "ifid":"f001",
            "data":[
                {
                    "name":"月汇总",
                    "url":"url/bigDate/monthlySummaryReport/monthlySummaryReport.html",
                    "ifid":"f001001",
                    "data":[],
                    "level":"2",
                },
                // {
                //     "name":"用户分析",
                //     "url":"url/bigDate/monthlySummaryReport/userAnalysis.html",
                //     "ifid":"f001002",
                //     "data":[],
                //     "level":"2",
                // },
                // {
                //     "name":"公司收入",
                //     "url":"url/bigDate/monthlySummaryReport/companyIncome.html",
                //     "ifid":"f001003",
                //     "data":[],
                //     "level":"2",
                // },
                // {
                //     "name":"公司支出",
                //     "url":"url/bigDate/monthlySummaryReport/companyPay.html",
                //     "ifid":"f001004",
                //     "data":[],
                //     "level":"2",
                // },
                // {
                //     "name":"公司应付",
                //     "url":"url/bigDate/monthlySummaryReport/companyDeal.html",
                //     "ifid":"f001005",
                //     "data":[],
                //     "level":"2",
                // },
            ]
        },
        {
            "name":"uCoinSummaryReport",
            "content":"应付U币报表",
            "level":"1",
            "ifid":"f002",
            "data":[
                {
                    "name":"应付U币",
                    "url":"url/bigDate/uCoinSummaryReport/report.html",
                    "ifid":"f002001",
                    "data":[],
                    "level":"2",
                },
             ]
        },
        {
            "name":"recommendReport",
            "content":"推荐人报表",
            "level":"1",
            "ifid":"f003",
            "data":[
                {
                    "name":"推荐人",
                    "url":"url/bigDate/recommendReport/report.html",
                    "ifid":"f003001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"channelStaticReport",
            "content":"渠道统计报表",
            "level":"1",
            "ifid":"f004",
            "data":[
                {
                    "name":"渠道统计",
                    "url":"url/bigDate/channelStaticReport/report.html",
                    "ifid":"f004001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"ePayDate",
            "content":"每日支出报表",
            "level":"1",
            "ifid":"f005",
            "data":[
                {
                    "name":"每日支出",
                    "url":"url/bigDate/ePayDate/report.html",
                    "ifid":"f005001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
        {
            "name":"adChannelReport",
            "content":"广告渠道报表",
            "level":"1",
            "ifid":"f006",
            "data":[
                {
                    "name":"广告渠道",
                    "url":"url/bigDate/adChannelReport/report.html",
                    "ifid":"f006001",
                    "data":[],
                    "level":"2",
                },
            ]
        },
    ],
    "companyControl":[
        {
            "name":"employeeControl",
            "content":"员工管理",
            "level":"1",
            "ifid":"g001",
            "data":[
                {
                    "name":"员工列表",
                    "url":"url/companyControl/employeeControl/employeeControl.html",
                    "ifid":"g001001",
                    "data":[],
                    "level":"2",
                },
            ]
        }
    ],
};
    relational.url="http://120.24.43.90/";
    relational.count=true;
function headMclick() {
    var id=this.id;
    if(YJ_main[id][0]["url_father"]){//主页布局不一样在这里生成
        $(this).parent().find("li").css({"backgroundColor":"","border-radius":"","color":''});
        $(this).css({"backgroundColor":"white","border-radius":"3px","color":'#2380f4'});
        $("#containMainR_mian").css("display","block");
        $("#containMainR_user").css("display","none");
        $("#containMainL_head_user").css("display","none");
        $("#containMainL_head_main").css("display","block");
        var data=YJ_main[id];
        resizeHandle();
        //$("#containMainL_ul").children().remove();
        var creat=isShow($("#containMainL_div>div"),$("#containMainL_div"),id);
        if(creat){
            var ul=$("<ul class='containMainL_ul'>");
            for(var i=0;i<data.length;i++){
                var li=$("<li class='main_li'></li>"),div=$("<div></div>"),img=$("<img src='../youjin/images/user/bc_10.png'>"),span=$("<span></span>");
                span.text(data[i]["content"]);
                li.append(div);
                div.append(img);
                div.append(span);
                creat.append(ul);
                ul.append(li);
                if(data[i]["data"]){
                    var data_data=data[i]["data"];
                    var li_ul=$("<ul class='containMainL_ul_ul main_ul' style='display: block'></ul>");
                    li.after(li_ul);
                    //下拉
                    li.click((function(li_ul){
                        function ul() {
                            li_ul.toggle();
                        }
                        return ul;
                    })(li_ul));
                    for(var j=0;j<data_data.length;j++){
                        var li_ul_li=$("<li class='mian_ul_li'></li>"),name=data_data[j]["name"];
                        li_ul_li.text(name);
                        li_ul.append(li_ul_li);
                    }
                }
            }
        }
        //主页的左侧显示数值
        ajaxLShow();
    }else {

        $("#containMainR_mian").css("display","none");
        $("#containMainR_user").css("display","block");
        $("#containMainL_head_user").css("display","block");
        $("#containMainL_head_main").css("display","none");
        if(YJ_main[id]){
            //确定右边标签在大类下是否显现
            var navLab_divBolean=false;
            $(".navLabel>div").each(function () {
                $(this).css("display","none");
                if($(this).data("id")==id){
                    $(this).css("display","block");
                    navLab_divBolean=true;
                }
            });
            if(!navLab_divBolean){
                var navLab_div=$("<div class='test'></div>");
                navLab_div.addClass(id);
                navLab_div.data("id",id);
                $(".navLabel").append(navLab_div);
            }
            //确定右边的iframe是否显现
            var iframeBolean=false;
            $("#iframe>div").each(function () {
                $(this).css("display","none");
                if($(this).data("id")==id){
                    $(this).css("display","block");
                    iframeBolean=true;
                }
            });
            if(!iframeBolean){
                var iframe_div=$("<div class='test'></div>");
                iframe_div.addClass(id);
                iframe_div.data("id",id);
                $("#iframe").append(iframe_div);
                //console.log(iframe_div);
            };

            //确定左侧导航栏是生成还是显现
            var creat=isShow($("#containMainL_div>div"),$("#containMainL_div"),id);

            //点击使自己变色
            $(this).parent().find("li").css({"backgroundColor":"","border-radius":"","color":''});
            $(this).css({"backgroundColor":"white","border-radius":"3px","color":'#2380f4'});
            var data=YJ_main[id];
            if(creat){
                //$("#containMainL_ul").children().remove();
                var ul=$("<ul class='containMainL_ul'>");
                for(var i=0;i<data.length;i++){
                    var li=$("<li></li>"),
                        div=$("<div></div>"),
                        img=$("<img src='../youjin/images/user/bc_10.png'>"),
                        span=$("<span></span>");
                    span.text(data[i]["content"]);
                    li.append(div);
                    div.append(img);
                    div.append(span);
                    creat.append(ul);
                    ul.append(li);
                    if(data[i]["data"]){
                        var data_data=data[i]["data"];
                        var li_ul=$("<ul class='containMainL_ul_ul' style='display: block'></ul>");
                        if(id=="ad"){
                            li_ul=$("<ul class='containMainL_ul_ul' style='display: none'></ul>");
                        }
                        li.after(li_ul);
                        //下拉
                        li.click((function(li_ul){
                            function ul() {
                                li_ul.toggle();
                            }
                            return ul;
                        })(li_ul));
                        for(var j=0;j<data_data.length;j++){
                            var li_ul_li=$("<li></li>"),li_ul_img=$("<img src='../youjin/images/user/bc_18.png'>"),name=data_data[j]["name"];
                            li_ul_li.text(name);
                            li_ul.append(li_ul_li);
                            li_ul_li.append(li_ul_img);
                            li_ul_img.css("display","none");
                            if(data_data[j]["data"].length!=0){
                                var data_data_data=data_data[j]["data"];
                                //第三级UL
                                var li_ul_ul=$("<ul class='containMainL_ul_ul_ul' style='display:none'></ul>");
                                li_ul_li.data({"img":"1"});
                                for(var k=0;k<data_data_data.length;k++){
                                    var li_ul_ul_li=$("<li></li>"),name2=data_data_data[k]["name"],url2=data_data_data[k]["url"],ifid2=data_data_data[k]["ifid"],url_length2=data_data_data[k]["url_length"];
                                    var li_ul_img2=$("<div src='../youjin/images/user/jiahao.png'></div>");
                                    li_ul_img2.css({"width":"8px","height":"8px","background-color":"#2380f4","border-radius":"6px","box-sizing":"border-box"});
                                    var li_ul_li_span=$("<span></span>");
                                    li_ul_li_span.text(name);
                                    //li的内容重置
                                    li_ul_li.text("");
                                    li_ul_li.append(li_ul_img2);
                                    li_ul_li.append(li_ul_li_span);
                                    var li_ul_ul_img=$("<img src='../youjin/images/user/bc_18.png'>");
                                    li_ul_ul_li.data({"url":url2,"ifid":ifid2,"name":name2,"url_length":url_length2,"id":id});
                                    li_ul_ul_img.data({"url":url2,"ifid":ifid2,"name":name2});
                                    li_ul_ul_li.text(name2);
                                    li_ul_ul_li.append(li_ul_ul_img);
                                    li_ul_ul_img.css("display","none");
                                    li_ul_ul.append(li_ul_ul_li);
                                    li_ul_ul_li.click(li_ul_liHandle);
                                }
                                li_ul_li.after(li_ul_ul);
                                li_ul_li.click((function(li_ul){
                                    function ul() {
                                        li_ul.toggle();
                                    }
                                    return ul;
                                })(li_ul_ul));
                                li_ul_li.click(FirstLevelLi);
                                //给可能的下级数据留的接入口//写入URL的地方
                            }else{
                                var url=data_data[j]["url"],ifid=data_data[j]["ifid"],url_length=data_data[j]["url_length"];
                                li_ul_li.data({"url":url,"ifid":ifid,"name":name,"url_length":url_length,"id":id});
                                li_ul_img.data({"url":url,"ifid":ifid,"name":name});
                                li_ul_li.click(li_ul_liHandle);
                            }
                        }
                    }
                }
                //初始默认点击对话
                defaultLeftBar(id);
            }
            //默认大类点击触发小类的添加处；

        }
    }

}
//初始默认点击对话
function defaultLeftBar(id) {
    // if(id=="service"){
    //     $("#containMainL_ul>ul:nth-child(2)>li:nth-child(1)").trigger("click");
    // }else if(id=="model"){
    //     $("#containMainL_ul>ul").eq(9).find("li").eq(0).trigger("click");
    // }
    var id=id,
        classId="."+id;
    switch (id){
        case "service":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(0).find("li").eq(0).trigger("click");
            break;
        case "model":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(4).find("li").eq(0).trigger("click");
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(4).find(".containMainL_ul_ul_ul").eq(0).find("li").eq(0).trigger("click");
            break;
        case "check":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(0).find("li").eq(0).trigger("click");
            break;
        case "uCoin":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(1).find("li").eq(0).trigger("click");
            break;
        case "ad":
            $("#containMainL_div").children(classId).find(".containMainL_ul").eq(0).find("li").eq(0).trigger("click");
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(0).find("li").eq(1).trigger("click");
            break;
        case "bigDate":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(0).find("li").eq(0).trigger("click");
            break;
        case "companyControl":
            $("#containMainL_div").children(classId).find(".containMainL_ul_ul").eq(0).find("li").eq(0).trigger("click");
            break;
    }
}
//确定视图显现还是生成
function isShow(jQ,jQ2,id,jQ3) {
    var judge=false;
    jQ.each(function () {
        $(this).css("display","none");
        if($(this).data("id")==id){
            $(this).css("display","block");
            judge=true;
        }
    });
    if(!judge){
        var shell_div=$("<div></div>");
        // if(jQ3){
        //     shell_div=$("<ul class='containMainL_ul' id='containMainL_ul'></ul>");
        // }
        shell_div.addClass(id);
        shell_div.data("id",id);
        jQ2.append(shell_div);
    };
    if(judge){
        return false
    }else {
        return shell_div;
    }
}
//左侧导航栏耳机提示背景更换图
function FirstLevelLi() {
    if($(this).data("img")==1){
        $(this).find("div").css({"width":"8px","height":"8px","background-color":"","border":"1px solid #2380f4"});
        $(this).data("img","2");
    }else{
        $(this).find("div").css({"width":"8px","height":"8px","background-color":"#2380f4","border":""});
        $(this).data("img","1");
    }
}
//框架控制生成函数
function li_ul_liHandle() {
    var id=$(this).data("id");
    var class_id="."+id;
    //console.log(class_id);

    $("#containMainL_div").children(class_id).find(".containMainL_ul_ul li").css({"backgroundColor":"","color":""});
    $(this).css({"backgroundColor":"#ebf3ff","color":"#2380f4"});
    var _li=this,spanBloean=false,divBloean=false;
    $(".navLabel").children(class_id).children("div").each(function () {
        if(!$(this).data("ifid")){
            $(this).remove();
        }
        $(this).css({"backgroundColor":"#91bff9"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"backgroundColor":""});
            spanBloean=true;
        }
    });
    $("#iframe").children(class_id).children("div").each(function () {
        if(!$(this).data("ifid")){
            $(this).remove();
        }
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
            divBloean=true;
        }
    });
    $("#containMainL_div").children(class_id).find(".containMainL_ul_ul li>img").each(function () {
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
        }
    });
    var ifid=$(this).data("ifid"),url=$(this).data("url");
    //控制生成右侧标签
    if(!spanBloean){
        var div=$("<div></div>"),span=$("<span></span>"),img=$("<img src='../youjin/images/user/未标题-6.png'>");
        span.text($(this).data("name"));
        div.click(divLable);
        img.click(imgLable);
        div.append(span);
        div.append(img);
        img.data("id",id);
        div.data({"url":url,"ifid":ifid,"id":id});
        $(".navLabel").children(class_id).append(div);
    }
    //控制生成iframe
    if(!divBloean){
        var urlLength=$(this).data("url_length");
        if(urlLength){
            //这段代码基本没有用只是提供了一种思路用JS去控制iframecde 宽度和生成 功能能实现 但是觉得不是合理的方法 不删除 多看看
            var divC=$("<div class='c'></div>");
                divC.data("ifid",ifid);
            var urlArr=$(this).data("url");
            for(var m=0;m<urlLength;m++){
                var div2=$("<div></div>"), iframe=$("<iframe frameborder='0' scrolling ='no' class='iframe2'></iframe>");
                var width=$(window).width(),height=$(window).height(),percentWidth=((width-200)/width)*100+"%",pecentHeight=((height-121)/height)*100+"%";
                var baseWidth=((width-200)/width)*100/2;
                var baseWidth2=(width-(baseWidth/100*width+210))/width*100;
                //计算iframe的宽度
                //console.log("baseWidth2",baseWidth2);
                div2.data("ifid",ifid);
                iframe.attr("src",urlArr[m]);
                if(m==0&&urlLength==2){
                    iframe.addClass("iframe2_left");
                    iframe.css({"width":baseWidth+"%","height":pecentHeight});
                }else if(m==1&&urlLength==2){
                    iframe.addClass("iframe2_right");
                    iframe.css({"width":baseWidth+"%","height":pecentHeight}).css({"border-left-width":"5px",
                                "border-left-color":"#c6e0fb","border-left-style":"solid",
                                "margin-left":baseWidth/100*width+200+"px"});
                }
                //iframe.css({"width":percentWidth,"height":pecentHeight});
                div2.append(iframe);
                divC.append(div2);
            }
            $("#iframe").children(class_id).append(divC);
        }else {
            var div2=$("<div></div>"),iframe=$("<iframe frameborder='0'scrolling ='no'></iframe>");
            // div2.css({"position":"relative","z-index":"1"});
            var width=$(window).width(),height=$(window).height(),percentWidth=((width-200)/width)*100+"%",pecentHeight=((height-121)/height)*100+"%";
            div2.data("ifid",ifid);

            //不停地改变URL

            var urlMd=url+"?v="+(Math.ceil(Math.random()*1e3));
            iframe.attr("src",urlMd);
            iframe.css({"width":percentWidth,"height":pecentHeight});
            div2.append(iframe);
            $("#iframe").children(class_id).append(div2);
        }
    }
    if($(".navLabel").children(class_id).children("div").length>10){
        $(".navLabel").children(class_id).children("div:first-child").remove();
        //alert("窗口太多请先关闭窗口");
        // return ;
    }
}
//点击DIV关联变色
function divLable() {
    var _li=this;
    var id=$(this).data("id");
    var class_id="."+id;
    $(".navLabel").children(class_id).children("div").css({"backgroundColor":"#91bff9"});
    $(this).css({"backgroundColor":""});
    $("#iframe").children(class_id).children("div").each(function () {
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
            divBloean=true;
        }
    });
    $("#containMainL_div").children(class_id).find(".containMainL_ul_ul li").each(function () {
        $(this).css({"backgroundColor":"","color":""});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"backgroundColor":"#ebf3ff","color":"#2380f4"});
        }
    });
    $("#containMainL_div").children(class_id).find(".containMainL_ul_ul li>img").each(function () {
        $(this).css({"display":"none"});
        if($(this).data("ifid")==$(_li).data("ifid")){
            $(this).css({"display":"block"});
        }
    });
}
//点击X键关闭相应页面
function imgLable(e) {
    var e=e||event;
    e.stopPropagation();
    var id=$(this).data("id");
    var class_id="."+id;
    //console.log(class_id);
    var _li=this;
    var ifid=$(_li).parent("div").data("ifid");
    //console.log(ifid);
    $(_li).parent("div").remove();
    $("#iframe").children(class_id).children("div").each(function () {
        if($(this).data("ifid")==ifid&&$(this).css("display")=="block"){
            $(this).remove();
            $(".navLabel").children(class_id).children(":last-child").trigger("click");
        }else if($(this).data("ifid")==ifid&&$(this).css("display")!="block"){
            $(this).remove();
        }
    });
    //$(".navLabel>div:last-child").trigger("click");
}
function timeDisplay() {
    var week={
        "0":"星期天",
        "1":"星期一",
        "2":"星期二",
        "3":"星期三",
        "4":"星期四",
        "5":"星期五",
        "6":"星期六",
    };
    var data=new Date(),
        date=data.getDate(),
        day=data.getDay(),
        year=data.getFullYear(),
        hour=data.getHours(),
        minnute=data.getMinutes(),
        seconds=data.getSeconds(),
        month=data.getMonth()+1,
        dayC=week[day];

    if(minnute<10){
        minnute="0"+minnute;
    }
    if(seconds<10){
        seconds="0"+seconds;
    }
    var k=year+"-"+month+"-"+date+" "+" "+hour+":"+minnute+":"+seconds+" "+dayC;
    $("#timeDisplay").text(k);

    //一直捕捉某个元素
    // var content=$("#zcf_container");
    // console.log("time");
    // if(content.length!=0&&relation.count){
    //     console.log("true1");
    //     var ue = UE.getEditor('zcf_container',{
    //         toolbars: [
    //             ['undo', 'redo','simpleupload']
    //         ],
    //         autoHeightEnabled:false,
    //         initialFrameHeight:"400px",
    //         zIndex:"10000",
    //         enableAutoSave:false,
    //     });
    //     relational
    // }
}
function resizeHandle() {
    var width=$(window).width(),
        height=$(window).height(),
        percentWidth=((width-200)/width)*100+"%",
        pecentHeight=((height-121)/height)*100+"%",
        pecentHeight2=((height-96)/height)*100+"%",
        baseWidth=((width-200)/width)+"%";
    $("#containMainR_user iframe:not(.iframe2)").css({"width":percentWidth,"height":pecentHeight});
    $("#containMainR_main_iframe").css({"width":percentWidth,"height":pecentHeight2});
    $("#containMainR_user .iframe2").css({"height":pecentHeight});
    //$(".iframe2_right").css({"border-left-width":"20px","border-left-color":"#2380f4","border-left-style":"solid"});
}
//传新密码
function ajaxP(par) {
    var data={},
        input=par.find("[data-base]");
        input.each(function () {
           var _this=$(this),
               name=_this.attr("data-base"),
               value=_this.val();
            data[name]=value;
        });
    $.ajax(
        {
            type: "POST",
            url:relational.url+"?m=UserManage&s=editpwd",
            data:data,
            success: function (msg) {
                var _msg=msg;
                if(_msg.r==1){
                    popplug([{},{content:_msg.msg}]);
                    par.removeClass("new_pop_show");
                    input.each(function () {
                        $(this).val("");
                    })
                }else {
                    popplug([{},{content:_msg.msg}]);
                }
            },
        }
    )
}
//退出
function ajaxQ() {
    $.ajax(
        {
            type: "GET",
            url:relational.url+"api/t.php?a=logout",
            success: function (msg) {
                var _msg=msg;
                if(_msg.r==1){

                }else {
                    //popplug([{},{content:_msg.msg}]);
                }
                window.location=relational.url+"/login/login.html";
            },
        }
    )
};
//左边栏显示数值
function ajaxLShow() {
    $.ajax(
        {
            type: "GET",
            url:relational.url+"?m=Manage&s=access",
            success: function (msg) {
                var _msg=msg,
                    num=_msg.sum,
                    li=$(".main").find(".mian_ul_li");
                num.apply=num.apply=="0"?"-":num.apply;
                li.eq(0).text(num.apply);
                num.top=num.top=="0"?"-":num.top;
                li.eq(1).text(num.top);
                num.qujin=num.qujin=="0"?"-":num.qujin;
                li.eq(2).text(num.qujin);
                num.dj=num.dj=="0"?"-":num.dj;
                li.eq(3).text(num.dj);
                num.cj=num.cj=="0"?"-":num.cj;
                li.eq(4).text(num.cj);
                num.free=num.free=="0"?"-":num.free;
                li.eq(5).text(num.free);
                num.feedback=num.feedback=="0"?"-":num.feedback;
                li.eq(6).text(num.feedback);
                // if(_msg.r==1){
                //
                // }else {
                //     //popplug([{},{content:_msg.msg}]);
                // }
                // window.location=relational.url+"/login/login.html";
            },
        }
    )
}
//设置权限
relational.limit=function () {
  //console.log(sessionStorage);
    var limit=[];
    //需要修改的地方
    if(sessionStorage.limit){
        limit=sessionStorage.limit.split(",");
        var head=$(".headM>li");
        head.each(function (i) {
            for(var k=0;k<limit.length;k++){
                if(limit[k]-1==i){
                    return
                }
            }
            $(this).remove();
        });
        //console.log(limit,"limit");
    }

};
function readyHandle() {
    //权限设置的地方
    relational.limit();

    $(".headM>li").click(headMclick);
    $("#main").trigger("click");
    setInterval(timeDisplay,800);
    $(window).resize(resizeHandle);
    $("#modify_password").click(function () {
        $("#zcf_new_pop_password").addClass("new_pop_show");
    });
    $("#quit").click(function () {
        $("#zcf_new_pop_quit").addClass("new_pop_show");
    });
    $(".new_pop_head_X,.new_pop_tail_button2").click(function () {
       var _this=$(this),
           par=_this.parents(".new_pop");
        par.removeClass("new_pop_show");
        par.find("[data-base]").each(function () {
            $(this).val("");
        })
    });
    $(".new_pop_tail_button1").click(function () {
        var _this=$(this),
            par=_this.parents(".new_pop"),
            id=par.attr("id");
        console.log("par",par,id);
        if(id=="zcf_new_pop_quit"){
            ajaxQ();
        }
        if(id=="zcf_new_pop_password"){
            ajaxP(par);
        }
    });
//显示用户的名字
    $(".headRli span").eq(0).text(sessionStorage.userName);
    //监听事件
var     UEWindow,//存储传过来的页面的window对象
        iframeWindow;
    window.addEventListener("message",function (e) {
        console.log('e',e);
        var data=JSON.parse(e.data);
        // if(data.Ueditor){
            // //window.UEDITOR_HOME_URL="/page/youjin1117/youjin/js/";
            // var par=$("#zcf_container").parent(),
            //     //choice=par.data("UeditorR");
            //     choice=par[0].chioce;
            // console.log("choice",choice,"par2",par,"zcf_container",$("#zcf_container"));
            // if(!choice){
            //     console.log("true1");
            //     var ue = UE.getEditor('zcf_container',{
            //         toolbars: [
            //             ['undo', 'redo','simpleupload']
            //         ],
            //         autoHeightEnabled:false,
            //         initialFrameHeight:"400px",
            //         zIndex:"10000",
            //         autosave:false,
            //     });
            //     //par.data("UeditorR",true);
            //     ue.ready(function () {
            //         window.relational.UEbai=1;
            //         par[0].chioce=true;
            //         console.log("ready");
            //     });
            // }
        //     window.UE=e.source.UE;
        //     window.$EDITORUI=e.source.$EDITORUI;
        // }
        // if(data.delete === true){
        //     console.log("delete",data);
        //     UE.delEditor('zcf_container');
        // }
        if(data.indentify==="UE"){
            UEWindow=e.source;
            window.relational.ueStatus="ready";
        }
        if(data.indentify==="children"){
            iframeWindow=e.source;
        }
    })
}
$(document).ready(readyHandle);