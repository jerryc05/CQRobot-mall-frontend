import { getBySel, getBySelLike } from './util'

before(() => {
  cy.intercept('GET', '/api/categories/tree', req => {
    req.reply(category)
  })
})

describe('category api', () => {
  it('fetch from backend and display', () => {
    cy.visit('/')

    // getBySel('currency-selected').then(el => {
    //   verify(el.text())
    // })

    // getBySelLike('currency-btn-').then(btns => {
    //   for (const btn of btns) {
    //     getBySel(`currency-btn-${btn.textContent}`).click({ force: true })
    //     verify(btn.textContent || '')
    //   }
    // })
  })
})

const category = [
  {
    id: 107,
    name: '传感器',
  },
  {
    id: 237,
    name: '机器人',
    children: [
      {
        id: 249,
        name: '配件',
      },
      {
        id: 309,
        name: '组件',
      },
      {
        id: 435,
        name: '移动机器人',
      },
      {
        id: 436,
        name: '仿生机器人',
      },
      {
        id: 437,
        name: '驱动器/传感器/激光雷达',
      },
      {
        id: 438,
        name: '电机/伺服',
      },
      {
        id: 439,
        name: '机械臂/控制',
      },
      {
        id: 440,
        name: '机器人组件',
      },
    ],
  },
  {
    id: 238,
    name: '原型制作',
    children: [
      {
        id: 255,
        name: '连接器插头',
        children: [
          {
            id: 257,
            name: 'JST连接器',
            children: [
              {
                id: 261,
                name: 'JST PH',
              },
              {
                id: 263,
                name: 'JST XH',
              },
              {
                id: 265,
                name: 'JST PA',
              },
              {
                id: 267,
                name: 'JST XA',
              },
              {
                id: 269,
                name: 'JST SM',
              },
              {
                id: 270,
                name: 'JST EL',
              },
              {
                id: 271,
                name: 'JST SYP',
              },
              {
                id: 320,
                name: 'JST ZH',
              },
              {
                id: 321,
                name: 'JST VH',
              },
              {
                id: 323,
                name: 'JST CH',
              },
              {
                id: 338,
                name: 'JST GH',
              },
              {
                id: 339,
                name: 'JST SH',
              },
            ],
          },
          {
            id: 322,
            name: '杜邦',
          },
          {
            id: 328,
            name: '莫仕',
          },
          {
            id: 456,
            name: '汽车连接器',
          },
        ],
      },
      {
        id: 256,
        name: '扬声器',
        children: [
          {
            id: 260,
            name: '扬声器CQR3070',
            children: [
              {
                id: 278,
                name: '8Ω5W',
              },
              {
                id: 279,
                name: '8Ω3W',
              },
              {
                id: 280,
                name: '4Ω3W',
              },
            ],
          },
        ],
      },
      {
        id: 259,
        name: '串口转换器',
        children: [
          {
            id: 274,
            name: 'USB转RS422或RS485',
          },
          {
            id: 275,
            name: 'RS232转RS422/RS485',
          },
          {
            id: 276,
            name: 'RS232转RS485',
          },
          {
            id: 367,
            name: 'USB转RS232',
          },
        ],
      },
      {
        id: 295,
        name: '连接线',
        children: [
          {
            id: 296,
            name: 'XT60电缆',
          },
        ],
      },
      {
        id: 324,
        name: '螺丝和螺母',
        children: [
          {
            id: 325,
            name: 'PC透明亚克力',
            children: [
              {
                id: 326,
                name: 'M3',
              },
              {
                id: 327,
                name: 'M2.5',
              },
              {
                id: 340,
                name: 'M4',
              },
              {
                id: 341,
                name: 'M5',
              },
              {
                id: 342,
                name: 'M6',
              },
            ],
          },
          {
            id: 389,
            name: '尼龙黑色',
            children: [
              {
                id: 390,
                name: 'M2',
              },
              {
                id: 391,
                name: 'M2.5',
              },
              {
                id: 392,
                name: 'M3',
              },
              {
                id: 393,
                name: 'M4',
              },
              {
                id: 396,
                name: 'M5',
              },
              {
                id: 397,
                name: 'M6',
              },
              {
                id: 398,
                name: 'M8',
              },
            ],
          },
        ],
      },
      {
        id: 333,
        name: '跳线帽',
        children: [
          {
            id: 334,
            name: '5.08mm',
          },
          {
            id: 335,
            name: '2.54mm',
          },
          {
            id: 336,
            name: '2.0mm',
          },
        ],
      },
      {
        id: 352,
        name: 'PCB焊接端子',
        children: [
          {
            id: 353,
            name: 'M3',
          },
          {
            id: 354,
            name: 'M4',
          },
        ],
      },
      {
        id: 355,
        name: 'IDC盒式接头连接器',
        children: [
          {
            id: 356,
            name: '2.54mm间距',
          },
          {
            id: 394,
            name: '2.0mm间距',
          },
        ],
      },
      {
        id: 360,
        name: 'DIP开关SMT',
        children: [
          {
            id: 343,
            name: '1.27mm间距',
            children: [
              {
                id: 344,
                name: '1位',
              },
              {
                id: 345,
                name: '2位',
              },
              {
                id: 346,
                name: '3位',
              },
              {
                id: 347,
                name: '4位',
              },
              {
                id: 348,
                name: '5位',
              },
              {
                id: 349,
                name: '6位',
              },
              {
                id: 350,
                name: '8位',
              },
              {
                id: 351,
                name: '10位',
              },
            ],
          },
        ],
      },
      {
        id: 457,
        name: '直流电源插头',
        children: [
          {
            id: 458,
            name: '母插头',
          },
          {
            id: 459,
            name: '公插头',
          },
        ],
      },
    ],
  },
  {
    id: 242,
    name: '直流减速电机',
    children: [
      {
        id: 243,
        name: '直径37mm',
        children: [
          {
            id: 244,
            name: '带编码器',
            children: [
              {
                id: 293,
                name: '12V带编码器',
              },
              {
                id: 294,
                name: '24V带编码器',
              },
            ],
          },
          {
            id: 297,
            name: '不带编码器',
            children: [
              {
                id: 300,
                name: '12V不带编码器',
              },
              {
                id: 302,
                name: '24V不带编码器',
              },
            ],
          },
        ],
      },
      {
        id: 245,
        name: '直径25mm',
        children: [
          {
            id: 286,
            name: '带编码器',
            children: [
              {
                id: 287,
                name: '6V高功率带编码器',
              },
              {
                id: 288,
                name: '6V低功率带编码器',
              },
              {
                id: 289,
                name: '12V高功率带编码器',
              },
              {
                id: 290,
                name: '12V低功率带编码器',
              },
              {
                id: 291,
                name: '12V中功率带编码器',
              },
            ],
          },
          {
            id: 298,
            name: '不带编码器',
            children: [
              {
                id: 299,
                name: '12V高功率',
              },
              {
                id: 301,
                name: '12V中功率',
              },
              {
                id: 303,
                name: '12V低功率',
              },
              {
                id: 304,
                name: '6V高功率',
              },
              {
                id: 305,
                name: '6V低功率',
              },
            ],
          },
        ],
      },
      {
        id: 246,
        name: '直径20mm',
        children: [
          {
            id: 318,
            name: '不带编码器',
          },
          {
            id: 319,
            name: '带编码器',
          },
        ],
      },
      {
        id: 310,
        name: '直径12mm',
        children: [
          {
            id: 248,
            name: '单轴',
            children: [
              {
                id: 250,
                name: '6V低功率单轴',
              },
              {
                id: 251,
                name: '6V中功率单轴',
              },
              {
                id: 252,
                name: '6V高功率单轴',
              },
              {
                id: 253,
                name: '6V高功率碳刷电机',
              },
              {
                id: 254,
                name: '12V高功率碳刷电机',
              },
            ],
          },
          {
            id: 311,
            name: '双轴',
            children: [
              {
                id: 312,
                name: '6V低功率双轴',
              },
              {
                id: 313,
                name: '6V中功率双轴',
              },
              {
                id: 314,
                name: '6V高功率双轴',
              },
              {
                id: 315,
                name: '6V高功率碳刷双轴',
              },
              {
                id: 316,
                name: '12V高功率碳刷双轴',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 306,
    name: '开发平台',
    children: [
      {
        id: 232,
        name: '人工智能',
      },
      {
        id: 234,
        name: '树莓派',
      },
      {
        id: 235,
        name: 'Arduino',
      },
      {
        id: 307,
        name: '组件',
        children: [
          {
            id: 329,
            name: '摄像头',
            children: [
              {
                id: 330,
                name: '单摄像头',
              },
              {
                id: 331,
                name: '双摄像头',
              },
            ],
          },
          {
            id: 332,
            name: '扩展模块',
          },
        ],
      },
      {
        id: 308,
        name: '配件',
        children: [
          {
            id: 366,
            name: '无线网卡',
          },
        ],
      },
      {
        id: 317,
        name: 'micro:bit',
      },
    ],
  },
  {
    id: 395,
    name: 'M5',
  },
  {
    id: 399,
    name: '树莓派',
    children: [
      {
        id: 400,
        name: '板子/套件',
      },
      {
        id: 401,
        name: '显示器',
      },
      {
        id: 402,
        name: '摄像头',
      },
      {
        id: 403,
        name: 'HATs',
      },
      {
        id: 404,
        name: '一体机',
      },
      {
        id: 405,
        name: '机器人',
      },
      {
        id: 406,
        name: '便携式游戏',
      },
      {
        id: 407,
        name: '配件',
      },
    ],
  },
  {
    id: 408,
    name: '人工智能',
    children: [
      {
        id: 409,
        name: '板子/套件',
      },
      {
        id: 410,
        name: '显示器',
      },
      {
        id: 411,
        name: '摄像头',
      },
      {
        id: 412,
        name: '扩展模块',
      },
      {
        id: 413,
        name: '机器人',
      },
      {
        id: 414,
        name: '配件',
      },
    ],
  },
  {
    id: 415,
    name: 'RISC-V',
    children: [
      {
        id: 416,
        name: '板子/套件',
      },
      {
        id: 417,
        name: '显示器',
      },
      {
        id: 418,
        name: '扩展模块/配件',
      },
      {
        id: 419,
        name: '摄像头',
      },
    ],
  },
  {
    id: 420,
    name: '显示器',
    children: [
      {
        id: 421,
        name: 'LCD',
      },
      {
        id: 422,
        name: 'OLED',
      },
      {
        id: 423,
        name: '电子纸',
      },
      {
        id: 424,
        name: '配件',
      },
    ],
  },
  {
    id: 425,
    name: '物联网/通信',
    children: [
      {
        id: 426,
        name: '长距离无线',
      },
      {
        id: 427,
        name: '短距离无线',
      },
      {
        id: 428,
        name: '有线通信/转换器',
      },
    ],
  },
  {
    id: 429,
    name: '杂项模块',
    children: [
      {
        id: 430,
        name: '摄像头/音频/视频',
      },
      {
        id: 431,
        name: '传感器',
      },
      {
        id: 432,
        name: '电机/伺服',
      },
      {
        id: 433,
        name: '其他',
      },
    ],
  },
  {
    id: 434,
    name: '机器人',
  },
  {
    id: 441,
    name: 'Arduino相关/Nucleo',
    children: [
      {
        id: 442,
        name: '板子/套件',
      },
      {
        id: 443,
        name: '扩展板',
      },
      {
        id: 444,
        name: '机器人',
      },
    ],
  },
  {
    id: 445,
    name: 'micro:bit',
    children: [
      {
        id: 446,
        name: '板子/套件',
      },
      {
        id: 447,
        name: '扩展模块',
      },
      {
        id: 448,
        name: '机器人',
      },
    ],
  },
  {
    id: 449,
    name: 'MCU/ARM',
    children: [
      {
        id: 450,
        name: '核心板/紧凑板',
      },
      {
        id: 451,
        name: '开发板/扩展模块',
      },
      {
        id: 452,
        name: '调试器/编程器',
      },
      {
        id: 453,
        name: '编程适配器',
      },
    ],
  },
  {
    id: 454,
    name: 'FPGA',
  },
  {
    id: 455,
    name: '插座/适配器',
  },
]
