import Login from '@/components/login/Login'
import AccountManage from '@/components/Home1/account/AccountManage'
import Role from '@/components/Home1/account/Role'
import Fence from '@/components/Home1/datacount/Fence'
import PlantLeasing from '@/components/Home1/datacount/PlantLeasing'
import Sos from '@/components/Home1/datacount/Sos'
import Management from '@/components/Home1/Management/Management'
import TestMap from '@/components/Home1/page/TestMap'
import Emitters from '@/components/Home1/page/Emitters'
import PeopleCounting from '@/components/Home1/datacount/PeopleCounting'
import EmittersCount from '@/components/Home1/page/EmittersCount'
import EmittersLog from '@/components/Home1/page/EmittersLog'
import Place from '@/components/Home1/page/Place'
import MachineCount from '@/components/Home1/page/MachineCount'
import Promotion from '@/components/Home1/promotion/Promotion'
import PromotionLog from '@/components/Home1/promotion/PromotionLog'
import SpotService from '@/components/Home1/SpotService/SpotService'
import Index from '@/components/Home1/Index'
import Menu from '@/components/common/Menu'
// 景区界面相关文件
import SpotIndex from '@/components/Home/Index'
import SpotsMessages from '@/components/Home/Spotsmessages/SpotsMessages'
import Energizer from '@/components/Home/Spotsmessages/Energizer'
import Scenic from '@/components/Home/Spotsmessages/Scenic'
import Tours from '@/components/Home/Spotsmessages/Tours'
import Trace from '@/components/Home/Spotsmessages/Trace'

import Promotions from '@/components/Home/Promotion/Promotions'
import PromotionLogs from '@/components/Home/Promotion/PromotionLogs'
import Equipment from '@/components/Home/page/Equipment'
import Firms from '@/components/Home/page/Firms'
import BMapcomponents from '@/components/Home/page/BMapcomponents'

import Guidemessage from '@/components/Home/page/Guidemessage'
import Fences from '@/components/Home/datacount/Fences'
import RFID from '@/components/Home/datacount/RFID'
import Seat from '@/components/Home/datacount/Seat'
import Help from '@/components/Home/datacount/Help'
import Travel from '@/components/Home/datacount/Travel'




let routes = [
    {
        path: '/',
        component: Login,
        // name: '登录',
        iconCls: 'el-icon-document',
    },
    {
        path: '/index',
        component: Index,
        // name: '首页',
        // redirect:TestMap,
        iconCls: 'el-icon-document',
        children: [
            {path: '/TestMap', component: TestMap, name: '地图'},
            {path: '/SpotService', component: SpotService, name: '景区服务商'},
            {path: '/PeopleCounting', component: PeopleCounting, name: '人流统计'},
            {path: '/PromotionLog', component: PromotionLog, name: '升级日志'},
            {path: '/Promotion', component: Promotion, name: '升级情况'},
            {path: '/MachineCount', component: MachineCount, name: '机器码统计'},
            {path: '/Place', component: Place, name: '位置版'},
            {path: '/EmittersCount', component: EmittersCount, name: '发射源'},
            {path: '/Emitters', component: Emitters, name: '发射源统计'},
            {path: '/Management', component: Management, name: '设备信息'},
            {path: '/Sos', component: Sos, name: 'SOS统计'},
            {path: '/PlantLeasing', component: PlantLeasing, name: '设备租赁次数'},
            {path: '/Fence', component: Fence, name: '电子围栏统计'},
            {path: '/Role', component: Role, name: '角色管理'},
            {path: '/AccountManage', component: AccountManage, name: '账号管理'},
            {path: '/EmittersLog', component: EmittersLog, name: '发射源访问日志'},
        ]
    },
    {
        path:'/spotindex',
        component:SpotIndex,
        iconCls:'el-icon-document',
        children:[
              {path:"/BMapcomponents",component:BMapcomponents,name:"地图"},
              {path:"/SpotsMessages",component:SpotsMessages,name:"景点信息"},
              {path:"/Energizer",component:Energizer,name:"景点信息"},
              {path:"/Scenic",component:Scenic,name:"景点信息"},
              {path:"/Tours",component:Tours,name:"景点信息"},
              {path:"/Trace",component:Trace,name:"景点信息"},

              {path:"/Promotions",component:Promotions,name:"客流量统计"},
              {path:"/PromotionLogs",component:PromotionLogs,name:"设备租赁次数统计"},
              {path:"/Equipment",component:Equipment,name:"设备信息"},
              {path:"/Firms",component:Firms,name:"成员信息"},
              {path:"/Guidemessage",component:Guidemessage,name:"导游信息"},
              {path:"/Fences",component:Fences,name:"导游信息"},
              {path:"/RFID",component:RFID,name:"导游信息"},
              {path:"/Seat",component:Seat,name:"导游信息"},
              {path:"/Help",component:Help,name:"导游信息"},
              {path:"/Travel",component:Travel,name:"导游信息"},



        ]
    }
   
    
]

export default routes