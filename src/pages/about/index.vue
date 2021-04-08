<template>
	<div class="about-wrapper">
		<div class="content">
			<div class="down-file hover-active">
				<a href="https://cdn.coblog.cn/server/java.pdf" download="java.pdf" style="color:#888da8">下载PDF</a>
			</div>
			<div class="present">
				<div class="avatar-img">
					<img src="https://cdn.coblog.cn/server/personal_pic.jpg" style="width: 100%; height: 120%" alt="陈宋坤">
				</div>
				<p>
					陈宋坤
				</p>
				<p>
					软件开发工程师/深圳
				</p>
				<p>
					期望薪资&nbsp;:&nbsp;面议
				</p>
				<p>
					到职时间&nbsp;:&nbsp;3天内
				</p>
				<p>
					个人箴言&nbsp;:&nbsp;只要开始，永远都不会太晚。
				</p>
				<p>
					&nbsp;&nbsp;本人熟悉开发测试上线流程，参与 过多个大型互联网原生应用程序。精于分析推理，擅长解决复杂问题。做事勤勉，服从领导命令，毛遂自荐一波。
				</p>
			</div>
			<el-divider><h3>基本信息</h3></el-divider>
			<div class="info">
				<p>
					个人信息 陈宋坤/男/28<br>
					专业 电子信息科学与技术<br>
					学历 本科<br>
					英语水平 CET-4
				</p>
			</div>
			<el-divider><h3>联系方式</h3></el-divider>
			<div class="info">
				<p>
					手机 <a style="color: #53a8ff" href="#" >15820743115</a><br>
					邮箱 <a style="color: #53a8ff" href="#" >376010115@qq.com</a><br>
					个人主页  <a style="color: #53a8ff" href="https://www.coblog.cn" target="_blank">www.coblog.cn</a><br>
					GitHub <a style="color: #53a8ff" href="http://www.github.com/collbychen" target="_blank">www.github.com/collbychen</a><br>
				</p>
			</div>
			<el-divider><h3>技能点</h3></el-divider>
			<div class="info">
				<div class="tech">
					<div class="tech-name">
						Java
					</div>
					<div class="progress-bar">
						<el-progress :percentage="80" :show-text="false" color="#53a8ff"></el-progress>
					</div>
				</div>
				<div class="tech">
					<div class="tech-name">
						Go
					</div>
					<div class="progress-bar">
						<el-progress :percentage="40" :show-text="false" color="#53a8ff"></el-progress>
					</div>
				</div>
				<div class="tech">
					<div class="tech-name">
						Vue
					</div>
					<div class="progress-bar">
						<el-progress :percentage="70" :show-text="false" color="#53a8ff"></el-progress>
					</div>
				</div>
				<div class="tech">
					<div class="tech-name">
						Mysql
					</div>
					<div class="progress-bar">
						<el-progress :percentage="70" :show-text="false" color="#53a8ff"></el-progress>
					</div>
				</div>
				<div class="tech">
					<div class="tech-name">
						Linux
					</div>
					<div class="progress-bar">
						<el-progress :percentage="60" :show-text="false" color="#53a8ff"></el-progress>
					</div>
				</div>
			</div>
			<div class="project">
				<h2>专业技能</h2>
				<hr class="parting-line line">
				<p>熟悉 java语言特性和使用，对JVM的原理有一定的了解,并具有Java IO、多线程等编程能力，了解 Golang、 C++ 其他语言</p>
				<p>熟悉 关系型MySQL数据库和MongoDB， Redis等 非关系型数据库</p>
				<p>熟悉 Dubbo、Zookeeper、Nacos、Apollo、SpringCloud市场主流分布式解决方案的使用</p>
				<p>熟悉 SpringBoot、Mybatis、RabbitMQ 消息队列和ElaticSearch搜索引擎的等开源框架</p>
				<p>了解 Html、Css、Vue等前端技术框架的基本使用</p>
				<p>熟悉 Eclipse, IDEA , WebStorm, HBuilder等常用集成开发软件</p>
				<p>	了解 Linux系统Centos和Ubuntu 版本及常用指令</p>
				<p>熟悉 Maven 和Gradle项目构建工具和SVN、GIT 项目版本管理工具</p>
				<p>	熟悉 Docker 开源应用容器引擎的使用</p>
				<p>了解 GitLab 和Jenkins的持续集成和持续部署</p>

				<h2>工作经历</h2>
				<hr class="parting-line line">
				<el-timeline>
					<el-timeline-item timestamp="2014年7月14 日 -  2015年6月30日" placement="top" color="#409EFF">
						<el-card>
							<h4>深圳市达实智股份有限公司</h4>
							<p>担任硬件维护人员, 在智能交通部主要负责深港地铁承包项目的门禁系统和售票系统机器的维护，对机器进行问题排查，查找问题并维修。</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2015年7月28 日 -  2017年3月16日" placement="top" color="#909399">
						<el-card>
							<h4>深圳市科安达电子科技股份有限公司</h4>
							<p>担任电子初级工程师, 主要参与显示器主控电路的设计，根据客户需求定制规格，绘制PCB,打样板焊接芯片和元器件，电路测试，接口调试，对接软件部门等。</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2017年3月30 日 -  2020年8月16日" placement="top" color="#E6A23C">
						<el-card>
							<h4>深圳市伐木里科技有限公司</h4>
							<p>在朋友的指导下，自主创业，从事跨境电商亚马逊平台的品牌设计，产品采购，调研选品，推广运营，物流配送等工作。</p>
						</el-card>
					</el-timeline-item>
					<el-timeline-item timestamp="2020年8月30日 -  2021年3月10日" placement="top" color="#67C23A">
						<el-card>
							<h4>传智教育股份有限深圳分公司</h4>
							<p>接受java高级就业班课程的培训，学习针对市场的系列主流框架，分布式解决方案，高并发处理，内容分发，负载均衡，前后分离，数据库技术及应用等知识点。</p>
						</el-card>
					</el-timeline-item>
				</el-timeline>
				<h2>项目经验</h2>
				<hr class="parting-line line">
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item name="1">
						<template slot="title">
							<h3>探花交友</h3>
						</template>
						<p>开发所用技术&nbsp;:&nbsp;SpringBoot Mybatis Redis MySQL Dubbo ES MongoDB RabbitMQ</p>
						<p>项目描述与业务流程&nbsp;:&nbsp;探花交友是一个陌生人的在线交友平台，在该平台中可以搜索附近的人，查看好友动态，平台还会通过大数据计算进行智能推荐，通
							过智能推荐可以找到更加匹配的好友，这样才能增进用户对产品的喜爱度。探花平台还提供了在线即时通讯功能，可以实时的与好友进行沟通，让沟通随时随地的进行。</p>
						<p>责任描述&nbsp;:&nbsp;主要负责后服务台开发，功能接口编写，也包括用户登录，短信验证，人脸识别，佳人推荐、最近访客、探花（类似探探的心动女生选择）、
							搜附近、桃花传音（与微信漂亮瓶相似）、测灵魂（心理测试）、 圈子（类似朋友圈动态）、消息模块：包含通知的消息和好友消息、小视频（类似抖音的短视频功能 ）
							、用户信息（关注数，喜欢数，粉丝数，动态）等功能的实现。</p>
					</el-collapse-item>
					<el-collapse-item name="2">
						<template slot="title">
							<h3>传智健康</h3>
						</template>
						<p>开发所用技术&nbsp;:&nbsp;SpringBoot Mybatis Redis Dubbo Zookeeper</p>
						<p>项目描述与业务流程&nbsp;:&nbsp;传智健康管理系统是一款应用于健康管理机构的业务系统，实现讲健康管理机构的工作内容可视化，会员管理专业化，健康评估数字化，
							健康干预流程化，知识库集成化，从而提高健康管理师的工作效率，加强与会员间的互动，增强管理者对健康机构运营情况的了解。</p>
						<p>责任描述&nbsp;:&nbsp;负责传智健康管理后台的开发，主要包括会员管理，预约管理，键盘评估，健康干预等功能</p>
					</el-collapse-item>
					<el-collapse-item name="3">
						<template slot="title">
							<h3>青橙商城</h3>
						</template>
						<p>开发所用技术&nbsp;:&nbsp;SpringBoot SpringCloud Mybatis Redis RabbitMQ Vue</p>
						<p>项目描述与业务流程&nbsp;:&nbsp;是属于全品类B2C电商系统，分为网站前台和管理后台，会员可以在平台浏览商品、下订单，以及参加各种活动。卖家可以在入住小当家，
							在该平台上开店出售自己的商品，并且得到平台提供的可靠的服务。管理员、运营可以在平台后台管理系统中管理商品、订单、会员等。客服可以在后台管理系统中处理用户的询问以及投诉。</p>
						<p>责任描述&nbsp;:&nbsp;参与项目数据库设计和用户端登录，订单，购物车满减优惠计算、秒杀、评论、仓库物流、统计分析、后台订单相关业务功能开发，权限设置等功能。</p>
					</el-collapse-item>
					<el-collapse-item name="4">
						<template slot="title">
							<h3>CoBlog个人博客</h3>
						</template>
						<p>开发所用技术&nbsp;:&nbsp;SpringBoot Mybatis JWT Vue TkMybatis </p>
						<p>责任描述&nbsp;:&nbsp;是一个自主开发，锻炼自己编程能力的项目，租用的阿里云服务器，用来展示自己的文章内容的个人网站，包括第三方登录，文章搜索（由于内存太小砍掉了es）,文章管理，发布等基本功能，有待开发。</p>
					</el-collapse-item>
				</el-collapse>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'About',
	layout: 'blog',
	head () {
		return {
			title: '关于- 小宋博客',
			meta: [
				{
					hid: 'home',
					name: 'description',
					content: '小宋-个人博客'
				}
			]
		}
	},
	data () {
		return {
			activeNames: ['1','2','3','4']
		}
	},
	methods: {
		handleChange(val) {
			// console.log(val);
		}
	}

}
</script>

<style scoped lang="stylus">
@import "~assets/css/theme"
.about-wrapper
	padding 30px
	//background-color $background-color
	background-color transparent
	box-sizing border-box
	line-height 2
	box-shadow $box-shadow
	border-radius 5px
	@media (max-width 768px)
		width 100%
		padding 10px
	.content
		padding 0 20px
		.down-file
			text-align center
			font-size 15px
			width 80px
			height 30px
			box-sizing border-box
			box-shadow $box-shadow
			border-radius 5px
		.present
			margin-top 30px
			display flex
			justify-content center
			align-items center
			flex-direction column
			.avatar-img
				overflow hidden
				width 200px
				height 200px
				box-sizing border-box
				border-radius 50%
		.info
			padding 0 15px
			.tech
				display flex
				align-items center
				.tech-name
					text-align left
					font-size 12px
					margin 0
					width 10%
				.progress-bar
					padding 0 20PX
					width 75%
		.project
			margin-top 20px
			.line
				margin 0 10px
</style>
