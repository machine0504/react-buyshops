import $ from 'jquery'
		//滚动事件
function echo(){
	start() //打开页面 调用一次 
	$(window).on('scroll', function () {
		start() //滚动页面是 调用一次   方便管理 
	})
	//加载函数 
	function start() {
		$('#lazyimg img').not('[data-isLoaded]').each(function () {
			var $node = $(this)
			if (isShow($node)) {
				//缓冲效果 
				setTimeout(function () {
					loadIng($node)
				}, 500)
			}
		})
	}
	// 页面逻辑
	function isShow($node) {
		// 当一个元素出现在我们眼前    小于 窗口高度 加上窗口滚动的高度的时候    就意味着  到达目标点 
		// 可以开始加载图片 或者其他内容
		return $node.offset().top <= $(window).height() + $(window).scrollTop()

	}
	// 显示状态
	function loadIng($img) {
		// 获取目标元素 并替换 
		$img.attr('src', $img.attr('data-src'))
		//性能优化   进行判断   已经加载的  不会再进行加载  
		$img.attr('data-isLoaded', 1)
	}
}
export{
	echo
}
